import StringBuffer from '../../../../../java/lang/StringBuffer';
import hasInterface from '../../../../../hasInterface';
import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
import CoordinateSequence from '../CoordinateSequence';
import Serializable from '../../../../../java/io/Serializable';
export default function CoordinateArraySequence() {
	this.dimension = 3;
	this.coordinates = null;
	if (arguments.length === 1) {
		if (arguments[0] instanceof Array) {
			let coordinates = arguments[0];
			CoordinateArraySequence.call(this, coordinates, 3);
		} else if (Number.isInteger(arguments[0])) {
			let size = arguments[0];
			this.coordinates = new Array(size).fill(null);
			for (var i = 0; i < size; i++) {
				this.coordinates[i] = new Coordinate();
			}
		} else if (hasInterface(arguments[0], CoordinateSequence)) {
			let coordSeq = arguments[0];
			if (coordSeq === null) {
				this.coordinates = new Array(0).fill(null);
				return null;
			}
			this.dimension = coordSeq.getDimension();
			this.coordinates = new Array(coordSeq.size()).fill(null);
			for (var i = 0; i < this.coordinates.length; i++) {
				this.coordinates[i] = coordSeq.getCoordinateCopy(i);
			}
		}
	} else if (arguments.length === 2) {
		if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
			let coordinates = arguments[0], dimension = arguments[1];
			this.coordinates = coordinates;
			this.dimension = dimension;
			if (coordinates === null) this.coordinates = new Array(0).fill(null);
		} else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
			let size = arguments[0], dimension = arguments[1];
			this.coordinates = new Array(size).fill(null);
			this.dimension = dimension;
			for (var i = 0; i < size; i++) {
				this.coordinates[i] = new Coordinate();
			}
		}
	}
}
extend(CoordinateArraySequence.prototype, {
	setOrdinate: function (index, ordinateIndex, value) {
		switch (ordinateIndex) {
			case CoordinateSequence.X:
				this.coordinates[index].x = value;
				break;
			case CoordinateSequence.Y:
				this.coordinates[index].y = value;
				break;
			case CoordinateSequence.Z:
				this.coordinates[index].z = value;
				break;
			default:
				throw new IllegalArgumentException("invalid ordinateIndex");
		}
	},
	size: function () {
		return this.coordinates.length;
	},
	getOrdinate: function (index, ordinateIndex) {
		switch (ordinateIndex) {
			case CoordinateSequence.X:
				return this.coordinates[index].x;
			case CoordinateSequence.Y:
				return this.coordinates[index].y;
			case CoordinateSequence.Z:
				return this.coordinates[index].z;
		}
		return Double.NaN;
	},
	getCoordinate: function () {
		if (arguments.length === 1) {
			let i = arguments[0];
			return this.coordinates[i];
		} else if (arguments.length === 2) {
			let index = arguments[0], coord = arguments[1];
			coord.x = this.coordinates[index].x;
			coord.y = this.coordinates[index].y;
			coord.z = this.coordinates[index].z;
		}
	},
	getCoordinateCopy: function (i) {
		return new Coordinate(this.coordinates[i]);
	},
	getDimension: function () {
		return this.dimension;
	},
	getX: function (index) {
		return this.coordinates[index].x;
	},
	clone: function () {
		var cloneCoordinates = new Array(this.size()).fill(null);
		for (var i = 0; i < this.coordinates.length; i++) {
			cloneCoordinates[i] = this.coordinates[i].clone();
		}
		return new CoordinateArraySequence(cloneCoordinates, this.dimension);
	},
	expandEnvelope: function (env) {
		for (var i = 0; i < this.coordinates.length; i++) {
			env.expandToInclude(this.coordinates[i]);
		}
		return env;
	},
	copy: function () {
		var cloneCoordinates = new Array(this.size()).fill(null);
		for (var i = 0; i < this.coordinates.length; i++) {
			cloneCoordinates[i] = this.coordinates[i].copy();
		}
		return new CoordinateArraySequence(cloneCoordinates, this.dimension);
	},
	toString: function () {
		if (this.coordinates.length > 0) {
			var strBuf = new StringBuffer(17 * this.coordinates.length);
			strBuf.append('(');
			strBuf.append(this.coordinates[0]);
			for (var i = 1; i < this.coordinates.length; i++) {
				strBuf.append(", ");
				strBuf.append(this.coordinates[i]);
			}
			strBuf.append(')');
			return strBuf.toString();
		} else {
			return "()";
		}
	},
	getY: function (index) {
		return this.coordinates[index].y;
	},
	toCoordinateArray: function () {
		return this.coordinates;
	},
	interfaces_: function () {
		return [CoordinateSequence, Serializable];
	},
	getClass: function () {
		return CoordinateArraySequence;
	}
});
CoordinateArraySequence.serialVersionUID = -915438501601840650;
