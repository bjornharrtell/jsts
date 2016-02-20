import LocationIndexedLine from './LocationIndexedLine';
import extend from '../../../../extend';
import LengthIndexOfPoint from './LengthIndexOfPoint';
import LocationIndexOfLine from './LocationIndexOfLine';
import LengthLocationMap from './LengthLocationMap';
import ExtractLineByLocation from './ExtractLineByLocation';
export default function LengthIndexedLine() {
	this.linearGeom = null;
	let linearGeom = arguments[0];
	this.linearGeom = linearGeom;
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
			return LengthLocationMap.getLocation(this.linearGeom, index);
		} else if (arguments.length === 2) {
			let index = arguments[0], resolveLower = arguments[1];
			return LengthLocationMap.getLocation(this.linearGeom, index, resolveLower);
		}
	},
	project: function (pt) {
		return LengthIndexOfPoint.indexOf(this.linearGeom, pt);
	},
	positiveIndex: function (index) {
		if (index >= 0.0) return index;
		return this.linearGeom.getLength() + index;
	},
	extractPoint: function () {
		if (arguments.length === 1) {
			let index = arguments[0];
			var loc = LengthLocationMap.getLocation(this.linearGeom, index);
			return loc.getCoordinate(this.linearGeom);
		} else if (arguments.length === 2) {
			let index = arguments[0], offsetDistance = arguments[1];
			var loc = LengthLocationMap.getLocation(this.linearGeom, index);
			var locLow = loc.toLowest(this.linearGeom);
			return locLow.getSegment(this.linearGeom).pointAlongOffset(locLow.getSegmentFraction(), offsetDistance);
		}
	},
	isValidIndex: function (index) {
		return index >= this.getStartIndex() && index <= this.getEndIndex();
	},
	getEndIndex: function () {
		return this.linearGeom.getLength();
	},
	getStartIndex: function () {
		return 0.0;
	},
	indexOfAfter: function (pt, minIndex) {
		return LengthIndexOfPoint.indexOfAfter(this.linearGeom, pt, minIndex);
	},
	extractLine: function (startIndex, endIndex) {
		var lil = new LocationIndexedLine(this.linearGeom);
		var startIndex2 = this.clampIndex(startIndex);
		var endIndex2 = this.clampIndex(endIndex);
		var resolveStartLower = startIndex2 === endIndex2;
		var startLoc = this.locationOf(startIndex2, resolveStartLower);
		var endLoc = this.locationOf(endIndex2);
		return ExtractLineByLocation.extract(this.linearGeom, startLoc, endLoc);
	},
	indexOf: function (pt) {
		return LengthIndexOfPoint.indexOf(this.linearGeom, pt);
	},
	indicesOf: function (subLine) {
		var locIndex = LocationIndexOfLine.indicesOf(this.linearGeom, subLine);
		var index = [LengthLocationMap.getLength(this.linearGeom, locIndex[0]), LengthLocationMap.getLength(this.linearGeom, locIndex[1])];
		return index;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LengthIndexedLine;
	}
});

