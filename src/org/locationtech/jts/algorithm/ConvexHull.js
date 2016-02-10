import TreeSet from '../../../../java/util/TreeSet';
import CGAlgorithms from './CGAlgorithms';
import CoordinateList from '../geom/CoordinateList';
import Arrays from '../../../../java/util/Arrays';
import Stack from '../../../../java/util/Stack';
import CoordinateArrays from '../geom/CoordinateArrays';
import ArrayList from '../../../../java/util/ArrayList';
import Comparator from '../../../../java/util/Comparator';
import UniqueCoordinateArrayFilter from '../util/UniqueCoordinateArrayFilter';
import Assert from '../util/Assert';
export default class ConvexHull {
	constructor(...args) {
		this.geomFactory = null;
		this.inputPts = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geometry] = args;
						overloads.call(this, ConvexHull.extractCoordinates(geometry), geometry.getFactory());
					})(...args);
				case 2:
					return ((...args) => {
						let [pts, geomFactory] = args;
						this.inputPts = UniqueCoordinateArrayFilter.filterCoordinates(pts);
						this.geomFactory = geomFactory;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get RadialComparator() {
		return RadialComparator;
	}
	static extractCoordinates(geom) {
		var filter = new UniqueCoordinateArrayFilter();
		geom.apply(filter);
		return filter.getCoordinates();
	}
	preSort(pts) {
		var t = null;
		for (var i = 1; i < pts.length; i++) {
			if (pts[i].y < pts[0].y || pts[i].y === pts[0].y && pts[i].x < pts[0].x) {
				t = pts[0];
				pts[0] = pts[i];
				pts[i] = t;
			}
		}
		Arrays.sort(pts, 1, pts.length, new RadialComparator(pts[0]));
		return pts;
	}
	computeOctRing(inputPts) {
		var octPts = this.computeOctPts(inputPts);
		var coordList = new CoordinateList();
		coordList.add(octPts, false);
		if (coordList.size() < 3) {
			return null;
		}
		coordList.closeRing();
		return coordList.toCoordinateArray();
	}
	lineOrPolygon(coordinates) {
		coordinates = this.cleanRing(coordinates);
		if (coordinates.length === 3) {
			return this.geomFactory.createLineString([coordinates[0], coordinates[1]]);
		}
		var linearRing = this.geomFactory.createLinearRing(coordinates);
		return this.geomFactory.createPolygon(linearRing, null);
	}
	cleanRing(original) {
		Assert.equals(original[0], original[original.length - 1]);
		var cleanedRing = new ArrayList();
		var previousDistinctCoordinate = null;
		for (var i = 0; i <= original.length - 2; i++) {
			var currentCoordinate = original[i];
			var nextCoordinate = original[i + 1];
			if (currentCoordinate.equals(nextCoordinate)) {
				continue;
			}
			if (previousDistinctCoordinate !== null && this.isBetween(previousDistinctCoordinate, currentCoordinate, nextCoordinate)) {
				continue;
			}
			cleanedRing.add(currentCoordinate);
			previousDistinctCoordinate = currentCoordinate;
		}
		cleanedRing.add(original[original.length - 1]);
		var cleanedRingCoordinates = new Array(cleanedRing.size());
		return cleanedRing.toArray(cleanedRingCoordinates);
	}
	isBetween(c1, c2, c3) {
		if (CGAlgorithms.computeOrientation(c1, c2, c3) !== 0) {
			return false;
		}
		if (c1.x !== c3.x) {
			if (c1.x <= c2.x && c2.x <= c3.x) {
				return true;
			}
			if (c3.x <= c2.x && c2.x <= c1.x) {
				return true;
			}
		}
		if (c1.y !== c3.y) {
			if (c1.y <= c2.y && c2.y <= c3.y) {
				return true;
			}
			if (c3.y <= c2.y && c2.y <= c1.y) {
				return true;
			}
		}
		return false;
	}
	reduce(inputPts) {
		var polyPts = this.computeOctRing(inputPts);
		if (polyPts === null) return inputPts;
		var reducedSet = new TreeSet();
		for (var i = 0; i < polyPts.length; i++) {
			reducedSet.add(polyPts[i]);
		}
		for (var i = 0; i < inputPts.length; i++) {
			if (!CGAlgorithms.isPointInRing(inputPts[i], polyPts)) {
				reducedSet.add(inputPts[i]);
			}
		}
		var reducedPts = CoordinateArrays.toCoordinateArray(reducedSet);
		if (reducedPts.length < 3) return this.padArray3(reducedPts);
		return reducedPts;
	}
	getConvexHull() {
		if (this.inputPts.length === 0) {
			return this.geomFactory.createGeometryCollection(null);
		}
		if (this.inputPts.length === 1) {
			return this.geomFactory.createPoint(this.inputPts[0]);
		}
		if (this.inputPts.length === 2) {
			return this.geomFactory.createLineString(this.inputPts);
		}
		var reducedPts = this.inputPts;
		if (this.inputPts.length > 50) {
			reducedPts = this.reduce(this.inputPts);
		}
		var sortedPts = this.preSort(reducedPts);
		var cHS = this.grahamScan(sortedPts);
		var cH = this.toCoordinateArray(cHS);
		return this.lineOrPolygon(cH);
	}
	padArray3(pts) {
		var pad = new Array(3);
		for (var i = 0; i < pad.length; i++) {
			if (i < pts.length) {
				pad[i] = pts[i];
			} else pad[i] = pts[0];
		}
		return pad;
	}
	computeOctPts(inputPts) {
		var pts = new Array(8);
		for (var j = 0; j < pts.length; j++) {
			pts[j] = inputPts[0];
		}
		for (var i = 1; i < inputPts.length; i++) {
			if (inputPts[i].x < pts[0].x) {
				pts[0] = inputPts[i];
			}
			if (inputPts[i].x - inputPts[i].y < pts[1].x - pts[1].y) {
				pts[1] = inputPts[i];
			}
			if (inputPts[i].y > pts[2].y) {
				pts[2] = inputPts[i];
			}
			if (inputPts[i].x + inputPts[i].y > pts[3].x + pts[3].y) {
				pts[3] = inputPts[i];
			}
			if (inputPts[i].x > pts[4].x) {
				pts[4] = inputPts[i];
			}
			if (inputPts[i].x - inputPts[i].y > pts[5].x - pts[5].y) {
				pts[5] = inputPts[i];
			}
			if (inputPts[i].y < pts[6].y) {
				pts[6] = inputPts[i];
			}
			if (inputPts[i].x + inputPts[i].y < pts[7].x + pts[7].y) {
				pts[7] = inputPts[i];
			}
		}
		return pts;
	}
	toCoordinateArray(stack) {
		var coordinates = new Array(stack.size());
		for (var i = 0; i < stack.size(); i++) {
			var coordinate = stack.get(i);
			coordinates[i] = coordinate;
		}
		return coordinates;
	}
	grahamScan(c) {
		var p = null;
		var ps = new Stack();
		p = ps.push(c[0]);
		p = ps.push(c[1]);
		p = ps.push(c[2]);
		for (var i = 3; i < c.length; i++) {
			p = ps.pop();
			while (!ps.empty() && CGAlgorithms.computeOrientation(ps.peek(), p, c[i]) > 0) {
				p = ps.pop();
			}
			p = ps.push(p);
			p = ps.push(c[i]);
		}
		p = ps.push(c[0]);
		return ps;
	}
	getClass() {
		return ConvexHull;
	}
}
class RadialComparator {
	constructor(...args) {
		this.origin = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [origin] = args;
						this.origin = origin;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [Comparator];
	}
	static polarCompare(o, p, q) {
		var dxp = p.x - o.x;
		var dyp = p.y - o.y;
		var dxq = q.x - o.x;
		var dyq = q.y - o.y;
		var orient = CGAlgorithms.computeOrientation(o, p, q);
		if (orient === CGAlgorithms.COUNTERCLOCKWISE) return 1;
		if (orient === CGAlgorithms.CLOCKWISE) return -1;
		var op = dxp * dxp + dyp * dyp;
		var oq = dxq * dxq + dyq * dyq;
		if (op < oq) {
			return -1;
		}
		if (op > oq) {
			return 1;
		}
		return 0;
	}
	compare(o1, o2) {
		var p1 = o1;
		var p2 = o2;
		return RadialComparator.polarCompare(this.origin, p1, p2);
	}
	getClass() {
		return RadialComparator;
	}
}

