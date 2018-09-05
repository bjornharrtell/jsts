import AbstractPreparedPolygonContains from './AbstractPreparedPolygonContains';
export default class PreparedPolygonCovers extends AbstractPreparedPolygonContains {
	constructor() {
		super();
		PreparedPolygonCovers.constructor_.apply(this, arguments);
	}
	static covers(prep, geom) {
		var polyInt = new PreparedPolygonCovers(prep);
		return polyInt.covers(geom);
	}
	fullTopologicalPredicate(geom) {
		var result = this._prepPoly.getGeometry().covers(geom);
		return result;
	}
	covers(geom) {
		return this.eval(geom);
	}
	getClass() {
		return PreparedPolygonCovers;
	}
	get interfaces_() {
		return [];
	}
}
PreparedPolygonCovers.constructor_ = function () {
	let prepPoly = arguments[0];
	AbstractPreparedPolygonContains.constructor_.call(this, prepPoly);
	this._requireSomePointInInterior = false;
};
