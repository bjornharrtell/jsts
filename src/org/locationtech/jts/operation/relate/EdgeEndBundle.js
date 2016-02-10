import Location from '../../geom/Location';
import EdgeEnd from '../../geomgraph/EdgeEnd';
import Position from '../../geomgraph/Position';
import GeometryGraph from '../../geomgraph/GeometryGraph';
import Label from '../../geomgraph/Label';
import ArrayList from '../../../../../java/util/ArrayList';
import Edge from '../../geomgraph/Edge';
export default class EdgeEndBundle extends EdgeEnd {
	constructor(...args) {
		super();
		this.edgeEnds = new ArrayList();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [e] = args;
						overloads.call(this, null, e);
					})(...args);
				case 2:
					return ((...args) => {
						let [boundaryNodeRule, e] = args;
						super(e.getEdge(), e.getCoordinate(), e.getDirectedCoordinate(), new Label(e.getLabel()));
						this.insert(e);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	insert(e) {
		this.edgeEnds.add(e);
	}
	print(out) {
		out.println("EdgeEndBundle--> Label: " + this.label);
		for (var it = this.iterator(); it.hasNext(); ) {
			var ee = it.next();
			ee.print(out);
			out.println();
		}
	}
	iterator() {
		return this.edgeEnds.iterator();
	}
	getEdgeEnds() {
		return this.edgeEnds;
	}
	computeLabelOn(geomIndex, boundaryNodeRule) {
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
	}
	computeLabelSide(geomIndex, side) {
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
	}
	getLabel() {
		return this.label;
	}
	computeLabelSides(geomIndex) {
		this.computeLabelSide(geomIndex, Position.LEFT);
		this.computeLabelSide(geomIndex, Position.RIGHT);
	}
	updateIM(im) {
		Edge.updateIM(this.label, im);
	}
	computeLabel(boundaryNodeRule) {
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
	}
	getClass() {
		return EdgeEndBundle;
	}
}

