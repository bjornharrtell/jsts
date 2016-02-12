import Noder from './Noder';
export default class SinglePassNoder {
	constructor(...args) {
		this.segInt = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
				})(...args);
			} else if (args.length === 1) {
				return ((...args) => {
					let [segInt] = args;
					this.setSegmentIntersector(segInt);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Noder];
	}
	setSegmentIntersector(segInt) {
		this.segInt = segInt;
	}
	getClass() {
		return SinglePassNoder;
	}
}

