import Noder from './Noder';
export default class SinglePassNoder {
	constructor(...args) {
		this.segInt = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
			} else if (args.length === 1) {
				let [segInt] = args;
				this.setSegmentIntersector(segInt);
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

