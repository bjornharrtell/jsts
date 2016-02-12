import Geometry from './Geometry';
import GeometryCollection from './GeometryCollection';
import Polygonal from './Polygonal';
import ArrayList from '../../../../java/util/ArrayList';
export default class MultiPolygon extends GeometryCollection {
	constructor(...args) {
		super();
		switch (args.length) {
			case 2:
				{
					let [polygons, factory] = args;
					super(polygons, factory);
					break;
				}
		}
	}
	get interfaces_() {
		return [Polygonal];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_MULTIPOLYGON;
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return super.equalsExact(other, tolerance);
		} else return super.equalsExact(...args);
	}
	getBoundaryDimension() {
		return 1;
	}
	getDimension() {
		return 2;
	}
	reverse() {
		var n = this.geometries.length;
		var revGeoms = new Array(n);
		for (var i = 0; i < this.geometries.length; i++) {
			revGeoms[i] = this.geometries[i].reverse();
		}
		return this.getFactory().createMultiPolygon(revGeoms);
	}
	getBoundary() {
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
		var allRingsArray = new Array(allRings.size());
		return this.getFactory().createMultiLineString(allRings.toArray(allRingsArray));
	}
	getGeometryType() {
		return "MultiPolygon";
	}
	copy() {
		var polygons = new Array(this.geometries.length);
		for (var i = 0; i < polygons.length; i++) {
			polygons[i] = this.geometries[i].copy();
		}
		return new MultiPolygon(polygons, this.factory);
	}
	getClass() {
		return MultiPolygon;
	}
}
MultiPolygon.serialVersionUID = -551033529766975875;

