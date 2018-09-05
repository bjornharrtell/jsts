import Node from './Node';
export default class NodeFactory {
	constructor() {
		NodeFactory.constructor_.apply(this, arguments);
	}
	createNode(coord) {
		return new Node(coord, null);
	}
	getClass() {
		return NodeFactory;
	}
	get interfaces_() {
		return [];
	}
}
NodeFactory.constructor_ = function () {};
