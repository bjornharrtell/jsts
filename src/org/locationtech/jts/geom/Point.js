import Geometry from './Geometry';
import CoordinateFilter from './CoordinateFilter';
import hasInterface from '../../../../hasInterface';
import GeometryComponentFilter from './GeometryComponentFilter';
import Dimension from './Dimension';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
import Puntal from './Puntal';
import Envelope from './Envelope';
import Assert from '../util/Assert';
export default class Point extends Geometry {
	constructor() {
		super();
		Point.constructor_.apply(this, arguments);
	}
	computeEnvelopeInternal() {
		if (this.isEmpty()) {
			return new Envelope();
		}
		var env = new Envelope();
		env.expandToInclude(this._coordinates.getX(0), this._coordinates.getY(0));
		return env;
	}
	getCoordinates() {
		return this.isEmpty() ? [] : [this.getCoordinate()];
	}
	equalsExact() {
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
		} else return super.equalsExact.apply(this, arguments);
	}
	normalize() {}
	getCoordinate() {
		return this._coordinates.size() !== 0 ? this._coordinates.getCoordinate(0) : null;
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
	}
	getTypeCode() {
		return Geometry.TYPECODE_POINT;
	}
	getDimension() {
		return 0;
	}
	getNumPoints() {
		return this.isEmpty() ? 0 : 1;
	}
	reverse() {
		return this.copy();
	}
	getX() {
		if (this.getCoordinate() === null) {
			throw new IllegalStateException("getX called on empty Point");
		}
		return this.getCoordinate().x;
	}
	compareToSameClass() {
		if (arguments.length === 1) {
			let other = arguments[0];
			var point = other;
			return this.getCoordinate().compareTo(point.getCoordinate());
		} else if (arguments.length === 2) {
			let other = arguments[0], comp = arguments[1];
			var point = other;
			return comp.compare(this._coordinates, point._coordinates);
		}
	}
	apply() {
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
	}
	getBoundary() {
		return this.getFactory().createGeometryCollection();
	}
	getGeometryType() {
		return Geometry.TYPENAME_POINT;
	}
	copy() {
		return new Point(this._coordinates.copy(), this._factory);
	}
	getCoordinateSequence() {
		return this._coordinates;
	}
	getY() {
		if (this.getCoordinate() === null) {
			throw new IllegalStateException("getY called on empty Point");
		}
		return this.getCoordinate().y;
	}
	isEmpty() {
		return this._coordinates.size() === 0;
	}
	init(coordinates) {
		if (coordinates === null) {
			coordinates = this.getFactory().getCoordinateSequenceFactory().create([]);
		}
		Assert.isTrue(coordinates.size() <= 1);
		this._coordinates = coordinates;
	}
	isSimple() {
		return true;
	}
	getClass() {
		return Point;
	}
	get interfaces_() {
		return [Puntal];
	}
}
Point.constructor_ = function () {
	this._coordinates = null;
	let coordinates = arguments[0], factory = arguments[1];
	Geometry.constructor_.call(this, factory);
	this.init(coordinates);
};
Point.serialVersionUID = 4902022702746614570;
