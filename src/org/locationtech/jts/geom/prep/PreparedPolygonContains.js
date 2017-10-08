import AbstractPreparedPolygonContains from './AbstractPreparedPolygonContains';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
export default function PreparedPolygonContains() {
	let prepPoly = arguments[0];
	AbstractPreparedPolygonContains.call(this, prepPoly);
}
inherits(PreparedPolygonContains, AbstractPreparedPolygonContains);
extend(PreparedPolygonContains.prototype, {
	fullTopologicalPredicate: function (geom) {
		var isContained = this._prepPoly.getGeometry().contains(geom);
		return isContained;
	},
	contains: function (geom) {
		return this.eval(geom);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedPolygonContains;
	}
});
PreparedPolygonContains.contains = function (prep, geom) {
	var polyInt = new PreparedPolygonContains(prep);
	return polyInt.contains(geom);
};
