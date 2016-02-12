import NodeBase from './NodeBase';
import Node from './Node';
import IntervalSize from '../quadtree/IntervalSize';
import Assert from '../../util/Assert';
export default class Root extends NodeBase {
	constructor(...args) {
		super();
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	insert(itemInterval, item) {
		var index = Root.getSubnodeIndex(itemInterval, Root.origin);
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
	}
	isSearchMatch(interval) {
		return true;
	}
	insertContained(tree, itemInterval, item) {
		Assert.isTrue(tree.getInterval().contains(itemInterval));
		var isZeroArea = IntervalSize.isZeroWidth(itemInterval.getMin(), itemInterval.getMax());
		var node = null;
		if (isZeroArea) node = tree.find(itemInterval); else node = tree.getNode(itemInterval);
		node.add(item);
	}
	getClass() {
		return Root;
	}
}
Root.origin = 0.0;

