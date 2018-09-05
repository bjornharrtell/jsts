import Node from './Node';
import GraphComponent from './GraphComponent';
export default class Edge extends GraphComponent {
	constructor() {
		super();
		Edge.constructor_.apply(this, arguments);
	}
	isRemoved() {
		return this._dirEdge === null;
	}
	setDirectedEdges(de0, de1) {
		this._dirEdge = [de0, de1];
		de0.setEdge(this);
		de1.setEdge(this);
		de0.setSym(de1);
		de1.setSym(de0);
		de0.getFromNode().addOutEdge(de0);
		de1.getFromNode().addOutEdge(de1);
	}
	getDirEdge() {
		if (Number.isInteger(arguments[0])) {
			let i = arguments[0];
			return this._dirEdge[i];
		} else if (arguments[0] instanceof Node) {
			let fromNode = arguments[0];
			if (this._dirEdge[0].getFromNode() === fromNode) return this._dirEdge[0];
			if (this._dirEdge[1].getFromNode() === fromNode) return this._dirEdge[1];
			return null;
		}
	}
	remove() {
		this._dirEdge = null;
	}
	getOppositeNode(node) {
		if (this._dirEdge[0].getFromNode() === node) return this._dirEdge[0].getToNode();
		if (this._dirEdge[1].getFromNode() === node) return this._dirEdge[1].getToNode();
		return null;
	}
	getClass() {
		return Edge;
	}
	get interfaces_() {
		return [];
	}
}
Edge.constructor_ = function () {
	this._dirEdge = null;
	if (arguments.length === 0) {} else if (arguments.length === 2) {
		let de0 = arguments[0], de1 = arguments[1];
		this.setDirectedEdges(de0, de1);
	}
};
