import CoordinateSequenceFactory from '../CoordinateSequenceFactory';
import CoordinateArraySequence from './CoordinateArraySequence';
import CoordinateSequence from '../CoordinateSequence';
import Serializable from '../../../../../java/io/Serializable';
export default class CoordinateArraySequenceFactory {
	constructor(...args) {
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
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
		switch (args.length) {
			case 1:
				if (args[0] instanceof Array) {
					let [coordinates] = args;
					return new CoordinateArraySequence(coordinates);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
					let [coordSeq] = args;
					return new CoordinateArraySequence(coordSeq);
				}
				break;
			case 2:
				{
					let [size, dimension] = args;
					if (dimension > 3) dimension = 3;
					if (dimension < 2) return new CoordinateArraySequence(size);
					return new CoordinateArraySequence(size, dimension);
					break;
				}
		}
	}
	getClass() {
		return CoordinateArraySequenceFactory;
	}
}
CoordinateArraySequenceFactory.serialVersionUID = -4099577099607551657;
CoordinateArraySequenceFactory.instanceObject = new CoordinateArraySequenceFactory();

