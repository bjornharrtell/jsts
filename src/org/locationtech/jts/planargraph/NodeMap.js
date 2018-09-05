import TreeMap from '../../../../java/util/TreeMap';
export default class NodeMap {
	constructor() {
		NodeMap.constructor_.apply(this, arguments);
	}
	find(coord) {
		return this._nodeMap.get(coord);
	}
	iterator() {
		return this._nodeMap.values().iterator();
	}
	remove(pt) {
		return this._nodeMap.remove(pt);
	}
	values() {
		return this._nodeMap.values();
	}
	add(n) {
		this._nodeMap.put(n.getCoordinate(), n);
		return n;
	}
	getClass() {
		return NodeMap;
	}
	get interfaces_() {
		return [];
	}
}
NodeMap.constructor_ = function () {
	this._nodeMap = new TreeMap();
};
