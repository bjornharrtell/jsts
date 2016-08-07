import hasInterface from '../../../../hasInterface';
import extend from '../../../../extend';
import CoordinateSequence from './CoordinateSequence';
export default function CoordinateSequenceFactory() {}
extend(CoordinateSequenceFactory.prototype, {
	create: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Array) {
				let coordinates = arguments[0];
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordSeq = arguments[0];
			}
		} else if (arguments.length === 2) {
			let size = arguments[0], dimension = arguments[1];
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CoordinateSequenceFactory;
	}
});
