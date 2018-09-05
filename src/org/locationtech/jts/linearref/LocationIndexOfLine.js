import LocationIndexOfPoint from './LocationIndexOfPoint';
export default class LocationIndexOfLine {
	constructor() {
		LocationIndexOfLine.constructor_.apply(this, arguments);
	}
	static indicesOf(linearGeom, subLine) {
		var locater = new LocationIndexOfLine(linearGeom);
		return locater.indicesOf(subLine);
	}
	indicesOf(subLine) {
		var startPt = subLine.getGeometryN(0).getCoordinateN(0);
		var lastLine = subLine.getGeometryN(subLine.getNumGeometries() - 1);
		var endPt = lastLine.getCoordinateN(lastLine.getNumPoints() - 1);
		var locPt = new LocationIndexOfPoint(this._linearGeom);
		var subLineLoc = new Array(2).fill(null);
		subLineLoc[0] = locPt.indexOf(startPt);
		if (subLine.getLength() === 0.0) {
			subLineLoc[1] = subLineLoc[0].copy();
		} else {
			subLineLoc[1] = locPt.indexOfAfter(endPt, subLineLoc[0]);
		}
		return subLineLoc;
	}
	getClass() {
		return LocationIndexOfLine;
	}
	get interfaces_() {
		return [];
	}
}
LocationIndexOfLine.constructor_ = function () {
	this._linearGeom = null;
	let linearGeom = arguments[0];
	this._linearGeom = linearGeom;
};
