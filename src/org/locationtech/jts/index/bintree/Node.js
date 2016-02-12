import NodeBase from './NodeBase';
import Interval from './Interval';
import Assert from '../../util/Assert';
import Key from './Key';
export default class Node extends NodeBase {
	constructor(...args) {
		super();
		this.interval = null;
		this.centre = null;
		this.level = null;
		switch (args.length) {
			case 2:
				{
					let [interval, level] = args;
					this.interval = interval;
					this.level = level;
					this.centre = (interval.getMin() + interval.getMax()) / 2;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	static createNode(itemInterval) {
		var key = new Key(itemInterval);
		var node = new Node(key.getInterval(), key.getLevel());
		return node;
	}
	static createExpanded(node, addInterval) {
		var expandInt = new Interval(addInterval);
		if (node !== null) expandInt.expandToInclude(node.interval);
		var largerNode = Node.createNode(expandInt);
		if (node !== null) largerNode.insert(node);
		return largerNode;
	}
	getInterval() {
		return this.interval;
	}
	find(searchInterval) {
		var subnodeIndex = Node.getSubnodeIndex(searchInterval, this.centre);
		if (subnodeIndex === -1) return this;
		if (this.subnode[subnodeIndex] !== null) {
			var node = this.subnode[subnodeIndex];
			return node.find(searchInterval);
		}
		return this;
	}
	insert(node) {
		Assert.isTrue(this.interval === null || this.interval.contains(node.interval));
		var index = Node.getSubnodeIndex(node.interval, this.centre);
		if (node.level === this.level - 1) {
			this.subnode[index] = node;
		} else {
			var childNode = this.createSubnode(index);
			childNode.insert(node);
			this.subnode[index] = childNode;
		}
	}
	isSearchMatch(itemInterval) {
		return itemInterval.overlaps(this.interval);
	}
	getSubnode(index) {
		if (this.subnode[index] === null) {
			this.subnode[index] = this.createSubnode(index);
		}
		return this.subnode[index];
	}
	getNode(searchInterval) {
		var subnodeIndex = Node.getSubnodeIndex(searchInterval, this.centre);
		if (subnodeIndex !== -1) {
			var node = this.getSubnode(subnodeIndex);
			return node.getNode(searchInterval);
		} else {
			return this;
		}
	}
	createSubnode(index) {
		var min = 0.0;
		var max = 0.0;
		switch (index) {
			case 0:
				min = this.interval.getMin();
				max = this.centre;
				break;
			case 1:
				min = this.centre;
				max = this.interval.getMax();
				break;
		}
		var subInt = new Interval(min, max);
		var node = new Node(subInt, this.level - 1);
		return node;
	}
	getClass() {
		return Node;
	}
}

