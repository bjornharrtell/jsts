import Interval from './Interval';
import DoubleBits from '../quadtree/DoubleBits';
export default class Key {
	constructor(...args) {
		this.pt = 0.0;
		this.level = 0;
		this.interval = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [interval] = args;
					this.computeKey(interval);
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static computeLevel(interval) {
		var dx = interval.getWidth();
		var level = DoubleBits.exponent(dx) + 1;
		return level;
	}
	getInterval() {
		return this.interval;
	}
	getLevel() {
		return this.level;
	}
	computeKey(itemInterval) {
		this.level = Key.computeLevel(itemInterval);
		this.interval = new Interval();
		this.computeInterval(this.level, itemInterval);
		while (!this.interval.contains(itemInterval)) {
			this.level += 1;
			this.computeInterval(this.level, itemInterval);
		}
	}
	computeInterval(level, itemInterval) {
		var size = DoubleBits.powerOf2(level);
		this.pt = Math.floor(itemInterval.getMin() / size) * size;
		this.interval.init(this.pt, this.pt + size);
	}
	getPoint() {
		return this.pt;
	}
	getClass() {
		return Key;
	}
}

