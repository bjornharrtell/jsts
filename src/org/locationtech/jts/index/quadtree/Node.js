import NodeBase from './NodeBase';
import extend from '../../../../../extend';
import Envelope from '../../geom/Envelope';
import Assert from '../../util/Assert';
import inherits from '../../../../../inherits';
import Key from './Key';
export default function Node() {
	NodeBase.apply(this);
	this.env = null;
	this.centrex = null;
	this.centrey = null;
	this.level = null;
	let env = arguments[0], level = arguments[1];
	this.env = env;
	this.level = level;
	this.centrex = (env.getMinX() + env.getMaxX()) / 2;
	this.centrey = (env.getMinY() + env.getMaxY()) / 2;
}
inherits(Node, NodeBase);
extend(Node.prototype, {
	find: function (searchEnv) {
		var subnodeIndex = NodeBase.getSubnodeIndex(searchEnv, this.centrex, this.centrey);
		if (subnodeIndex === -1) return this;
		if (this.subnode[subnodeIndex] !== null) {
			var node = this.subnode[subnodeIndex];
			return node.find(searchEnv);
		}
		return this;
	},
	isSearchMatch: function (searchEnv) {
		return this.env.intersects(searchEnv);
	},
	getSubnode: function (index) {
		if (this.subnode[index] === null) {
			this.subnode[index] = this.createSubnode(index);
		}
		return this.subnode[index];
	},
	getEnvelope: function () {
		return this.env;
	},
	getNode: function (searchEnv) {
		var subnodeIndex = NodeBase.getSubnodeIndex(searchEnv, this.centrex, this.centrey);
		if (subnodeIndex !== -1) {
			var node = this.getSubnode(subnodeIndex);
			return node.getNode(searchEnv);
		} else {
			return this;
		}
	},
	createSubnode: function (index) {
		var minx = 0.0;
		var maxx = 0.0;
		var miny = 0.0;
		var maxy = 0.0;
		switch (index) {
			case 0:
				minx = this.env.getMinX();
				maxx = this.centrex;
				miny = this.env.getMinY();
				maxy = this.centrey;
				break;
			case 1:
				minx = this.centrex;
				maxx = this.env.getMaxX();
				miny = this.env.getMinY();
				maxy = this.centrey;
				break;
			case 2:
				minx = this.env.getMinX();
				maxx = this.centrex;
				miny = this.centrey;
				maxy = this.env.getMaxY();
				break;
			case 3:
				minx = this.centrex;
				maxx = this.env.getMaxX();
				miny = this.centrey;
				maxy = this.env.getMaxY();
				break;
		}
		var sqEnv = new Envelope(minx, maxx, miny, maxy);
		var node = new Node(sqEnv, this.level - 1);
		return node;
	},
	insertNode: function (node) {
		Assert.isTrue(this.env === null || this.env.contains(node.env));
		var index = NodeBase.getSubnodeIndex(node.env, this.centrex, this.centrey);
		if (node.level === this.level - 1) {
			this.subnode[index] = node;
		} else {
			var childNode = this.createSubnode(index);
			childNode.insertNode(node);
			this.subnode[index] = childNode;
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Node;
	}
});
Node.createNode = function (env) {
	var key = new Key(env);
	var node = new Node(key.getEnvelope(), key.getLevel());
	return node;
};
Node.createExpanded = function (node, addEnv) {
	var expandEnv = new Envelope(addEnv);
	if (node !== null) expandEnv.expandToInclude(node.env);
	var largerNode = Node.createNode(expandEnv);
	if (node !== null) largerNode.insertNode(node);
	return largerNode;
};
