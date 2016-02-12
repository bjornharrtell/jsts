import Cloneable from '../../../../java/lang/Cloneable';
export default class CoordinateSequence {
	get interfaces_() {
		return [Cloneable];
	}
	setOrdinate(index, ordinateIndex, value) {}
	size() {}
	getOrdinate(index, ordinateIndex) {}
	getCoordinate(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [i] = args;
				})(...args);
			case 2:
				return ((...args) => {
					let [index, coord] = args;
				})(...args);
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

