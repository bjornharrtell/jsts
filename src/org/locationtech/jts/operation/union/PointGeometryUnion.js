import PointLocator from '../../algorithm/PointLocator';
import Location from '../../geom/Location';
import TreeSet from '../../../../../java/util/TreeSet';
import GeometryCombiner from '../../geom/util/GeometryCombiner';
import CoordinateArrays from '../../geom/CoordinateArrays';
export default class PointGeometryUnion {
	constructor() {
		PointGeometryUnion.constructor_.apply(this, arguments);
	}
	static union(pointGeom, otherGeom) {
		var unioner = new PointGeometryUnion(pointGeom, otherGeom);
		return unioner.union();
	}
	union() {
		var locater = new PointLocator();
		var exteriorCoords = new TreeSet();
		for (var i = 0; i < this._pointGeom.getNumGeometries(); i++) {
			var point = this._pointGeom.getGeometryN(i);
			var coord = point.getCoordinate();
			var loc = locater.locate(coord, this._otherGeom);
			if (loc === Location.EXTERIOR) exteriorCoords.add(coord);
		}
		if (exteriorCoords.size() === 0) return this._otherGeom;
		var ptComp = null;
		var coords = CoordinateArrays.toCoordinateArray(exteriorCoords);
		if (coords.length === 1) {
			ptComp = this._geomFact.createPoint(coords[0]);
		} else {
			ptComp = this._geomFact.createMultiPointFromCoords(coords);
		}
		return GeometryCombiner.combine(ptComp, this._otherGeom);
	}
	getClass() {
		return PointGeometryUnion;
	}
	get interfaces_() {
		return [];
	}
}
PointGeometryUnion.constructor_ = function () {
	this._pointGeom = null;
	this._otherGeom = null;
	this._geomFact = null;
	let pointGeom = arguments[0], otherGeom = arguments[1];
	this._pointGeom = pointGeom;
	this._otherGeom = otherGeom;
	this._geomFact = otherGeom.getFactory();
};
