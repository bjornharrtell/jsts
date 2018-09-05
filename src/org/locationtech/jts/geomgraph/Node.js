import Location from '../geom/Location';
import Label from './Label';
import GraphComponent from './GraphComponent';
export default class Node extends GraphComponent {
	constructor() {
		super();
		Node.constructor_.apply(this, arguments);
	}
	isIncidentEdgeInResult() {
		for (var it = this.getEdges().getEdges().iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.getEdge().isInResult()) return true;
		}
		return false;
	}
	isIsolated() {
		return this._label.getGeometryCount() === 1;
	}
	getCoordinate() {
		return this._coord;
	}
	print(out) {
		out.println("node " + this._coord + " lbl: " + this._label);
	}
	computeIM(im) {}
	computeMergedLocation(label2, eltIndex) {
		var loc = Location.NONE;
		loc = this._label.getLocation(eltIndex);
		if (!label2.isNull(eltIndex)) {
			var nLoc = label2.getLocation(eltIndex);
			if (loc !== Location.BOUNDARY) loc = nLoc;
		}
		return loc;
	}
	setLabel() {
		if (arguments.length === 2 && (Number.isInteger(arguments[1]) && Number.isInteger(arguments[0]))) {
			let argIndex = arguments[0], onLocation = arguments[1];
			if (this._label === null) {
				this._label = new Label(argIndex, onLocation);
			} else this._label.setLocation(argIndex, onLocation);
		} else return super.setLabel.apply(this, arguments);
	}
	getEdges() {
		return this._edges;
	}
	mergeLabel() {
		if (arguments[0] instanceof Node) {
			let n = arguments[0];
			this.mergeLabel(n._label);
		} else if (arguments[0] instanceof Label) {
			let label2 = arguments[0];
			for (var i = 0; i < 2; i++) {
				var loc = this.computeMergedLocation(label2, i);
				var thisLoc = this._label.getLocation(i);
				if (thisLoc === Location.NONE) this._label.setLocation(i, loc);
			}
		}
	}
	add(e) {
		this._edges.insert(e);
		e.setNode(this);
	}
	setLabelBoundary(argIndex) {
		if (this._label === null) return null;
		var loc = Location.NONE;
		if (this._label !== null) loc = this._label.getLocation(argIndex);
		var newLoc = null;
		switch (loc) {
			case Location.BOUNDARY:
				newLoc = Location.INTERIOR;
				break;
			case Location.INTERIOR:
				newLoc = Location.BOUNDARY;
				break;
			default:
				newLoc = Location.BOUNDARY;
				break;
		}
		this._label.setLocation(argIndex, newLoc);
	}
	getClass() {
		return Node;
	}
	get interfaces_() {
		return [];
	}
}
Node.constructor_ = function () {
	this._coord = null;
	this._edges = null;
	let coord = arguments[0], edges = arguments[1];
	this._coord = coord;
	this._edges = edges;
	this._label = new Label(0, Location.NONE);
};
