import extend from '../../../../../extend';
import DirectedEdge from '../../planargraph/DirectedEdge';
import inherits from '../../../../../inherits';
export default function PolygonizeDirectedEdge() {
	DirectedEdge.apply(this);
	this.edgeRing = null;
	this.next = null;
	this.label = -1;
	if (arguments.length === 4) {
		let from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3];
		DirectedEdge.call(this, from, to, directionPt, edgeDirection);
	}
}
inherits(PolygonizeDirectedEdge, DirectedEdge);
extend(PolygonizeDirectedEdge.prototype, {
	getNext: function () {
		return this.next;
	},
	isInRing: function () {
		return this.edgeRing !== null;
	},
	setRing: function (edgeRing) {
		this.edgeRing = edgeRing;
	},
	setLabel: function (label) {
		this.label = label;
	},
	getLabel: function () {
		return this.label;
	},
	setNext: function (next) {
		this.next = next;
	},
	getRing: function () {
		return this.edgeRing;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PolygonizeDirectedEdge;
	}
});

