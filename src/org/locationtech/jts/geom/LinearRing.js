import LineString from './LineString';
import Geometry from './Geometry';
import GeometryFactory from './GeometryFactory';
import Coordinate from './Coordinate';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import CoordinateSequences from './CoordinateSequences';
import CoordinateSequence from './CoordinateSequence';
import Dimension from './Dimension';
export default class LinearRing extends LineString {
	constructor(...args) {
		super();
		const overloaded = (...args) => {
			switch (args.length) {
				case 2:
					if (args[0] instanceof Coordinate && args[1] instanceof GeometryFactory) {
						return ((...args) => {
							let [points, factory] = args;
							overloaded.call(this, factory.getCoordinateSequenceFactory().create(points), factory);
						})(...args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1 && args[1] instanceof GeometryFactory) {
						return ((...args) => {
							let [points, factory] = args;
							super(points, factory);
							this.validateConstruction();
						})(...args);
					}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_LINEARRING;
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
	}
	isClosed() {
		if (this.isEmpty()) {
			return true;
		}
		return super.isClosed();
	}
	reverse() {
		var seq = this.points.clone();
		CoordinateSequences.reverse(seq);
		var rev = this.getFactory().createLinearRing(seq);
		return rev;
	}
	validateConstruction() {
		if (!this.isEmpty() && !super.isClosed()) {
			throw new IllegalArgumentException("Points of LinearRing do not form a closed linestring");
		}
		if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < LinearRing.MINIMUM_VALID_SIZE) {
			throw new IllegalArgumentException("Invalid number of points in LinearRing (found " + this.getCoordinateSequence().size() + " - must be 0 or >= 4)");
		}
	}
	getGeometryType() {
		return "LinearRing";
	}
	copy() {
		return new LinearRing(this.points.copy(), this.factory);
	}
	getClass() {
		return LinearRing;
	}
}
LinearRing.MINIMUM_VALID_SIZE = 4;
LinearRing.serialVersionUID = -4261142084085851829;

