import Noder from './Noder';
export default class SinglePassNoder {
	constructor(...args) {
		(() => {
			this.segInt = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
				case 1:
					return ((...args) => {
						let [segInt] = args;
						this.setSegmentIntersector(segInt);
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

