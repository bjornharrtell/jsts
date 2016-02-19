import extend from '../../../../extend';
import TreeMap from '../../../../java/util/TreeMap';
export default function NodeMap() {
	this.nodeMap = new TreeMap();
	if (arguments.length === 0) {}
}
extend(NodeMap.prototype, {
	find: function (coord) {
		return this.nodeMap.get(coord);
	},
	iterator: function () {
		return this.nodeMap.values().iterator();
	},
	remove: function (pt) {
		return this.nodeMap.remove(pt);
	},
	values: function () {
		return this.nodeMap.values();
	},
	add: function (n) {
		this.nodeMap.put(n.getCoordinate(), n);
		return n;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NodeMap;
	}
});

