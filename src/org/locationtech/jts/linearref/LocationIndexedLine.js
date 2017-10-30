import LineString from '../geom/LineString';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import LinearLocation from './LinearLocation';
import extend from '../../../../extend';
import LocationIndexOfPoint from './LocationIndexOfPoint';
import LocationIndexOfLine from './LocationIndexOfLine';
import ExtractLineByLocation from './ExtractLineByLocation';
import MultiLineString from '../geom/MultiLineString';
export default function LocationIndexedLine() {
	this._linearGeom = null;
	let linearGeom = arguments[0];
	this._linearGeom = linearGeom;
	this.checkGeometryType();
}
extend(LocationIndexedLine.prototype, {
	clampIndex: function (index) {
		var loc = index.copy();
		loc.clamp(this._linearGeom);
		return loc;
	},
	project: function (pt) {
		return LocationIndexOfPoint.indexOf(this._linearGeom, pt);
	},
	checkGeometryType: function () {
		if (!(this._linearGeom instanceof LineString || this._linearGeom instanceof MultiLineString)) throw new IllegalArgumentException("Input geometry must be linear");
	},
	extractPoint: function () {
		if (arguments.length === 1) {
			let index = arguments[0];
			return index.getCoordinate(this._linearGeom);
		} else if (arguments.length === 2) {
			let index = arguments[0], offsetDistance = arguments[1];
			var indexLow = index.toLowest(this._linearGeom);
			return indexLow.getSegment(this._linearGeom).pointAlongOffset(indexLow.getSegmentFraction(), offsetDistance);
		}
	},
	isValidIndex: function (index) {
		return index.isValid(this._linearGeom);
	},
	getEndIndex: function () {
		return LinearLocation.getEndLocation(this._linearGeom);
	},
	getStartIndex: function () {
		return new LinearLocation();
	},
	indexOfAfter: function (pt, minIndex) {
		return LocationIndexOfPoint.indexOfAfter(this._linearGeom, pt, minIndex);
	},
	extractLine: function (startIndex, endIndex) {
		return ExtractLineByLocation.extract(this._linearGeom, startIndex, endIndex);
	},
	indexOf: function (pt) {
		return LocationIndexOfPoint.indexOf(this._linearGeom, pt);
	},
	indicesOf: function (subLine) {
		return LocationIndexOfLine.indicesOf(this._linearGeom, subLine);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LocationIndexedLine;
	}
});
