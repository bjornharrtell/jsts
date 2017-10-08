import extend from '../../../../../extend';
export default function SweepLineInterval() {
	this._min = null;
	this._max = null;
	this._item = null;
	if (arguments.length === 2) {
		let min = arguments[0], max = arguments[1];
		SweepLineInterval.call(this, min, max, null);
	} else if (arguments.length === 3) {
		let min = arguments[0], max = arguments[1], item = arguments[2];
		this._min = min < max ? min : max;
		this._max = max > min ? max : min;
		this._item = item;
	}
}
extend(SweepLineInterval.prototype, {
	getMin: function () {
		return this._min;
	},
	getItem: function () {
		return this._item;
	},
	getMax: function () {
		return this._max;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SweepLineInterval;
	}
});
