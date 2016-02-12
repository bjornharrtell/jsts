import Location from '../geom/Location';
import EdgeEnd from './EdgeEnd';
import Position from './Position';
import TopologyException from '../geom/TopologyException';
import Label from './Label';
export default class DirectedEdge extends EdgeEnd {
	constructor(...args) {
		super();
		this._isForward = null;
		this._isInResult = false;
		this._isVisited = false;
		this.sym = null;
		this.next = null;
		this.nextMin = null;
		this.edgeRing = null;
		this.minEdgeRing = null;
		this.depth = [0, -999, -999];
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [edge, isForward] = args;
					super(edge);
					this._isForward = isForward;
					if (isForward) {
						this.init(edge.getCoordinate(0), edge.getCoordinate(1));
					} else {
						var n = edge.getNumPoints() - 1;
						this.init(edge.getCoordinate(n), edge.getCoordinate(n - 1));
					}
					this.computeDirectedLabel();
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static depthFactor(currLocation, nextLocation) {
		if (currLocation === Location.EXTERIOR && nextLocation === Location.INTERIOR) return 1; else if (currLocation === Location.INTERIOR && nextLocation === Location.EXTERIOR) return -1;
		return 0;
	}
	getNextMin() {
		return this.nextMin;
	}
	getDepth(position) {
		return this.depth[position];
	}
	setVisited(isVisited) {
		this._isVisited = isVisited;
	}
	computeDirectedLabel() {
		this.label = new Label(this.edge.getLabel());
		if (!this._isForward) this.label.flip();
	}
	getNext() {
		return this.next;
	}
	setDepth(position, depthVal) {
		if (this.depth[position] !== -999) {
			if (this.depth[position] !== depthVal) throw new TopologyException("assigned depths do not match", this.getCoordinate());
		}
		this.depth[position] = depthVal;
	}
	isInteriorAreaEdge() {
		var isInteriorAreaEdge = true;
		for (var i = 0; i < 2; i++) {
			if (!(this.label.isArea(i) && this.label.getLocation(i, Position.LEFT) === Location.INTERIOR && this.label.getLocation(i, Position.RIGHT) === Location.INTERIOR)) {
				isInteriorAreaEdge = false;
			}
		}
		return isInteriorAreaEdge;
	}
	setNextMin(nextMin) {
		this.nextMin = nextMin;
	}
	print(out) {
		super.print(out);
		out.print(" " + this.depth[Position.LEFT] + "/" + this.depth[Position.RIGHT]);
		out.print(" (" + this.getDepthDelta() + ")");
		if (this._isInResult) out.print(" inResult");
	}
	setMinEdgeRing(minEdgeRing) {
		this.minEdgeRing = minEdgeRing;
	}
	isLineEdge() {
		var isLine = this.label.isLine(0) || this.label.isLine(1);
		var isExteriorIfArea0 = !this.label.isArea(0) || this.label.allPositionsEqual(0, Location.EXTERIOR);
		var isExteriorIfArea1 = !this.label.isArea(1) || this.label.allPositionsEqual(1, Location.EXTERIOR);
		return isLine && isExteriorIfArea0 && isExteriorIfArea1;
	}
	setEdgeRing(edgeRing) {
		this.edgeRing = edgeRing;
	}
	getMinEdgeRing() {
		return this.minEdgeRing;
	}
	getDepthDelta() {
		var depthDelta = this.edge.getDepthDelta();
		if (!this._isForward) depthDelta = -depthDelta;
		return depthDelta;
	}
	setInResult(isInResult) {
		this._isInResult = isInResult;
	}
	getSym() {
		return this.sym;
	}
	isForward() {
		return this._isForward;
	}
	getEdge() {
		return this.edge;
	}
	printEdge(out) {
		this.print(out);
		out.print(" ");
		if (this._isForward) this.edge.print(out); else this.edge.printReverse(out);
	}
	setSym(de) {
		this.sym = de;
	}
	setVisitedEdge(isVisited) {
		this.setVisited(isVisited);
		this.sym.setVisited(isVisited);
	}
	setEdgeDepths(position, depth) {
		var depthDelta = this.getEdge().getDepthDelta();
		if (!this._isForward) depthDelta = -depthDelta;
		var directionFactor = 1;
		if (position === Position.LEFT) directionFactor = -1;
		var oppositePos = Position.opposite(position);
		var delta = depthDelta * directionFactor;
		var oppositeDepth = depth + delta;
		this.setDepth(position, depth);
		this.setDepth(oppositePos, oppositeDepth);
	}
	getEdgeRing() {
		return this.edgeRing;
	}
	isInResult() {
		return this._isInResult;
	}
	setNext(next) {
		this.next = next;
	}
	isVisited() {
		return this._isVisited;
	}
	getClass() {
		return DirectedEdge;
	}
}

