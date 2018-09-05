export default class SweepLineInterval {
	constructor() {
		SweepLineInterval.constructor_.apply(this, arguments);
	}
	getMin() {
		return this._min;
	}
	getItem() {
		return this._item;
	}
	getMax() {
		return this._max;
	}
	getClass() {
		return SweepLineInterval;
	}
	get interfaces_() {
		return [];
	}
}
SweepLineInterval.constructor_ = function () {
	this._min = null;
	this._max = null;
	this._item = null;
	if (arguments.length === 2) {
		let min = arguments[0], max = arguments[1];
		SweepLineInterval.constructor_.call(this, min, max, null);
	} else if (arguments.length === 3) {
		let min = arguments[0], max = arguments[1], item = arguments[2];
		this._min = min < max ? min : max;
		this._max = max > min ? max : min;
		this._item = item;
	}
};
