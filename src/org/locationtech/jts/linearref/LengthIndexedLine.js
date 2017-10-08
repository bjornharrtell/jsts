import LocationIndexedLine from './LocationIndexedLine';
import extend from '../../../../extend';
import LengthIndexOfPoint from './LengthIndexOfPoint';
import LocationIndexOfLine from './LocationIndexOfLine';
import LengthLocationMap from './LengthLocationMap';
import ExtractLineByLocation from './ExtractLineByLocation';
export default function LengthIndexedLine() {
	this._linearGeom = null;
	let linearGeom = arguments[0];
	this._linearGeom = linearGeom;
}
extend(LengthIndexedLine.prototype, {
	clampIndex: function (index) {
		var posIndex = this.positiveIndex(index);
		var startIndex = this.getStartIndex();
		if (posIndex < startIndex) return startIndex;
		var endIndex = this.getEndIndex();
		if (posIndex > endIndex) return endIndex;
		return posIndex;
	},
	locationOf: function () {
		if (arguments.length === 1) {
			let index = arguments[0];
			return LengthLocationMap.getLocation(this._linearGeom, index);
		} else if (arguments.length === 2) {
			let index = arguments[0], resolveLower = arguments[1];
			return LengthLocationMap.getLocation(this._linearGeom, index, resolveLower);
		}
	},
	project: function (pt) {
		return LengthIndexOfPoint.indexOf(this._linearGeom, pt);
	},
	positiveIndex: function (index) {
		if (index >= 0.0) return index;
		return this._linearGeom.getLength() + index;
	},
	extractPoint: function () {
		if (arguments.length === 1) {
			let index = arguments[0];
			var loc = LengthLocationMap.getLocation(this._linearGeom, index);
			return loc.getCoordinate(this._linearGeom);
		} else if (arguments.length === 2) {
			let index = arguments[0], offsetDistance = arguments[1];
			var loc = LengthLocationMap.getLocation(this._linearGeom, index);
			var locLow = loc.toLowest(this._linearGeom);
			return locLow.getSegment(this._linearGeom).pointAlongOffset(locLow.getSegmentFraction(), offsetDistance);
		}
	},
	isValidIndex: function (index) {
		return index >= this.getStartIndex() && index <= this.getEndIndex();
	},
	getEndIndex: function () {
		return this._linearGeom.getLength();
	},
	getStartIndex: function () {
		return 0.0;
	},
	indexOfAfter: function (pt, minIndex) {
		return LengthIndexOfPoint.indexOfAfter(this._linearGeom, pt, minIndex);
	},
	extractLine: function (startIndex, endIndex) {
		var lil = new LocationIndexedLine(this._linearGeom);
		var startIndex2 = this.clampIndex(startIndex);
		var endIndex2 = this.clampIndex(endIndex);
		var resolveStartLower = startIndex2 === endIndex2;
		var startLoc = this.locationOf(startIndex2, resolveStartLower);
		var endLoc = this.locationOf(endIndex2);
		return ExtractLineByLocation.extract(this._linearGeom, startLoc, endLoc);
	},
	indexOf: function (pt) {
		return LengthIndexOfPoint.indexOf(this._linearGeom, pt);
	},
	indicesOf: function (subLine) {
		var locIndex = LocationIndexOfLine.indicesOf(this._linearGeom, subLine);
		var index = [LengthLocationMap.getLength(this._linearGeom, locIndex[0]), LengthLocationMap.getLength(this._linearGeom, locIndex[1])];
		return index;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LengthIndexedLine;
	}
});
