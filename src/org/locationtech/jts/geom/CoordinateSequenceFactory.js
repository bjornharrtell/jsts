import hasInterface from '../../../../hasInterface';
import CoordinateSequence from './CoordinateSequence';
export default class CoordinateSequenceFactory {
	constructor() {
		CoordinateSequenceFactory.constructor_.apply(this, arguments);
	}
	create() {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Array) {
				let coordinates = arguments[0];
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordSeq = arguments[0];
			}
		} else if (arguments.length === 2) {
			let size = arguments[0], dimension = arguments[1];
		}
	}
	getClass() {
		return CoordinateSequenceFactory;
	}
	get interfaces_() {
		return [];
	}
}
CoordinateSequenceFactory.constructor_ = function () {};
