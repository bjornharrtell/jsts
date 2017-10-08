import extend from '../../../../../extend';
import SegmentStringUtil from '../../noding/SegmentStringUtil';
import inherits from '../../../../../inherits';
import PreparedPolygonPredicate from './PreparedPolygonPredicate';
export default function PreparedPolygonIntersects() {
	let prepPoly = arguments[0];
	PreparedPolygonPredicate.call(this, prepPoly);
}
inherits(PreparedPolygonIntersects, PreparedPolygonPredicate);
extend(PreparedPolygonIntersects.prototype, {
	intersects: function (geom) {
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
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedPolygonIntersects;
	}
});
PreparedPolygonIntersects.intersects = function (prep, geom) {
	var polyInt = new PreparedPolygonIntersects(prep);
	return polyInt.intersects(geom);
};
