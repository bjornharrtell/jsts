import NodeBase from './NodeBase';
import Node from './Node';
import extend from '../../../../../extend';
import IntervalSize from '../quadtree/IntervalSize';
import Assert from '../../util/Assert';
import inherits from '../../../../../inherits';
export default function Root() {
	NodeBase.apply(this);
}
inherits(Root, NodeBase);
extend(Root.prototype, {
	insert: function (itemInterval, item) {
		var index = NodeBase.getSubnodeIndex(itemInterval, Root.origin);
		if (index === -1) {
			this.add(item);
			return null;
		}
		var node = this.subnode[index];
		if (node === null || !node.getInterval().contains(itemInterval)) {
			var largerNode = Node.createExpanded(node, itemInterval);
			this.subnode[index] = largerNode;
		}
		this.insertContained(this.subnode[index], itemInterval, item);
	},
	isSearchMatch: function (interval) {
		return true;
	},
	insertContained: function (tree, itemInterval, item) {
		Assert.isTrue(tree.getInterval().contains(itemInterval));
		var isZeroArea = IntervalSize.isZeroWidth(itemInterval.getMin(), itemInterval.getMax());
		var node = null;
		if (isZeroArea) node = tree.find(itemInterval); else node = tree.getNode(itemInterval);
		node.add(item);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Root;
	}
});
Root.origin = 0.0;
