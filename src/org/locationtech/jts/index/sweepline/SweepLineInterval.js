import extend from '../../../../../extend';
export default function SweepLineInterval() {
	this.min = null;
	this.max = null;
	this.item = null;
	if (arguments.length === 2) {
		let min = arguments[0], max = arguments[1];
		SweepLineInterval.call(this, min, max, null);
	} else if (arguments.length === 3) {
		let min = arguments[0], max = arguments[1], item = arguments[2];
		this.min = min < max ? min : max;
		this.max = max > min ? max : min;
		this.item = item;
	}
}
extend(SweepLineInterval.prototype, {
	getMin: function () {
		return this.min;
	},
	getItem: function () {
		return this.item;
	},
	getMax: function () {
		return this.max;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SweepLineInterval;
	}
});
