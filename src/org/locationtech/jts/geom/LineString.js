import CGAlgorithms from '../algorithm/CGAlgorithms';
import Geometry from './Geometry';
import CoordinateFilter from './CoordinateFilter';
import BoundaryOp from '../operation/BoundaryOp';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Lineal from './Lineal';
import CoordinateSequences from './CoordinateSequences';
import GeometryComponentFilter from './GeometryComponentFilter';
import Dimension from './Dimension';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
import Envelope from './Envelope';
export default class LineString extends Geometry {
	constructor(...args) {
		super();
		this.points = null;
		if (args.length === 2) {
			let [points, factory] = args;
			super(factory);
			this.init(points);
		}
	}
	get interfaces_() {
		return [Lineal];
	}
	computeEnvelopeInternal() {
		if (this.isEmpty()) {
			return new Envelope();
		}
		return this.points.expandEnvelope(new Envelope());
	}
	isRing() {
		return this.isClosed() && this.isSimple();
	}
	getSortIndex() {
		return Geometry.SORTINDEX_LINESTRING;
	}
	getCoordinates() {
		return this.points.toCoordinateArray();
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherLineString = other;
			if (this.points.size() !== otherLineString.points.size()) {
				return false;
			}
			for (var i = 0; i < this.points.size(); i++) {
				if (!this.equal(this.points.getCoordinate(i), otherLineString.points.getCoordinate(i), tolerance)) {
					return false;
				}
			}
			return true;
		} else return super.equalsExact(...args);
	}
	normalize() {
		for (var i = 0; i < Math.trunc(this.points.size() / 2); i++) {
			var j = this.points.size() - 1 - i;
			if (!this.points.getCoordinate(i).equals(this.points.getCoordinate(j))) {
				if (this.points.getCoordinate(i).compareTo(this.points.getCoordinate(j)) > 0) {
					CoordinateSequences.reverse(this.points);
				}
				return null;
			}
		}
	}
	getCoordinate() {
		if (this.isEmpty()) return null;
		return this.points.getCoordinate(0);
	}
	getBoundaryDimension() {
		if (this.isClosed()) {
			return Dimension.FALSE;
		}
		return 0;
	}
	isClosed() {
		if (this.isEmpty()) {
			return false;
		}
		return this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1));
	}
	getEndPoint() {
		if (this.isEmpty()) {
			return null;
		}
		return this.getPointN(this.getNumPoints() - 1);
	}
	getDimension() {
		return 1;
	}
	getLength() {
		return CGAlgorithms.length(this.points);
	}
	getNumPoints() {
		return this.points.size();
	}
	reverse() {
		var seq = this.points.clone();
		CoordinateSequences.reverse(seq);
		var revLine = this.getFactory().createLineString(seq);
		return revLine;
	}
	compareToSameClass(...args) {
		if (args.length === 1) {
			let [o] = args;
			var line = o;
			var i = 0;
			var j = 0;
			while (i < this.points.size() && j < line.points.size()) {
				var comparison = this.points.getCoordinate(i).compareTo(line.points.getCoordinate(j));
				if (comparison !== 0) {
					return comparison;
				}
				i++;
				j++;
			}
			if (i < this.points.size()) {
				return 1;
			}
			if (j < line.points.size()) {
				return -1;
			}
			return 0;
		} else if (args.length === 2) {
			let [o, comp] = args;
			var line = o;
			return comp.compare(this.points, line.points);
		}
	}
	apply(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateFilter) > -1) {
				let [filter] = args;
				for (var i = 0; i < this.points.size(); i++) {
					filter.filter(this.points.getCoordinate(i));
				}
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFilter) > -1) {
				let [filter] = args;
				if (this.points.size() === 0) return null;
				for (var i = 0; i < this.points.size(); i++) {
					filter.filter(this.points, i);
					if (filter.isDone()) break;
				}
				if (filter.isGeometryChanged()) this.geometryChanged();
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryFilter) > -1) {
				let [filter] = args;
				filter.filter(this);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryComponentFilter) > -1) {
				let [filter] = args;
				filter.filter(this);
			}
		}
	}
	getBoundary() {
		return new BoundaryOp(this).getBoundary();
	}
	isEquivalentClass(other) {
		return other instanceof LineString;
	}
	clone() {
		var ls = super.clone();
		ls.points = this.points.clone();
		return ls;
	}
	getCoordinateN(n) {
		return this.points.getCoordinate(n);
	}
	getGeometryType() {
		return "LineString";
	}
	copy() {
		return new LineString(this.points.copy(), this.factory);
	}
	getCoordinateSequence() {
		return this.points;
	}
	isEmpty() {
		return this.points.size() === 0;
	}
	init(points) {
		if (points === null) {
			points = this.getFactory().getCoordinateSequenceFactory().create([]);
		}
		if (points.size() === 1) {
			throw new IllegalArgumentException("Invalid number of points in LineString (found " + points.size() + " - must be 0 or >= 2)");
		}
		this.points = points;
	}
	isCoordinate(pt) {
		for (var i = 0; i < this.points.size(); i++) {
			if (this.points.getCoordinate(i).equals(pt)) {
				return true;
			}
		}
		return false;
	}
	getStartPoint() {
		if (this.isEmpty()) {
			return null;
		}
		return this.getPointN(0);
	}
	getPointN(n) {
		return this.getFactory().createPoint(this.points.getCoordinate(n));
	}
	getClass() {
		return LineString;
	}
}
LineString.serialVersionUID = 3110669828065365560;

