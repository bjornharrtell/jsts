import CoordinateFilter from '../geom/CoordinateFilter';
import extend from '../../../../extend';
export default function CoordinateArrayFilter() {
	this.pts = null;
	this.n = 0;
	if (arguments.length === 1) {
		let size = arguments[0];
		this.pts = new Array(size);
	}
}
extend(CoordinateArrayFilter.prototype, {
	filter: function (coord) {
		this.pts[this.n++] = coord;
	},
	getCoordinates: function () {
		return this.pts;
	},
	interfaces_: function () {
		return [CoordinateFilter];
	},
	getClass: function () {
		return CoordinateArrayFilter;
	}
});

