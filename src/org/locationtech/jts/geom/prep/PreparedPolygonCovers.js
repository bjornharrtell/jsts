import AbstractPreparedPolygonContains from './AbstractPreparedPolygonContains';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
export default function PreparedPolygonCovers() {
	let prepPoly = arguments[0];
	AbstractPreparedPolygonContains.call(this, prepPoly);
	this._requireSomePointInInterior = false;
}
inherits(PreparedPolygonCovers, AbstractPreparedPolygonContains);
extend(PreparedPolygonCovers.prototype, {
	fullTopologicalPredicate: function (geom) {
		var result = this._prepPoly.getGeometry().covers(geom);
		return result;
	},
	covers: function (geom) {
		return this.eval(geom);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedPolygonCovers;
	}
});
PreparedPolygonCovers.covers = function (prep, geom) {
	var polyInt = new PreparedPolygonCovers(prep);
	return polyInt.covers(geom);
};
