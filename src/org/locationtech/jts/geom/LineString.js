import CGAlgorithms from '../algorithm/CGAlgorithms';
import Geometry from './Geometry';
import CoordinateFilter from './CoordinateFilter';
import hasInterface from '../../../../hasInterface';
import BoundaryOp from '../operation/BoundaryOp';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import Lineal from './Lineal';
import CoordinateSequences from './CoordinateSequences';
import GeometryComponentFilter from './GeometryComponentFilter';
import Dimension from './Dimension';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
import Envelope from './Envelope';
import inherits from '../../../../inherits';
export default function LineString() {
	this._points = null;
	let points = arguments[0], factory = arguments[1];
	Geometry.call(this, factory);
	this.init(points);
}
inherits(LineString, Geometry);
extend(LineString.prototype, {
	computeEnvelopeInternal: function () {
		if (this.isEmpty()) {
			return new Envelope();
		}
		return this._points.expandEnvelope(new Envelope());
	},
	isRing: function () {
		return this.isClosed() && this.isSimple();
	},
	getSortIndex: function () {
		return Geometry.SORTINDEX_LINESTRING;
	},
	getCoordinates: function () {
		return this._points.toCoordinateArray();
	},
	equalsExact: function () {
		if (arguments.length === 2) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherLineString = other;
			if (this._points.size() !== otherLineString._points.size()) {
				return false;
			}
			for (var i = 0; i < this._points.size(); i++) {
				if (!this.equal(this._points.getCoordinate(i), otherLineString._points.getCoordinate(i), tolerance)) {
					return false;
				}
			}
			return true;
		} else return Geometry.prototype.equalsExact.apply(this, arguments);
	},
	normalize: function () {
		for (var i = 0; i < Math.trunc(this._points.size() / 2); i++) {
			var j = this._points.size() - 1 - i;
			if (!this._points.getCoordinate(i).equals(this._points.getCoordinate(j))) {
				if (this._points.getCoordinate(i).compareTo(this._points.getCoordinate(j)) > 0) {
					CoordinateSequences.reverse(this._points);
				}
				return null;
			}
		}
	},
	getCoordinate: function () {
		if (this.isEmpty()) return null;
		return this._points.getCoordinate(0);
	},
	getBoundaryDimension: function () {
		if (this.isClosed()) {
			return Dimension.FALSE;
		}
		return 0;
	},
	isClosed: function () {
		if (this.isEmpty()) {
			return false;
		}
		return this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1));
	},
	getEndPoint: function () {
		if (this.isEmpty()) {
			return null;
		}
		return this.getPointN(this.getNumPoints() - 1);
	},
	getDimension: function () {
		return 1;
	},
	getLength: function () {
		return CGAlgorithms.computeLength(this._points);
	},
	getNumPoints: function () {
		return this._points.size();
	},
	reverse: function () {
		var seq = this._points.copy();
		CoordinateSequences.reverse(seq);
		var revLine = this.getFactory().createLineString(seq);
		return revLine;
	},
	compareToSameClass: function () {
		if (arguments.length === 1) {
			let o = arguments[0];
			var line = o;
			var i = 0;
			var j = 0;
			while (i < this._points.size() && j < line._points.size()) {
				var comparison = this._points.getCoordinate(i).compareTo(line._points.getCoordinate(j));
				if (comparison !== 0) {
					return comparison;
				}
				i++;
				j++;
			}
			if (i < this._points.size()) {
				return 1;
			}
			if (j < line._points.size()) {
				return -1;
			}
			return 0;
		} else if (arguments.length === 2) {
			let o = arguments[0], comp = arguments[1];
			var line = o;
			return comp.compare(this._points, line._points);
		}
	},
	apply: function () {
		if (hasInterface(arguments[0], CoordinateFilter)) {
			let filter = arguments[0];
			for (var i = 0; i < this._points.size(); i++) {
				filter.filter(this._points.getCoordinate(i));
			}
		} else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
			let filter = arguments[0];
			if (this._points.size() === 0) return null;
			for (var i = 0; i < this._points.size(); i++) {
				filter.filter(this._points, i);
				if (filter.isDone()) break;
			}
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
		return new BoundaryOp(this).getBoundary();
	},
	isEquivalentClass: function (other) {
		return other instanceof LineString;
	},
	clone: function () {
		var ls = Geometry.prototype.clone.call(this);
		ls._points = this._points.clone();
		return ls;
	},
	getCoordinateN: function (n) {
		return this._points.getCoordinate(n);
	},
	getGeometryType: function () {
		return "LineString";
	},
	copy: function () {
		return new LineString(this._points.copy(), this._factory);
	},
	getCoordinateSequence: function () {
		return this._points;
	},
	isEmpty: function () {
		return this._points.size() === 0;
	},
	init: function (points) {
		if (points === null) {
			points = this.getFactory().getCoordinateSequenceFactory().create([]);
		}
		if (points.size() === 1) {
			throw new IllegalArgumentException("Invalid number of points in LineString (found " + points.size() + " - must be 0 or >= 2)");
		}
		this._points = points;
	},
	isCoordinate: function (pt) {
		for (var i = 0; i < this._points.size(); i++) {
			if (this._points.getCoordinate(i).equals(pt)) {
				return true;
			}
		}
		return false;
	},
	getStartPoint: function () {
		if (this.isEmpty()) {
			return null;
		}
		return this.getPointN(0);
	},
	getPointN: function (n) {
		return this.getFactory().createPoint(this._points.getCoordinate(n));
	},
	interfaces_: function () {
		return [Lineal];
	},
	getClass: function () {
		return LineString;
	}
});
LineString.serialVersionUID = 3110669828065365560;
