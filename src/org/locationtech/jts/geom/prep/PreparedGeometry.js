export default class PreparedGeometry {
	constructor() {
		PreparedGeometry.constructor_.apply(this, arguments);
	}
	containsProperly(geom) {}
	getGeometry() {}
	covers(geom) {}
	intersects(geom) {}
	touches(geom) {}
	within(geom) {}
	coveredBy(geom) {}
	overlaps(geom) {}
	disjoint(geom) {}
	crosses(geom) {}
	contains(geom) {}
	getClass() {
		return PreparedGeometry;
	}
	get interfaces_() {
		return [];
	}
}
PreparedGeometry.constructor_ = function () {};
