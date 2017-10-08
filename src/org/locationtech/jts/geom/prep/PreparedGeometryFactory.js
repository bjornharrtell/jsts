import PreparedPoint from './PreparedPoint';
import hasInterface from '../../../../../hasInterface';
import extend from '../../../../../extend';
import Lineal from '../Lineal';
import PreparedLineString from './PreparedLineString';
import Polygonal from '../Polygonal';
import PreparedPolygon from './PreparedPolygon';
import Puntal from '../Puntal';
import BasicPreparedGeometry from './BasicPreparedGeometry';
export default function PreparedGeometryFactory() {}
extend(PreparedGeometryFactory.prototype, {
	create: function (geom) {
		if (hasInterface(geom, Polygonal)) return new PreparedPolygon(geom);
		if (hasInterface(geom, Lineal)) return new PreparedLineString(geom);
		if (hasInterface(geom, Puntal)) return new PreparedPoint(geom);
		return new BasicPreparedGeometry(geom);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedGeometryFactory;
	}
});
PreparedGeometryFactory.prepare = function (geom) {
	return new PreparedGeometryFactory().create(geom);
};
