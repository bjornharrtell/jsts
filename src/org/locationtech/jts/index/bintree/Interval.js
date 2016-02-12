export default class Interval {
	constructor(...args) {
		this.min = null;
		this.max = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						this.min = 0.0;
						this.max = 0.0;
					})(...args);
				case 1:
					return ((...args) => {
						let [interval] = args;
						this.init(interval.min, interval.max);
					})(...args);
				case 2:
					return ((...args) => {
						let [min, max] = args;
						this.init(min, max);
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	expandToInclude(interval) {
		if (interval.max > this.max) this.max = interval.max;
		if (interval.min < this.min) this.min = interval.min;
	}
	getWidth() {
		return this.max - this.min;
	}
	overlaps(...args) {
		switch (args.length) {
			case 1:
				{
					let [interval] = args;
					return this.overlaps(interval.min, interval.max);
					break;
				}
			case 2:
				{
					let [min, max] = args;
					if (this.min > max || this.max < min) return false;
					return true;
					break;
				}
		}
	}
	getMin() {
		return this.min;
	}
	toString() {
		return "[" + this.min + ", " + this.max + "]";
	}
	contains(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Interval) {
					let [interval] = args;
					return this.contains(interval.min, interval.max);
				} else if (typeof args[0] === "number") {
					let [p] = args;
					return p >= this.min && p <= this.max;
				}
				break;
			case 2:
				{
					let [min, max] = args;
					return min >= this.min && max <= this.max;
					break;
				}
		}
	}
	init(min, max) {
		this.min = min;
		this.max = max;
		if (min > max) {
			this.min = max;
			this.max = min;
		}
	}
	getMax() {
		return this.max;
	}
	getClass() {
		return Interval;
	}
}

