import LineString from '../geom/LineString';
import CoordinateList from '../geom/CoordinateList';
import Coordinate from '../geom/Coordinate';
import GeometryEditor from '../geom/util/GeometryEditor';
import LinearRing from '../geom/LinearRing';
export default class PrecisionReducerCoordinateOperation extends GeometryEditor.CoordinateOperation {
	constructor(...args) {
		super();
		this.targetPM = null;
		this.removeCollapsed = true;
		if (args.length === 2) {
			let [targetPM, removeCollapsed] = args;
			this.targetPM = targetPM;
			this.removeCollapsed = removeCollapsed;
		}
	}
	get interfaces_() {
		return [];
	}
	editCoordinates(coordinates, geom) {
		if (coordinates.length === 0) return null;
		var reducedCoords = new Array(coordinates.length);
		for (var i = 0; i < coordinates.length; i++) {
			var coord = new Coordinate(coordinates[i]);
			this.targetPM.makePrecise(coord);
			reducedCoords[i] = coord;
		}
		var noRepeatedCoordList = new CoordinateList(reducedCoords, false);
		var noRepeatedCoords = noRepeatedCoordList.toCoordinateArray();
		var minLength = 0;
		if (geom instanceof LineString) minLength = 2;
		if (geom instanceof LinearRing) minLength = 4;
		var collapsedCoords = reducedCoords;
		if (this.removeCollapsed) collapsedCoords = null;
		if (noRepeatedCoords.length < minLength) {
			return collapsedCoords;
		}
		return noRepeatedCoords;
	}
	getClass() {
		return PrecisionReducerCoordinateOperation;
	}
}

