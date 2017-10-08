import DirectedEdgeStar from './DirectedEdgeStar';
import HashSet from '../../../../java/util/HashSet';
import extend from '../../../../extend';
import DirectedEdge from './DirectedEdge';
import inherits from '../../../../inherits';
import GraphComponent from './GraphComponent';
export default function Node() {
	GraphComponent.apply(this);
	this._pt = null;
	this._deStar = null;
	if (arguments.length === 1) {
		let pt = arguments[0];
		Node.call(this, pt, new DirectedEdgeStar());
	} else if (arguments.length === 2) {
		let pt = arguments[0], deStar = arguments[1];
		this._pt = pt;
		this._deStar = deStar;
	}
}
inherits(Node, GraphComponent);
extend(Node.prototype, {
	isRemoved: function () {
		return this._pt === null;
	},
	addOutEdge: function (de) {
		this._deStar.add(de);
	},
	getCoordinate: function () {
		return this._pt;
	},
	getOutEdges: function () {
		return this._deStar;
	},
	remove: function () {
		if (arguments.length === 0) {
			this._pt = null;
		} else if (arguments.length === 1) {
			let de = arguments[0];
			this._deStar.remove(de);
		}
	},
	getIndex: function (edge) {
		return this._deStar.getIndex(edge);
	},
	getDegree: function () {
		return this._deStar.getDegree();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Node;
	}
});
Node.getEdgesBetween = function (node0, node1) {
	var edges0 = DirectedEdge.toEdges(node0.getOutEdges().getEdges());
	var commonEdges = new HashSet(edges0);
	var edges1 = DirectedEdge.toEdges(node1.getOutEdges().getEdges());
	commonEdges.retainAll(edges1);
	return commonEdges;
};
