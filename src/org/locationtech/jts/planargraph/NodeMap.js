import extend from '../../../../extend';
import TreeMap from '../../../../java/util/TreeMap';
export default function NodeMap() {
	this._nodeMap = new TreeMap();
}
extend(NodeMap.prototype, {
	find: function (coord) {
		return this._nodeMap.get(coord);
	},
	iterator: function () {
		return this._nodeMap.values().iterator();
	},
	remove: function (pt) {
		return this._nodeMap.remove(pt);
	},
	values: function () {
		return this._nodeMap.values();
	},
	add: function (n) {
		this._nodeMap.put(n.getCoordinate(), n);
		return n;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NodeMap;
	}
});
