import GeometryFactory from '../GeometryFactory';
import ArrayList from '../../../../../java/util/ArrayList';
export default class GeometryCollectionMapper {
	constructor() {
		GeometryCollectionMapper.constructor_.apply(this, arguments);
	}
	static map(gc, op) {
		var mapper = new GeometryCollectionMapper(op);
		return mapper.map(gc);
	}
	map(gc) {
		var mapped = new ArrayList();
		for (var i = 0; i < gc.getNumGeometries(); i++) {
			var g = this._mapOp.map(gc.getGeometryN(i));
			if (!g.isEmpty()) mapped.add(g);
		}
		return gc.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(mapped));
	}
	getClass() {
		return GeometryCollectionMapper;
	}
	get interfaces_() {
		return [];
	}
}
GeometryCollectionMapper.constructor_ = function () {
	this._mapOp = null;
	let mapOp = arguments[0];
	this._mapOp = mapOp;
};
