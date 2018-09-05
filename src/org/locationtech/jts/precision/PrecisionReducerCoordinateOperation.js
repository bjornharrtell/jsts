import LineString from '../geom/LineString';
import CoordinateList from '../geom/CoordinateList';
import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import GeometryEditor from '../geom/util/GeometryEditor';
import LinearRing from '../geom/LinearRing';
export default class PrecisionReducerCoordinateOperation extends GeometryEditor.CoordinateOperation {
	constructor() {
		super();
		PrecisionReducerCoordinateOperation.constructor_.apply(this, arguments);
	}
	edit() {
		if (arguments.length === 2 && (arguments[1] instanceof Geometry && arguments[0] instanceof Array)) {
			let coordinates = arguments[0], geom = arguments[1];
			if (coordinates.length === 0) return null;
			var reducedCoords = new Array(coordinates.length).fill(null);
			for (var i = 0; i < coordinates.length; i++) {
				var coord = new Coordinate(coordinates[i]);
				this._targetPM.makePrecise(coord);
				reducedCoords[i] = coord;
			}
			var noRepeatedCoordList = new CoordinateList(reducedCoords, false);
			var noRepeatedCoords = noRepeatedCoordList.toCoordinateArray();
			var minLength = 0;
			if (geom instanceof LineString) minLength = 2;
			if (geom instanceof LinearRing) minLength = 4;
			var collapsedCoords = reducedCoords;
			if (this._removeCollapsed) collapsedCoords = null;
			if (noRepeatedCoords.length < minLength) {
				return collapsedCoords;
			}
			return noRepeatedCoords;
		} else return super.edit.apply(this, arguments);
	}
	getClass() {
		return PrecisionReducerCoordinateOperation;
	}
	get interfaces_() {
		return [];
	}
}
PrecisionReducerCoordinateOperation.constructor_ = function () {
	this._targetPM = null;
	this._removeCollapsed = true;
	let targetPM = arguments[0], removeCollapsed = arguments[1];
	this._targetPM = targetPM;
	this._removeCollapsed = removeCollapsed;
};
