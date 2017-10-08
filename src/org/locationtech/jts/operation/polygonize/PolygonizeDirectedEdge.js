import extend from '../../../../../extend';
import DirectedEdge from '../../planargraph/DirectedEdge';
import inherits from '../../../../../inherits';
export default function PolygonizeDirectedEdge() {
	this._edgeRing = null;
	this._next = null;
	this._label = -1;
	let from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3];
	DirectedEdge.call(this, from, to, directionPt, edgeDirection);
}
inherits(PolygonizeDirectedEdge, DirectedEdge);
extend(PolygonizeDirectedEdge.prototype, {
	getNext: function () {
		return this._next;
	},
	isInRing: function () {
		return this._edgeRing !== null;
	},
	setRing: function (edgeRing) {
		this._edgeRing = edgeRing;
	},
	setLabel: function (label) {
		this._label = label;
	},
	getLabel: function () {
		return this._label;
	},
	setNext: function (next) {
		this._next = next;
	},
	getRing: function () {
		return this._edgeRing;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PolygonizeDirectedEdge;
	}
});
