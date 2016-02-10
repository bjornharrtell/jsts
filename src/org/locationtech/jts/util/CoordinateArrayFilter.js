import CoordinateFilter from '../geom/CoordinateFilter';
export default class CoordinateArrayFilter {
	constructor(...args) {
		this.pts = null;
		this.n = 0;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [size] = args;
						this.pts = new Array(size);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
	filter(coord) {
		this.pts[this.n++] = coord;
	}
	getCoordinates() {
		return this.pts;
	}
	getClass() {
		return CoordinateArrayFilter;
	}
}

