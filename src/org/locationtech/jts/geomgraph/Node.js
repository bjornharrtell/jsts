import Location from '../geom/Location';
import extend from '../../../../extend';
import Label from './Label';
import inherits from '../../../../inherits';
import GraphComponent from './GraphComponent';
export default function Node() {
	GraphComponent.apply(this);
	this.coord = null;
	this.edges = null;
	let coord = arguments[0], edges = arguments[1];
	this.coord = coord;
	this.edges = edges;
	this.label = new Label(0, Location.NONE);
}
inherits(Node, GraphComponent);
extend(Node.prototype, {
	isIncidentEdgeInResult: function () {
		for (var it = this.getEdges().getEdges().iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.getEdge().isInResult()) return true;
		}
		return false;
	},
	isIsolated: function () {
		return this.label.getGeometryCount() === 1;
	},
	getCoordinate: function () {
		return this.coord;
	},
	print: function (out) {
		out.println("node " + this.coord + " lbl: " + this.label);
	},
	computeIM: function (im) {},
	computeMergedLocation: function (label2, eltIndex) {
		var loc = Location.NONE;
		loc = this.label.getLocation(eltIndex);
		if (!label2.isNull(eltIndex)) {
			var nLoc = label2.getLocation(eltIndex);
			if (loc !== Location.BOUNDARY) loc = nLoc;
		}
		return loc;
	},
	setLabel: function () {
		if (arguments.length === 2) {
			let argIndex = arguments[0], onLocation = arguments[1];
			if (this.label === null) {
				this.label = new Label(argIndex, onLocation);
			} else this.label.setLocation(argIndex, onLocation);
		} else return GraphComponent.prototype.setLabel.apply(this, arguments);
	},
	getEdges: function () {
		return this.edges;
	},
	mergeLabel: function () {
		if (arguments[0] instanceof Node) {
			let n = arguments[0];
			this.mergeLabel(n.label);
		} else if (arguments[0] instanceof Label) {
			let label2 = arguments[0];
			for (var i = 0; i < 2; i++) {
				var loc = this.computeMergedLocation(label2, i);
				var thisLoc = this.label.getLocation(i);
				if (thisLoc === Location.NONE) this.label.setLocation(i, loc);
			}
		}
	},
	add: function (e) {
		this.edges.insert(e);
		e.setNode(this);
	},
	setLabelBoundary: function (argIndex) {
		if (this.label === null) return null;
		var loc = Location.NONE;
		if (this.label !== null) loc = this.label.getLocation(argIndex);
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
		this.label.setLocation(argIndex, newLoc);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Node;
	}
});
