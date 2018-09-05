import DirectedEdgeStar from './DirectedEdgeStar';
import HashSet from '../../../../java/util/HashSet';
import DirectedEdge from './DirectedEdge';
import GraphComponent from './GraphComponent';
export default class Node extends GraphComponent {
	constructor() {
		super();
		Node.constructor_.apply(this, arguments);
	}
	static getEdgesBetween(node0, node1) {
		var edges0 = DirectedEdge.toEdges(node0.getOutEdges().getEdges());
		var commonEdges = new HashSet(edges0);
		var edges1 = DirectedEdge.toEdges(node1.getOutEdges().getEdges());
		commonEdges.retainAll(edges1);
		return commonEdges;
	}
	isRemoved() {
		return this._pt === null;
	}
	addOutEdge(de) {
		this._deStar.add(de);
	}
	getCoordinate() {
		return this._pt;
	}
	getOutEdges() {
		return this._deStar;
	}
	remove() {
		if (arguments.length === 0) {
			this._pt = null;
		} else if (arguments.length === 1) {
			let de = arguments[0];
			this._deStar.remove(de);
		}
	}
	getIndex(edge) {
		return this._deStar.getIndex(edge);
	}
	getDegree() {
		return this._deStar.getDegree();
	}
	getClass() {
		return Node;
	}
	get interfaces_() {
		return [];
	}
}
Node.constructor_ = function () {
	this._pt = null;
	this._deStar = null;
	if (arguments.length === 1) {
		let pt = arguments[0];
		Node.constructor_.call(this, pt, new DirectedEdgeStar());
	} else if (arguments.length === 2) {
		let pt = arguments[0], deStar = arguments[1];
		this._pt = pt;
		this._deStar = deStar;
	}
};
