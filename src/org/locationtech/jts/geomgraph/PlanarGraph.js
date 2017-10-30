import Location from '../geom/Location';
import Coordinate from '../geom/Coordinate';
import Node from './Node';
import extend from '../../../../extend';
import NodeMap from './NodeMap';
import Orientation from '../algorithm/Orientation';
import DirectedEdge from './DirectedEdge';
import System from '../../../../java/lang/System';
import ArrayList from '../../../../java/util/ArrayList';
import Quadrant from './Quadrant';
import NodeFactory from './NodeFactory';
export default function PlanarGraph() {
	this._edges = new ArrayList();
	this._nodes = null;
	this._edgeEndList = new ArrayList();
	if (arguments.length === 0) {
		this._nodes = new NodeMap(new NodeFactory());
	} else if (arguments.length === 1) {
		let nodeFact = arguments[0];
		this._nodes = new NodeMap(nodeFact);
	}
}
extend(PlanarGraph.prototype, {
	printEdges: function (out) {
		out.println("Edges:");
		for (var i = 0; i < this._edges.size(); i++) {
			out.println("edge " + i + ":");
			var e = this._edges.get(i);
			e.print(out);
			e.eiList.print(out);
		}
	},
	find: function (coord) {
		return this._nodes.find(coord);
	},
	addNode: function () {
		if (arguments[0] instanceof Node) {
			let node = arguments[0];
			return this._nodes.addNode(node);
		} else if (arguments[0] instanceof Coordinate) {
			let coord = arguments[0];
			return this._nodes.addNode(coord);
		}
	},
	getNodeIterator: function () {
		return this._nodes.iterator();
	},
	linkResultDirectedEdges: function () {
		for (var nodeit = this._nodes.iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().linkResultDirectedEdges();
		}
	},
	debugPrintln: function (o) {
		System.out.println(o);
	},
	isBoundaryNode: function (geomIndex, coord) {
		var node = this._nodes.find(coord);
		if (node === null) return false;
		var label = node.getLabel();
		if (label !== null && label.getLocation(geomIndex) === Location.BOUNDARY) return true;
		return false;
	},
	linkAllDirectedEdges: function () {
		for (var nodeit = this._nodes.iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().linkAllDirectedEdges();
		}
	},
	matchInSameDirection: function (p0, p1, ep0, ep1) {
		if (!p0.equals(ep0)) return false;
		if (Orientation.index(p0, p1, ep1) === Orientation.COLLINEAR && Quadrant.quadrant(p0, p1) === Quadrant.quadrant(ep0, ep1)) return true;
		return false;
	},
	getEdgeEnds: function () {
		return this._edgeEndList;
	},
	debugPrint: function (o) {
		System.out.print(o);
	},
	getEdgeIterator: function () {
		return this._edges.iterator();
	},
	findEdgeInSameDirection: function (p0, p1) {
		for (var i = 0; i < this._edges.size(); i++) {
			var e = this._edges.get(i);
			var eCoord = e.getCoordinates();
			if (this.matchInSameDirection(p0, p1, eCoord[0], eCoord[1])) return e;
			if (this.matchInSameDirection(p0, p1, eCoord[eCoord.length - 1], eCoord[eCoord.length - 2])) return e;
		}
		return null;
	},
	insertEdge: function (e) {
		this._edges.add(e);
	},
	findEdgeEnd: function (e) {
		for (var i = this.getEdgeEnds().iterator(); i.hasNext(); ) {
			var ee = i.next();
			if (ee.getEdge() === e) return ee;
		}
		return null;
	},
	addEdges: function (edgesToAdd) {
		for (var it = edgesToAdd.iterator(); it.hasNext(); ) {
			var e = it.next();
			this._edges.add(e);
			var de1 = new DirectedEdge(e, true);
			var de2 = new DirectedEdge(e, false);
			de1.setSym(de2);
			de2.setSym(de1);
			this.add(de1);
			this.add(de2);
		}
	},
	add: function (e) {
		this._nodes.add(e);
		this._edgeEndList.add(e);
	},
	getNodes: function () {
		return this._nodes.values();
	},
	findEdge: function (p0, p1) {
		for (var i = 0; i < this._edges.size(); i++) {
			var e = this._edges.get(i);
			var eCoord = e.getCoordinates();
			if (p0.equals(eCoord[0]) && p1.equals(eCoord[1])) return e;
		}
		return null;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PlanarGraph;
	}
});
PlanarGraph.linkResultDirectedEdges = function (nodes) {
	for (var nodeit = nodes.iterator(); nodeit.hasNext(); ) {
		var node = nodeit.next();
		node.getEdges().linkResultDirectedEdges();
	}
};
