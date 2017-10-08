import LineString from '../geom/LineString';
import BoundaryNodeRule from '../algorithm/BoundaryNodeRule';
import extend from '../../../../extend';
import CoordinateArrays from '../geom/CoordinateArrays';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
import MultiLineString from '../geom/MultiLineString';
export default function BoundaryOp() {
	this._geom = null;
	this._geomFact = null;
	this._bnRule = null;
	this._endpointMap = null;
	if (arguments.length === 1) {
		let geom = arguments[0];
		BoundaryOp.call(this, geom, BoundaryNodeRule.MOD2_BOUNDARY_RULE);
	} else if (arguments.length === 2) {
		let geom = arguments[0], bnRule = arguments[1];
		this._geom = geom;
		this._geomFact = geom.getFactory();
		this._bnRule = bnRule;
	}
}
extend(BoundaryOp.prototype, {
	boundaryMultiLineString: function (mLine) {
		if (this._geom.isEmpty()) {
			return this.getEmptyMultiPoint();
		}
		var bdyPts = this.computeBoundaryCoordinates(mLine);
		if (bdyPts.length === 1) {
			return this._geomFact.createPoint(bdyPts[0]);
		}
		return this._geomFact.createMultiPointFromCoords(bdyPts);
	},
	getBoundary: function () {
		if (this._geom instanceof LineString) return this.boundaryLineString(this._geom);
		if (this._geom instanceof MultiLineString) return this.boundaryMultiLineString(this._geom);
		return this._geom.getBoundary();
	},
	boundaryLineString: function (line) {
		if (this._geom.isEmpty()) {
			return this.getEmptyMultiPoint();
		}
		if (line.isClosed()) {
			var closedEndpointOnBoundary = this._bnRule.isInBoundary(2);
			if (closedEndpointOnBoundary) {
				return line.getStartPoint();
			} else {
				return this._geomFact.createMultiPoint();
			}
		}
		return this._geomFact.createMultiPoint([line.getStartPoint(), line.getEndPoint()]);
	},
	getEmptyMultiPoint: function () {
		return this._geomFact.createMultiPoint();
	},
	computeBoundaryCoordinates: function (mLine) {
		var bdyPts = new ArrayList();
		this._endpointMap = new TreeMap();
		for (var i = 0; i < mLine.getNumGeometries(); i++) {
			var line = mLine.getGeometryN(i);
			if (line.getNumPoints() === 0) continue;
			this.addEndpoint(line.getCoordinateN(0));
			this.addEndpoint(line.getCoordinateN(line.getNumPoints() - 1));
		}
		for (var it = this._endpointMap.entrySet().iterator(); it.hasNext(); ) {
			var entry = it.next();
			var counter = entry.getValue();
			var valence = counter.count;
			if (this._bnRule.isInBoundary(valence)) {
				bdyPts.add(entry.getKey());
			}
		}
		return CoordinateArrays.toCoordinateArray(bdyPts);
	},
	addEndpoint: function (pt) {
		var counter = this._endpointMap.get(pt);
		if (counter === null) {
			counter = new Counter();
			this._endpointMap.put(pt, counter);
		}
		counter.count++;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BoundaryOp;
	}
});
BoundaryOp.getBoundary = function () {
	if (arguments.length === 1) {
		let g = arguments[0];
		var bop = new BoundaryOp(g);
		return bop.getBoundary();
	} else if (arguments.length === 2) {
		let g = arguments[0], bnRule = arguments[1];
		var bop = new BoundaryOp(g, bnRule);
		return bop.getBoundary();
	}
};
function Counter() {
	this.count = null;
}
extend(Counter.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Counter;
	}
});
