import extend from '../../../../extend';
import Cloneable from '../../../../java/lang/Cloneable';
export default function CoordinateSequence() {}
extend(CoordinateSequence.prototype, {
	setOrdinate: function (index, ordinateIndex, value) {},
	size: function () {},
	getOrdinate: function (index, ordinateIndex) {},
	getCoordinate: function () {
		if (arguments.length === 1) {
			let i = arguments[0];
		} else if (arguments.length === 2) {
			let index = arguments[0], coord = arguments[1];
		}
	},
	getCoordinateCopy: function (i) {},
	getDimension: function () {},
	getX: function (index) {},
	clone: function () {},
	expandEnvelope: function (env) {},
	copy: function () {},
	getY: function (index) {},
	toCoordinateArray: function () {},
	interfaces_: function () {
		return [Cloneable];
	},
	getClass: function () {
		return CoordinateSequence;
	}
});
CoordinateSequence.X = 0;
CoordinateSequence.Y = 1;
CoordinateSequence.Z = 2;
CoordinateSequence.M = 3;

