import CoordinateSequenceFactory from '../CoordinateSequenceFactory';
import hasInterface from '../../../../../hasInterface';
import CoordinateArraySequence from './CoordinateArraySequence';
import CoordinateSequence from '../CoordinateSequence';
import Serializable from '../../../../../java/io/Serializable';
export default class CoordinateArraySequenceFactory {
	constructor() {
		CoordinateArraySequenceFactory.constructor_.apply(this, arguments);
	}
	static instance() {
		return CoordinateArraySequenceFactory.instanceObject;
	}
	readResolve() {
		return CoordinateArraySequenceFactory.instance();
	}
	create() {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Array) {
				let coordinates = arguments[0];
				return new CoordinateArraySequence(coordinates);
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordSeq = arguments[0];
				return new CoordinateArraySequence(coordSeq);
			}
		} else if (arguments.length === 2) {
			let size = arguments[0], dimension = arguments[1];
			if (dimension > 3) dimension = 3;
			if (dimension < 2) return new CoordinateArraySequence(size);
			return new CoordinateArraySequence(size, dimension);
		}
	}
	getClass() {
		return CoordinateArraySequenceFactory;
	}
	get interfaces_() {
		return [CoordinateSequenceFactory, Serializable];
	}
}
CoordinateArraySequenceFactory.constructor_ = function () {};
CoordinateArraySequenceFactory.serialVersionUID = -4099577099607551657;
CoordinateArraySequenceFactory.instanceObject = new CoordinateArraySequenceFactory();
