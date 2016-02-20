import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import CoordinateSequence from '../../geom/CoordinateSequence';
export default function AxisPlaneCoordinateSequence() {
	this.seq = null;
	this.indexMap = null;
	let seq = arguments[0], indexMap = arguments[1];
	this.seq = seq;
	this.indexMap = indexMap;
}
extend(AxisPlaneCoordinateSequence.prototype, {
	setOrdinate: function (index, ordinateIndex, value) {
		throw new UnsupportedOperationException();
	},
	getZ: function (index) {
		return this.getOrdinate(index, CoordinateSequence.Z);
	},
	size: function () {
		return this.seq.size();
	},
	getOrdinate: function (index, ordinateIndex) {
		if (ordinateIndex > 1) return 0;
		return this.seq.getOrdinate(index, this.indexMap[ordinateIndex]);
	},
	getCoordinate: function () {
		if (arguments.length === 1) {
			let i = arguments[0];
			return this.getCoordinateCopy(i);
		} else if (arguments.length === 2) {
			let index = arguments[0], coord = arguments[1];
			coord.x = this.getOrdinate(index, CoordinateSequence.X);
			coord.y = this.getOrdinate(index, CoordinateSequence.Y);
			coord.z = this.getOrdinate(index, CoordinateSequence.Z);
		}
	},
	getCoordinateCopy: function (i) {
		return new Coordinate(this.getX(i), this.getY(i), this.getZ(i));
	},
	getDimension: function () {
		return 2;
	},
	getX: function (index) {
		return this.getOrdinate(index, CoordinateSequence.X);
	},
	clone: function () {
		throw new UnsupportedOperationException();
	},
	expandEnvelope: function (env) {
		throw new UnsupportedOperationException();
	},
	copy: function () {
		throw new UnsupportedOperationException();
	},
	getY: function (index) {
		return this.getOrdinate(index, CoordinateSequence.Y);
	},
	toCoordinateArray: function () {
		throw new UnsupportedOperationException();
	},
	interfaces_: function () {
		return [CoordinateSequence];
	},
	getClass: function () {
		return AxisPlaneCoordinateSequence;
	}
});
AxisPlaneCoordinateSequence.projectToYZ = function (seq) {
	return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.YZ_INDEX);
};
AxisPlaneCoordinateSequence.projectToXZ = function (seq) {
	return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.XZ_INDEX);
};
AxisPlaneCoordinateSequence.projectToXY = function (seq) {
	return new AxisPlaneCoordinateSequence(seq, AxisPlaneCoordinateSequence.XY_INDEX);
};
AxisPlaneCoordinateSequence.XY_INDEX = [0, 1];
AxisPlaneCoordinateSequence.XZ_INDEX = [0, 2];
AxisPlaneCoordinateSequence.YZ_INDEX = [1, 2];

