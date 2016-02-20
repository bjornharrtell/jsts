import Geometry from './Geometry';
import CoordinateFilter from './CoordinateFilter';
import hasInterface from '../../../../hasInterface';
import extend from '../../../../extend';
import GeometryComponentFilter from './GeometryComponentFilter';
import Dimension from './Dimension';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
import Puntal from './Puntal';
import Envelope from './Envelope';
import Assert from '../util/Assert';
import inherits from '../../../../inherits';
export default function Point() {
	this.coordinates = null;
	let coordinates = arguments[0], factory = arguments[1];
	Geometry.call(this, factory);
	this.init(coordinates);
}
inherits(Point, Geometry);
extend(Point.prototype, {
	computeEnvelopeInternal: function () {
		if (this.isEmpty()) {
			return new Envelope();
		}
		var env = new Envelope();
		env.expandToInclude(this.coordinates.getX(0), this.coordinates.getY(0));
		return env;
	},
	getSortIndex: function () {
		return Geometry.SORTINDEX_POINT;
	},
	getCoordinates: function () {
		return this.isEmpty() ? [] : [this.getCoordinate()];
	},
	equalsExact: function () {
		if (arguments.length === 2) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			if (this.isEmpty() && other.isEmpty()) {
				return true;
			}
			if (this.isEmpty() !== other.isEmpty()) {
				return false;
			}
			return this.equal(other.getCoordinate(), this.getCoordinate(), tolerance);
		} else return Geometry.prototype.equalsExact.apply(this, arguments);
	},
	normalize: function () {},
	getCoordinate: function () {
		return this.coordinates.size() !== 0 ? this.coordinates.getCoordinate(0) : null;
	},
	getBoundaryDimension: function () {
		return Dimension.FALSE;
	},
	getDimension: function () {
		return 0;
	},
	getNumPoints: function () {
		return this.isEmpty() ? 0 : 1;
	},
	reverse: function () {
		return this.copy();
	},
	getX: function () {
		if (this.getCoordinate() === null) {
			throw new IllegalStateException("getX called on empty Point");
		}
		return this.getCoordinate().x;
	},
	compareToSameClass: function () {
		if (arguments.length === 1) {
			let other = arguments[0];
			var point = other;
			return this.getCoordinate().compareTo(point.getCoordinate());
		} else if (arguments.length === 2) {
			let other = arguments[0], comp = arguments[1];
			var point = other;
			return comp.compare(this.coordinates, point.coordinates);
		}
	},
	apply: function () {
		if (hasInterface(arguments[0], CoordinateFilter)) {
			let filter = arguments[0];
			if (this.isEmpty()) {
				return null;
			}
			filter.filter(this.getCoordinate());
		} else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
			let filter = arguments[0];
			if (this.isEmpty()) return null;
			filter.filter(this.coordinates, 0);
			if (filter.isGeometryChanged()) this.geometryChanged();
		} else if (hasInterface(arguments[0], GeometryFilter)) {
			let filter = arguments[0];
			filter.filter(this);
		} else if (hasInterface(arguments[0], GeometryComponentFilter)) {
			let filter = arguments[0];
			filter.filter(this);
		}
	},
	getBoundary: function () {
		return this.getFactory().createGeometryCollection(null);
	},
	clone: function () {
		var p = Geometry.prototype.clone.call(this);
		p.coordinates = this.coordinates.clone();
		return p;
	},
	getGeometryType: function () {
		return "Point";
	},
	copy: function () {
		return new Point(this.coordinates.copy(), this.factory);
	},
	getCoordinateSequence: function () {
		return this.coordinates;
	},
	getY: function () {
		if (this.getCoordinate() === null) {
			throw new IllegalStateException("getY called on empty Point");
		}
		return this.getCoordinate().y;
	},
	isEmpty: function () {
		return this.coordinates.size() === 0;
	},
	init: function (coordinates) {
		if (coordinates === null) {
			coordinates = this.getFactory().getCoordinateSequenceFactory().create([]);
		}
		Assert.isTrue(coordinates.size() <= 1);
		this.coordinates = coordinates;
	},
	isSimple: function () {
		return true;
	},
	interfaces_: function () {
		return [Puntal];
	},
	getClass: function () {
		return Point;
	}
});
Point.serialVersionUID = 4902022702746614570;

