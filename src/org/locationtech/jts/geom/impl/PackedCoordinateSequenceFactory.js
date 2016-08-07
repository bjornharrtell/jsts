import CoordinateSequenceFactory from '../CoordinateSequenceFactory';
import hasInterface from '../../../../../hasInterface';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import extend from '../../../../../extend';
import CoordinateSequence from '../CoordinateSequence';
export default function PackedCoordinateSequenceFactory() {
	this.type = PackedCoordinateSequenceFactory.DOUBLE;
	this.dimension = 3;
	if (arguments.length === 0) {
		PackedCoordinateSequenceFactory.call(this, PackedCoordinateSequenceFactory.DOUBLE);
	} else if (arguments.length === 1) {
		let type = arguments[0];
		PackedCoordinateSequenceFactory.call(this, type, 3);
	} else if (arguments.length === 2) {
		let type = arguments[0], dimension = arguments[1];
		this.setType(type);
		this.setDimension(dimension);
	}
}
extend(PackedCoordinateSequenceFactory.prototype, {
	create: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Array) {
				let coordinates = arguments[0];
				if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
					return new PackedCoordinateSequence.Double(coordinates, this.dimension);
				} else {
					return new PackedCoordinateSequence.Float(coordinates, this.dimension);
				}
			} else if (hasInterface(arguments[0], CoordinateSequence)) {
				let coordSeq = arguments[0];
				if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
					return new PackedCoordinateSequence.Double(coordSeq.toCoordinateArray(), this.dimension);
				} else {
					return new PackedCoordinateSequence.Float(coordSeq.toCoordinateArray(), this.dimension);
				}
			}
		} else if (arguments.length === 2) {
			if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
				let packedCoordinates = arguments[0], dimension = arguments[1];
				if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
					return new PackedCoordinateSequence.Double(packedCoordinates, dimension);
				} else {
					return new PackedCoordinateSequence.Float(packedCoordinates, dimension);
				}
			} else if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
				let packedCoordinates = arguments[0], dimension = arguments[1];
				if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
					return new PackedCoordinateSequence.Double(packedCoordinates, dimension);
				} else {
					return new PackedCoordinateSequence.Float(packedCoordinates, dimension);
				}
			} else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
				let size = arguments[0], dimension = arguments[1];
				if (this.type === PackedCoordinateSequenceFactory.DOUBLE) {
					return new PackedCoordinateSequence.Double(size, dimension);
				} else {
					return new PackedCoordinateSequence.Float(size, dimension);
				}
			}
		}
	},
	setType: function (type) {
		if (type !== PackedCoordinateSequenceFactory.DOUBLE && type !== PackedCoordinateSequenceFactory.FLOAT) throw new IllegalArgumentException("Unknown type " + type);
		this.type = type;
	},
	getDimension: function () {
		return this.dimension;
	},
	getType: function () {
		return this.type;
	},
	setDimension: function (dimension) {
		this.dimension = dimension;
	},
	interfaces_: function () {
		return [CoordinateSequenceFactory];
	},
	getClass: function () {
		return PackedCoordinateSequenceFactory;
	}
});
PackedCoordinateSequenceFactory.DOUBLE = 0;
PackedCoordinateSequenceFactory.FLOAT = 1;
PackedCoordinateSequenceFactory.DOUBLE_FACTORY = new PackedCoordinateSequenceFactory(PackedCoordinateSequenceFactory.DOUBLE);
PackedCoordinateSequenceFactory.FLOAT_FACTORY = new PackedCoordinateSequenceFactory(PackedCoordinateSequenceFactory.FLOAT);
