import Interval from './Interval';
import extend from '../../../../../extend';
import DoubleBits from '../quadtree/DoubleBits';
export default function Key() {
	this.pt = 0.0;
	this.level = 0;
	this.interval = null;
	let interval = arguments[0];
	this.computeKey(interval);
}
extend(Key.prototype, {
	getInterval: function () {
		return this.interval;
	},
	getLevel: function () {
		return this.level;
	},
	computeKey: function (itemInterval) {
		this.level = Key.computeLevel(itemInterval);
		this.interval = new Interval();
		this.computeInterval(this.level, itemInterval);
		while (!this.interval.contains(itemInterval)) {
			this.level += 1;
			this.computeInterval(this.level, itemInterval);
		}
	},
	computeInterval: function (level, itemInterval) {
		var size = DoubleBits.powerOf2(level);
		this.pt = Math.floor(itemInterval.getMin() / size) * size;
		this.interval.init(this.pt, this.pt + size);
	},
	getPoint: function () {
		return this.pt;
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

