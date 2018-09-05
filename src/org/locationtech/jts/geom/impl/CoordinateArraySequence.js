import hasInterface from '../../../../../hasInterface';
import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Double from '../../../../../java/lang/Double';
import CoordinateSequence from '../CoordinateSequence';
import Serializable from '../../../../../java/io/Serializable';
import StringBuilder from '../../../../../java/lang/StringBuilder';
export default class CoordinateArraySequence {
	constructor() {
		CoordinateArraySequence.constructor_.apply(this, arguments);
	}
	setOrdinate(index, ordinateIndex, value) {
		switch (ordinateIndex) {
			case CoordinateSequence.X:
				this._coordinates[index].x = value;
				break;
			case CoordinateSequence.Y:
				this._coordinates[index].y = value;
				break;
			case CoordinateSequence.Z:
				this._coordinates[index].z = value;
				break;
			default:
				throw new IllegalArgumentException("invalid ordinateIndex");
		}
	}
	size() {
		return this._coordinates.length;
	}
	getOrdinate(index, ordinateIndex) {
		switch (ordinateIndex) {
			case CoordinateSequence.X:
				return this._coordinates[index].x;
			case CoordinateSequence.Y:
				return this._coordinates[index].y;
			case CoordinateSequence.Z:
				return this._coordinates[index].z;
		}
		return Double.NaN;
	}
	getCoordinate() {
		if (arguments.length === 1) {
			let i = arguments[0];
			return this._coordinates[i];
		} else if (arguments.length === 2) {
			let index = arguments[0], coord = arguments[1];
			coord.x = this._coordinates[index].x;
			coord.y = this._coordinates[index].y;
			coord.z = this._coordinates[index].z;
		}
	}
	getCoordinateCopy(i) {
		return new Coordinate(this._coordinates[i]);
	}
	getDimension() {
		return this._dimension;
	}
	getX(index) {
		return this._coordinates[index].x;
	}
	expandEnvelope(env) {
		for (var i = 0; i < this._coordinates.length; i++) {
			env.expandToInclude(this._coordinates[i]);
		}
		return env;
	}
	copy() {
		var cloneCoordinates = new Array(this.size()).fill(null);
		for (var i = 0; i < this._coordinates.length; i++) {
			cloneCoordinates[i] = this._coordinates[i].copy();
		}
		return new CoordinateArraySequence(cloneCoordinates, this._dimension);
	}
	toString() {
		if (this._coordinates.length > 0) {
			var strBuilder = new StringBuilder(17 * this._coordinates.length);
			strBuilder.append('(');
			strBuilder.append(this._coordinates[0]);
			for (var i = 1; i < this._coordinates.length; i++) {
				strBuilder.append(", ");
				strBuilder.append(this._coordinates[i]);
			}
			strBuilder.append(')');
			return strBuilder.toString();
		} else {
			return "()";
		}
	}
	getY(index) {
		return this._coordinates[index].y;
	}
	toCoordinateArray() {
		return this._coordinates;
	}
	getClass() {
		return CoordinateArraySequence;
	}
	get interfaces_() {
		return [CoordinateSequence, Serializable];
	}
}
CoordinateArraySequence.constructor_ = function () {
	this._dimension = 3;
	this._coordinates = null;
	if (arguments.length === 1) {
		if (arguments[0] instanceof Array) {
			let coordinates = arguments[0];
			CoordinateArraySequence.constructor_.call(this, coordinates, 3);
		} else if (Number.isInteger(arguments[0])) {
			let size = arguments[0];
			this._coordinates = new Array(size).fill(null);
			for (var i = 0; i < size; i++) {
				this._coordinates[i] = new Coordinate();
			}
		} else if (hasInterface(arguments[0], CoordinateSequence)) {
			let coordSeq = arguments[0];
			if (coordSeq === null) {
				this._coordinates = new Array(0).fill(null);
				return null;
			}
			this._dimension = coordSeq.getDimension();
			this._coordinates = new Array(coordSeq.size()).fill(null);
			for (var i = 0; i < this._coordinates.length; i++) {
				this._coordinates[i] = coordSeq.getCoordinateCopy(i);
			}
		}
	} else if (arguments.length === 2) {
		if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
			let coordinates = arguments[0], dimension = arguments[1];
			this._coordinates = coordinates;
			this._dimension = dimension;
			if (coordinates === null) this._coordinates = new Array(0).fill(null);
		} else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
			let size = arguments[0], dimension = arguments[1];
			this._coordinates = new Array(size).fill(null);
			this._dimension = dimension;
			for (var i = 0; i < size; i++) {
				this._coordinates[i] = new Coordinate();
			}
		}
	}
};
CoordinateArraySequence.serialVersionUID = -915438501601840650;
