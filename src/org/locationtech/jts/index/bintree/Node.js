import NodeBase from './NodeBase';
import Interval from './Interval';
import Assert from '../../util/Assert';
import Key from './Key';
export default class Node extends NodeBase {
	constructor() {
		super();
		Node.constructor_.apply(this, arguments);
	}
	static createNode(itemInterval) {
		var key = new Key(itemInterval);
		var node = new Node(key.getInterval(), key.getLevel());
		return node;
	}
	static createExpanded(node, addInterval) {
		var expandInt = new Interval(addInterval);
		if (node !== null) expandInt.expandToInclude(node._interval);
		var largerNode = Node.createNode(expandInt);
		if (node !== null) largerNode.insert(node);
		return largerNode;
	}
	getInterval() {
		return this._interval;
	}
	find(searchInterval) {
		var subnodeIndex = NodeBase.getSubnodeIndex(searchInterval, this._centre);
		if (subnodeIndex === -1) return this;
		if (this._subnode[subnodeIndex] !== null) {
			var node = this._subnode[subnodeIndex];
			return node.find(searchInterval);
		}
		return this;
	}
	insert(node) {
		Assert.isTrue(this._interval === null || this._interval.contains(node._interval));
		var index = NodeBase.getSubnodeIndex(node._interval, this._centre);
		if (node._level === this._level - 1) {
			this._subnode[index] = node;
		} else {
			var childNode = this.createSubnode(index);
			childNode.insert(node);
			this._subnode[index] = childNode;
		}
	}
	isSearchMatch(itemInterval) {
		return itemInterval.overlaps(this._interval);
	}
	getSubnode(index) {
		if (this._subnode[index] === null) {
			this._subnode[index] = this.createSubnode(index);
		}
		return this._subnode[index];
	}
	getNode(searchInterval) {
		var subnodeIndex = NodeBase.getSubnodeIndex(searchInterval, this._centre);
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
				min = this._interval.getMin();
				max = this._centre;
				break;
			case 1:
				min = this._centre;
				max = this._interval.getMax();
				break;
		}
		var subInt = new Interval(min, max);
		var node = new Node(subInt, this._level - 1);
		return node;
	}
	getClass() {
		return Node;
	}
	get interfaces_() {
		return [];
	}
}
Node.constructor_ = function () {
	this._interval = null;
	this._centre = null;
	this._level = null;
	let interval = arguments[0], level = arguments[1];
	this._interval = interval;
	this._level = level;
	this._centre = (interval.getMin() + interval.getMax()) / 2;
};
