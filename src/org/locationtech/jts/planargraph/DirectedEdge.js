import CGAlgorithms from '../algorithm/CGAlgorithms';
import extend from '../../../../extend';
import Comparable from '../../../../java/lang/Comparable';
import ArrayList from '../../../../java/util/ArrayList';
import Quadrant from '../geomgraph/Quadrant';
import inherits from '../../../../inherits';
import GraphComponent from './GraphComponent';
export default function DirectedEdge() {
	GraphComponent.apply(this);
	this._parentEdge = null;
	this._from = null;
	this._to = null;
	this._p0 = null;
	this._p1 = null;
	this._sym = null;
	this._edgeDirection = null;
	this._quadrant = null;
	this._angle = null;
	let from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3];
	this._from = from;
	this._to = to;
	this._edgeDirection = edgeDirection;
	this._p0 = from.getCoordinate();
	this._p1 = directionPt;
	var dx = this._p1.x - this._p0.x;
	var dy = this._p1.y - this._p0.y;
	this._quadrant = Quadrant.quadrant(dx, dy);
	this._angle = Math.atan2(dy, dx);
}
inherits(DirectedEdge, GraphComponent);
extend(DirectedEdge.prototype, {
	isRemoved: function () {
		return this._parentEdge === null;
	},
	compareDirection: function (e) {
		if (this._quadrant > e._quadrant) return 1;
		if (this._quadrant < e._quadrant) return -1;
		return CGAlgorithms.computeOrientation(e._p0, e._p1, this._p1);
	},
	getCoordinate: function () {
		return this._from.getCoordinate();
	},
	print: function (out) {
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		out.print("  " + name + ": " + this._p0 + " - " + this._p1 + " " + this._quadrant + ":" + this._angle);
	},
	getDirectionPt: function () {
		return this._p1;
	},
	getAngle: function () {
		return this._angle;
	},
	compareTo: function (obj) {
		var de = obj;
		return this.compareDirection(de);
	},
	getFromNode: function () {
		return this._from;
	},
	getSym: function () {
		return this._sym;
	},
	setEdge: function (parentEdge) {
		this._parentEdge = parentEdge;
	},
	remove: function () {
		this._sym = null;
		this._parentEdge = null;
	},
	getEdge: function () {
		return this._parentEdge;
	},
	getQuadrant: function () {
		return this._quadrant;
	},
	setSym: function (sym) {
		this._sym = sym;
	},
	getToNode: function () {
		return this._to;
	},
	getEdgeDirection: function () {
		return this._edgeDirection;
	},
	interfaces_: function () {
		return [Comparable];
	},
	getClass: function () {
		return DirectedEdge;
	}
});
DirectedEdge.toEdges = function (dirEdges) {
	var edges = new ArrayList();
	for (var i = dirEdges.iterator(); i.hasNext(); ) {
		edges.add(i.next()._parentEdge);
	}
	return edges;
};
