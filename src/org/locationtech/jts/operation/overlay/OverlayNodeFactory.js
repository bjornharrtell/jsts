import DirectedEdgeStar from '../../geomgraph/DirectedEdgeStar';
import Node from '../../geomgraph/Node';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
import NodeFactory from '../../geomgraph/NodeFactory';
export default function OverlayNodeFactory() {
	NodeFactory.apply(this);
}
inherits(OverlayNodeFactory, NodeFactory);
extend(OverlayNodeFactory.prototype, {
	createNode: function (coord) {
		return new Node(coord, new DirectedEdgeStar());
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OverlayNodeFactory;
	}
});
