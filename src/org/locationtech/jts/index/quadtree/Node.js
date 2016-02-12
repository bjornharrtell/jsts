import NodeBase from './NodeBase';
import Envelope from '../../geom/Envelope';
import Assert from '../../util/Assert';
import Key from './Key';
export default class Node extends NodeBase {
	constructor(...args) {
		super();
		this.env = null;
		this.centrex = null;
		this.centrey = null;
		this.level = null;
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [env, level] = args;
					this.env = env;
					this.level = level;
					this.centrex = (env.getMinX() + env.getMaxX()) / 2;
					this.centrey = (env.getMinY() + env.getMaxY()) / 2;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static createNode(env) {
		var key = new Key(env);
		var node = new Node(key.getEnvelope(), key.getLevel());
		return node;
	}
	static createExpanded(node, addEnv) {
		var expandEnv = new Envelope(addEnv);
		if (node !== null) expandEnv.expandToInclude(node.env);
		var largerNode = Node.createNode(expandEnv);
		if (node !== null) largerNode.insertNode(node);
		return largerNode;
	}
	find(searchEnv) {
		var subnodeIndex = Node.getSubnodeIndex(searchEnv, this.centrex, this.centrey);
		if (subnodeIndex === -1) return this;
		if (this.subnode[subnodeIndex] !== null) {
			var node = this.subnode[subnodeIndex];
			return node.find(searchEnv);
		}
		return this;
	}
	isSearchMatch(searchEnv) {
		return this.env.intersects(searchEnv);
	}
	getSubnode(index) {
		if (this.subnode[index] === null) {
			this.subnode[index] = this.createSubnode(index);
		}
		return this.subnode[index];
	}
	getEnvelope() {
		return this.env;
	}
	getNode(searchEnv) {
		var subnodeIndex = Node.getSubnodeIndex(searchEnv, this.centrex, this.centrey);
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
	}
	insertNode(node) {
		Assert.isTrue(this.env === null || this.env.contains(node.env));
		var index = Node.getSubnodeIndex(node.env, this.centrex, this.centrey);
		if (node.level === this.level - 1) {
			this.subnode[index] = node;
		} else {
			var childNode = this.createSubnode(index);
			childNode.insertNode(node);
			this.subnode[index] = childNode;
		}
	}
	getClass() {
		return Node;
	}
}

