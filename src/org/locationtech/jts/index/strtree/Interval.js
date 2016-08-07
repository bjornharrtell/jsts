import extend from '../../../../../extend';
import Assert from '../../util/Assert';
export default function Interval() {
	this.min = null;
	this.max = null;
	if (arguments.length === 1) {
		let other = arguments[0];
		Interval.call(this, other.min, other.max);
	} else if (arguments.length === 2) {
		let min = arguments[0], max = arguments[1];
		Assert.isTrue(min <= max);
		this.min = min;
		this.max = max;
	}
}
extend(Interval.prototype, {
	expandToInclude: function (other) {
		this.max = Math.max(this.max, other.max);
		this.min = Math.min(this.min, other.min);
		return this;
	},
	getCentre: function () {
		return (this.min + this.max) / 2;
	},
	intersects: function (other) {
		return !(other.min > this.max || other.max < this.min);
	},
	equals: function (o) {
		if (!(o instanceof Interval)) {
			return false;
		}
		var other = o;
		return this.min === other.min && this.max === other.max;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Interval;
	}
});
