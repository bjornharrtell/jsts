import extend from '../../../../extend';
import LocationIndexOfPoint from './LocationIndexOfPoint';
export default function LocationIndexOfLine() {
	this.linearGeom = null;
	let linearGeom = arguments[0];
	this.linearGeom = linearGeom;
}
extend(LocationIndexOfLine.prototype, {
	indicesOf: function (subLine) {
		var startPt = subLine.getGeometryN(0).getCoordinateN(0);
		var lastLine = subLine.getGeometryN(subLine.getNumGeometries() - 1);
		var endPt = lastLine.getCoordinateN(lastLine.getNumPoints() - 1);
		var locPt = new LocationIndexOfPoint(this.linearGeom);
		var subLineLoc = new Array(2).fill(null);
		subLineLoc[0] = locPt.indexOf(startPt);
		if (subLine.getLength() === 0.0) {
			subLineLoc[1] = subLineLoc[0].clone();
		} else {
			subLineLoc[1] = locPt.indexOfAfter(endPt, subLineLoc[0]);
		}
		return subLineLoc;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LocationIndexOfLine;
	}
});
LocationIndexOfLine.indicesOf = function (linearGeom, subLine) {
	var locater = new LocationIndexOfLine(linearGeom);
	return locater.indicesOf(subLine);
};

