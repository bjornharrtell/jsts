import Geometry from './Geometry';
import CoordinateFilter from './CoordinateFilter';
import GeometryComponentFilter from './GeometryComponentFilter';
import Dimension from './Dimension';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
import Puntal from './Puntal';
import Envelope from './Envelope';
import Assert from '../util/Assert';
export default class Point extends Geometry {
	constructor(...args) {
		super();
		this.coordinates = null;
		switch (args.length) {
			case 2:
				{
					let [coordinates, factory] = args;
					super(factory);
					this.init(coordinates);
					break;
				}
		}
	}
	get interfaces_() {
		return [Puntal];
	}
	computeEnvelopeInternal() {
		if (this.isEmpty()) {
			return new Envelope();
		}
		var env = new Envelope();
		env.expandToInclude(this.coordinates.getX(0), this.coordinates.getY(0));
		return env;
	}
	getSortIndex() {
		return Geometry.SORTINDEX_POINT;
	}
	getCoordinates() {
		return this.isEmpty() ? [] : [this.getCoordinate()];
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
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
		} else return super.equalsExact(...args);
	}
	normalize() {}
	getCoordinate() {
		return this.coordinates.size() !== 0 ? this.coordinates.getCoordinate(0) : null;
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
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
	compareToSameClass(...args) {
		switch (args.length) {
			case 1:
				{
					let [other] = args;
					var point = other;
					return this.getCoordinate().compareTo(point.getCoordinate());
					break;
				}
			case 2:
				{
					let [other, comp] = args;
					var point = other;
					return comp.compare(this.coordinates, point.coordinates);
					break;
				}
		}
	}
	apply(...args) {
		switch (args.length) {
			case 1:
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateFilter) > -1) {
					let [filter] = args;
					if (this.isEmpty()) {
						return null;
					}
					filter.filter(this.getCoordinate());
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFilter) > -1) {
					let [filter] = args;
					if (this.isEmpty()) return null;
					filter.filter(this.coordinates, 0);
					if (filter.isGeometryChanged()) this.geometryChanged();
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryFilter) > -1) {
					let [filter] = args;
					filter.filter(this);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryComponentFilter) > -1) {
					let [filter] = args;
					filter.filter(this);
				}
				break;
		}
	}
	getBoundary() {
		return this.getFactory().createGeometryCollection(null);
	}
	clone() {
		var p = super.clone();
		p.coordinates = this.coordinates.clone();
		return p;
	}
	getGeometryType() {
		return "Point";
	}
	copy() {
		return new Point(this.coordinates.copy(), this.factory);
	}
	getCoordinateSequence() {
		return this.coordinates;
	}
	getY() {
		if (this.getCoordinate() === null) {
			throw new IllegalStateException("getY called on empty Point");
		}
		return this.getCoordinate().y;
	}
	isEmpty() {
		return this.coordinates.size() === 0;
	}
	init(coordinates) {
		if (coordinates === null) {
			coordinates = this.getFactory().getCoordinateSequenceFactory().create([]);
		}
		Assert.isTrue(coordinates.size() <= 1);
		this.coordinates = coordinates;
	}
	isSimple() {
		return true;
	}
	getClass() {
		return Point;
	}
}
Point.serialVersionUID = 4902022702746614570;

