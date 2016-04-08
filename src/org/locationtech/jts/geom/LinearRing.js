import LineString from './LineString';
import Geometry from './Geometry';
import hasInterface from '../../../../hasInterface';
import GeometryFactory from './GeometryFactory';
import Coordinate from './Coordinate';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import CoordinateSequences from './CoordinateSequences';
import CoordinateSequence from './CoordinateSequence';
import Dimension from './Dimension';
import inherits from '../../../../inherits';
export default function LinearRing() {
	if (arguments[0] instanceof Coordinate && arguments[1] instanceof GeometryFactory) {
		let points = arguments[0], factory = arguments[1];
		LinearRing.call(this, factory.getCoordinateSequenceFactory().create(points), factory);
	} else if (hasInterface(arguments[0], CoordinateSequence) && arguments[1] instanceof GeometryFactory) {
		let points = arguments[0], factory = arguments[1];
		LineString.call(this, points, factory);
		this.validateConstruction();
	}
}
inherits(LinearRing, LineString);
extend(LinearRing.prototype, {
	getSortIndex: function () {
		return Geometry.SORTINDEX_LINEARRING;
	},
	getBoundaryDimension: function () {
		return Dimension.FALSE;
	},
	isClosed: function () {
		if (this.isEmpty()) {
			return true;
		}
		return LineString.prototype.isClosed.call(this);
	},
	reverse: function () {
		var seq = this.points.copy();
		CoordinateSequences.reverse(seq);
		var rev = this.getFactory().createLinearRing(seq);
		return rev;
	},
	validateConstruction: function () {
		if (!this.isEmpty() && !LineString.prototype.isClosed.call(this)) {
			throw new IllegalArgumentException("Points of LinearRing do not form a closed linestring");
		}
		if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < LinearRing.MINIMUM_VALID_SIZE) {
			throw new IllegalArgumentException("Invalid number of points in LinearRing (found " + this.getCoordinateSequence().size() + " - must be 0 or >= 4)");
		}
	},
	getGeometryType: function () {
		return "LinearRing";
	},
	copy: function () {
		return new LinearRing(this.points.copy(), this.factory);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LinearRing;
	}
});
LinearRing.MINIMUM_VALID_SIZE = 4;
LinearRing.serialVersionUID = -4261142084085851829;

