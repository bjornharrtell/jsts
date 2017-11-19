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
	this._coordinates = null;
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
		env.expandToInclude(this._coordinates.getX(0), this._coordinates.getY(0));
		return env;
	},
	getCoordinates: function () {
		return this.isEmpty() ? [] : [this.getCoordinate()];
	},
	equalsExact: function () {
		if (arguments.length === 2 && (typeof arguments[1] === "number" && arguments[0] instanceof Geometry)) {
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
		return this._coordinates.size() !== 0 ? this._coordinates.getCoordinate(0) : null;
	},
	getBoundaryDimension: function () {
		return Dimension.FALSE;
	},
	getTypeCode: function () {
		return Geometry.TYPECODE_POINT;
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
			return comp.compare(this._coordinates, point._coordinates);
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
			filter.filter(this._coordinates, 0);
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
		return this.getFactory().createGeometryCollection();
	},
	getGeometryType: function () {
		return Geometry.TYPENAME_POINT;
	},
	copy: function () {
		return new Point(this._coordinates.copy(), this._factory);
	},
	getCoordinateSequence: function () {
		return this._coordinates;
	},
	getY: function () {
		if (this.getCoordinate() === null) {
			throw new IllegalStateException("getY called on empty Point");
		}
		return this.getCoordinate().y;
	},
	isEmpty: function () {
		return this._coordinates.size() === 0;
	},
	init: function (coordinates) {
		if (coordinates === null) {
			coordinates = this.getFactory().getCoordinateSequenceFactory().create([]);
		}
		Assert.isTrue(coordinates.size() <= 1);
		this._coordinates = coordinates;
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
