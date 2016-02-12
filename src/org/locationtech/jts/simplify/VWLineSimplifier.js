import CoordinateList from '../geom/CoordinateList';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import Triangle from '../geom/Triangle';
export default class VWLineSimplifier {
	constructor(...args) {
		this.pts = null;
		this.tolerance = null;
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [pts, distanceTolerance] = args;
					this.pts = pts;
					this.tolerance = distanceTolerance * distanceTolerance;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static get VWVertex() {
		return VWVertex;
	}
	static simplify(pts, distanceTolerance) {
		var simp = new VWLineSimplifier(pts, distanceTolerance);
		return simp.simplify();
	}
	simplifyVertex(vwLine) {
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
	}
	simplify() {
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
	}
	getClass() {
		return VWLineSimplifier;
	}
}
class VWVertex {
	constructor(...args) {
		this.pt = null;
		this.prev = null;
		this.next = null;
		this.area = VWVertex.MAX_AREA;
		this._isLive = true;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [pt] = args;
					this.pt = pt;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static buildLine(pts) {
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
	}
	getCoordinates() {
		var coords = new CoordinateList();
		var curr = this;
		do {
			coords.add(curr.pt, false);
			curr = curr.next;
		} while (curr !== null);
		return coords.toCoordinateArray();
	}
	getArea() {
		return this.area;
	}
	updateArea() {
		if (this.prev === null || this.next === null) {
			this.area = VWVertex.MAX_AREA;
			return null;
		}
		this.area = Math.abs(Triangle.area(this.prev.pt, this.pt, this.next.pt));
	}
	remove() {
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
	}
	isLive() {
		return this._isLive;
	}
	setPrev(prev) {
		this.prev = prev;
	}
	setNext(next) {
		this.next = next;
	}
	getClass() {
		return VWVertex;
	}
}
VWVertex.MAX_AREA = Double.MAX_VALUE;

