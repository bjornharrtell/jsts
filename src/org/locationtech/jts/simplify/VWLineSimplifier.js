import CoordinateList from '../geom/CoordinateList';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import Triangle from '../geom/Triangle';
export default function VWLineSimplifier() {
	this.pts = null;
	this.tolerance = null;
	let pts = arguments[0], distanceTolerance = arguments[1];
	this.pts = pts;
	this.tolerance = distanceTolerance * distanceTolerance;
}
extend(VWLineSimplifier.prototype, {
	simplifyVertex: function (vwLine) {
		var curr = vwLine;
		var minArea = curr.getArea();
		var minVertex = null;
		while (curr !== null) {
			var area = curr.getArea();
			if (area < minArea) {
				minArea = area;
				minVertex = curr;
			}
			curr = curr.next;
		}
		if (minVertex !== null && minArea < this.tolerance) {
			minVertex.remove();
		}
		if (!vwLine.isLive()) return -1;
		return minArea;
	},
	simplify: function () {
		var vwLine = VWVertex.buildLine(this.pts);
		var minArea = this.tolerance;
		do {
			minArea = this.simplifyVertex(vwLine);
		} while (minArea < this.tolerance);
		var simp = vwLine.getCoordinates();
		if (simp.length < 2) {
			return [simp[0], new Coordinate(simp[0])];
		}
		return simp;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return VWLineSimplifier;
	}
});
VWLineSimplifier.simplify = function (pts, distanceTolerance) {
	var simp = new VWLineSimplifier(pts, distanceTolerance);
	return simp.simplify();
};
function VWVertex() {
	this.pt = null;
	this.prev = null;
	this.next = null;
	this.area = VWVertex.MAX_AREA;
	this._isLive = true;
	let pt = arguments[0];
	this.pt = pt;
}
extend(VWVertex.prototype, {
	getCoordinates: function () {
		var coords = new CoordinateList();
		var curr = this;
		do {
			coords.add(curr.pt, false);
			curr = curr.next;
		} while (curr !== null);
		return coords.toCoordinateArray();
	},
	getArea: function () {
		return this.area;
	},
	updateArea: function () {
		if (this.prev === null || this.next === null) {
			this.area = VWVertex.MAX_AREA;
			return null;
		}
		this.area = Math.abs(Triangle.area(this.prev.pt, this.pt, this.next.pt));
	},
	remove: function () {
		var tmpPrev = this.prev;
		var tmpNext = this.next;
		var result = null;
		if (this.prev !== null) {
			this.prev.setNext(tmpNext);
			this.prev.updateArea();
			result = this.prev;
		}
		if (this.next !== null) {
			this.next.setPrev(tmpPrev);
			this.next.updateArea();
			if (result === null) result = this.next;
		}
		this._isLive = false;
		return result;
	},
	isLive: function () {
		return this._isLive;
	},
	setPrev: function (prev) {
		this.prev = prev;
	},
	setNext: function (next) {
		this.next = next;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return VWVertex;
	}
});
VWVertex.buildLine = function (pts) {
	var first = null;
	var prev = null;
	for (var i = 0; i < pts.length; i++) {
		var v = new VWVertex(pts[i]);
		if (first === null) first = v;
		v.setPrev(prev);
		if (prev !== null) {
			prev.setNext(v);
			prev.updateArea();
		}
		prev = v;
	}
	return first;
};
VWVertex.MAX_AREA = Double.MAX_VALUE;
VWLineSimplifier.VWVertex = VWVertex;
