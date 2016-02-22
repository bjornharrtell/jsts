import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
import SoftReference from '../../../../../java/lang/ref/SoftReference';
import CoordinateSequences from '../CoordinateSequences';
import System from '../../../../../java/lang/System';
import CoordinateSequence from '../CoordinateSequence';
import inherits from '../../../../../inherits';
export default function PackedCoordinateSequence() {
	this.dimension = null;
	this.coordRef = null;
}
extend(PackedCoordinateSequence.prototype, {
	getCoordinate: function () {
		if (arguments.length === 1) {
			let i = arguments[0];
			var coords = this.getCachedCoords();
			if (coords !== null) return coords[i]; else return this.getCoordinateInternal(i);
		} else if (arguments.length === 2) {
			let i = arguments[0], coord = arguments[1];
			coord.x = this.getOrdinate(i, 0);
			coord.y = this.getOrdinate(i, 1);
			if (this.dimension > 2) coord.z = this.getOrdinate(i, 2);
		}
	},
	setX: function (index, value) {
		this.coordRef = null;
		this.setOrdinate(index, 0, value);
	},
	getCoordinateCopy: function (i) {
		return this.getCoordinateInternal(i);
	},
	getDimension: function () {
		return this.dimension;
	},
	getX: function (index) {
		return this.getOrdinate(index, 0);
	},
	toString: function () {
		return CoordinateSequences.toString(this);
	},
	getCachedCoords: function () {
		if (this.coordRef !== null) {
			var coords = this.coordRef.get();
			if (coords !== null) {
				return coords;
			} else {
				this.coordRef = null;
				return null;
			}
		} else {
			return null;
		}
	},
	getY: function (index) {
		return this.getOrdinate(index, 1);
	},
	toCoordinateArray: function () {
		var coords = this.getCachedCoords();
		if (coords !== null) return coords;
		coords = new Array(this.size()).fill(null);
		for (var i = 0; i < coords.length; i++) {
			coords[i] = this.getCoordinateInternal(i);
		}
		this.coordRef = new SoftReference(coords);
		return coords;
	},
	setY: function (index, value) {
		this.coordRef = null;
		this.setOrdinate(index, 1, value);
	},
	interfaces_: function () {
		return [CoordinateSequence];
	},
	getClass: function () {
		return PackedCoordinateSequence;
	}
});
function Double() {
	PackedCoordinateSequence.apply(this);
	this.coords = null;
	if (arguments.length === 1) {
		let coordinates = arguments[0];
		Double.call(this, coordinates, 3);
	} else if (arguments.length === 2) {
		if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
			let coords = arguments[0], dimensions = arguments[1];
			if (dimensions < 2) {
				throw new IllegalArgumentException("Must have at least 2 dimensions");
			}
			if (coords.length % dimensions !== 0) {
				throw new IllegalArgumentException("Packed array does not contain " + "an integral number of coordinates");
			}
			this.dimension = dimensions;
			this.coords = coords;
		} else if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
			let coordinates = arguments[0], dimensions = arguments[1];
			this.coords = new Array(coordinates.length).fill(null);
			this.dimension = dimensions;
			for (var i = 0; i < coordinates.length; i++) {
				this.coords[i] = coordinates[i];
			}
		} else if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
			let coordinates = arguments[0], dimension = arguments[1];
			if (coordinates === null) coordinates = new Array(0).fill(null);
			this.dimension = dimension;
			this.coords = new Array(coordinates.length * this.dimension).fill(null);
			for (var i = 0; i < coordinates.length; i++) {
				this.coords[i * this.dimension] = coordinates[i].x;
				if (this.dimension >= 2) this.coords[i * this.dimension + 1] = coordinates[i].y;
				if (this.dimension >= 3) this.coords[i * this.dimension + 2] = coordinates[i].z;
			}
		} else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
			let size = arguments[0], dimension = arguments[1];
			this.dimension = dimension;
			this.coords = new Array(size * this.dimension).fill(null);
		}
	}
}
inherits(Double, PackedCoordinateSequence);
extend(Double.prototype, {
	setOrdinate: function (index, ordinate, value) {
		this.coordRef = null;
		this.coords[index * this.dimension + ordinate] = value;
	},
	size: function () {
		return Math.trunc(this.coords.length / this.dimension);
	},
	getOrdinate: function (index, ordinate) {
		return this.coords[index * this.dimension + ordinate];
	},
	getCoordinateInternal: function (i) {
		var x = this.coords[i * this.dimension];
		var y = this.coords[i * this.dimension + 1];
		var z = this.dimension === 2 ? Coordinate.NULL_ORDINATE : this.coords[i * this.dimension + 2];
		return new Coordinate(x, y, z);
	},
	getRawCoordinates: function () {
		return this.coords;
	},
	clone: function () {
		var clone = new Array(this.coords.length).fill(null);
		System.arraycopy(this.coords, 0, clone, 0, this.coords.length);
		return new Double(clone, this.dimension);
	},
	expandEnvelope: function (env) {
		for (var i = 0; i < this.coords.length; i += this.dimension) {
			env.expandToInclude(this.coords[i], this.coords[i + 1]);
		}
		return env;
	},
	copy: function () {
		var clone = new Array(this.coords.length).fill(null);
		System.arraycopy(this.coords, 0, clone, 0, this.coords.length);
		return new Double(clone, this.dimension);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Double;
	}
});
function Float() {
	PackedCoordinateSequence.apply(this);
	this.coords = null;
	if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
		let coords = arguments[0], dimensions = arguments[1];
		if (dimensions < 2) {
			throw new IllegalArgumentException("Must have at least 2 dimensions");
		}
		if (coords.length % dimensions !== 0) {
			throw new IllegalArgumentException("Packed array does not contain " + "an integral number of coordinates");
		}
		this.dimension = dimensions;
		this.coords = coords;
	} else if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
		let coordinates = arguments[0], dimensions = arguments[1];
		this.coords = new Array(coordinates.length).fill(null);
		this.dimension = dimensions;
		for (var i = 0; i < coordinates.length; i++) {
			this.coords[i] = coordinates[i];
		}
	} else if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
		let coordinates = arguments[0], dimension = arguments[1];
		if (coordinates === null) coordinates = new Array(0).fill(null);
		this.dimension = dimension;
		this.coords = new Array(coordinates.length * this.dimension).fill(null);
		for (var i = 0; i < coordinates.length; i++) {
			this.coords[i * this.dimension] = coordinates[i].x;
			if (this.dimension >= 2) this.coords[i * this.dimension + 1] = coordinates[i].y;
			if (this.dimension >= 3) this.coords[i * this.dimension + 2] = coordinates[i].z;
		}
	} else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
		let size = arguments[0], dimension = arguments[1];
		this.dimension = dimension;
		this.coords = new Array(size * this.dimension).fill(null);
	}
}
inherits(Float, PackedCoordinateSequence);
extend(Float.prototype, {
	setOrdinate: function (index, ordinate, value) {
		this.coordRef = null;
		this.coords[index * this.dimension + ordinate] = value;
	},
	size: function () {
		return Math.trunc(this.coords.length / this.dimension);
	},
	getOrdinate: function (index, ordinate) {
		return this.coords[index * this.dimension + ordinate];
	},
	getCoordinateInternal: function (i) {
		var x = this.coords[i * this.dimension];
		var y = this.coords[i * this.dimension + 1];
		var z = this.dimension === 2 ? Coordinate.NULL_ORDINATE : this.coords[i * this.dimension + 2];
		return new Coordinate(x, y, z);
	},
	getRawCoordinates: function () {
		return this.coords;
	},
	clone: function () {
		var clone = new Array(this.coords.length).fill(null);
		System.arraycopy(this.coords, 0, clone, 0, this.coords.length);
		return new Float(clone, this.dimension);
	},
	expandEnvelope: function (env) {
		for (var i = 0; i < this.coords.length; i += this.dimension) {
			env.expandToInclude(this.coords[i], this.coords[i + 1]);
		}
		return env;
	},
	copy: function () {
		var clone = new Array(this.coords.length).fill(null);
		System.arraycopy(this.coords, 0, clone, 0, this.coords.length);
		return new Float(clone, this.dimension);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Float;
	}
});
PackedCoordinateSequence.Double = Double;
PackedCoordinateSequence.Float = Float;

