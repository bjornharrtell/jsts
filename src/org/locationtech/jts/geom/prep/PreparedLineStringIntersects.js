import PointLocator from '../../algorithm/PointLocator';
import extend from '../../../../../extend';
import SegmentStringUtil from '../../noding/SegmentStringUtil';
import ComponentCoordinateExtracter from '../util/ComponentCoordinateExtracter';
export default function PreparedLineStringIntersects() {
	this.prepLine = null;
	let prepLine = arguments[0];
	this.prepLine = prepLine;
}
extend(PreparedLineStringIntersects.prototype, {
	isAnyTestPointInTarget: function (testGeom) {
		var locator = new PointLocator();
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			if (locator.intersects(p, this.prepLine.getGeometry())) return true;
		}
		return false;
	},
	intersects: function (geom) {
		var lineSegStr = SegmentStringUtil.extractSegmentStrings(geom);
		if (lineSegStr.size() > 0) {
			var segsIntersect = this.prepLine.getIntersectionFinder().intersects(lineSegStr);
			if (segsIntersect) return true;
		}
		if (geom.getDimension() === 1) return false;
		if (geom.getDimension() === 2 && this.prepLine.isAnyTargetComponentInTest(geom)) return true;
		if (geom.getDimension() === 0) return this.isAnyTestPointInTarget(geom);
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedLineStringIntersects;
	}
});
PreparedLineStringIntersects.intersects = function (prep, geom) {
	var op = new PreparedLineStringIntersects(prep);
	return op.intersects(geom);
};
