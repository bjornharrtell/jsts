import StringBuffer from '../../../../../java/lang/StringBuffer';
import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Double from '../../../../../java/lang/Double';
import CoordinateSequence from '../CoordinateSequence';
import Serializable from '../../../../../java/io/Serializable';
export default class CoordinateArraySequence {
	constructor(...args) {
		this.dimension = 3;
		this.coordinates = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Array) {
						return ((...args) => {
							let [coordinates] = args;
							overloaded.call(this, coordinates, 3);
						})(...args);
					} else if (Number.isInteger(args[0])) {
						return ((...args) => {
							let [size] = args;
							this.coordinates = new Array(size);
							for (var i = 0; i < size; i++) {
								this.coordinates[i] = new Coordinate();
							}
						})(...args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
						return ((...args) => {
							let [coordSeq] = args;
							if (coordSeq === null) {
								this.coordinates = new Array(0);
								return null;
							}
							this.dimension = coordSeq.getDimension();
							this.coordinates = new Array(coordSeq.size());
							for (var i = 0; i < this.coordinates.length; i++) {
								this.coordinates[i] = coordSeq.getCoordinateCopy(i);
							}
						})(...args);
					}
				case 2:
					if (args[0] instanceof Array && Number.isInteger(args[1])) {
						return ((...args) => {
							let [coordinates, dimension] = args;
							this.coordinates = coordinates;
							this.dimension = dimension;
							if (coordinates === null) this.coordinates = new Array(0);
						})(...args);
					} else if (Number.isInteger(args[0]) && Number.isInteger(args[1])) {
						return ((...args) => {
							let [size, dimension] = args;
							this.coordinates = new Array(size);
							this.dimension = dimension;
							for (var i = 0; i < size; i++) {
								this.coordinates[i] = new Coordinate();
							}
						})(...args);
					}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [CoordinateSequence, Serializable];
	}
	setOrdinate(index, ordinateIndex, value) {
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
	}
	size() {
		return this.coordinates.length;
	}
	getOrdinate(index, ordinateIndex) {
		switch (ordinateIndex) {
			case CoordinateSequence.X:
				return this.coordinates[index].x;
			case CoordinateSequence.Y:
				return this.coordinates[index].y;
			case CoordinateSequence.Z:
				return this.coordinates[index].z;
		}
		return Double.NaN;
	}
	getCoordinate(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [i] = args;
					return this.coordinates[i];
				})(...args);
			case 2:
				return ((...args) => {
					let [index, coord] = args;
					coord.x = this.coordinates[index].x;
					coord.y = this.coordinates[index].y;
					coord.z = this.coordinates[index].z;
				})(...args);
		}
	}
	getCoordinateCopy(i) {
		return new Coordinate(this.coordinates[i]);
	}
	getDimension() {
		return this.dimension;
	}
	getX(index) {
		return this.coordinates[index].x;
	}
	clone() {
		var cloneCoordinates = new Array(this.size());
		for (var i = 0; i < this.coordinates.length; i++) {
			cloneCoordinates[i] = this.coordinates[i].clone();
		}
		return new CoordinateArraySequence(cloneCoordinates, this.dimension);
	}
	expandEnvelope(env) {
		for (var i = 0; i < this.coordinates.length; i++) {
			env.expandToInclude(this.coordinates[i]);
		}
		return env;
	}
	copy() {
		var cloneCoordinates = new Array(this.size());
		for (var i = 0; i < this.coordinates.length; i++) {
			cloneCoordinates[i] = this.coordinates[i].copy();
		}
		return new CoordinateArraySequence(cloneCoordinates, this.dimension);
	}
	toString() {
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
	}
	getY(index) {
		return this.coordinates[index].y;
	}
	toCoordinateArray() {
		return this.coordinates;
	}
	getClass() {
		return CoordinateArraySequence;
	}
}
CoordinateArraySequence.serialVersionUID = -915438501601840650;

