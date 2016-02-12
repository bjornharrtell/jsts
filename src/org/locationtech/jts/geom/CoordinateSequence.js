import Cloneable from '../../../../java/lang/Cloneable';
export default class CoordinateSequence {
	get interfaces_() {
		return [Cloneable];
	}
	setOrdinate(index, ordinateIndex, value) {}
	size() {}
	getOrdinate(index, ordinateIndex) {}
	getCoordinate(...args) {
		if (args.length === 1) {
			let [i] = args;
		} else if (args.length === 2) {
			let [index, coord] = args;
		}
	}
	getCoordinateCopy(i) {}
	getDimension() {}
	getX(index) {}
	clone() {}
	expandEnvelope(env) {}
	copy() {}
	getY(index) {}
	toCoordinateArray() {}
	getClass() {
		return CoordinateSequence;
	}
}
CoordinateSequence.X = 0;
CoordinateSequence.Y = 1;
CoordinateSequence.Z = 2;
CoordinateSequence.M = 3;

