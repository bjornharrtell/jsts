import Location from '../geom/Location';
import Coordinate from '../geom/Coordinate';
import Node from './Node';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
export default class NodeMap {
	constructor() {
		NodeMap.constructor_.apply(this, arguments);
	}
	find(coord) {
		return this.nodeMap.get(coord);
	}
	addNode() {
		if (arguments[0] instanceof Coordinate) {
			let coord = arguments[0];
			var node = this.nodeMap.get(coord);
			if (node === null) {
				node = this.nodeFact.createNode(coord);
				this.nodeMap.put(coord, node);
			}
			return node;
		} else if (arguments[0] instanceof Node) {
			let n = arguments[0];
			var node = this.nodeMap.get(n.getCoordinate());
			if (node === null) {
				this.nodeMap.put(n.getCoordinate(), n);
				return n;
			}
			node.mergeLabel(n);
			return node;
		}
	}
	print(out) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var n = it.next();
			n.print(out);
		}
	}
	iterator() {
		return this.nodeMap.values().iterator();
	}
	values() {
		return this.nodeMap.values();
	}
	getBoundaryNodes(geomIndex) {
		var bdyNodes = new ArrayList();
		for (var i = this.iterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getLabel().getLocation(geomIndex) === Location.BOUNDARY) bdyNodes.add(node);
		}
		return bdyNodes;
	}
	add(e) {
		var p = e.getCoordinate();
		var n = this.addNode(p);
		n.add(e);
	}
	getClass() {
		return NodeMap;
	}
	get interfaces_() {
		return [];
	}
}
NodeMap.constructor_ = function () {
	this.nodeMap = new TreeMap();
	this.nodeFact = null;
	let nodeFact = arguments[0];
	this.nodeFact = nodeFact;
};
