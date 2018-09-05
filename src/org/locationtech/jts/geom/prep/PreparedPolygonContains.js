import AbstractPreparedPolygonContains from './AbstractPreparedPolygonContains';
export default class PreparedPolygonContains extends AbstractPreparedPolygonContains {
	constructor() {
		super();
		PreparedPolygonContains.constructor_.apply(this, arguments);
	}
	static contains(prep, geom) {
		var polyInt = new PreparedPolygonContains(prep);
		return polyInt.contains(geom);
	}
	fullTopologicalPredicate(geom) {
		var isContained = this._prepPoly.getGeometry().contains(geom);
		return isContained;
	}
	contains(geom) {
		return this.eval(geom);
	}
	getClass() {
		return PreparedPolygonContains;
	}
	get interfaces_() {
		return [];
	}
}
PreparedPolygonContains.constructor_ = function () {
	let prepPoly = arguments[0];
	AbstractPreparedPolygonContains.constructor_.call(this, prepPoly);
};
