import CGAlgorithms from '../algorithm/CGAlgorithms';
import Comparable from '../../../../java/lang/Comparable';
import Quadrant from './Quadrant';
import Assert from '../util/Assert';
export default class EdgeEnd {
	constructor(...args) {
		this.edge = null;
		this.label = null;
		this.node = null;
		this.p0 = null;
		this.p1 = null;
		this.dx = null;
		this.dy = null;
		this.quadrant = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [edge] = args;
						this.edge = edge;
					})(...args);
				case 3:
					return ((...args) => {
						let [edge, p0, p1] = args;
						overloads.call(this, edge, p0, p1, null);
					})(...args);
				case 4:
					return ((...args) => {
						let [edge, p0, p1, label] = args;
						overloads.call(this, edge);
						this.init(p0, p1);
						this.label = label;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [Comparable];
	}
	compareDirection(e) {
		if (this.dx === e.dx && this.dy === e.dy) return 0;
		if (this.quadrant > e.quadrant) return 1;
		if (this.quadrant < e.quadrant) return -1;
		return CGAlgorithms.computeOrientation(e.p0, e.p1, this.p1);
	}
	getDy() {
		return this.dy;
	}
	getCoordinate() {
		return this.p0;
	}
	setNode(node) {
		this.node = node;
	}
	print(out) {
		var angle = Math.atan2(this.dy, this.dx);
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		out.print("  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + angle + "   " + this.label);
	}
	compareTo(obj) {
		var e = obj;
		return this.compareDirection(e);
	}
	getDirectedCoordinate() {
		return this.p1;
	}
	getDx() {
		return this.dx;
	}
	getLabel() {
		return this.label;
	}
	getEdge() {
		return this.edge;
	}
	getQuadrant() {
		return this.quadrant;
	}
	getNode() {
		return this.node;
	}
	toString() {
		var angle = Math.atan2(this.dy, this.dx);
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		return "  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + angle + "   " + this.label;
	}
	computeLabel(boundaryNodeRule) {}
	init(p0, p1) {
		this.p0 = p0;
		this.p1 = p1;
		this.dx = p1.x - p0.x;
		this.dy = p1.y - p0.y;
		this.quadrant = Quadrant.quadrant(this.dx, this.dy);
		Assert.isTrue(!(this.dx === 0 && this.dy === 0), "EdgeEnd with identical endpoints found");
	}
	getClass() {
		return EdgeEnd;
	}
}

