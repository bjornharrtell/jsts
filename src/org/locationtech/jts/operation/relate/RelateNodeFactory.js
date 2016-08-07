import EdgeEndBundleStar from './EdgeEndBundleStar';
import extend from '../../../../../extend';
import RelateNode from './RelateNode';
import inherits from '../../../../../inherits';
import NodeFactory from '../../geomgraph/NodeFactory';
export default function RelateNodeFactory() {
	NodeFactory.apply(this);
}
inherits(RelateNodeFactory, NodeFactory);
extend(RelateNodeFactory.prototype, {
	createNode: function (coord) {
		return new RelateNode(coord, new EdgeEndBundleStar());
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RelateNodeFactory;
	}
});
