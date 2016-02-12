import Location from '../../geom/Location';
import GeometryFactory from '../../geom/GeometryFactory';
import Position from '../../geomgraph/Position';
import Polygon from '../../geom/Polygon';
import MultiPolygon from '../../geom/MultiPolygon';
import MaximalEdgeRing from '../overlay/MaximalEdgeRing';
import OverlayNodeFactory from '../overlay/OverlayNodeFactory';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import PlanarGraph from '../../geomgraph/PlanarGraph';
export default class ConnectedInteriorTester {
	constructor(...args) {
		this.geometryFactory = new GeometryFactory();
		this.geomGraph = null;
		this.disconnectedRingcoord = null;
		switch (args.length) {
			case 1:
				{
					let [geomGraph] = args;
					this.geomGraph = geomGraph;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	static findDifferentPoint(coord, pt) {
		for (var i = 0; i < coord.length; i++) {
			if (!coord[i].equals(pt)) return coord[i];
		}
		return null;
	}
	visitInteriorRing(ring, graph) {
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
	}
	visitShellInteriors(g, graph) {
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
	}
	getCoordinate() {
		return this.disconnectedRingcoord;
	}
	setInteriorEdgesInResult(graph) {
		for (var it = graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) {
				de.setInResult(true);
			}
		}
	}
	visitLinkedDirectedEdges(start) {
		var startDe = start;
		var de = start;
		do {
			Assert.isTrue(de !== null, "found null Directed Edge");
			de.setVisited(true);
			de = de.getNext();
		} while (de !== startDe);
	}
	buildEdgeRings(dirEdges) {
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
	}
	hasUnvisitedShellEdge(edgeRings) {
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
	}
	isInteriorsConnected() {
		var splitEdges = new ArrayList();
		this.geomGraph.computeSplitEdges(splitEdges);
		var graph = new PlanarGraph(new OverlayNodeFactory());
		graph.addEdges(splitEdges);
		this.setInteriorEdgesInResult(graph);
		graph.linkResultDirectedEdges();
		var edgeRings = this.buildEdgeRings(graph.getEdgeEnds());
		this.visitShellInteriors(this.geomGraph.getGeometry(), graph);
		return !this.hasUnvisitedShellEdge(edgeRings);
	}
	getClass() {
		return ConnectedInteriorTester;
	}
}

