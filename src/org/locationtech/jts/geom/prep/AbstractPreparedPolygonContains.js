import hasInterface from '../../../../../hasInterface';
import extend from '../../../../../extend';
import SegmentIntersectionDetector from '../../noding/SegmentIntersectionDetector';
import SegmentStringUtil from '../../noding/SegmentStringUtil';
import Polygonal from '../Polygonal';
import inherits from '../../../../../inherits';
import PreparedPolygonPredicate from './PreparedPolygonPredicate';
export default function AbstractPreparedPolygonContains() {
	this._requireSomePointInInterior = true;
	this._hasSegmentIntersection = false;
	this._hasProperIntersection = false;
	this._hasNonProperIntersection = false;
	let prepPoly = arguments[0];
	PreparedPolygonPredicate.call(this, prepPoly);
}
inherits(AbstractPreparedPolygonContains, PreparedPolygonPredicate);
extend(AbstractPreparedPolygonContains.prototype, {
	eval: function (geom) {
		var isAllInTargetArea = this.isAllTestComponentsInTarget(geom);
		if (!isAllInTargetArea) return false;
		if (this._requireSomePointInInterior && geom.getDimension() === 0) {
			var isAnyInTargetInterior = this.isAnyTestComponentInTargetInterior(geom);
			return isAnyInTargetInterior;
		}
		var properIntersectionImpliesNotContained = this.isProperIntersectionImpliesNotContainedSituation(geom);
		this.findAndClassifyIntersections(geom);
		if (properIntersectionImpliesNotContained && this._hasProperIntersection) return false;
		if (this._hasSegmentIntersection && !this._hasNonProperIntersection) return false;
		if (this._hasSegmentIntersection) {
			return this.fullTopologicalPredicate(geom);
		}
		if (hasInterface(geom, Polygonal)) {
			var isTargetInTestArea = this.isAnyTargetComponentInAreaTest(geom, this._prepPoly.getRepresentativePoints());
			if (isTargetInTestArea) return false;
		}
		return true;
	},
	findAndClassifyIntersections: function (geom) {
		var lineSegStr = SegmentStringUtil.extractSegmentStrings(geom);
		var intDetector = new SegmentIntersectionDetector();
		intDetector.setFindAllIntersectionTypes(true);
		this._prepPoly.getIntersectionFinder().intersects(lineSegStr, intDetector);
		this._hasSegmentIntersection = intDetector.hasIntersection();
		this._hasProperIntersection = intDetector.hasProperIntersection();
		this._hasNonProperIntersection = intDetector.hasNonProperIntersection();
	},
	isProperIntersectionImpliesNotContainedSituation: function (testGeom) {
		if (hasInterface(testGeom, Polygonal)) return true;
		if (this.isSingleShell(this._prepPoly.getGeometry())) return true;
		return false;
	},
	isSingleShell: function (geom) {
		if (geom.getNumGeometries() !== 1) return false;
		var poly = geom.getGeometryN(0);
		var numHoles = poly.getNumInteriorRing();
		if (numHoles === 0) return true;
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return AbstractPreparedPolygonContains;
	}
});
