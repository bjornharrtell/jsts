import Node from './Node';
import extend from '../../../../extend';
import inherits from '../../../../inherits';
import GraphComponent from './GraphComponent';
export default function Edge() {
	GraphComponent.apply(this);
	this._dirEdge = null;
	if (arguments.length === 0) {} else if (arguments.length === 2) {
		let de0 = arguments[0], de1 = arguments[1];
		this.setDirectedEdges(de0, de1);
	}
}
inherits(Edge, GraphComponent);
extend(Edge.prototype, {
	isRemoved: function () {
		return this._dirEdge === null;
	},
	setDirectedEdges: function (de0, de1) {
		this._dirEdge = [de0, de1];
		de0.setEdge(this);
		de1.setEdge(this);
		de0.setSym(de1);
		de1.setSym(de0);
		de0.getFromNode().addOutEdge(de0);
		de1.getFromNode().addOutEdge(de1);
	},
	getDirEdge: function () {
		if (Number.isInteger(arguments[0])) {
			let i = arguments[0];
			return this._dirEdge[i];
		} else if (arguments[0] instanceof Node) {
			let fromNode = arguments[0];
			if (this._dirEdge[0].getFromNode() === fromNode) return this._dirEdge[0];
			if (this._dirEdge[1].getFromNode() === fromNode) return this._dirEdge[1];
			return null;
		}
	},
	remove: function () {
		this._dirEdge = null;
	},
	getOppositeNode: function (node) {
		if (this._dirEdge[0].getFromNode() === node) return this._dirEdge[0].getToNode();
		if (this._dirEdge[1].getFromNode() === node) return this._dirEdge[1].getToNode();
		return null;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Edge;
	}
});
