import CoordinateFilter from '../geom/CoordinateFilter';
export default class CoordinateCountFilter {
	constructor(...args) {
		this.n = 0;
		if (args.length === 0) {
			let [] = args;
		}
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

