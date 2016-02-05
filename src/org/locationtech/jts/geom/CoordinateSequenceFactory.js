import CoordinateSequence from './CoordinateSequence';
export default class CoordinateSequenceFactory {
	get interfaces_() {
		return [];
	}
	create(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Array) {
						return ((...args) => {
							let [coordinates] = args;
						})(...args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
						return ((...args) => {
							let [coordSeq] = args;
						})(...args);
					}
				case 2:
					return ((...args) => {
						let [size, dimension] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return CoordinateSequenceFactory;
	}
}

