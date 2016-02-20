import Location from '../../geom/Location';
import GeometryFactory from '../../geom/GeometryFactory';
import Position from '../../geomgraph/Position';
import Polygon from '../../geom/Polygon';
import extend from '../../../../../extend';
import MultiPolygon from '../../geom/MultiPolygon';
import MaximalEdgeRing from '../overlay/MaximalEdgeRing';
import OverlayNodeFactory from '../overlay/OverlayNodeFactory';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import PlanarGraph from '../../geomgraph/PlanarGraph';
export default function ConnectedInteriorTester() {
	this.geometryFactory = new GeometryFactory();
	this.geomGraph = null;
	this.disconnectedRingcoord = null;
	let geomGraph = arguments[0];
	this.geomGraph = geomGraph;
}
extend(ConnectedInteriorTester.prototype, {
	visitInteriorRing: function (ring, graph) {
		var pts = ring.getCoordinates();
		var pt0 = pts[0];
		var pt1 = ConnectedInteriorTester.findDifferentPoint(pts, pt0);
		var e = graph.findEdgeInSameDirection(pt0, pt1);
		var de = graph.findEdgeEnd(e);
		var intDe = null;
		if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) {
			intDe = de;
		} else if (de.getSym().getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) {
			intDe = de.getSym();
		}
		Assert.isTrue(intDe !== null, "unable to find dirEdge with Interior on RHS");
		this.visitLinkedDirectedEdges(intDe);
	},
	visitShellInteriors: function (g, graph) {
		if (g instanceof Polygon) {
			var p = g;
			this.visitInteriorRing(p.getExteriorRing(), graph);
		}
		if (g instanceof MultiPolygon) {
			var mp = g;
			for (var i = 0; i < mp.getNumGeometries(); i++) {
				var p = mp.getGeometryN(i);
				this.visitInteriorRing(p.getExteriorRing(), graph);
			}
		}
	},
	getCoordinate: function () {
		return this.disconnectedRingcoord;
	},
	setInteriorEdgesInResult: function (graph) {
		for (var it = graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) {
				de.setInResult(true);
			}
		}
	},
	visitLinkedDirectedEdges: function (start) {
		var startDe = start;
		var de = start;
		do {
			Assert.isTrue(de !== null, "found null Directed Edge");
			de.setVisited(true);
			de = de.getNext();
		} while (de !== startDe);
	},
	buildEdgeRings: function (dirEdges) {
		var edgeRings = new ArrayList();
		for (var it = dirEdges.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.isInResult() && de.getEdgeRing() === null) {
				var er = new MaximalEdgeRing(de, this.geometryFactory);
				er.linkDirectedEdgesForMinimalEdgeRings();
				var minEdgeRings = er.buildMinimalRings();
				edgeRings.addAll(minEdgeRings);
			}
		}
		return edgeRings;
	},
	hasUnvisitedShellEdge: function (edgeRings) {
		for (var i = 0; i < edgeRings.size(); i++) {
			var er = edgeRings.get(i);
			if (er.isHole()) continue;
			var edges = er.getEdges();
			var de = edges.get(0);
			if (de.getLabel().getLocation(0, Position.RIGHT) !== Location.INTERIOR) continue;
			for (var j = 0; j < edges.size(); j++) {
				de = edges.get(j);
				if (!de.isVisited()) {
					this.disconnectedRingcoord = de.getCoordinate();
					return true;
				}
			}
		}
		return false;
	},
	isInteriorsConnected: function () {
		var splitEdges = new ArrayList();
		this.geomGraph.computeSplitEdges(splitEdges);
		var graph = new PlanarGraph(new OverlayNodeFactory());
		graph.addEdges(splitEdges);
		this.setInteriorEdgesInResult(graph);
		graph.linkResultDirectedEdges();
		var edgeRings = this.buildEdgeRings(graph.getEdgeEnds());
		this.visitShellInteriors(this.geomGraph.getGeometry(), graph);
		return !this.hasUnvisitedShellEdge(edgeRings);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConnectedInteriorTester;
	}
});
ConnectedInteriorTester.findDifferentPoint = function (coord, pt) {
	for (var i = 0; i < coord.length; i++) {
		if (!coord[i].equals(pt)) return coord[i];
	}
	return null;
};

