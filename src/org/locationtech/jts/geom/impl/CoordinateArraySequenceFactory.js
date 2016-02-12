import CoordinateSequenceFactory from '../CoordinateSequenceFactory';
import CoordinateArraySequence from './CoordinateArraySequence';
import CoordinateSequence from '../CoordinateSequence';
import Serializable from '../../../../../java/io/Serializable';
export default class CoordinateArraySequenceFactory {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [CoordinateSequenceFactory, Serializable];
	}
	static instance() {
		return CoordinateArraySequenceFactory.instanceObject;
	}
	readResolve() {
		return CoordinateArraySequenceFactory.instance();
	}
	create(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coordinates] = args;
				return new CoordinateArraySequence(coordinates);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordSeq] = args;
				return new CoordinateArraySequence(coordSeq);
			}
		} else if (args.length === 2) {
			let [size, dimension] = args;
			if (dimension > 3) dimension = 3;
			if (dimension < 2) return new CoordinateArraySequence(size);
			return new CoordinateArraySequence(size, dimension);
		}
	}
	getClass() {
		return CoordinateArraySequenceFactory;
	}
}
CoordinateArraySequenceFactory.serialVersionUID = -4099577099607551657;
CoordinateArraySequenceFactory.instanceObject = new CoordinateArraySequenceFactory();

