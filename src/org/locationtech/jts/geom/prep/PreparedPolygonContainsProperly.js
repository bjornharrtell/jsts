import hasInterface from '../../../../../hasInterface';
import SegmentStringUtil from '../../noding/SegmentStringUtil';
import Polygonal from '../Polygonal';
import PreparedPolygonPredicate from './PreparedPolygonPredicate';
export default class PreparedPolygonContainsProperly extends PreparedPolygonPredicate {
	constructor() {
		super();
		PreparedPolygonContainsProperly.constructor_.apply(this, arguments);
	}
	static containsProperly(prep, geom) {
		var polyInt = new PreparedPolygonContainsProperly(prep);
		return polyInt.containsProperly(geom);
	}
	containsProperly(geom) {
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
	}
	getClass() {
		return PreparedPolygonContainsProperly;
	}
	get interfaces_() {
		return [];
	}
}
PreparedPolygonContainsProperly.constructor_ = function () {
	let prepPoly = arguments[0];
	PreparedPolygonPredicate.constructor_.call(this, prepPoly);
};
