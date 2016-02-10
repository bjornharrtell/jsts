import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Double from '../../../../../java/lang/Double';
import SoftReference from '../../../../../java/lang/ref/SoftReference';
import CoordinateSequences from '../CoordinateSequences';
import System from '../../../../../java/lang/System';
import CoordinateSequence from '../CoordinateSequence';
export default class PackedCoordinateSequence {
	constructor(...args) {
		this.dimension = null;
		this.coordRef = null;
	}
	get interfaces_() {
		return [CoordinateSequence];
	}
	static get Double() {
		return Double;
	}
	static get Float() {
		return Float;
	}
	getCoordinate(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [i] = args;
						var coords = this.getCachedCoords();
						if (coords !== null) return coords[i]; else return this.getCoordinateInternal(i);
					})(...args);
				case 2:
					return ((...args) => {
						let [i, coord] = args;
						coord.x = this.getOrdinate(i, 0);
						coord.y = this.getOrdinate(i, 1);
						if (this.dimension > 2) coord.z = this.getOrdinate(i, 2);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	setX(index, value) {
		this.coordRef = null;
		this.setOrdinate(index, 0, value);
	}
	getCoordinateCopy(i) {
		return this.getCoordinateInternal(i);
	}
	getDimension() {
		return this.dimension;
	}
	getX(index) {
		return this.getOrdinate(index, 0);
	}
	toString() {
		return CoordinateSequences.toString(this);
	}
	getCachedCoords() {
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
	}
	getY(index) {
		return this.getOrdinate(index, 1);
	}
	toCoordinateArray() {
		var coords = this.getCachedCoords();
		if (coords !== null) return coords;
		coords = new Array(this.size());
		for (var i = 0; i < coords.length; i++) {
			coords[i] = this.getCoordinateInternal(i);
		}
		this.coordRef = new SoftReference(coords);
		return coords;
	}
	setY(index, value) {
		this.coordRef = null;
		this.setOrdinate(index, 1, value);
	}
	getClass() {
		return PackedCoordinateSequence;
	}
}
class Double extends PackedCoordinateSequence {
	constructor(...args) {
		super();
		this.coords = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [coordinates] = args;
						overloads.call(this, coordinates, 3);
					})(...args);
				case 2:
					if (args[0] instanceof Array && Number.isInteger(args[1])) {
						return ((...args) => {
							let [coords, dimensions] = args;
							if (dimensions < 2) {
								throw new IllegalArgumentException("Must have at least 2 dimensions");
							}
							if (coords.length % dimensions !== 0) {
								throw new IllegalArgumentException("Packed array does not contain " + "an integral number of coordinates");
							}
							this.dimension = dimensions;
							this.coords = coords;
						})(...args);
					} else if (args[0] instanceof Array && Number.isInteger(args[1])) {
						return ((...args) => {
							let [coordinates, dimensions] = args;
							this.coords = new Array(coordinates.length);
							this.dimension = dimensions;
							for (var i = 0; i < coordinates.length; i++) {
								this.coords[i] = coordinates[i];
							}
						})(...args);
					} else if (args[0] instanceof Array && Number.isInteger(args[1])) {
						return ((...args) => {
							let [coordinates, dimension] = args;
							if (coordinates === null) coordinates = new Array(0);
							this.dimension = dimension;
							this.coords = new Array(coordinates.length * this.dimension);
							for (var i = 0; i < coordinates.length; i++) {
								this.coords[i * this.dimension] = coordinates[i].x;
								if (this.dimension >= 2) this.coords[i * this.dimension + 1] = coordinates[i].y;
								if (this.dimension >= 3) this.coords[i * this.dimension + 2] = coordinates[i].z;
							}
						})(...args);
					} else if (Number.isInteger(args[0]) && Number.isInteger(args[1])) {
						return ((...args) => {
							let [size, dimension] = args;
							this.dimension = dimension;
							this.coords = new Array(size * this.dimension);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	setOrdinate(index, ordinate, value) {
		this.coordRef = null;
		this.coords[index * this.dimension + ordinate] = value;
	}
	size() {
		return Math.trunc(this.coords.length / this.dimension);
	}
	getOrdinate(index, ordinate) {
		return this.coords[index * this.dimension + ordinate];
	}
	getCoordinateInternal(i) {
		var x = this.coords[i * this.dimension];
		var y = this.coords[i * this.dimension + 1];
		var z = this.dimension === 2 ? Coordinate.NULL_ORDINATE : this.coords[i * this.dimension + 2];
		return new Coordinate(x, y, z);
	}
	getRawCoordinates() {
		return this.coords;
	}
	clone() {
		var clone = new Array(this.coords.length);
		System.arraycopy(this.coords, 0, clone, 0, this.coords.length);
		return new Double(clone, this.dimension);
	}
	expandEnvelope(env) {
		for (var i = 0; i < this.coords.length; i += this.dimension) {
			env.expandToInclude(this.coords[i], this.coords[i + 1]);
		}
		return env;
	}
	copy() {
		var clone = new Array(this.coords.length);
		System.arraycopy(this.coords, 0, clone, 0, this.coords.length);
		return new Double(clone, this.dimension);
	}
	getClass() {
		return Double;
	}
}
class Float extends PackedCoordinateSequence {
	constructor(...args) {
		super();
		this.coords = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					if (args[0] instanceof Array && Number.isInteger(args[1])) {
						return ((...args) => {
							let [coords, dimensions] = args;
							if (dimensions < 2) {
								throw new IllegalArgumentException("Must have at least 2 dimensions");
							}
							if (coords.length % dimensions !== 0) {
								throw new IllegalArgumentException("Packed array does not contain " + "an integral number of coordinates");
							}
							this.dimension = dimensions;
							this.coords = coords;
						})(...args);
					} else if (args[0] instanceof Array && Number.isInteger(args[1])) {
						return ((...args) => {
							let [coordinates, dimensions] = args;
							this.coords = new Array(coordinates.length);
							this.dimension = dimensions;
							for (var i = 0; i < coordinates.length; i++) {
								this.coords[i] = coordinates[i];
							}
						})(...args);
					} else if (args[0] instanceof Array && Number.isInteger(args[1])) {
						return ((...args) => {
							let [coordinates, dimension] = args;
							if (coordinates === null) coordinates = new Array(0);
							this.dimension = dimension;
							this.coords = new Array(coordinates.length * this.dimension);
							for (var i = 0; i < coordinates.length; i++) {
								this.coords[i * this.dimension] = coordinates[i].x;
								if (this.dimension >= 2) this.coords[i * this.dimension + 1] = coordinates[i].y;
								if (this.dimension >= 3) this.coords[i * this.dimension + 2] = coordinates[i].z;
							}
						})(...args);
					} else if (Number.isInteger(args[0]) && Number.isInteger(args[1])) {
						return ((...args) => {
							let [size, dimension] = args;
							this.dimension = dimension;
							this.coords = new Array(size * this.dimension);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	setOrdinate(index, ordinate, value) {
		this.coordRef = null;
		this.coords[index * this.dimension + ordinate] = value;
	}
	size() {
		return Math.trunc(this.coords.length / this.dimension);
	}
	getOrdinate(index, ordinate) {
		return this.coords[index * this.dimension + ordinate];
	}
	getCoordinateInternal(i) {
		var x = this.coords[i * this.dimension];
		var y = this.coords[i * this.dimension + 1];
		var z = this.dimension === 2 ? Coordinate.NULL_ORDINATE : this.coords[i * this.dimension + 2];
		return new Coordinate(x, y, z);
	}
	getRawCoordinates() {
		return this.coords;
	}
	clone() {
		var clone = new Array(this.coords.length);
		System.arraycopy(this.coords, 0, clone, 0, this.coords.length);
		return new Float(clone, this.dimension);
	}
	expandEnvelope(env) {
		for (var i = 0; i < this.coords.length; i += this.dimension) {
			env.expandToInclude(this.coords[i], this.coords[i + 1]);
		}
		return env;
	}
	copy() {
		var clone = new Array(this.coords.length);
		System.arraycopy(this.coords, 0, clone, 0, this.coords.length);
		return new Float(clone, this.dimension);
	}
	getClass() {
		return Float;
	}
}

