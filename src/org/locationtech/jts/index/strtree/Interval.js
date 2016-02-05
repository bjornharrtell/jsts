import Assert from '../../util/Assert';
export default class Interval {
	constructor(...args) {
		(() => {
			this.min = null;
			this.max = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [other] = args;
						overloads.call(this, other.min, other.max);
					})(...args);
				case 2:
					return ((...args) => {
						let [min, max] = args;
						Assert.isTrue(min <= max);
						this.min = min;
						this.max = max;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	expandToInclude(other) {
		this.max = Math.max(this.max, other.max);
		this.min = Math.min(this.min, other.min);
		return this;
	}
	getCentre() {
		return (this.min + this.max) / 2;
	}
	intersects(other) {
		return !(other.min > this.max || other.max < this.min);
	}
	equals(o) {
		if (!(o instanceof Interval)) {
			return false;
		}
		var other = o;
		return this.min === other.min && this.max === other.max;
	}
	getClass() {
		return Interval;
	}
}

