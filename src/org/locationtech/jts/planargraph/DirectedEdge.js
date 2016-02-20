import CGAlgorithms from '../algorithm/CGAlgorithms';
import extend from '../../../../extend';
import Comparable from '../../../../java/lang/Comparable';
import ArrayList from '../../../../java/util/ArrayList';
import Quadrant from '../geomgraph/Quadrant';
import inherits from '../../../../inherits';
import GraphComponent from './GraphComponent';
export default function DirectedEdge() {
	GraphComponent.apply(this);
	this.parentEdge = null;
	this.from = null;
	this.to = null;
	this.p0 = null;
	this.p1 = null;
	this.sym = null;
	this.edgeDirection = null;
	this.quadrant = null;
	this.angle = null;
	let from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3];
	this.from = from;
	this.to = to;
	this.edgeDirection = edgeDirection;
	this.p0 = from.getCoordinate();
	this.p1 = directionPt;
	var dx = this.p1.x - this.p0.x;
	var dy = this.p1.y - this.p0.y;
	this.quadrant = Quadrant.quadrant(dx, dy);
	this.angle = Math.atan2(dy, dx);
}
inherits(DirectedEdge, GraphComponent);
extend(DirectedEdge.prototype, {
	isRemoved: function () {
		return this.parentEdge === null;
	},
	compareDirection: function (e) {
		if (this.quadrant > e.quadrant) return 1;
		if (this.quadrant < e.quadrant) return -1;
		return CGAlgorithms.computeOrientation(e.p0, e.p1, this.p1);
	},
	getCoordinate: function () {
		return this.from.getCoordinate();
	},
	print: function (out) {
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		out.print("  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + this.angle);
	},
	getDirectionPt: function () {
		return this.p1;
	},
	getAngle: function () {
		return this.angle;
	},
	compareTo: function (obj) {
		var de = obj;
		return this.compareDirection(de);
	},
	getFromNode: function () {
		return this.from;
	},
	getSym: function () {
		return this.sym;
	},
	setEdge: function (parentEdge) {
		this.parentEdge = parentEdge;
	},
	remove: function () {
		this.sym = null;
		this.parentEdge = null;
	},
	getEdge: function () {
		return this.parentEdge;
	},
	getQuadrant: function () {
		return this.quadrant;
	},
	setSym: function (sym) {
		this.sym = sym;
	},
	getToNode: function () {
		return this.to;
	},
	getEdgeDirection: function () {
		return this.edgeDirection;
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
		edges.add(i.next().parentEdge);
	}
	return edges;
};

