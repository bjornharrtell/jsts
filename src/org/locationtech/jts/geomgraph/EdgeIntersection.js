import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import Comparable from '../../../../java/lang/Comparable';
export default function EdgeIntersection() {
	this.coord = null;
	this.segmentIndex = null;
	this.dist = null;
	let coord = arguments[0], segmentIndex = arguments[1], dist = arguments[2];
	this.coord = new Coordinate(coord);
	this.segmentIndex = segmentIndex;
	this.dist = dist;
}
extend(EdgeIntersection.prototype, {
	getSegmentIndex: function () {
		return this.segmentIndex;
	},
	getCoordinate: function () {
		return this.coord;
	},
	print: function (out) {
		out.print(this.coord);
		out.print(" seg # = " + this.segmentIndex);
		out.println(" dist = " + this.dist);
	},
	compareTo: function (obj) {
		var other = obj;
		return this.compare(other.segmentIndex, other.dist);
	},
	isEndPoint: function (maxSegmentIndex) {
		if (this.segmentIndex === 0 && this.dist === 0.0) return true;
		if (this.segmentIndex === maxSegmentIndex) return true;
		return false;
	},
	toString: function () {
		return this.coord + " seg # = " + this.segmentIndex + " dist = " + this.dist;
	},
	getDistance: function () {
		return this.dist;
	},
	compare: function (segmentIndex, dist) {
		if (this.segmentIndex < segmentIndex) return -1;
		if (this.segmentIndex > segmentIndex) return 1;
		if (this.dist < dist) return -1;
		if (this.dist > dist) return 1;
		return 0;
	},
	interfaces_: function () {
		return [Comparable];
	},
	getClass: function () {
		return EdgeIntersection;
	}
});

