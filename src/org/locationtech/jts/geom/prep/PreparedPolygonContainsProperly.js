import hasInterface from '../../../../../hasInterface';
import extend from '../../../../../extend';
import SegmentStringUtil from '../../noding/SegmentStringUtil';
import Polygonal from '../Polygonal';
import inherits from '../../../../../inherits';
import PreparedPolygonPredicate from './PreparedPolygonPredicate';
export default function PreparedPolygonContainsProperly() {
	let prepPoly = arguments[0];
	PreparedPolygonPredicate.call(this, prepPoly);
}
inherits(PreparedPolygonContainsProperly, PreparedPolygonPredicate);
extend(PreparedPolygonContainsProperly.prototype, {
	containsProperly: function (geom) {
		var isAllInPrepGeomAreaInterior = this.isAllTestComponentsInTargetInterior(geom);
		if (!isAllInPrepGeomAreaInterior) return false;
		var lineSegStr = SegmentStringUtil.extractSegmentStrings(geom);
		var segsIntersect = this._prepPoly.getIntersectionFinder().intersects(lineSegStr);
		if (segsIntersect) return false;
		if (hasInterface(geom, Polygonal)) {
			var isTargetGeomInTestArea = this.isAnyTargetComponentInAreaTest(geom, this._prepPoly.getRepresentativePoints());
			if (isTargetGeomInTestArea) return false;
		}
		return true;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedPolygonContainsProperly;
	}
});
PreparedPolygonContainsProperly.containsProperly = function (prep, geom) {
	var polyInt = new PreparedPolygonContainsProperly(prep);
	return polyInt.containsProperly(geom);
};
