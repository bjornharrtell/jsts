import CoordinateSequenceFactory from '../CoordinateSequenceFactory';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import CoordinateSequence from '../CoordinateSequence';
export default class PackedCoordinateSequenceFactory {
	constructor(...args) {
		this.type = PackedCoordinateSequenceFactory.DOUBLE;
		this.dimension = 3;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloaded.call(this, PackedCoordinateSequenceFactory.DOUBLE);
					})(...args);
				case 1:
					return ((...args) => {
						let [type] = args;
						overloaded.call(this, type, 3);
					})(...args);
				case 2:
					return ((...args) => {
						let [type, dimension] = args;
						this.setType(type);
						this.setDimension(dimension);
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [CoordinateSequenceFactory];
	}
	create(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Array) {
					return ((...args) => {
						let [coordinates] = args;
						if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
							return new PackedCoordinateSequence.Double(coordinates, this.dimension);
						} else {
							return new PackedCoordinateSequence.Float(coordinates, this.dimension);
						}
					})(...args);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
					return ((...args) => {
						let [coordSeq] = args;
						if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
							return new PackedCoordinateSequence.Double(coordSeq.toCoordinateArray(), this.dimension);
						} else {
							return new PackedCoordinateSequence.Float(coordSeq.toCoordinateArray(), this.dimension);
						}
					})(...args);
				}
			case 2:
				if (args[0] instanceof Array && Number.isInteger(args[1])) {
					return ((...args) => {
						let [packedCoordinates, dimension] = args;
						if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
							return new PackedCoordinateSequence.Double(packedCoordinates, dimension);
						} else {
							return new PackedCoordinateSequence.Float(packedCoordinates, dimension);
						}
					})(...args);
				} else if (args[0] instanceof Array && Number.isInteger(args[1])) {
					return ((...args) => {
						let [packedCoordinates, dimension] = args;
						if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
							return new PackedCoordinateSequence.Double(packedCoordinates, dimension);
						} else {
							return new PackedCoordinateSequence.Float(packedCoordinates, dimension);
						}
					})(...args);
				} else if (Number.isInteger(args[0]) && Number.isInteger(args[1])) {
					return ((...args) => {
						let [size, dimension] = args;
						if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
							return new PackedCoordinateSequence.Double(size, dimension);
						} else {
							return new PackedCoordinateSequence.Float(size, dimension);
						}
					})(...args);
				}
		}
	}
	setType(type) {
		if (type !== PackedCoordinateSequenceFactory.DOUBLE && type !== PackedCoordinateSequenceFactory.FLOAT) throw new IllegalArgumentException("Unknown type " + type);
		this.type = type;
	}
	getDimension() {
		return this.dimension;
	}
	getType() {
		return this.type;
	}
	setDimension(dimension) {
		this.dimension = dimension;
	}
	getClass() {
		return PackedCoordinateSequenceFactory;
	}
}
PackedCoordinateSequenceFactory.DOUBLE = 0;
PackedCoordinateSequenceFactory.FLOAT = 1;
PackedCoordinateSequenceFactory.DOUBLE_FACTORY = new PackedCoordinateSequenceFactory(PackedCoordinateSequenceFactory.DOUBLE);
PackedCoordinateSequenceFactory.FLOAT_FACTORY = new PackedCoordinateSequenceFactory(PackedCoordinateSequenceFactory.FLOAT);

