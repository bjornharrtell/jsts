import LineSegment from '../geom/LineSegment';
export default class TaggedLineSegment extends LineSegment {
	constructor(...args) {
		super();
		this.parent = null;
		this.index = null;
		const overloaded = (...args) => {
			if (args.length === 2) {
				return ((...args) => {
					let [p0, p1] = args;
					overloaded.call(this, p0, p1, null, -1);
				})(...args);
			} else if (args.length === 4) {
				return ((...args) => {
					let [p0, p1, parent, index] = args;
					super(p0, p1);
					this.parent = parent;
					this.index = index;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getIndex() {
		return this.index;
	}
	getParent() {
		return this.parent;
	}
	getClass() {
		return TaggedLineSegment;
	}
}

