import Interval from './Interval';
import extend from '../../../../../extend';
import DoubleBits from '../quadtree/DoubleBits';
export default function Key() {
	this._pt = 0.0;
	this._level = 0;
	this._interval = null;
	let interval = arguments[0];
	this.computeKey(interval);
}
extend(Key.prototype, {
	getInterval: function () {
		return this._interval;
	},
	getLevel: function () {
		return this._level;
	},
	computeKey: function (itemInterval) {
		this._level = Key.computeLevel(itemInterval);
		this._interval = new Interval();
		this.computeInterval(this._level, itemInterval);
		while (!this._interval.contains(itemInterval)) {
			this._level += 1;
			this.computeInterval(this._level, itemInterval);
		}
	},
	computeInterval: function (level, itemInterval) {
		var size = DoubleBits.powerOf2(level);
		this._pt = Math.floor(itemInterval.getMin() / size) * size;
		this._interval.init(this._pt, this._pt + size);
	},
	getPoint: function () {
		return this._pt;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Key;
	}
});
Key.computeLevel = function (interval) {
	var dx = interval.getWidth();
	var level = DoubleBits.exponent(dx) + 1;
	return level;
};
