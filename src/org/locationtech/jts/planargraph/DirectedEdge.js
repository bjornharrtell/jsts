import CGAlgorithms from '../algorithm/CGAlgorithms';
import Comparable from '../../../../java/lang/Comparable';
import ArrayList from '../../../../java/util/ArrayList';
import Quadrant from '../geomgraph/Quadrant';
import GraphComponent from './GraphComponent';
export default class DirectedEdge extends GraphComponent {
	constructor(...args) {
		super();
		this.parentEdge = null;
		this.from = null;
		this.to = null;
		this.p0 = null;
		this.p1 = null;
		this.sym = null;
		this.edgeDirection = null;
		this.quadrant = null;
		this.angle = null;
		if (args.length === 4) {
			let [from, to, directionPt, edgeDirection] = args;
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
	}
	get interfaces_() {
		return [Comparable];
	}
	static toEdges(dirEdges) {
		var edges = new ArrayList();
		for (var i = dirEdges.iterator(); i.hasNext(); ) {
			edges.add(i.next().parentEdge);
		}
		return edges;
	}
	isRemoved() {
		return this.parentEdge === null;
	}
	compareDirection(e) {
		if (this.quadrant > e.quadrant) return 1;
		if (this.quadrant < e.quadrant) return -1;
		return CGAlgorithms.computeOrientation(e.p0, e.p1, this.p1);
	}
	getCoordinate() {
		return this.from.getCoordinate();
	}
	print(out) {
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		out.print("  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + this.angle);
	}
	getDirectionPt() {
		return this.p1;
	}
	getAngle() {
		return this.angle;
	}
	compareTo(obj) {
		var de = obj;
		return this.compareDirection(de);
	}
	getFromNode() {
		return this.from;
	}
	getSym() {
		return this.sym;
	}
	setEdge(parentEdge) {
		this.parentEdge = parentEdge;
	}
	remove() {
		this.sym = null;
		this.parentEdge = null;
	}
	getEdge() {
		return this.parentEdge;
	}
	getQuadrant() {
		return this.quadrant;
	}
	setSym(sym) {
		this.sym = sym;
	}
	getToNode() {
		return this.to;
	}
	getEdgeDirection() {
		return this.edgeDirection;
	}
	getClass() {
		return DirectedEdge;
	}
}

