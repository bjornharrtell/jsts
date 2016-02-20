import Geometry from '../Geometry';
import hasInterface from '../../../../../hasInterface';
import Collection from '../../../../../java/util/Collection';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function GeometryMapper() {}
extend(GeometryMapper.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryMapper;
	}
});
GeometryMapper.map = function () {
	if (arguments[0] instanceof Geometry && hasInterface(arguments[1], MapOp)) {
		let geom = arguments[0], op = arguments[1];
		var mapped = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var g = op.map(geom.getGeometryN(i));
			if (g !== null) mapped.add(g);
		}
		return geom.getFactory().buildGeometry(mapped);
	} else if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], MapOp)) {
		let geoms = arguments[0], op = arguments[1];
		var mapped = new ArrayList();
		for (var i = geoms.iterator(); i.hasNext(); ) {
			var g = i.next();
			var gr = op.map(g);
			if (gr !== null) mapped.add(gr);
		}
		return mapped;
	}
};
function MapOp() {}
GeometryMapper.MapOp = MapOp;

