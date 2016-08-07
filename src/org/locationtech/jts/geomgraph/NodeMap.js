import Location from '../geom/Location';
import Coordinate from '../geom/Coordinate';
import Node from './Node';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
export default function NodeMap() {
	this.nodeMap = new TreeMap();
	this.nodeFact = null;
	let nodeFact = arguments[0];
	this.nodeFact = nodeFact;
}
extend(NodeMap.prototype, {
	find: function (coord) {
		return this.nodeMap.get(coord);
	},
	addNode: function () {
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
	},
	print: function (out) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var n = it.next();
			n.print(out);
		}
	},
	iterator: function () {
		return this.nodeMap.values().iterator();
	},
	values: function () {
		return this.nodeMap.values();
	},
	getBoundaryNodes: function (geomIndex) {
		var bdyNodes = new ArrayList();
		for (var i = this.iterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getLabel().getLocation(geomIndex) === Location.BOUNDARY) bdyNodes.add(node);
		}
		return bdyNodes;
	},
	add: function (e) {
		var p = e.getCoordinate();
		var n = this.addNode(p);
		n.add(e);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NodeMap;
	}
});
