import Location from '../geom/Location';
import EdgeEnd from './EdgeEnd';
import Position from './Position';
import TopologyException from '../geom/TopologyException';
import extend from '../../../../extend';
import Label from './Label';
import inherits from '../../../../inherits';
export default function DirectedEdge() {
	this._isForward = null;
	this._isInResult = false;
	this._isVisited = false;
	this.sym = null;
	this.next = null;
	this.nextMin = null;
	this.edgeRing = null;
	this.minEdgeRing = null;
	this.depth = [0, -999, -999];
	let edge = arguments[0], isForward = arguments[1];
	EdgeEnd.call(this, edge);
	this._isForward = isForward;
	if (isForward) {
		this.init(edge.getCoordinate(0), edge.getCoordinate(1));
	} else {
		var n = edge.getNumPoints() - 1;
		this.init(edge.getCoordinate(n), edge.getCoordinate(n - 1));
	}
	this.computeDirectedLabel();
}
inherits(DirectedEdge, EdgeEnd);
extend(DirectedEdge.prototype, {
	getNextMin: function () {
		return this.nextMin;
	},
	getDepth: function (position) {
		return this.depth[position];
	},
	setVisited: function (isVisited) {
		this._isVisited = isVisited;
	},
	computeDirectedLabel: function () {
		this.label = new Label(this.edge.getLabel());
		if (!this._isForward) this.label.flip();
	},
	getNext: function () {
		return this.next;
	},
	setDepth: function (position, depthVal) {
		if (this.depth[position] !== -999) {
			if (this.depth[position] !== depthVal) throw new TopologyException("assigned depths do not match", this.getCoordinate());
		}
		this.depth[position] = depthVal;
	},
	isInteriorAreaEdge: function () {
		var isInteriorAreaEdge = true;
		for (var i = 0; i < 2; i++) {
			if (!(this.label.isArea(i) && this.label.getLocation(i, Position.LEFT) === Location.INTERIOR && this.label.getLocation(i, Position.RIGHT) === Location.INTERIOR)) {
				isInteriorAreaEdge = false;
			}
		}
		return isInteriorAreaEdge;
	},
	setNextMin: function (nextMin) {
		this.nextMin = nextMin;
	},
	print: function (out) {
		EdgeEnd.prototype.print.call(this, out);
		out.print(" " + this.depth[Position.LEFT] + "/" + this.depth[Position.RIGHT]);
		out.print(" (" + this.getDepthDelta() + ")");
		if (this._isInResult) out.print(" inResult");
	},
	setMinEdgeRing: function (minEdgeRing) {
		this.minEdgeRing = minEdgeRing;
	},
	isLineEdge: function () {
		var isLine = this.label.isLine(0) || this.label.isLine(1);
		var isExteriorIfArea0 = !this.label.isArea(0) || this.label.allPositionsEqual(0, Location.EXTERIOR);
		var isExteriorIfArea1 = !this.label.isArea(1) || this.label.allPositionsEqual(1, Location.EXTERIOR);
		return isLine && isExteriorIfArea0 && isExteriorIfArea1;
	},
	setEdgeRing: function (edgeRing) {
		this.edgeRing = edgeRing;
	},
	getMinEdgeRing: function () {
		return this.minEdgeRing;
	},
	getDepthDelta: function () {
		var depthDelta = this.edge.getDepthDelta();
		if (!this._isForward) depthDelta = -depthDelta;
		return depthDelta;
	},
	setInResult: function (isInResult) {
		this._isInResult = isInResult;
	},
	getSym: function () {
		return this.sym;
	},
	isForward: function () {
		return this._isForward;
	},
	getEdge: function () {
		return this.edge;
	},
	printEdge: function (out) {
		this.print(out);
		out.print(" ");
		if (this._isForward) this.edge.print(out); else this.edge.printReverse(out);
	},
	setSym: function (de) {
		this.sym = de;
	},
	setVisitedEdge: function (isVisited) {
		this.setVisited(isVisited);
		this.sym.setVisited(isVisited);
	},
	setEdgeDepths: function (position, depth) {
		var depthDelta = this.getEdge().getDepthDelta();
		if (!this._isForward) depthDelta = -depthDelta;
		var directionFactor = 1;
		if (position === Position.LEFT) directionFactor = -1;
		var oppositePos = Position.opposite(position);
		var delta = depthDelta * directionFactor;
		var oppositeDepth = depth + delta;
		this.setDepth(position, depth);
		this.setDepth(oppositePos, oppositeDepth);
	},
	getEdgeRing: function () {
		return this.edgeRing;
	},
	isInResult: function () {
		return this._isInResult;
	},
	setNext: function (next) {
		this.next = next;
	},
	isVisited: function () {
		return this._isVisited;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DirectedEdge;
	}
});
DirectedEdge.depthFactor = function (currLocation, nextLocation) {
	if (currLocation === Location.EXTERIOR && nextLocation === Location.INTERIOR) return 1; else if (currLocation === Location.INTERIOR && nextLocation === Location.EXTERIOR) return -1;
	return 0;
};
