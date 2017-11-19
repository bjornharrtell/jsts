import Geometry from '../Geometry';
import hasInterface from '../../../../../hasInterface';
import extend from '../../../../../extend';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
import List from '../../../../../java/util/List';
export default function GeometryExtracter() {
	this._geometryType = null;
	this._comps = null;
	let geometryType = arguments[0], comps = arguments[1];
	this._geometryType = geometryType;
	this._comps = comps;
}
extend(GeometryExtracter.prototype, {
	filter: function (geom) {
		if (this._geometryType === null || GeometryExtracter.isOfType(geom, this._geometryType)) this._comps.add(geom);
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return GeometryExtracter;
	}
});
GeometryExtracter.isOfType = function (geom, geometryType) {
	if (geom.getGeometryType() === geometryType) return true;
	if (geometryType === Geometry.TYPENAME_LINESTRING && geom.getGeometryType() === Geometry.TYPENAME_LINEARRING) return true;
	return false;
};
GeometryExtracter.extract = function () {
	if (arguments.length === 2) {
		let geom = arguments[0], geometryType = arguments[1];
		return GeometryExtracter.extract(geom, geometryType, new ArrayList());
	} else if (arguments.length === 3) {
		if (hasInterface(arguments[2], List) && (arguments[0] instanceof Geometry && typeof arguments[1] === "string")) {
			let geom = arguments[0], geometryType = arguments[1], list = arguments[2];
			if (geom.getGeometryType() === geometryType) {
				list.add(geom);
			} else if (geom instanceof GeometryCollection) {
				geom.apply(new GeometryExtracter(geometryType, list));
			}
			return list;
		} else if (hasInterface(arguments[2], List) && (arguments[0] instanceof Geometry && arguments[1] instanceof Class)) {
			let geom = arguments[0], clz = arguments[1], list = arguments[2];
			return GeometryExtracter.extract(geom, GeometryExtracter.toGeometryType(clz), list);
		}
	}
};
