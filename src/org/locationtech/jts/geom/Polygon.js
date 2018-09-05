import Area from '../algorithm/Area';
import Geometry from './Geometry';
import Arrays from '../../../../java/util/Arrays';
import CoordinateFilter from './CoordinateFilter';
import hasInterface from '../../../../hasInterface';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Orientation from '../algorithm/Orientation';
import System from '../../../../java/lang/System';
import GeometryComponentFilter from './GeometryComponentFilter';
import CoordinateArrays from './CoordinateArrays';
import Polygonal from './Polygonal';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
export default class Polygon extends Geometry {
	constructor() {
		super();
		Polygon.constructor_.apply(this, arguments);
	}
	computeEnvelopeInternal() {
		return this._shell.getEnvelopeInternal();
	}
	getCoordinates() {
		if (this.isEmpty()) {
			return [];
		}
		var coordinates = new Array(this.getNumPoints()).fill(null);
		var k = -1;
		var shellCoordinates = this._shell.getCoordinates();
		for (var x = 0; x < shellCoordinates.length; x++) {
			k++;
			coordinates[k] = shellCoordinates[x];
		}
		for (var i = 0; i < this._holes.length; i++) {
			var childCoordinates = this._holes[i].getCoordinates();
			for (var j = 0; j < childCoordinates.length; j++) {
				k++;
				coordinates[k] = childCoordinates[j];
			}
		}
		return coordinates;
	}
	getArea() {
		var area = 0.0;
		area += Area.ofRing(this._shell.getCoordinateSequence());
		for (var i = 0; i < this._holes.length; i++) {
			area -= Area.ofRing(this._holes[i].getCoordinateSequence());
		}
		return area;
	}
	isRectangle() {
		if (this.getNumInteriorRing() !== 0) return false;
		if (this._shell === null) return false;
		if (this._shell.getNumPoints() !== 5) return false;
		var seq = this._shell.getCoordinateSequence();
		var env = this.getEnvelopeInternal();
		for (var i = 0; i < 5; i++) {
			var x = seq.getX(i);
			if (!(x === env.getMinX() || x === env.getMaxX())) return false;
			var y = seq.getY(i);
			if (!(y === env.getMinY() || y === env.getMaxY())) return false;
		}
		var prevX = seq.getX(0);
		var prevY = seq.getY(0);
		for (var i = 1; i <= 4; i++) {
			var x = seq.getX(i);
			var y = seq.getY(i);
			var xChanged = x !== prevX;
			var yChanged = y !== prevY;
			if (xChanged === yChanged) return false;
			prevX = x;
			prevY = y;
		}
		return true;
	}
	equalsExact() {
		if (arguments.length === 2 && (typeof arguments[1] === "number" && arguments[0] instanceof Geometry)) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherPolygon = other;
			var thisShell = this._shell;
			var otherPolygonShell = otherPolygon._shell;
			if (!thisShell.equalsExact(otherPolygonShell, tolerance)) {
				return false;
			}
			if (this._holes.length !== otherPolygon._holes.length) {
				return false;
			}
			for (var i = 0; i < this._holes.length; i++) {
				if (!this._holes[i].equalsExact(otherPolygon._holes[i], tolerance)) {
					return false;
				}
			}
			return true;
		} else return super.equalsExact.apply(this, arguments);
	}
	normalize() {
		if (arguments.length === 0) {
			this.normalize(this._shell, true);
			for (var i = 0; i < this._holes.length; i++) {
				this.normalize(this._holes[i], false);
			}
			Arrays.sort(this._holes);
		} else if (arguments.length === 2) {
			let ring = arguments[0], clockwise = arguments[1];
			if (ring.isEmpty()) {
				return null;
			}
			var uniqueCoordinates = new Array(ring.getCoordinates().length - 1).fill(null);
			System.arraycopy(ring.getCoordinates(), 0, uniqueCoordinates, 0, uniqueCoordinates.length);
			var minCoordinate = CoordinateArrays.minCoordinate(ring.getCoordinates());
			CoordinateArrays.scroll(uniqueCoordinates, minCoordinate);
			System.arraycopy(uniqueCoordinates, 0, ring.getCoordinates(), 0, uniqueCoordinates.length);
			ring.getCoordinates()[uniqueCoordinates.length] = uniqueCoordinates[0];
			if (Orientation.isCCW(ring.getCoordinates()) === clockwise) {
				CoordinateArrays.reverse(ring.getCoordinates());
			}
		}
	}
	getCoordinate() {
		return this._shell.getCoordinate();
	}
	getNumInteriorRing() {
		return this._holes.length;
	}
	getBoundaryDimension() {
		return 1;
	}
	getTypeCode() {
		return Geometry.TYPECODE_POLYGON;
	}
	getDimension() {
		return 2;
	}
	getLength() {
		var len = 0.0;
		len += this._shell.getLength();
		for (var i = 0; i < this._holes.length; i++) {
			len += this._holes[i].getLength();
		}
		return len;
	}
	getNumPoints() {
		var numPoints = this._shell.getNumPoints();
		for (var i = 0; i < this._holes.length; i++) {
			numPoints += this._holes[i].getNumPoints();
		}
		return numPoints;
	}
	reverse() {
		var poly = this.copy();
		poly._shell = this._shell.copy().reverse();
		poly._holes = new Array(this._holes.length).fill(null);
		for (var i = 0; i < this._holes.length; i++) {
			poly._holes[i] = this._holes[i].copy().reverse();
		}
		return poly;
	}
	convexHull() {
		return this.getExteriorRing().convexHull();
	}
	compareToSameClass() {
		if (arguments.length === 1) {
			let o = arguments[0];
			var thisShell = this._shell;
			var otherShell = o._shell;
			return thisShell.compareToSameClass(otherShell);
		} else if (arguments.length === 2) {
			let o = arguments[0], comp = arguments[1];
			var poly = o;
			var thisShell = this._shell;
			var otherShell = poly._shell;
			var shellComp = thisShell.compareToSameClass(otherShell, comp);
			if (shellComp !== 0) return shellComp;
			var nHole1 = this.getNumInteriorRing();
			var nHole2 = poly.getNumInteriorRing();
			var i = 0;
			while (i < nHole1 && i < nHole2) {
				var thisHole = this.getInteriorRingN(i);
				var otherHole = poly.getInteriorRingN(i);
				var holeComp = thisHole.compareToSameClass(otherHole, comp);
				if (holeComp !== 0) return holeComp;
				i++;
			}
			if (i < nHole1) return 1;
			if (i < nHole2) return -1;
			return 0;
		}
	}
	apply() {
		if (hasInterface(arguments[0], CoordinateFilter)) {
			let filter = arguments[0];
			this._shell.apply(filter);
			for (var i = 0; i < this._holes.length; i++) {
				this._holes[i].apply(filter);
			}
		} else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
			let filter = arguments[0];
			this._shell.apply(filter);
			if (!filter.isDone()) {
				for (var i = 0; i < this._holes.length; i++) {
					this._holes[i].apply(filter);
					if (filter.isDone()) break;
				}
			}
			if (filter.isGeometryChanged()) this.geometryChanged();
		} else if (hasInterface(arguments[0], GeometryFilter)) {
			let filter = arguments[0];
			filter.filter(this);
		} else if (hasInterface(arguments[0], GeometryComponentFilter)) {
			let filter = arguments[0];
			filter.filter(this);
			this._shell.apply(filter);
			for (var i = 0; i < this._holes.length; i++) {
				this._holes[i].apply(filter);
			}
		}
	}
	getBoundary() {
		if (this.isEmpty()) {
			return this.getFactory().createMultiLineString();
		}
		var rings = new Array(this._holes.length + 1).fill(null);
		rings[0] = this._shell;
		for (var i = 0; i < this._holes.length; i++) {
			rings[i + 1] = this._holes[i];
		}
		if (rings.length <= 1) return this.getFactory().createLinearRing(rings[0].getCoordinateSequence());
		return this.getFactory().createMultiLineString(rings);
	}
	getGeometryType() {
		return Geometry.TYPENAME_POLYGON;
	}
	copy() {
		var shellCopy = this._shell.copy();
		var holeCopies = new Array(this._holes.length).fill(null);
		for (var i = 0; i < this._holes.length; i++) {
			holeCopies[i] = this._holes[i].copy();
		}
		return new Polygon(shellCopy, holeCopies, this._factory);
	}
	getExteriorRing() {
		return this._shell;
	}
	isEmpty() {
		return this._shell.isEmpty();
	}
	getInteriorRingN(n) {
		return this._holes[n];
	}
	getClass() {
		return Polygon;
	}
	get interfaces_() {
		return [Polygonal];
	}
}
Polygon.constructor_ = function () {
	this._shell = null;
	this._holes = null;
	let shell = arguments[0], holes = arguments[1], factory = arguments[2];
	Geometry.constructor_.call(this, factory);
	if (shell === null) {
		shell = this.getFactory().createLinearRing();
	}
	if (holes === null) {
		holes = [];
	}
	if (Geometry.hasNullElements(holes)) {
		throw new IllegalArgumentException("holes must not contain null elements");
	}
	if (shell.isEmpty() && Geometry.hasNonEmptyElements(holes)) {
		throw new IllegalArgumentException("shell is empty but holes are not");
	}
	this._shell = shell;
	this._holes = holes;
};
Polygon.serialVersionUID = -3494792200821764533;
