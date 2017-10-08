import extend from '../../../../../extend';
import Assert from '../../util/Assert';
export default function Interval() {
	this._min = null;
	this._max = null;
	if (arguments.length === 1) {
		let other = arguments[0];
		Interval.call(this, other._min, other._max);
	} else if (arguments.length === 2) {
		let min = arguments[0], max = arguments[1];
		Assert.isTrue(min <= max);
		this._min = min;
		this._max = max;
	}
}
extend(Interval.prototype, {
	expandToInclude: function (other) {
		this._max = Math.max(this._max, other._max);
		this._min = Math.min(this._min, other._min);
		return this;
	},
	getCentre: function () {
		return (this._min + this._max) / 2;
	},
	intersects: function (other) {
		return !(other._min > this._max || other._max < this._min);
	},
	equals: function (o) {
		if (!(o instanceof Interval)) {
			return false;
		}
		var other = o;
		return this._min === other._min && this._max === other._max;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Interval;
	}
});
