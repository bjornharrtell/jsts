import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import Coordinate from '../../geom/Coordinate';
import Polygon from '../../geom/Polygon';
import extend from '../../../../../extend';
import LineSegment from '../../geom/LineSegment';
import PointPairDistance from './PointPairDistance';
import GeometryCollection from '../../geom/GeometryCollection';
export default function DistanceToPoint() {}
extend(DistanceToPoint.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DistanceToPoint;
	}
});
DistanceToPoint.computeDistance = function () {
	if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof LineString && arguments[1] instanceof Coordinate)) {
		let line = arguments[0], pt = arguments[1], ptDist = arguments[2];
		var tempSegment = new LineSegment();
		var coords = line.getCoordinates();
		for (var i = 0; i < coords.length - 1; i++) {
			tempSegment.setCoordinates(coords[i], coords[i + 1]);
			var closestPt = tempSegment.closestPoint(pt);
			ptDist.setMinimum(closestPt, pt);
		}
	} else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof Polygon && arguments[1] instanceof Coordinate)) {
		let poly = arguments[0], pt = arguments[1], ptDist = arguments[2];
		DistanceToPoint.computeDistance(poly.getExteriorRing(), pt, ptDist);
		for (var i = 0; i < poly.getNumInteriorRing(); i++) {
			DistanceToPoint.computeDistance(poly.getInteriorRingN(i), pt, ptDist);
		}
	} else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof Geometry && arguments[1] instanceof Coordinate)) {
		let geom = arguments[0], pt = arguments[1], ptDist = arguments[2];
		if (geom instanceof LineString) {
			DistanceToPoint.computeDistance(geom, pt, ptDist);
		} else if (geom instanceof Polygon) {
			DistanceToPoint.computeDistance(geom, pt, ptDist);
		} else if (geom instanceof GeometryCollection) {
			var gc = geom;
			for (var i = 0; i < gc.getNumGeometries(); i++) {
				var g = gc.getGeometryN(i);
				DistanceToPoint.computeDistance(g, pt, ptDist);
			}
		} else {
			ptDist.setMinimum(geom.getCoordinate(), pt);
		}
	} else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof LineSegment && arguments[1] instanceof Coordinate)) {
		let segment = arguments[0], pt = arguments[1], ptDist = arguments[2];
		var closestPt = segment.closestPoint(pt);
		ptDist.setMinimum(closestPt, pt);
	}
};
