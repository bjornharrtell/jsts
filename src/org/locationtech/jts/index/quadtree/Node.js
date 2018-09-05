import NodeBase from './NodeBase';
import Envelope from '../../geom/Envelope';
import Assert from '../../util/Assert';
import Key from './Key';
export default class Node extends NodeBase {
	constructor() {
		super();
		Node.constructor_.apply(this, arguments);
	}
	static createNode(env) {
		var key = new Key(env);
		var node = new Node(key.getEnvelope(), key.getLevel());
		return node;
	}
	static createExpanded(node, addEnv) {
		var expandEnv = new Envelope(addEnv);
		if (node !== null) expandEnv.expandToInclude(node._env);
		var largerNode = Node.createNode(expandEnv);
		if (node !== null) largerNode.insertNode(node);
		return largerNode;
	}
	find(searchEnv) {
		var subnodeIndex = NodeBase.getSubnodeIndex(searchEnv, this._centrex, this._centrey);
		if (subnodeIndex === -1) return this;
		if (this._subnode[subnodeIndex] !== null) {
			var node = this._subnode[subnodeIndex];
			return node.find(searchEnv);
		}
		return this;
	}
	isSearchMatch(searchEnv) {
		if (searchEnv === null) return false;
		return this._env.intersects(searchEnv);
	}
	getSubnode(index) {
		if (this._subnode[index] === null) {
			this._subnode[index] = this.createSubnode(index);
		}
		return this._subnode[index];
	}
	getEnvelope() {
		return this._env;
	}
	getNode(searchEnv) {
		var subnodeIndex = NodeBase.getSubnodeIndex(searchEnv, this._centrex, this._centrey);
		if (subnodeIndex !== -1) {
			var node = this.getSubnode(subnodeIndex);
			return node.getNode(searchEnv);
		} else {
			return this;
		}
	}
	createSubnode(index) {
		var minx = 0.0;
		var maxx = 0.0;
		var miny = 0.0;
		var maxy = 0.0;
		switch (index) {
			case 0:
				minx = this._env.getMinX();
				maxx = this._centrex;
				miny = this._env.getMinY();
				maxy = this._centrey;
				break;
			case 1:
				minx = this._centrex;
				maxx = this._env.getMaxX();
				miny = this._env.getMinY();
				maxy = this._centrey;
				break;
			case 2:
				minx = this._env.getMinX();
				maxx = this._centrex;
				miny = this._centrey;
				maxy = this._env.getMaxY();
				break;
			case 3:
				minx = this._centrex;
				maxx = this._env.getMaxX();
				miny = this._centrey;
				maxy = this._env.getMaxY();
				break;
		}
		var sqEnv = new Envelope(minx, maxx, miny, maxy);
		var node = new Node(sqEnv, this._level - 1);
		return node;
	}
	insertNode(node) {
		Assert.isTrue(this._env === null || this._env.contains(node._env));
		var index = NodeBase.getSubnodeIndex(node._env, this._centrex, this._centrey);
		if (node._level === this._level - 1) {
			this._subnode[index] = node;
		} else {
			var childNode = this.createSubnode(index);
			childNode.insertNode(node);
			this._subnode[index] = childNode;
		}
	}
	getClass() {
		return Node;
	}
	get interfaces_() {
		return [];
	}
}
Node.constructor_ = function () {
	this._env = null;
	this._centrex = null;
	this._centrey = null;
	this._level = null;
	let env = arguments[0], level = arguments[1];
	this._env = env;
	this._level = level;
	this._centrex = (env.getMinX() + env.getMaxX()) / 2;
	this._centrey = (env.getMinY() + env.getMaxY()) / 2;
};
