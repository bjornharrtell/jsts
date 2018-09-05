import DirectedEdgeStar from '../../geomgraph/DirectedEdgeStar';
import Node from '../../geomgraph/Node';
import NodeFactory from '../../geomgraph/NodeFactory';
export default class OverlayNodeFactory extends NodeFactory {
	constructor() {
		super();
		OverlayNodeFactory.constructor_.apply(this, arguments);
	}
	createNode(coord) {
		return new Node(coord, new DirectedEdgeStar());
	}
	getClass() {
		return OverlayNodeFactory;
	}
	get interfaces_() {
		return [];
	}
}
OverlayNodeFactory.constructor_ = function () {};
