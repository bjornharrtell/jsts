import CoordinateFilter from '../geom/CoordinateFilter';
export default class CoordinateCountFilter {
	constructor(...args) {
		this.n = 0;
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
	filter(coord) {
		this.n++;
	}
	getCount() {
		return this.n;
	}
	getClass() {
		return CoordinateCountFilter;
	}
}

