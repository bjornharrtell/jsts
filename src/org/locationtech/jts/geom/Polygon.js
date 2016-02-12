import CGAlgorithms from '../algorithm/CGAlgorithms';
import Geometry from './Geometry';
import Arrays from '../../../../java/util/Arrays';
import CoordinateFilter from './CoordinateFilter';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import System from '../../../../java/lang/System';
import GeometryComponentFilter from './GeometryComponentFilter';
import CoordinateArrays from './CoordinateArrays';
import Polygonal from './Polygonal';
import GeometryFilter from './GeometryFilter';
import CoordinateSequenceFilter from './CoordinateSequenceFilter';
export default class Polygon extends Geometry {
	constructor(...args) {
		super();
		this.shell = null;
		this.holes = null;
		switch (args.length) {
			case 3:
				return ((...args) => {
					let [shell, holes, factory] = args;
					super(factory);
					if (shell === null) {
						shell = this.getFactory().createLinearRing();
					}
					if (holes === null) {
						holes = [];
					}
					if (Polygon.hasNullElements(holes)) {
						throw new IllegalArgumentException("holes must not contain null elements");
					}
					if (shell.isEmpty() && Polygon.hasNonEmptyElements(holes)) {
						throw new IllegalArgumentException("shell is empty but holes are not");
					}
					this.shell = shell;
					this.holes = holes;
				})(...args);
		}
	}
	get interfaces_() {
		return [Polygonal];
	}
	computeEnvelopeInternal() {
		return this.shell.getEnvelopeInternal();
	}
	getSortIndex() {
		return Geometry.SORTINDEX_POLYGON;
	}
	getCoordinates() {
		if (this.isEmpty()) {
			return [];
		}
		var coordinates = new Array(this.getNumPoints());
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
	}
	getArea() {
		var area = 0.0;
		area += Math.abs(CGAlgorithms.signedArea(this.shell.getCoordinateSequence()));
		for (var i = 0; i < this.holes.length; i++) {
			area -= Math.abs(CGAlgorithms.signedArea(this.holes[i].getCoordinateSequence()));
		}
		return area;
	}
	isRectangle() {
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
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
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
		} else return super.equalsExact(...args);
	}
	normalize(...args) {
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
					this.normalize(this.shell, true);
					for (var i = 0; i < this.holes.length; i++) {
						this.normalize(this.holes[i], false);
					}
					Arrays.sort(this.holes);
				})(...args);
			case 2:
				return ((...args) => {
					let [ring, clockwise] = args;
					if (ring.isEmpty()) {
						return null;
					}
					var uniqueCoordinates = new Array(ring.getCoordinates().length - 1);
					System.arraycopy(ring.getCoordinates(), 0, uniqueCoordinates, 0, uniqueCoordinates.length);
					var minCoordinate = CoordinateArrays.minCoordinate(ring.getCoordinates());
					CoordinateArrays.scroll(uniqueCoordinates, minCoordinate);
					System.arraycopy(uniqueCoordinates, 0, ring.getCoordinates(), 0, uniqueCoordinates.length);
					ring.getCoordinates()[uniqueCoordinates.length] = uniqueCoordinates[0];
					if (CGAlgorithms.isCCW(ring.getCoordinates()) === clockwise) {
						CoordinateArrays.reverse(ring.getCoordinates());
					}
				})(...args);
		}
	}
	getCoordinate() {
		return this.shell.getCoordinate();
	}
	getNumInteriorRing() {
		return this.holes.length;
	}
	getBoundaryDimension() {
		return 1;
	}
	getDimension() {
		return 2;
	}
	getLength() {
		var len = 0.0;
		len += this.shell.getLength();
		for (var i = 0; i < this.holes.length; i++) {
			len += this.holes[i].getLength();
		}
		return len;
	}
	getNumPoints() {
		var numPoints = this.shell.getNumPoints();
		for (var i = 0; i < this.holes.length; i++) {
			numPoints += this.holes[i].getNumPoints();
		}
		return numPoints;
	}
	reverse() {
		var poly = this.copy();
		poly.shell = this.shell.clone().reverse();
		poly.holes = new Array(this.holes.length);
		for (var i = 0; i < this.holes.length; i++) {
			poly.holes[i] = this.holes[i].clone().reverse();
		}
		return poly;
	}
	convexHull() {
		return this.getExteriorRing().convexHull();
	}
	compareToSameClass(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [o] = args;
					var thisShell = this.shell;
					var otherShell = o.shell;
					return thisShell.compareToSameClass(otherShell);
				})(...args);
			case 2:
				return ((...args) => {
					let [o, comp] = args;
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
				})(...args);
		}
	}
	apply(...args) {
		switch (args.length) {
			case 1:
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateFilter) > -1) {
					return ((...args) => {
						let [filter] = args;
						this.shell.apply(filter);
						for (var i = 0; i < this.holes.length; i++) {
							this.holes[i].apply(filter);
						}
					})(...args);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFilter) > -1) {
					return ((...args) => {
						let [filter] = args;
						this.shell.apply(filter);
						if (!filter.isDone()) {
							for (var i = 0; i < this.holes.length; i++) {
								this.holes[i].apply(filter);
								if (filter.isDone()) break;
							}
						}
						if (filter.isGeometryChanged()) this.geometryChanged();
					})(...args);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryFilter) > -1) {
					return ((...args) => {
						let [filter] = args;
						filter.filter(this);
					})(...args);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryComponentFilter) > -1) {
					return ((...args) => {
						let [filter] = args;
						filter.filter(this);
						this.shell.apply(filter);
						for (var i = 0; i < this.holes.length; i++) {
							this.holes[i].apply(filter);
						}
					})(...args);
				}
		}
	}
	getBoundary() {
		if (this.isEmpty()) {
			return this.getFactory().createMultiLineString();
		}
		var rings = new Array(this.holes.length + 1);
		rings[0] = this.shell;
		for (var i = 0; i < this.holes.length; i++) {
			rings[i + 1] = this.holes[i];
		}
		if (rings.length <= 1) return this.getFactory().createLinearRing(rings[0].getCoordinateSequence());
		return this.getFactory().createMultiLineString(rings);
	}
	clone() {
		var poly = super.clone();
		poly.shell = this.shell.clone();
		poly.holes = new Array(this.holes.length);
		for (var i = 0; i < this.holes.length; i++) {
			poly.holes[i] = this.holes[i].clone();
		}
		return poly;
	}
	getGeometryType() {
		return "Polygon";
	}
	copy() {
		var shell = this.shell.copy();
		var holes = new Array(this.holes.length);
		for (var i = 0; i < holes.length; i++) {
			holes[i] = this.holes[i].copy();
		}
		return new Polygon(shell, holes, this.factory);
	}
	getExteriorRing() {
		return this.shell;
	}
	isEmpty() {
		return this.shell.isEmpty();
	}
	getInteriorRingN(n) {
		return this.holes[n];
	}
	getClass() {
		return Polygon;
	}
}
Polygon.serialVersionUID = -3494792200821764533;

