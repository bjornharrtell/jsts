import TreeSet from '../../../../../java/util/TreeSet';
import LineString from '../../geom/LineString';
import CGAlgorithms from '../../algorithm/CGAlgorithms';
import Geometry from '../../geom/Geometry';
import ConnectedInteriorTester from './ConnectedInteriorTester';
import Coordinate from '../../geom/Coordinate';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import MultiPoint from '../../geom/MultiPoint';
import LinearRing from '../../geom/LinearRing';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
import MCPointInRing from '../../algorithm/MCPointInRing';
import GeometryGraph from '../../geomgraph/GeometryGraph';
import MultiPolygon from '../../geom/MultiPolygon';
import ConsistentAreaTester from './ConsistentAreaTester';
import GeometryCollection from '../../geom/GeometryCollection';
import IndexedNestedRingTester from './IndexedNestedRingTester';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
import TopologyValidationError from './TopologyValidationError';
import Assert from '../../util/Assert';
export default function IsValidOp() {
	this.parentGeometry = null;
	this.isSelfTouchingRingFormingHoleValid = false;
	this.validErr = null;
	let parentGeometry = arguments[0];
	this.parentGeometry = parentGeometry;
}
extend(IsValidOp.prototype, {
	checkInvalidCoordinates: function () {
		if (arguments[0] instanceof Array) {
			let coords = arguments[0];
			for (var i = 0; i < coords.length; i++) {
				if (!IsValidOp.isValid(coords[i])) {
					this.validErr = new TopologyValidationError(TopologyValidationError.INVALID_COORDINATE, coords[i]);
					return null;
				}
			}
		} else if (arguments[0] instanceof Polygon) {
			let poly = arguments[0];
			this.checkInvalidCoordinates(poly.getExteriorRing().getCoordinates());
			if (this.validErr !== null) return null;
			for (var i = 0; i < poly.getNumInteriorRing(); i++) {
				this.checkInvalidCoordinates(poly.getInteriorRingN(i).getCoordinates());
				if (this.validErr !== null) return null;
			}
		}
	},
	checkHolesNotNested: function (p, graph) {
		var nestedTester = new IndexedNestedRingTester(graph);
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var innerHole = p.getInteriorRingN(i);
			nestedTester.add(innerHole);
		}
		var isNonNested = nestedTester.isNonNested();
		if (!isNonNested) {
			this.validErr = new TopologyValidationError(TopologyValidationError.NESTED_HOLES, nestedTester.getNestedPoint());
		}
	},
	checkConsistentArea: function (graph) {
		var cat = new ConsistentAreaTester(graph);
		var isValidArea = cat.isNodeConsistentArea();
		if (!isValidArea) {
			this.validErr = new TopologyValidationError(TopologyValidationError.SELF_INTERSECTION, cat.getInvalidPoint());
			return null;
		}
		if (cat.hasDuplicateRings()) {
			this.validErr = new TopologyValidationError(TopologyValidationError.DUPLICATE_RINGS, cat.getInvalidPoint());
		}
	},
	isValid: function () {
		this.checkValid(this.parentGeometry);
		return this.validErr === null;
	},
	checkShellInsideHole: function (shell, hole, graph) {
		var shellPts = shell.getCoordinates();
		var holePts = hole.getCoordinates();
		var shellPt = IsValidOp.findPtNotNode(shellPts, hole, graph);
		if (shellPt !== null) {
			var insideHole = CGAlgorithms.isPointInRing(shellPt, holePts);
			if (!insideHole) {
				return shellPt;
			}
		}
		var holePt = IsValidOp.findPtNotNode(holePts, shell, graph);
		if (holePt !== null) {
			var insideShell = CGAlgorithms.isPointInRing(holePt, shellPts);
			if (insideShell) {
				return holePt;
			}
			return null;
		}
		Assert.shouldNeverReachHere("points in shell and hole appear to be equal");
		return null;
	},
	checkNoSelfIntersectingRings: function (graph) {
		for (var i = graph.getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			this.checkNoSelfIntersectingRing(e.getEdgeIntersectionList());
			if (this.validErr !== null) return null;
		}
	},
	checkConnectedInteriors: function (graph) {
		var cit = new ConnectedInteriorTester(graph);
		if (!cit.isInteriorsConnected()) this.validErr = new TopologyValidationError(TopologyValidationError.DISCONNECTED_INTERIOR, cit.getCoordinate());
	},
	checkNoSelfIntersectingRing: function (eiList) {
		var nodeSet = new TreeSet();
		var isFirst = true;
		for (var i = eiList.iterator(); i.hasNext(); ) {
			var ei = i.next();
			if (isFirst) {
				isFirst = false;
				continue;
			}
			if (nodeSet.contains(ei.coord)) {
				this.validErr = new TopologyValidationError(TopologyValidationError.RING_SELF_INTERSECTION, ei.coord);
				return null;
			} else {
				nodeSet.add(ei.coord);
			}
		}
	},
	checkHolesInShell: function (p, graph) {
		var shell = p.getExteriorRing();
		var pir = new MCPointInRing(shell);
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var hole = p.getInteriorRingN(i);
			var holePt = IsValidOp.findPtNotNode(hole.getCoordinates(), shell, graph);
			if (holePt === null) return null;
			var outside = !pir.isInside(holePt);
			if (outside) {
				this.validErr = new TopologyValidationError(TopologyValidationError.HOLE_OUTSIDE_SHELL, holePt);
				return null;
			}
		}
	},
	checkTooFewPoints: function (graph) {
		if (graph.hasTooFewPoints()) {
			this.validErr = new TopologyValidationError(TopologyValidationError.TOO_FEW_POINTS, graph.getInvalidPoint());
			return null;
		}
	},
	getValidationError: function () {
		this.checkValid(this.parentGeometry);
		return this.validErr;
	},
	checkValid: function () {
		if (arguments[0] instanceof Point) {
			let g = arguments[0];
			this.checkInvalidCoordinates(g.getCoordinates());
		} else if (arguments[0] instanceof MultiPoint) {
			let g = arguments[0];
			this.checkInvalidCoordinates(g.getCoordinates());
		} else if (arguments[0] instanceof LinearRing) {
			let g = arguments[0];
			this.checkInvalidCoordinates(g.getCoordinates());
			if (this.validErr !== null) return null;
			this.checkClosedRing(g);
			if (this.validErr !== null) return null;
			var graph = new GeometryGraph(0, g);
			this.checkTooFewPoints(graph);
			if (this.validErr !== null) return null;
			var li = new RobustLineIntersector();
			graph.computeSelfNodes(li, true, true);
			this.checkNoSelfIntersectingRings(graph);
		} else if (arguments[0] instanceof LineString) {
			let g = arguments[0];
			this.checkInvalidCoordinates(g.getCoordinates());
			if (this.validErr !== null) return null;
			var graph = new GeometryGraph(0, g);
			this.checkTooFewPoints(graph);
		} else if (arguments[0] instanceof Polygon) {
			let g = arguments[0];
			this.checkInvalidCoordinates(g);
			if (this.validErr !== null) return null;
			this.checkClosedRings(g);
			if (this.validErr !== null) return null;
			var graph = new GeometryGraph(0, g);
			this.checkTooFewPoints(graph);
			if (this.validErr !== null) return null;
			this.checkConsistentArea(graph);
			if (this.validErr !== null) return null;
			if (!this.isSelfTouchingRingFormingHoleValid) {
				this.checkNoSelfIntersectingRings(graph);
				if (this.validErr !== null) return null;
			}
			this.checkHolesInShell(g, graph);
			if (this.validErr !== null) return null;
			this.checkHolesNotNested(g, graph);
			if (this.validErr !== null) return null;
			this.checkConnectedInteriors(graph);
		} else if (arguments[0] instanceof MultiPolygon) {
			let g = arguments[0];
			for (var i = 0; i < g.getNumGeometries(); i++) {
				var p = g.getGeometryN(i);
				this.checkInvalidCoordinates(p);
				if (this.validErr !== null) return null;
				this.checkClosedRings(p);
				if (this.validErr !== null) return null;
			}
			var graph = new GeometryGraph(0, g);
			this.checkTooFewPoints(graph);
			if (this.validErr !== null) return null;
			this.checkConsistentArea(graph);
			if (this.validErr !== null) return null;
			if (!this.isSelfTouchingRingFormingHoleValid) {
				this.checkNoSelfIntersectingRings(graph);
				if (this.validErr !== null) return null;
			}
			for (var i = 0; i < g.getNumGeometries(); i++) {
				var p = g.getGeometryN(i);
				this.checkHolesInShell(p, graph);
				if (this.validErr !== null) return null;
			}
			for (var i = 0; i < g.getNumGeometries(); i++) {
				var p = g.getGeometryN(i);
				this.checkHolesNotNested(p, graph);
				if (this.validErr !== null) return null;
			}
			this.checkShellsNotNested(g, graph);
			if (this.validErr !== null) return null;
			this.checkConnectedInteriors(graph);
		} else if (arguments[0] instanceof GeometryCollection) {
			let gc = arguments[0];
			for (var i = 0; i < gc.getNumGeometries(); i++) {
				var g = gc.getGeometryN(i);
				this.checkValid(g);
				if (this.validErr !== null) return null;
			}
		} else if (arguments[0] instanceof Geometry) {
			let g = arguments[0];
			this.validErr = null;
			if (g.isEmpty()) return null;
			if (g instanceof Point) this.checkValid(g); else if (g instanceof MultiPoint) this.checkValid(g); else if (g instanceof LinearRing) this.checkValid(g); else if (g instanceof LineString) this.checkValid(g); else if (g instanceof Polygon) this.checkValid(g); else if (g instanceof MultiPolygon) this.checkValid(g); else if (g instanceof GeometryCollection) this.checkValid(g); else throw new UnsupportedOperationException(g.getClass().getName());
		}
	},
	setSelfTouchingRingFormingHoleValid: function (isValid) {
		this.isSelfTouchingRingFormingHoleValid = isValid;
	},
	checkShellNotNested: function (shell, p, graph) {
		var shellPts = shell.getCoordinates();
		var polyShell = p.getExteriorRing();
		var polyPts = polyShell.getCoordinates();
		var shellPt = IsValidOp.findPtNotNode(shellPts, polyShell, graph);
		if (shellPt === null) return null;
		var insidePolyShell = CGAlgorithms.isPointInRing(shellPt, polyPts);
		if (!insidePolyShell) return null;
		if (p.getNumInteriorRing() <= 0) {
			this.validErr = new TopologyValidationError(TopologyValidationError.NESTED_SHELLS, shellPt);
			return null;
		}
		var badNestedPt = null;
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var hole = p.getInteriorRingN(i);
			badNestedPt = this.checkShellInsideHole(shell, hole, graph);
			if (badNestedPt === null) return null;
		}
		this.validErr = new TopologyValidationError(TopologyValidationError.NESTED_SHELLS, badNestedPt);
	},
	checkClosedRings: function (poly) {
		this.checkClosedRing(poly.getExteriorRing());
		if (this.validErr !== null) return null;
		for (var i = 0; i < poly.getNumInteriorRing(); i++) {
			this.checkClosedRing(poly.getInteriorRingN(i));
			if (this.validErr !== null) return null;
		}
	},
	checkClosedRing: function (ring) {
		if (!ring.isClosed()) {
			var pt = null;
			if (ring.getNumPoints() >= 1) pt = ring.getCoordinateN(0);
			this.validErr = new TopologyValidationError(TopologyValidationError.RING_NOT_CLOSED, pt);
		}
	},
	checkShellsNotNested: function (mp, graph) {
		for (var i = 0; i < mp.getNumGeometries(); i++) {
			var p = mp.getGeometryN(i);
			var shell = p.getExteriorRing();
			for (var j = 0; j < mp.getNumGeometries(); j++) {
				if (i === j) continue;
				var p2 = mp.getGeometryN(j);
				this.checkShellNotNested(shell, p2, graph);
				if (this.validErr !== null) return null;
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IsValidOp;
	}
});
IsValidOp.findPtNotNode = function (testCoords, searchRing, graph) {
	var searchEdge = graph.findEdge(searchRing);
	var eiList = searchEdge.getEdgeIntersectionList();
	for (var i = 0; i < testCoords.length; i++) {
		var pt = testCoords[i];
		if (!eiList.isIntersection(pt)) return pt;
	}
	return null;
};
IsValidOp.isValid = function () {
	if (arguments[0] instanceof Geometry) {
		let geom = arguments[0];
		var isValidOp = new IsValidOp(geom);
		return isValidOp.isValid();
	} else if (arguments[0] instanceof Coordinate) {
		let coord = arguments[0];
		if (Double.isNaN(coord.x)) return false;
		if (Double.isInfinite(coord.x)) return false;
		if (Double.isNaN(coord.y)) return false;
		if (Double.isInfinite(coord.y)) return false;
		return true;
	}
};

