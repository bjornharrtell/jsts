import CoordinateSequence from './CoordinateSequence';
export default class CoordinateSequenceFactory {
	get interfaces_() {
		return [];
	}
	create(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coordinates] = args;
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordSeq] = args;
			}
		} else if (args.length === 2) {
			let [size, dimension] = args;
		}
	}
	getClass() {
		return CoordinateSequenceFactory;
	}
}

