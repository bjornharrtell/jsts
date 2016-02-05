import Node from './Node';
export default class NodeFactory {
	get interfaces_() {
		return [];
	}
	createNode(coord) {
		return new Node(coord, null);
	}
	getClass() {
		return NodeFactory;
	}
}

