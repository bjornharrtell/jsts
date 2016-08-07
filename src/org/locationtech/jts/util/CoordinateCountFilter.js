import CoordinateFilter from '../geom/CoordinateFilter';
import extend from '../../../../extend';
export default function CoordinateCountFilter() {
	this.n = 0;
}
extend(CoordinateCountFilter.prototype, {
	filter: function (coord) {
		this.n++;
	},
	getCount: function () {
		return this.n;
	},
	interfaces_: function () {
		return [CoordinateFilter];
	},
	getClass: function () {
		return CoordinateCountFilter;
	}
});
