import SegmentStringUtil from '../../noding/SegmentStringUtil';
import PreparedPolygonPredicate from './PreparedPolygonPredicate';
export default class PreparedPolygonIntersects extends PreparedPolygonPredicate {
	constructor() {
		super();
		PreparedPolygonIntersects.constructor_.apply(this, arguments);
	}
	static intersects(prep, geom) {
		var polyInt = new PreparedPolygonIntersects(prep);
		return polyInt.intersects(geom);
	}
	intersects(geom) {
		var isInPrepGeomArea = this.isAnyTestComponentInTarget(geom);
		if (isInPrepGeomArea) return true;
		if (geom.getDimension() === 0) return false;
		var lineSegStr = SegmentStringUtil.extractSegmentStrings(geom);
		if (lineSegStr.size() > 0) {
			var segsIntersect = this._prepPoly.getIntersectionFinder().intersects(lineSegStr);
			if (segsIntersect) return true;
		}
		if (geom.getDimension() === 2) {
			var isPrepGeomInArea = this.isAnyTargetComponentInAreaTest(geom, this._prepPoly.getRepresentativePoints());
			if (isPrepGeomInArea) return true;
		}
		return false;
	}
	getClass() {
		return PreparedPolygonIntersects;
	}
	get interfaces_() {
		return [];
	}
}
PreparedPolygonIntersects.constructor_ = function () {
	let prepPoly = arguments[0];
	PreparedPolygonPredicate.constructor_.call(this, prepPoly);
};
