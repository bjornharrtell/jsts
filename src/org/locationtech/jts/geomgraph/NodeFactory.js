import Node from './Node';
import extend from '../../../../extend';
export default function NodeFactory() {}
extend(NodeFactory.prototype, {
	createNode: function (coord) {
		return new Node(coord, null);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NodeFactory;
	}
});
