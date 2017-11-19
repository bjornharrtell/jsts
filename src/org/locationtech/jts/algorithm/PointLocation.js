import Location from '../geom/Location';
import hasInterface from '../../../../hasInterface';
import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import CoordinateSequence from '../geom/CoordinateSequence';
import RobustLineIntersector from './RobustLineIntersector';
import RayCrossingCounter from './RayCrossingCounter';
export default function PointLocation() {}
extend(PointLocation.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PointLocation;
	}
});
PointLocation.isOnLine = function () {
	if (arguments[0] instanceof Coordinate && hasInterface(arguments[1], CoordinateSequence)) {
		let p = arguments[0], line = arguments[1];
		var lineIntersector = new RobustLineIntersector();
		var p0 = new Coordinate();
		var p1 = new Coordinate();
		var n = line.size();
		for (var i = 1; i < n; i++) {
			line.getCoordinate(i - 1, p0);
			line.getCoordinate(i, p1);
			lineIntersector.computeIntersection(p, p0, p1);
			if (lineIntersector.hasIntersection()) {
				return true;
			}
		}
		return false;
	} else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Array) {
		let p = arguments[0], line = arguments[1];
		var lineIntersector = new RobustLineIntersector();
		for (var i = 1; i < line.length; i++) {
			var p0 = line[i - 1];
			var p1 = line[i];
			lineIntersector.computeIntersection(p, p0, p1);
			if (lineIntersector.hasIntersection()) {
				return true;
			}
		}
		return false;
	}
};
PointLocation.locateInRing = function (p, ring) {
	return RayCrossingCounter.locatePointInRing(p, ring);
};
PointLocation.isInRing = function (p, ring) {
	return PointLocation.locateInRing(p, ring) !== Location.EXTERIOR;
};
