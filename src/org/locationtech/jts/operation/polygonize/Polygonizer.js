import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import PolygonizeGraph from './PolygonizeGraph';
import GeometryFactory from '../../geom/GeometryFactory';
import Collection from '../../../../../java/util/Collection';
import Collections from '../../../../../java/util/Collections';
import EdgeRing from './EdgeRing';
import GeometryComponentFilter from '../../geom/GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default class Polygonizer {
	constructor(...args) {
		this.lineStringAdder = new LineStringAdder(this);
		this.graph = null;
		this.dangles = new ArrayList();
		this.cutEdges = new ArrayList();
		this.invalidRingLines = new ArrayList();
		this.holeList = null;
		this.shellList = null;
		this.polyList = null;
		this.isCheckingRingsValid = true;
		this.extractOnlyPolygonal = null;
		this.geomFactory = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloaded.call(this, false);
					})(...args);
				case 1:
					return ((...args) => {
						let [extractOnlyPolygonal] = args;
						this.extractOnlyPolygonal = extractOnlyPolygonal;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get LineStringAdder() {
		return LineStringAdder;
	}
	static findOuterShells(shellList) {
		for (var i = shellList.iterator(); i.hasNext(); ) {
			var er = i.next();
			var outerHoleER = er.getOuterHole();
			if (outerHoleER !== null && !outerHoleER.isProcessed()) {
				er.setIncluded(true);
				outerHoleER.setProcessed(true);
			}
		}
	}
	static extractPolygons(shellList, includeAll) {
		var polyList = new ArrayList();
		for (var i = shellList.iterator(); i.hasNext(); ) {
			var er = i.next();
			if (includeAll || er.isIncluded()) {
				polyList.add(er.getPolygon());
			}
		}
		return polyList;
	}
	static assignHolesToShells(holeList, shellList) {
		for (var i = holeList.iterator(); i.hasNext(); ) {
			var holeER = i.next();
			Polygonizer.assignHoleToShell(holeER, shellList);
		}
	}
	static assignHoleToShell(holeER, shellList) {
		var shell = EdgeRing.findEdgeRingContaining(holeER, shellList);
		if (shell !== null) {
			shell.addHole(holeER);
		}
	}
	static findDisjointShells(shellList) {
		Polygonizer.findOuterShells(shellList);
		var isMoreToScan = null;
		do {
			isMoreToScan = false;
			for (var i = shellList.iterator(); i.hasNext(); ) {
				var er = i.next();
				if (er.isIncludedSet()) continue;
				er.updateIncluded();
				if (!er.isIncludedSet()) {
					isMoreToScan = true;
				}
			}
		} while (isMoreToScan);
	}
	getGeometry() {
		if (this.geomFactory === null) this.geomFactory = new GeometryFactory();
		this.polygonize();
		if (this.extractOnlyPolygonal) {
			return this.geomFactory.buildGeometry(this.polyList);
		}
		return this.geomFactory.createGeometryCollection(GeometryFactory.toGeometryArray(this.polyList));
	}
	getInvalidRingLines() {
		this.polygonize();
		return this.invalidRingLines;
	}
	findValidRings(edgeRingList, validEdgeRingList, invalidRingList) {
		for (var i = edgeRingList.iterator(); i.hasNext(); ) {
			var er = i.next();
			if (er.isValid()) validEdgeRingList.add(er); else invalidRingList.add(er.getLineString());
		}
	}
	polygonize() {
		if (this.polyList !== null) return null;
		this.polyList = new ArrayList();
		if (this.graph === null) return null;
		this.dangles = this.graph.deleteDangles();
		this.cutEdges = this.graph.deleteCutEdges();
		var edgeRingList = this.graph.getEdgeRings();
		var validEdgeRingList = new ArrayList();
		this.invalidRingLines = new ArrayList();
		if (this.isCheckingRingsValid) {
			this.findValidRings(edgeRingList, validEdgeRingList, this.invalidRingLines);
		} else {
			validEdgeRingList = edgeRingList;
		}
		this.findShellsAndHoles(validEdgeRingList);
		Polygonizer.assignHolesToShells(this.holeList, this.shellList);
		Collections.sort(this.shellList, new EdgeRing.EnvelopeComparator());
		var includeAll = true;
		if (this.extractOnlyPolygonal) {
			Polygonizer.findDisjointShells(this.shellList);
			includeAll = false;
		}
		this.polyList = Polygonizer.extractPolygons(this.shellList, includeAll);
	}
	getDangles() {
		this.polygonize();
		return this.dangles;
	}
	getCutEdges() {
		this.polygonize();
		return this.cutEdges;
	}
	getPolygons() {
		this.polygonize();
		return this.polyList;
	}
	add(...args) {
		switch (args.length) {
			case 1:
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
					let [geomList] = args;
					for (var i = geomList.iterator(); i.hasNext(); ) {
						var geometry = i.next();
						this.add(geometry);
					}
				} else if (args[0] instanceof LineString) {
					let [line] = args;
					this.geomFactory = line.getFactory();
					if (this.graph === null) this.graph = new PolygonizeGraph(this.geomFactory);
					this.graph.addEdge(line);
				} else if (args[0] instanceof Geometry) {
					let [g] = args;
					g.apply(this.lineStringAdder);
				}
				break;
		}
	}
	setCheckRingsValid(isCheckingRingsValid) {
		this.isCheckingRingsValid = isCheckingRingsValid;
	}
	findShellsAndHoles(edgeRingList) {
		this.holeList = new ArrayList();
		this.shellList = new ArrayList();
		for (var i = edgeRingList.iterator(); i.hasNext(); ) {
			var er = i.next();
			er.computeHole();
			if (er.isHole()) this.holeList.add(er); else this.shellList.add(er);
		}
	}
	getClass() {
		return Polygonizer;
	}
}
class LineStringAdder {
	constructor(...args) {
		this.p = null;
		switch (args.length) {
			case 1:
				{
					let [p] = args;
					this.p = p;
					break;
				}
		}
	}
	get interfaces_() {
		return [GeometryComponentFilter];
	}
	filter(g) {
		if (g instanceof LineString) this.p.add(g);
	}
	getClass() {
		return LineStringAdder;
	}
}

