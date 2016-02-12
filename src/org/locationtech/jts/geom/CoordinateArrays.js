import CoordinateList from './CoordinateList';
import Coordinate from './Coordinate';
import MathUtil from '../math/MathUtil';
import System from '../../../../java/lang/System';
import Comparator from '../../../../java/util/Comparator';
import Envelope from './Envelope';
export default class CoordinateArrays {
	get interfaces_() {
		return [];
	}
	static get ForwardComparator() {
		return ForwardComparator;
	}
	static get BidirectionalComparator() {
		return BidirectionalComparator;
	}
	static isRing(pts) {
		if (pts.length < 4) return false;
		if (!pts[0].equals2D(pts[pts.length - 1])) return false;
		return true;
	}
	static ptNotInList(testPts, pts) {
		for (var i = 0; i < testPts.length; i++) {
			var testPt = testPts[i];
			if (CoordinateArrays.indexOf(testPt, pts) < 0) return testPt;
		}
		return null;
	}
	static scroll(coordinates, firstCoordinate) {
		var i = CoordinateArrays.indexOf(firstCoordinate, coordinates);
		if (i < 0) return null;
		var newCoordinates = new Array(coordinates.length);
		System.arraycopy(coordinates, i, newCoordinates, 0, coordinates.length - i);
		System.arraycopy(coordinates, 0, newCoordinates, coordinates.length - i, i);
		System.arraycopy(newCoordinates, 0, coordinates, 0, coordinates.length);
	}
	static equals(...args) {
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [coord1, coord2] = args;
					if (coord1 === coord2) return true;
					if (coord1 === null || coord2 === null) return false;
					if (coord1.length !== coord2.length) return false;
					for (var i = 0; i < coord1.length; i++) {
						if (!coord1[i].equals(coord2[i])) return false;
					}
					return true;
				})(...args);
			case 3:
				return ((...args) => {
					let [coord1, coord2, coordinateComparator] = args;
					if (coord1 === coord2) return true;
					if (coord1 === null || coord2 === null) return false;
					if (coord1.length !== coord2.length) return false;
					for (var i = 0; i < coord1.length; i++) {
						if (coordinateComparator.compare(coord1[i], coord2[i]) !== 0) return false;
					}
					return true;
				})(...args);
		}
	}
	static intersection(coordinates, env) {
		var coordList = new CoordinateList();
		for (var i = 0; i < coordinates.length; i++) {
			if (env.intersects(coordinates[i])) coordList.add(coordinates[i], true);
		}
		return coordList.toCoordinateArray();
	}
	static hasRepeatedPoints(coord) {
		for (var i = 1; i < coord.length; i++) {
			if (coord[i - 1].equals(coord[i])) {
				return true;
			}
		}
		return false;
	}
	static removeRepeatedPoints(coord) {
		if (!CoordinateArrays.hasRepeatedPoints(coord)) return coord;
		var coordList = new CoordinateList(coord, false);
		return coordList.toCoordinateArray();
	}
	static reverse(coord) {
		var last = coord.length - 1;
		var mid = Math.trunc(last / 2);
		for (var i = 0; i <= mid; i++) {
			var tmp = coord[i];
			coord[i] = coord[last - i];
			coord[last - i] = tmp;
		}
	}
	static removeNull(coord) {
		var nonNull = 0;
		for (var i = 0; i < coord.length; i++) {
			if (coord[i] !== null) nonNull++;
		}
		var newCoord = new Array(nonNull);
		if (nonNull === 0) return newCoord;
		var j = 0;
		for (var i = 0; i < coord.length; i++) {
			if (coord[i] !== null) newCoord[j++] = coord[i];
		}
		return newCoord;
	}
	static copyDeep(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [coordinates] = args;
					var copy = new Array(coordinates.length);
					for (var i = 0; i < coordinates.length; i++) {
						copy[i] = new Coordinate(coordinates[i]);
					}
					return copy;
				})(...args);
			case 5:
				return ((...args) => {
					let [src, srcStart, dest, destStart, length] = args;
					for (var i = 0; i < length; i++) {
						dest[destStart + i] = new Coordinate(src[srcStart + i]);
					}
				})(...args);
		}
	}
	static isEqualReversed(pts1, pts2) {
		for (var i = 0; i < pts1.length; i++) {
			var p1 = pts1[i];
			var p2 = pts2[pts1.length - i - 1];
			if (p1.compareTo(p2) !== 0) return false;
		}
		return true;
	}
	static envelope(coordinates) {
		var env = new Envelope();
		for (var i = 0; i < coordinates.length; i++) {
			env.expandToInclude(coordinates[i]);
		}
		return env;
	}
	static toCoordinateArray(coordList) {
		return coordList.toArray(CoordinateArrays.coordArrayType);
	}
	static atLeastNCoordinatesOrNothing(n, c) {
		return c.length >= n ? c : [];
	}
	static indexOf(coordinate, coordinates) {
		for (var i = 0; i < coordinates.length; i++) {
			if (coordinate.equals(coordinates[i])) {
				return i;
			}
		}
		return -1;
	}
	static increasingDirection(pts) {
		for (var i = 0; i < Math.trunc(pts.length / 2); i++) {
			var j = pts.length - 1 - i;
			var comp = pts[i].compareTo(pts[j]);
			if (comp !== 0) return comp;
		}
		return 1;
	}
	static compare(pts1, pts2) {
		var i = 0;
		while (i < pts1.length && i < pts2.length) {
			var compare = pts1[i].compareTo(pts2[i]);
			if (compare !== 0) return compare;
			i++;
		}
		if (i < pts2.length) return -1;
		if (i < pts1.length) return 1;
		return 0;
	}
	static minCoordinate(coordinates) {
		var minCoord = null;
		for (var i = 0; i < coordinates.length; i++) {
			if (minCoord === null || minCoord.compareTo(coordinates[i]) > 0) {
				minCoord = coordinates[i];
			}
		}
		return minCoord;
	}
	static extract(pts, start, end) {
		start = MathUtil.clamp(start, 0, pts.length);
		end = MathUtil.clamp(end, -1, pts.length);
		var npts = end - start + 1;
		if (end < 0) npts = 0;
		if (start >= pts.length) npts = 0;
		if (end < start) npts = 0;
		var extractPts = new Array(npts);
		if (npts === 0) return extractPts;
		var iPts = 0;
		for (var i = start; i <= end; i++) {
			extractPts[iPts++] = pts[i];
		}
		return extractPts;
	}
	getClass() {
		return CoordinateArrays;
	}
}
class ForwardComparator {
	get interfaces_() {
		return [Comparator];
	}
	compare(o1, o2) {
		var pts1 = o1;
		var pts2 = o2;
		return CoordinateArrays.compare(pts1, pts2);
	}
	getClass() {
		return ForwardComparator;
	}
}
class BidirectionalComparator {
	get interfaces_() {
		return [Comparator];
	}
	compare(o1, o2) {
		var pts1 = o1;
		var pts2 = o2;
		if (pts1.length < pts2.length) return -1;
		if (pts1.length > pts2.length) return 1;
		if (pts1.length === 0) return 0;
		var forwardComp = CoordinateArrays.compare(pts1, pts2);
		var isEqualRev = BidirectionalComparator.isEqualReversed(pts1, pts2);
		if (isEqualRev) return 0;
		return forwardComp;
	}
	OLDcompare(o1, o2) {
		var pts1 = o1;
		var pts2 = o2;
		if (pts1.length < pts2.length) return -1;
		if (pts1.length > pts2.length) return 1;
		if (pts1.length === 0) return 0;
		var dir1 = BidirectionalComparator.increasingDirection(pts1);
		var dir2 = BidirectionalComparator.increasingDirection(pts2);
		var i1 = dir1 > 0 ? 0 : pts1.length - 1;
		var i2 = dir2 > 0 ? 0 : pts1.length - 1;
		for (var i = 0; i < pts1.length; i++) {
			var comparePt = pts1[i1].compareTo(pts2[i2]);
			if (comparePt !== 0) return comparePt;
			i1 += dir1;
			i2 += dir2;
		}
		return 0;
	}
	getClass() {
		return BidirectionalComparator;
	}
}
CoordinateArrays.coordArrayType = new Array(0);

