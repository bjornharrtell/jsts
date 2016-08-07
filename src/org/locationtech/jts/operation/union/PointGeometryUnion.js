import PointLocator from '../../algorithm/PointLocator';
import Location from '../../geom/Location';
import TreeSet from '../../../../../java/util/TreeSet';
import extend from '../../../../../extend';
import GeometryCombiner from '../../geom/util/GeometryCombiner';
import CoordinateArrays from '../../geom/CoordinateArrays';
export default function PointGeometryUnion() {
	this.pointGeom = null;
	this.otherGeom = null;
	this.geomFact = null;
	let pointGeom = arguments[0], otherGeom = arguments[1];
	this.pointGeom = pointGeom;
	this.otherGeom = otherGeom;
	this.geomFact = otherGeom.getFactory();
}
extend(PointGeometryUnion.prototype, {
	union: function () {
		var locater = new PointLocator();
		var exteriorCoords = new TreeSet();
		for (var i = 0; i < this.pointGeom.getNumGeometries(); i++) {
			var point = this.pointGeom.getGeometryN(i);
			var coord = point.getCoordinate();
			var loc = locater.locate(coord, this.otherGeom);
			if (loc === Location.EXTERIOR) exteriorCoords.add(coord);
		}
		if (exteriorCoords.size() === 0) return this.otherGeom;
		var ptComp = null;
		var coords = CoordinateArrays.toCoordinateArray(exteriorCoords);
		if (coords.length === 1) {
			ptComp = this.geomFact.createPoint(coords[0]);
		} else {
			ptComp = this.geomFact.createMultiPointFromCoords(coords);
		}
		return GeometryCombiner.combine(ptComp, this.otherGeom);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PointGeometryUnion;
	}
});
PointGeometryUnion.union = function (pointGeom, otherGeom) {
	var unioner = new PointGeometryUnion(pointGeom, otherGeom);
	return unioner.union();
};
