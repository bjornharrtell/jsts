import Geometry from './Geometry';
import extend from '../../../../extend';
import GeometryCollection from './GeometryCollection';
import Polygonal from './Polygonal';
import ArrayList from '../../../../java/util/ArrayList';
import inherits from '../../../../inherits';
export default function MultiPolygon() {
	let polygons = arguments[0], factory = arguments[1];
	GeometryCollection.call(this, polygons, factory);
}
inherits(MultiPolygon, GeometryCollection);
extend(MultiPolygon.prototype, {
	getSortIndex: function () {
		return Geometry.SORTINDEX_MULTIPOLYGON;
	},
	equalsExact: function () {
		if (arguments.length === 2) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return GeometryCollection.prototype.equalsExact.call(this, other, tolerance);
		} else return GeometryCollection.prototype.equalsExact.apply(this, arguments);
	},
	getBoundaryDimension: function () {
		return 1;
	},
	getDimension: function () {
		return 2;
	},
	reverse: function () {
		var n = this.geometries.length;
		var revGeoms = new Array(n).fill(null);
		for (var i = 0; i < this.geometries.length; i++) {
			revGeoms[i] = this.geometries[i].reverse();
		}
		return this.getFactory().createMultiPolygon(revGeoms);
	},
	getBoundary: function () {
		if (this.isEmpty()) {
			return this.getFactory().createMultiLineString();
		}
		var allRings = new ArrayList();
		for (var i = 0; i < this.geometries.length; i++) {
			var polygon = this.geometries[i];
			var rings = polygon.getBoundary();
			for (var j = 0; j < rings.getNumGeometries(); j++) {
				allRings.add(rings.getGeometryN(j));
			}
		}
		var allRingsArray = new Array(allRings.size()).fill(null);
		return this.getFactory().createMultiLineString(allRings.toArray(allRingsArray));
	},
	getGeometryType: function () {
		return "MultiPolygon";
	},
	copy: function () {
		var polygons = new Array(this.geometries.length).fill(null);
		for (var i = 0; i < polygons.length; i++) {
			polygons[i] = this.geometries[i].copy();
		}
		return new MultiPolygon(polygons, this.factory);
	},
	interfaces_: function () {
		return [Polygonal];
	},
	getClass: function () {
		return MultiPolygon;
	}
});
MultiPolygon.serialVersionUID = -551033529766975875;

