import Location from '../geom/Location';
import EdgeEnd from './EdgeEnd';
import Position from './Position';
import TopologyException from '../geom/TopologyException';
import extend from '../../../../extend';
import Label from './Label';
import inherits from '../../../../inherits';
export default function DirectedEdge() {
	this._isForward = null;
	this.__isInResult = false;
	this.__isVisited = false;
	this._sym = null;
	this._next = null;
	this._nextMin = null;
	this._edgeRing = null;
	this._minEdgeRing = null;
	this._depth = [0, -999, -999];
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
		return this._nextMin;
	},
	getDepth: function (position) {
		return this._depth[position];
	},
	setVisited: function (isVisited) {
		this.__isVisited = isVisited;
	},
	computeDirectedLabel: function () {
		this.label = new Label(this.edge.getLabel());
		if (!this._isForward) this.label.flip();
	},
	getNext: function () {
		return this._next;
	},
	setDepth: function (position, depthVal) {
		if (this._depth[position] !== -999) {
			if (this._depth[position] !== depthVal) throw new TopologyException("assigned depths do not match", this.getCoordinate());
		}
		this._depth[position] = depthVal;
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
		this._nextMin = nextMin;
	},
	print: function (out) {
		EdgeEnd.prototype.print.call(this, out);
		out.print(" " + this._depth[Position.LEFT] + "/" + this._depth[Position.RIGHT]);
		out.print(" (" + this.getDepthDelta() + ")");
		if (this.__isInResult) out.print(" inResult");
	},
	setMinEdgeRing: function (minEdgeRing) {
		this._minEdgeRing = minEdgeRing;
	},
	isLineEdge: function () {
		var isLine = this.label.isLine(0) || this.label.isLine(1);
		var isExteriorIfArea0 = !this.label.isArea(0) || this.label.allPositionsEqual(0, Location.EXTERIOR);
		var isExteriorIfArea1 = !this.label.isArea(1) || this.label.allPositionsEqual(1, Location.EXTERIOR);
		return isLine && isExteriorIfArea0 && isExteriorIfArea1;
	},
	setEdgeRing: function (edgeRing) {
		this._edgeRing = edgeRing;
	},
	getMinEdgeRing: function () {
		return this._minEdgeRing;
	},
	getDepthDelta: function () {
		var depthDelta = this.edge.getDepthDelta();
		if (!this._isForward) depthDelta = -depthDelta;
		return depthDelta;
	},
	setInResult: function (isInResult) {
		this.__isInResult = isInResult;
	},
	getSym: function () {
		return this._sym;
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
		this._sym = de;
	},
	setVisitedEdge: function (isVisited) {
		this.setVisited(isVisited);
		this._sym.setVisited(isVisited);
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
		return this._edgeRing;
	},
	isInResult: function () {
		return this.__isInResult;
	},
	setNext: function (next) {
		this._next = next;
	},
	isVisited: function () {
		return this.__isVisited;
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
