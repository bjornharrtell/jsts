import Coordinate from '../../geom/Coordinate';
import NodeBase from './NodeBase';
import Node from './Node';
import extend from '../../../../../extend';
import IntervalSize from './IntervalSize';
import Assert from '../../util/Assert';
import inherits from '../../../../../inherits';
export default function Root() {
	NodeBase.apply(this);
}
inherits(Root, NodeBase);
extend(Root.prototype, {
	insert: function (itemEnv, item) {
		var index = NodeBase.getSubnodeIndex(itemEnv, Root.origin.x, Root.origin.y);
		if (index === -1) {
			this.add(item);
			return null;
		}
		var node = this.subnode[index];
		if (node === null || !node.getEnvelope().contains(itemEnv)) {
			var largerNode = Node.createExpanded(node, itemEnv);
			this.subnode[index] = largerNode;
		}
		this.insertContained(this.subnode[index], itemEnv, item);
	},
	isSearchMatch: function (searchEnv) {
		return true;
	},
	insertContained: function (tree, itemEnv, item) {
		Assert.isTrue(tree.getEnvelope().contains(itemEnv));
		var isZeroX = IntervalSize.isZeroWidth(itemEnv.getMinX(), itemEnv.getMaxX());
		var isZeroY = IntervalSize.isZeroWidth(itemEnv.getMinY(), itemEnv.getMaxY());
		var node = null;
		if (isZeroX || isZeroY) node = tree.find(itemEnv); else node = tree.getNode(itemEnv);
		node.add(item);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Root;
	}
});
Root.origin = new Coordinate(0.0, 0.0);

