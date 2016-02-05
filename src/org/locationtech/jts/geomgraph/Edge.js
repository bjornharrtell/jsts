import StringBuffer from '../../../../java/lang/StringBuffer';
import EdgeIntersectionList from './EdgeIntersectionList';
import MonotoneChainEdge from './index/MonotoneChainEdge';
import Position from './Position';
import Coordinate from '../geom/Coordinate';
import Label from './Label';
import Envelope from '../geom/Envelope';
import Depth from './Depth';
import GraphComponent from './GraphComponent';
export default class Edge extends GraphComponent {
	constructor(...args) {
		super();
		(() => {
			this.pts = null;
			this.env = null;
			this.eiList = new EdgeIntersectionList(this);
			this.name = null;
			this.mce = null;
			this._isIsolated = true;
			this.depth = new Depth();
			this.depthDelta = 0;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [pts] = args;
						overloads.call(this, pts, null);
					})(...args);
				case 2:
					return ((...args) => {
						let [pts, label] = args;
						this.pts = pts;
						this.label = label;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static updateIM(...args) {
		if (args.length === 2) {
			let [label, im] = args;
			im.setAtLeastIfValid(label.getLocation(0, Position.ON), label.getLocation(1, Position.ON), 1);
			if (label.isArea()) {
				im.setAtLeastIfValid(label.getLocation(0, Position.LEFT), label.getLocation(1, Position.LEFT), 2);
				im.setAtLeastIfValid(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), 2);
			}
		} else return super.updateIM(...args);
	}
	getDepth() {
		return this.depth;
	}
	getCollapsedEdge() {
		var newPts = new Array(2);
		newPts[0] = this.pts[0];
		newPts[1] = this.pts[1];
		var newe = new Edge(newPts, Label.toLineLabel(this.label));
		return newe;
	}
	isIsolated() {
		return this._isIsolated;
	}
	getCoordinates() {
		return this.pts;
	}
	setIsolated(isIsolated) {
		this._isIsolated = isIsolated;
	}
	setName(name) {
		this.name = name;
	}
	equals(o) {
		if (!(o instanceof Edge)) return false;
		var e = o;
		if (this.pts.length !== e.pts.length) return false;
		var isEqualForward = true;
		var isEqualReverse = true;
		var iRev = this.pts.length;
		for (var i = 0; i < this.pts.length; i++) {
			if (!this.pts[i].equals2D(e.pts[i])) {
				isEqualForward = false;
			}
			if (!this.pts[i].equals2D(e.pts[-- iRev])) {
				isEqualReverse = false;
			}
			if (!isEqualForward && !isEqualReverse) return false;
		}
		return true;
	}
	getCoordinate(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						if (this.pts.length > 0) return this.pts[0];
						return null;
					})(...args);
				case 1:
					return ((...args) => {
						let [i] = args;
						return this.pts[i];
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	print(out) {
		out.print("edge " + this.name + ": ");
		out.print("LINESTRING (");
		for (var i = 0; i < this.pts.length; i++) {
			if (i > 0) out.print(",");
			out.print(this.pts[i].x + " " + this.pts[i].y);
		}
		out.print(")  " + this.label + " " + this.depthDelta);
	}
	computeIM(im) {
		Edge.updateIM(this.label, im);
	}
	isCollapsed() {
		if (!this.label.isArea()) return false;
		if (this.pts.length !== 3) return false;
		if (this.pts[0].equals(this.pts[2])) return true;
		return false;
	}
	isClosed() {
		return this.pts[0].equals(this.pts[this.pts.length - 1]);
	}
	getMaximumSegmentIndex() {
		return this.pts.length - 1;
	}
	getDepthDelta() {
		return this.depthDelta;
	}
	getNumPoints() {
		return this.pts.length;
	}
	printReverse(out) {
		out.print("edge " + this.name + ": ");
		for (var i = this.pts.length - 1; i >= 0; i--) {
			out.print(this.pts[i] + " ");
		}
		out.println("");
	}
	getMonotoneChainEdge() {
		if (this.mce === null) this.mce = new MonotoneChainEdge(this);
		return this.mce;
	}
	getEnvelope() {
		if (this.env === null) {
			this.env = new Envelope();
			for (var i = 0; i < this.pts.length; i++) {
				this.env.expandToInclude(this.pts[i]);
			}
		}
		return this.env;
	}
	addIntersection(li, segmentIndex, geomIndex, intIndex) {
		var intPt = new Coordinate(li.getIntersection(intIndex));
		var normalizedSegmentIndex = segmentIndex;
		var dist = li.getEdgeDistance(geomIndex, intIndex);
		var nextSegIndex = normalizedSegmentIndex + 1;
		if (nextSegIndex < this.pts.length) {
			var nextPt = this.pts[nextSegIndex];
			if (intPt.equals2D(nextPt)) {
				normalizedSegmentIndex = nextSegIndex;
				dist = 0.0;
			}
		}
		var ei = this.eiList.add(intPt, normalizedSegmentIndex, dist);
	}
	toString() {
		var buf = new StringBuffer();
		buf.append("edge " + this.name + ": ");
		buf.append("LINESTRING (");
		for (var i = 0; i < this.pts.length; i++) {
			if (i > 0) buf.append(",");
			buf.append(this.pts[i].x + " " + this.pts[i].y);
		}
		buf.append(")  " + this.label + " " + this.depthDelta);
		return buf.toString();
	}
	isPointwiseEqual(e) {
		if (this.pts.length !== e.pts.length) return false;
		for (var i = 0; i < this.pts.length; i++) {
			if (!this.pts[i].equals2D(e.pts[i])) {
				return false;
			}
		}
		return true;
	}
	setDepthDelta(depthDelta) {
		this.depthDelta = depthDelta;
	}
	getEdgeIntersectionList() {
		return this.eiList;
	}
	addIntersections(li, segmentIndex, geomIndex) {
		for (var i = 0; i < li.getIntersectionNum(); i++) {
			this.addIntersection(li, segmentIndex, geomIndex, i);
		}
	}
	getClass() {
		return Edge;
	}
}

