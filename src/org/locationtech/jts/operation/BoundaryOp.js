import LineString from '../geom/LineString';
import BoundaryNodeRule from '../algorithm/BoundaryNodeRule';
import CoordinateArrays from '../geom/CoordinateArrays';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
import MultiLineString from '../geom/MultiLineString';
export default class BoundaryOp {
	constructor(...args) {
		this.geom = null;
		this.geomFact = null;
		this.bnRule = null;
		this.endpointMap = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geom] = args;
						overloaded.call(this, geom, BoundaryNodeRule.MOD2_BOUNDARY_RULE);
					})(...args);
				case 2:
					return ((...args) => {
						let [geom, bnRule] = args;
						this.geom = geom;
						this.geomFact = geom.getFactory();
						this.bnRule = bnRule;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static getBoundary(...args) {
		switch (args.length) {
			case 1:
				{
					let [g] = args;
					var bop = new BoundaryOp(g);
					return bop.getBoundary();
					break;
				}
			case 2:
				{
					let [g, bnRule] = args;
					var bop = new BoundaryOp(g, bnRule);
					return bop.getBoundary();
					break;
				}
		}
	}
	boundaryMultiLineString(mLine) {
		if (this.geom.isEmpty()) {
			return this.getEmptyMultiPoint();
		}
		var bdyPts = this.computeBoundaryCoordinates(mLine);
		if (bdyPts.length === 1) {
			return this.geomFact.createPoint(bdyPts[0]);
		}
		return this.geomFact.createMultiPointFromCoords(bdyPts);
	}
	getBoundary() {
		if (this.geom instanceof LineString) return this.boundaryLineString(this.geom);
		if (this.geom instanceof MultiLineString) return this.boundaryMultiLineString(this.geom);
		return this.geom.getBoundary();
	}
	boundaryLineString(line) {
		if (this.geom.isEmpty()) {
			return this.getEmptyMultiPoint();
		}
		if (line.isClosed()) {
			var closedEndpointOnBoundary = this.bnRule.isInBoundary(2);
			if (closedEndpointOnBoundary) {
				return line.getStartPoint();
			} else {
				return this.geomFact.createMultiPoint();
			}
		}
		return this.geomFact.createMultiPoint([line.getStartPoint(), line.getEndPoint()]);
	}
	getEmptyMultiPoint() {
		return this.geomFact.createMultiPoint();
	}
	computeBoundaryCoordinates(mLine) {
		var bdyPts = new ArrayList();
		this.endpointMap = new TreeMap();
		for (var i = 0; i < mLine.getNumGeometries(); i++) {
			var line = mLine.getGeometryN(i);
			if (line.getNumPoints() === 0) continue;
			this.addEndpoint(line.getCoordinateN(0));
			this.addEndpoint(line.getCoordinateN(line.getNumPoints() - 1));
		}
		for (var it = this.endpointMap.entrySet().iterator(); it.hasNext(); ) {
			var entry = it.next();
			var counter = entry.getValue();
			var valence = counter.count;
			if (this.bnRule.isInBoundary(valence)) {
				bdyPts.add(entry.getKey());
			}
		}
		return CoordinateArrays.toCoordinateArray(bdyPts);
	}
	addEndpoint(pt) {
		var counter = this.endpointMap.get(pt);
		if (counter === null) {
			counter = new Counter();
			this.endpointMap.put(pt, counter);
		}
		counter.count++;
	}
	getClass() {
		return BoundaryOp;
	}
}
class Counter {
	constructor(...args) {
		this.count = null;
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return Counter;
	}
}

