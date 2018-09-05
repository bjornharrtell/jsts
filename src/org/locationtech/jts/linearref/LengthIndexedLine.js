import LocationIndexedLine from './LocationIndexedLine';
import LengthIndexOfPoint from './LengthIndexOfPoint';
import LocationIndexOfLine from './LocationIndexOfLine';
import LengthLocationMap from './LengthLocationMap';
import ExtractLineByLocation from './ExtractLineByLocation';
export default class LengthIndexedLine {
	constructor() {
		LengthIndexedLine.constructor_.apply(this, arguments);
	}
	clampIndex(index) {
		var posIndex = this.positiveIndex(index);
		var startIndex = this.getStartIndex();
		if (posIndex < startIndex) return startIndex;
		var endIndex = this.getEndIndex();
		if (posIndex > endIndex) return endIndex;
		return posIndex;
	}
	locationOf() {
		if (arguments.length === 1) {
			let index = arguments[0];
			return LengthLocationMap.getLocation(this._linearGeom, index);
		} else if (arguments.length === 2) {
			let index = arguments[0], resolveLower = arguments[1];
			return LengthLocationMap.getLocation(this._linearGeom, index, resolveLower);
		}
	}
	project(pt) {
		return LengthIndexOfPoint.indexOf(this._linearGeom, pt);
	}
	positiveIndex(index) {
		if (index >= 0.0) return index;
		return this._linearGeom.getLength() + index;
	}
	extractPoint() {
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
	}
	isValidIndex(index) {
		return index >= this.getStartIndex() && index <= this.getEndIndex();
	}
	getEndIndex() {
		return this._linearGeom.getLength();
	}
	getStartIndex() {
		return 0.0;
	}
	indexOfAfter(pt, minIndex) {
		return LengthIndexOfPoint.indexOfAfter(this._linearGeom, pt, minIndex);
	}
	extractLine(startIndex, endIndex) {
		var lil = new LocationIndexedLine(this._linearGeom);
		var startIndex2 = this.clampIndex(startIndex);
		var endIndex2 = this.clampIndex(endIndex);
		var resolveStartLower = startIndex2 === endIndex2;
		var startLoc = this.locationOf(startIndex2, resolveStartLower);
		var endLoc = this.locationOf(endIndex2);
		return ExtractLineByLocation.extract(this._linearGeom, startLoc, endLoc);
	}
	indexOf(pt) {
		return LengthIndexOfPoint.indexOf(this._linearGeom, pt);
	}
	indicesOf(subLine) {
		var locIndex = LocationIndexOfLine.indicesOf(this._linearGeom, subLine);
		var index = [LengthLocationMap.getLength(this._linearGeom, locIndex[0]), LengthLocationMap.getLength(this._linearGeom, locIndex[1])];
		return index;
	}
	getClass() {
		return LengthIndexedLine;
	}
	get interfaces_() {
		return [];
	}
}
LengthIndexedLine.constructor_ = function () {
	this._linearGeom = null;
	let linearGeom = arguments[0];
	this._linearGeom = linearGeom;
};
