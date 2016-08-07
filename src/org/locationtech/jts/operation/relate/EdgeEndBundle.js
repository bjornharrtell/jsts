import Location from '../../geom/Location';
import EdgeEnd from '../../geomgraph/EdgeEnd';
import Position from '../../geomgraph/Position';
import extend from '../../../../../extend';
import GeometryGraph from '../../geomgraph/GeometryGraph';
import Label from '../../geomgraph/Label';
import ArrayList from '../../../../../java/util/ArrayList';
import Edge from '../../geomgraph/Edge';
import inherits from '../../../../../inherits';
export default function EdgeEndBundle() {
	this.edgeEnds = new ArrayList();
	if (arguments.length === 1) {
		let e = arguments[0];
		EdgeEndBundle.call(this, null, e);
	} else if (arguments.length === 2) {
		let boundaryNodeRule = arguments[0], e = arguments[1];
		EdgeEnd.call(this, e.getEdge(), e.getCoordinate(), e.getDirectedCoordinate(), new Label(e.getLabel()));
		this.insert(e);
	}
}
inherits(EdgeEndBundle, EdgeEnd);
extend(EdgeEndBundle.prototype, {
	insert: function (e) {
		this.edgeEnds.add(e);
	},
	print: function (out) {
		out.println("EdgeEndBundle--> Label: " + this.label);
		for (var it = this.iterator(); it.hasNext(); ) {
			var ee = it.next();
			ee.print(out);
			out.println();
		}
	},
	iterator: function () {
		return this.edgeEnds.iterator();
	},
	getEdgeEnds: function () {
		return this.edgeEnds;
	},
	computeLabelOn: function (geomIndex, boundaryNodeRule) {
		var boundaryCount = 0;
		var foundInterior = false;
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			var loc = e.getLabel().getLocation(geomIndex);
			if (loc === Location.BOUNDARY) boundaryCount++;
			if (loc === Location.INTERIOR) foundInterior = true;
		}
		var loc = Location.NONE;
		if (foundInterior) loc = Location.INTERIOR;
		if (boundaryCount > 0) {
			loc = GeometryGraph.determineBoundary(boundaryNodeRule, boundaryCount);
		}
		this.label.setLocation(geomIndex, loc);
	},
	computeLabelSide: function (geomIndex, side) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			if (e.getLabel().isArea()) {
				var loc = e.getLabel().getLocation(geomIndex, side);
				if (loc === Location.INTERIOR) {
					this.label.setLocation(geomIndex, side, Location.INTERIOR);
					return null;
				} else if (loc === Location.EXTERIOR) this.label.setLocation(geomIndex, side, Location.EXTERIOR);
			}
		}
	},
	getLabel: function () {
		return this.label;
	},
	computeLabelSides: function (geomIndex) {
		this.computeLabelSide(geomIndex, Position.LEFT);
		this.computeLabelSide(geomIndex, Position.RIGHT);
	},
	updateIM: function (im) {
		Edge.updateIM(this.label, im);
	},
	computeLabel: function (boundaryNodeRule) {
		var isArea = false;
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			if (e.getLabel().isArea()) isArea = true;
		}
		if (isArea) this.label = new Label(Location.NONE, Location.NONE, Location.NONE); else this.label = new Label(Location.NONE);
		for (var i = 0; i < 2; i++) {
			this.computeLabelOn(i, boundaryNodeRule);
			if (isArea) this.computeLabelSides(i);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeEndBundle;
	}
});
