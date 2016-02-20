import GeometryFactory from '../GeometryFactory';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function GeometryCollectionMapper() {
	this.mapOp = null;
	let mapOp = arguments[0];
	this.mapOp = mapOp;
}
extend(GeometryCollectionMapper.prototype, {
	map: function (gc) {
		var mapped = new ArrayList();
		for (var i = 0; i < gc.getNumGeometries(); i++) {
			var g = this.mapOp.map(gc.getGeometryN(i));
			if (!g.isEmpty()) mapped.add(g);
		}
		return gc.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(mapped));
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryCollectionMapper;
	}
});
GeometryCollectionMapper.map = function (gc, op) {
	var mapper = new GeometryCollectionMapper(op);
	return mapper.map(gc);
};

