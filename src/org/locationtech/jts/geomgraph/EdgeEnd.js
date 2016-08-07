import CGAlgorithms from '../algorithm/CGAlgorithms';
import extend from '../../../../extend';
import Comparable from '../../../../java/lang/Comparable';
import Quadrant from './Quadrant';
import Assert from '../util/Assert';
export default function EdgeEnd() {
	this.edge = null;
	this.label = null;
	this.node = null;
	this.p0 = null;
	this.p1 = null;
	this.dx = null;
	this.dy = null;
	this.quadrant = null;
	if (arguments.length === 1) {
		let edge = arguments[0];
		this.edge = edge;
	} else if (arguments.length === 3) {
		let edge = arguments[0], p0 = arguments[1], p1 = arguments[2];
		EdgeEnd.call(this, edge, p0, p1, null);
	} else if (arguments.length === 4) {
		let edge = arguments[0], p0 = arguments[1], p1 = arguments[2], label = arguments[3];
		EdgeEnd.call(this, edge);
		this.init(p0, p1);
		this.label = label;
	}
}
extend(EdgeEnd.prototype, {
	compareDirection: function (e) {
		if (this.dx === e.dx && this.dy === e.dy) return 0;
		if (this.quadrant > e.quadrant) return 1;
		if (this.quadrant < e.quadrant) return -1;
		return CGAlgorithms.computeOrientation(e.p0, e.p1, this.p1);
	},
	getDy: function () {
		return this.dy;
	},
	getCoordinate: function () {
		return this.p0;
	},
	setNode: function (node) {
		this.node = node;
	},
	print: function (out) {
		var angle = Math.atan2(this.dy, this.dx);
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		out.print("  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + angle + "   " + this.label);
	},
	compareTo: function (obj) {
		var e = obj;
		return this.compareDirection(e);
	},
	getDirectedCoordinate: function () {
		return this.p1;
	},
	getDx: function () {
		return this.dx;
	},
	getLabel: function () {
		return this.label;
	},
	getEdge: function () {
		return this.edge;
	},
	getQuadrant: function () {
		return this.quadrant;
	},
	getNode: function () {
		return this.node;
	},
	toString: function () {
		var angle = Math.atan2(this.dy, this.dx);
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		return "  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + angle + "   " + this.label;
	},
	computeLabel: function (boundaryNodeRule) {},
	init: function (p0, p1) {
		this.p0 = p0;
		this.p1 = p1;
		this.dx = p1.x - p0.x;
		this.dy = p1.y - p0.y;
		this.quadrant = Quadrant.quadrant(this.dx, this.dy);
		Assert.isTrue(!(this.dx === 0 && this.dy === 0), "EdgeEnd with identical endpoints found");
	},
	interfaces_: function () {
		return [Comparable];
	},
	getClass: function () {
		return EdgeEnd;
	}
});
