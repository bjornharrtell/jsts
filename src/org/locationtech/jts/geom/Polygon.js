import CGAlgorithms from '../algorithm/CGAlgorithms';
import Geometry from './Geometry';
import Arrays from '../../../../java/util/Arrays';
import CoordinateFilter from './CoordinateFilter';
import hasInterface from '../../../../hasInterface';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import System from '../../../../java/lang/System';
import GeometryComponentFilter from './GeometryComponentFilter';
import CoordinateArrays from './CoordinateArrays';
import Polygonal from './Polygonal';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
import inherits from '../../../../inherits';
export default function Polygon() {
	this.shell = null;
	this.holes = null;
	let shell = arguments[0], holes = arguments[1], factory = arguments[2];
	Geometry.call(this, factory);
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
	this.shell = shell;
	this.holes = holes;
}
inherits(Polygon, Geometry);
extend(Polygon.prototype, {
	computeEnvelopeInternal: function () {
		return this.shell.getEnvelopeInternal();
	},
	getSortIndex: function () {
		return Geometry.SORTINDEX_POLYGON;
	},
	getCoordinates: function () {
		if (this.isEmpty()) {
			return [];
		}
		var coordinates = new Array(this.getNumPoints()).fill(null);
		var k = -1;
		var shellCoordinates = this.shell.getCoordinates();
		for (var x = 0; x < shellCoordinates.length; x++) {
			k++;
			coordinates[k] = shellCoordinates[x];
		}
		for (var i = 0; i < this.holes.length; i++) {
			var childCoordinates = this.holes[i].getCoordinates();
			for (var j = 0; j < childCoordinates.length; j++) {
				k++;
				coordinates[k] = childCoordinates[j];
			}
		}
		return coordinates;
	},
	getArea: function () {
		var area = 0.0;
		area += Math.abs(CGAlgorithms.signedArea(this.shell.getCoordinateSequence()));
		for (var i = 0; i < this.holes.length; i++) {
			area -= Math.abs(CGAlgorithms.signedArea(this.holes[i].getCoordinateSequence()));
		}
		return area;
	},
	isRectangle: function () {
		if (this.getNumInteriorRing() !== 0) return false;
		if (this.shell === null) return false;
		if (this.shell.getNumPoints() !== 5) return false;
		var seq = this.shell.getCoordinateSequence();
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
	},
	equalsExact: function () {
		if (arguments.length === 2) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherPolygon = other;
			var thisShell = this.shell;
			var otherPolygonShell = otherPolygon.shell;
			if (!thisShell.equalsExact(otherPolygonShell, tolerance)) {
				return false;
			}
			if (this.holes.length !== otherPolygon.holes.length) {
				return false;
			}
			for (var i = 0; i < this.holes.length; i++) {
				if (!this.holes[i].equalsExact(otherPolygon.holes[i], tolerance)) {
					return false;
				}
			}
			return true;
		} else return Geometry.prototype.equalsExact.apply(this, arguments);
	},
	normalize: function () {
		if (arguments.length === 0) {
			this.normalize(this.shell, true);
			for (var i = 0; i < this.holes.length; i++) {
				this.normalize(this.holes[i], false);
			}
			Arrays.sort(this.holes);
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
			if (CGAlgorithms.isCCW(ring.getCoordinates()) === clockwise) {
				CoordinateArrays.reverse(ring.getCoordinates());
			}
		}
	},
	getCoordinate: function () {
		return this.shell.getCoordinate();
	},
	getNumInteriorRing: function () {
		return this.holes.length;
	},
	getBoundaryDimension: function () {
		return 1;
	},
	getDimension: function () {
		return 2;
	},
	getLength: function () {
		var len = 0.0;
		len += this.shell.getLength();
		for (var i = 0; i < this.holes.length; i++) {
			len += this.holes[i].getLength();
		}
		return len;
	},
	getNumPoints: function () {
		var numPoints = this.shell.getNumPoints();
		for (var i = 0; i < this.holes.length; i++) {
			numPoints += this.holes[i].getNumPoints();
		}
		return numPoints;
	},
	reverse: function () {
		var poly = this.copy();
		poly.shell = this.shell.copy().reverse();
		poly.holes = new Array(this.holes.length).fill(null);
		for (var i = 0; i < this.holes.length; i++) {
			poly.holes[i] = this.holes[i].copy().reverse();
		}
		return poly;
	},
	convexHull: function () {
		return this.getExteriorRing().convexHull();
	},
	compareToSameClass: function () {
		if (arguments.length === 1) {
			let o = arguments[0];
			var thisShell = this.shell;
			var otherShell = o.shell;
			return thisShell.compareToSameClass(otherShell);
		} else if (arguments.length === 2) {
			let o = arguments[0], comp = arguments[1];
			var poly = o;
			var thisShell = this.shell;
			var otherShell = poly.shell;
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
	},
	apply: function () {
		if (hasInterface(arguments[0], CoordinateFilter)) {
			let filter = arguments[0];
			this.shell.apply(filter);
			for (var i = 0; i < this.holes.length; i++) {
				this.holes[i].apply(filter);
			}
		} else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
			let filter = arguments[0];
			this.shell.apply(filter);
			if (!filter.isDone()) {
				for (var i = 0; i < this.holes.length; i++) {
					this.holes[i].apply(filter);
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
			this.shell.apply(filter);
			for (var i = 0; i < this.holes.length; i++) {
				this.holes[i].apply(filter);
			}
		}
	},
	getBoundary: function () {
		if (this.isEmpty()) {
			return this.getFactory().createMultiLineString();
		}
		var rings = new Array(this.holes.length + 1).fill(null);
		rings[0] = this.shell;
		for (var i = 0; i < this.holes.length; i++) {
			rings[i + 1] = this.holes[i];
		}
		if (rings.length <= 1) return this.getFactory().createLinearRing(rings[0].getCoordinateSequence());
		return this.getFactory().createMultiLineString(rings);
	},
	clone: function () {
		var poly = Geometry.prototype.clone.call(this);
		poly.shell = this.shell.clone();
		poly.holes = new Array(this.holes.length).fill(null);
		for (var i = 0; i < this.holes.length; i++) {
			poly.holes[i] = this.holes[i].clone();
		}
		return poly;
	},
	getGeometryType: function () {
		return "Polygon";
	},
	copy: function () {
		var shell = this.shell.copy();
		var holes = new Array(this.holes.length).fill(null);
		for (var i = 0; i < holes.length; i++) {
			holes[i] = this.holes[i].copy();
		}
		return new Polygon(shell, holes, this.factory);
	},
	getExteriorRing: function () {
		return this.shell;
	},
	isEmpty: function () {
		return this.shell.isEmpty();
	},
	getInteriorRingN: function (n) {
		return this.holes[n];
	},
	interfaces_: function () {
		return [Polygonal];
	},
	getClass: function () {
		return Polygon;
	}
});
Polygon.serialVersionUID = -3494792200821764533;
