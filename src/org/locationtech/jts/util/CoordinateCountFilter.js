import CoordinateFilter from '../geom/CoordinateFilter';
import extend from '../../../../extend';
export default function CoordinateCountFilter() {
	this._n = 0;
}
extend(CoordinateCountFilter.prototype, {
	filter: function (coord) {
		this._n++;
	},
	getCount: function () {
		return this._n;
	},
	interfaces_: function () {
		return [CoordinateFilter];
	},
	getClass: function () {
		return CoordinateCountFilter;
	}
});
