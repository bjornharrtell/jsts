import BasicPreparedGeometry from './BasicPreparedGeometry';
export default class PreparedPoint extends BasicPreparedGeometry {
	constructor() {
		super();
		PreparedPoint.constructor_.apply(this, arguments);
	}
	intersects(g) {
		if (!this.envelopesIntersect(g)) return false;
		return this.isAnyTargetComponentInTest(g);
	}
	getClass() {
		return PreparedPoint;
	}
	get interfaces_() {
		return [];
	}
}
PreparedPoint.constructor_ = function () {
	let point = arguments[0];
	BasicPreparedGeometry.constructor_.call(this, point);
};
