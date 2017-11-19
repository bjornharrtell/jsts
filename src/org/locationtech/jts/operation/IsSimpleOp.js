import TreeSet from '../../../../java/util/TreeSet';
import LineString from '../geom/LineString';
import hasInterface from '../../../../hasInterface';
import MultiPoint from '../geom/MultiPoint';
import extend from '../../../../extend';
import GeometryGraph from '../geomgraph/GeometryGraph';
import GeometryCollection from '../geom/GeometryCollection';
import Polygonal from '../geom/Polygonal';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter';
import TreeMap from '../../../../java/util/TreeMap';
import MultiLineString from '../geom/MultiLineString';
export default function IsSimpleOp() {
	this._inputGeom = null;
	this._isClosedEndpointsInInterior = true;
	this._nonSimpleLocation = null;
	if (arguments.length === 1) {
		let geom = arguments[0];
		this._inputGeom = geom;
	} else if (arguments.length === 2) {
		let geom = arguments[0], boundaryNodeRule = arguments[1];
		this._inputGeom = geom;
		this._isClosedEndpointsInInterior = !boundaryNodeRule.isInBoundary(2);
	}
}
extend(IsSimpleOp.prototype, {
	isSimpleMultiPoint: function (mp) {
		if (mp.isEmpty()) return true;
		var points = new TreeSet();
		for (var i = 0; i < mp.getNumGeometries(); i++) {
			var pt = mp.getGeometryN(i);
			var p = pt.getCoordinate();
			if (points.contains(p)) {
				this._nonSimpleLocation = p;
				return false;
			}
			points.add(p);
		}
		return true;
	},
	isSimplePolygonal: function (geom) {
		var rings = LinearComponentExtracter.getLines(geom);
		for (var i = rings.iterator(); i.hasNext(); ) {
			var ring = i.next();
			if (!this.isSimpleLinearGeometry(ring)) return false;
		}
		return true;
	},
	hasClosedEndpointIntersection: function (graph) {
		var endPoints = new TreeMap();
		for (var i = graph.getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var maxSegmentIndex = e.getMaximumSegmentIndex();
			var isClosed = e.isClosed();
			var p0 = e.getCoordinate(0);
			this.addEndpoint(endPoints, p0, isClosed);
			var p1 = e.getCoordinate(e.getNumPoints() - 1);
			this.addEndpoint(endPoints, p1, isClosed);
		}
		for (var i = endPoints.values().iterator(); i.hasNext(); ) {
			var eiInfo = i.next();
			if (eiInfo.isClosed && eiInfo.degree !== 2) {
				this._nonSimpleLocation = eiInfo.getCoordinate();
				return true;
			}
		}
		return false;
	},
	getNonSimpleLocation: function () {
		return this._nonSimpleLocation;
	},
	isSimpleLinearGeometry: function (geom) {
		if (geom.isEmpty()) return true;
		var graph = new GeometryGraph(0, geom);
		var li = new RobustLineIntersector();
		var si = graph.computeSelfNodes(li, true);
		if (!si.hasIntersection()) return true;
		if (si.hasProperIntersection()) {
			this._nonSimpleLocation = si.getProperIntersectionPoint();
			return false;
		}
		if (this.hasNonEndpointIntersection(graph)) return false;
		if (this._isClosedEndpointsInInterior) {
			if (this.hasClosedEndpointIntersection(graph)) return false;
		}
		return true;
	},
	hasNonEndpointIntersection: function (graph) {
		for (var i = graph.getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var maxSegmentIndex = e.getMaximumSegmentIndex();
			for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				if (!ei.isEndPoint(maxSegmentIndex)) {
					this._nonSimpleLocation = ei.getCoordinate();
					return true;
				}
			}
		}
		return false;
	},
	addEndpoint: function (endPoints, p, isClosed) {
		var eiInfo = endPoints.get(p);
		if (eiInfo === null) {
			eiInfo = new EndpointInfo(p);
			endPoints.put(p, eiInfo);
		}
		eiInfo.addEndpoint(isClosed);
	},
	computeSimple: function (geom) {
		this._nonSimpleLocation = null;
		if (geom.isEmpty()) return true;
		if (geom instanceof LineString) return this.isSimpleLinearGeometry(geom);
		if (geom instanceof MultiLineString) return this.isSimpleLinearGeometry(geom);
		if (geom instanceof MultiPoint) return this.isSimpleMultiPoint(geom);
		if (hasInterface(geom, Polygonal)) return this.isSimplePolygonal(geom);
		if (geom instanceof GeometryCollection) return this.isSimpleGeometryCollection(geom);
		return true;
	},
	isSimple: function () {
		this._nonSimpleLocation = null;
		return this.computeSimple(this._inputGeom);
	},
	isSimpleGeometryCollection: function (geom) {
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var comp = geom.getGeometryN(i);
			if (!this.computeSimple(comp)) return false;
		}
		return true;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IsSimpleOp;
	}
});
IsSimpleOp.isSimple = function () {
	if (arguments.length === 1) {
		let geom = arguments[0];
		var op = new IsSimpleOp(geom);
		return op.isSimple();
	} else if (arguments.length === 2) {
		let geom = arguments[0], boundaryNodeRule = arguments[1];
		var op = new IsSimpleOp(geom, boundaryNodeRule);
		return op.isSimple();
	}
};
function EndpointInfo() {
	this.pt = null;
	this.isClosed = null;
	this.degree = null;
	let pt = arguments[0];
	this.pt = pt;
	this.isClosed = false;
	this.degree = 0;
}
extend(EndpointInfo.prototype, {
	addEndpoint: function (isClosed) {
		this.degree++;
		this.isClosed |= isClosed;
	},
	getCoordinate: function () {
		return this.pt;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EndpointInfo;
	}
});
IsSimpleOp.EndpointInfo = EndpointInfo;
