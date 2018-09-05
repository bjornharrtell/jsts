import LineString from './LineString';
import Geometry from './Geometry';
import hasInterface from '../../../../hasInterface';
import GeometryFactory from './GeometryFactory';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import CoordinateSequences from './CoordinateSequences';
import CoordinateSequence from './CoordinateSequence';
import Dimension from './Dimension';
export default class LinearRing extends LineString {
	constructor() {
		super();
		LinearRing.constructor_.apply(this, arguments);
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
	}
	isClosed() {
		if (this.isEmpty()) {
			return true;
		}
		return super.isClosed.call(this);
	}
	getTypeCode() {
		return Geometry.TYPECODE_LINEARRING;
	}
	reverse() {
		var seq = this._points.copy();
		CoordinateSequences.reverse(seq);
		var rev = this.getFactory().createLinearRing(seq);
		return rev;
	}
	validateConstruction() {
		if (!this.isEmpty() && !super.isClosed.call(this)) {
			throw new IllegalArgumentException("Points of LinearRing do not form a closed linestring");
		}
		if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < LinearRing.MINIMUM_VALID_SIZE) {
			throw new IllegalArgumentException("Invalid number of points in LinearRing (found " + this.getCoordinateSequence().size() + " - must be 0 or >= 4)");
		}
	}
	getGeometryType() {
		return Geometry.TYPENAME_LINEARRING;
	}
	copy() {
		return new LinearRing(this._points.copy(), this._factory);
	}
	getClass() {
		return LinearRing;
	}
	get interfaces_() {
		return [];
	}
}
LinearRing.constructor_ = function () {
	if (arguments[0] instanceof Array && arguments[1] instanceof GeometryFactory) {
		let points = arguments[0], factory = arguments[1];
		LinearRing.constructor_.call(this, factory.getCoordinateSequenceFactory().create(points), factory);
	} else if (hasInterface(arguments[0], CoordinateSequence) && arguments[1] instanceof GeometryFactory) {
		let points = arguments[0], factory = arguments[1];
		LineString.constructor_.call(this, points, factory);
		this.validateConstruction();
	}
};
LinearRing.MINIMUM_VALID_SIZE = 4;
LinearRing.serialVersionUID = -4261142084085851829;
