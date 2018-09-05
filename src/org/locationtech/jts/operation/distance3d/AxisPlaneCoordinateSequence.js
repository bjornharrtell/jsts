import Coordinate from '../../geom/Coordinate';
import CoordinateSequence from '../../geom/CoordinateSequence';
export default class AxisPlaneCoordinateSequence {
	constructor() {
		AxisPlaneCoordinateSequence.constructor_.apply(this, arguments);
	}
	static projectToYZ(seq) {
		return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.YZ_INDEX);
	}
	static projectToXZ(seq) {
		return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.XZ_INDEX);
	}
	static projectToXY(seq) {
		return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.XY_INDEX);
	}
	setOrdinate(index, ordinateIndex, value) {
		throw new UnsupportedOperationException();
	}
	getZ(index) {
		return this.getOrdinate(index, CoordinateSequence.Z);
	}
	size() {
		return this._seq.size();
	}
	getOrdinate(index, ordinateIndex) {
		if (ordinateIndex > 1) return 0;
		return this._seq.getOrdinate(index, this._indexMap[ordinateIndex]);
	}
	getCoordinate() {
		if (arguments.length === 1) {
			let i = arguments[0];
			return this.getCoordinateCopy(i);
		} else if (arguments.length === 2) {
			let index = arguments[0], coord = arguments[1];
			coord.x = this.getOrdinate(index, CoordinateSequence.X);
			coord.y = this.getOrdinate(index, CoordinateSequence.Y);
			coord.z = this.getOrdinate(index, CoordinateSequence.Z);
		}
	}
	getCoordinateCopy(i) {
		return new Coordinate(this.getX(i), this.getY(i), this.getZ(i));
	}
	getDimension() {
		return 2;
	}
	getX(index) {
		return this.getOrdinate(index, CoordinateSequence.X);
	}
	clone() {
		throw new UnsupportedOperationException();
	}
	expandEnvelope(env) {
		throw new UnsupportedOperationException();
	}
	copy() {
		throw new UnsupportedOperationException();
	}
	getY(index) {
		return this.getOrdinate(index, CoordinateSequence.Y);
	}
	toCoordinateArray() {
		throw new UnsupportedOperationException();
	}
	getClass() {
		return AxisPlaneCoordinateSequence;
	}
	get interfaces_() {
		return [CoordinateSequence];
	}
}
AxisPlaneCoordinateSequence.constructor_ = function () {
	this._seq = null;
	this._indexMap = null;
	let seq = arguments[0], indexMap = arguments[1];
	this._seq = seq;
	this._indexMap = indexMap;
};
AxisPlaneCoordinateSequence.XY_INDEX = [0, 1];
AxisPlaneCoordinateSequence.XZ_INDEX = [0, 2];
AxisPlaneCoordinateSequence.YZ_INDEX = [1, 2];
