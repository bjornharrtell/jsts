import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import Comparable from '../../../../java/lang/Comparable';
export default function LinearLocation() {
	this._componentIndex = 0;
	this._segmentIndex = 0;
	this._segmentFraction = 0.0;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let loc = arguments[0];
		this._componentIndex = loc._componentIndex;
		this._segmentIndex = loc._segmentIndex;
		this._segmentFraction = loc._segmentFraction;
	} else if (arguments.length === 2) {
		let segmentIndex = arguments[0], segmentFraction = arguments[1];
		LinearLocation.call(this, 0, segmentIndex, segmentFraction);
	} else if (arguments.length === 3) {
		let componentIndex = arguments[0], segmentIndex = arguments[1], segmentFraction = arguments[2];
		this._componentIndex = componentIndex;
		this._segmentIndex = segmentIndex;
		this._segmentFraction = segmentFraction;
		this.normalize();
	} else if (arguments.length === 4) {
		let componentIndex = arguments[0], segmentIndex = arguments[1], segmentFraction = arguments[2], doNormalize = arguments[3];
		this._componentIndex = componentIndex;
		this._segmentIndex = segmentIndex;
		this._segmentFraction = segmentFraction;
		if (doNormalize) this.normalize();
	}
}
extend(LinearLocation.prototype, {
	getSegmentIndex: function () {
		return this._segmentIndex;
	},
	getComponentIndex: function () {
		return this._componentIndex;
	},
	isEndpoint: function (linearGeom) {
		var lineComp = linearGeom.getGeometryN(this._componentIndex);
		var nseg = lineComp.getNumPoints() - 1;
		return this._segmentIndex >= nseg || this._segmentIndex === nseg && this._segmentFraction >= 1.0;
	},
	isValid: function (linearGeom) {
		if (this._componentIndex < 0 || this._componentIndex >= linearGeom.getNumGeometries()) return false;
		var lineComp = linearGeom.getGeometryN(this._componentIndex);
		if (this._segmentIndex < 0 || this._segmentIndex > lineComp.getNumPoints()) return false;
		if (this._segmentIndex === lineComp.getNumPoints() && this._segmentFraction !== 0.0) return false;
		if (this._segmentFraction < 0.0 || this._segmentFraction > 1.0) return false;
		return true;
	},
	normalize: function () {
		if (this._segmentFraction < 0.0) {
			this._segmentFraction = 0.0;
		}
		if (this._segmentFraction > 1.0) {
			this._segmentFraction = 1.0;
		}
		if (this._componentIndex < 0) {
			this._componentIndex = 0;
			this._segmentIndex = 0;
			this._segmentFraction = 0.0;
		}
		if (this._segmentIndex < 0) {
			this._segmentIndex = 0;
			this._segmentFraction = 0.0;
		}
		if (this._segmentFraction === 1.0) {
			this._segmentFraction = 0.0;
			this._segmentIndex += 1;
		}
	},
	toLowest: function (linearGeom) {
		var lineComp = linearGeom.getGeometryN(this._componentIndex);
		var nseg = lineComp.getNumPoints() - 1;
		if (this._segmentIndex < nseg) return this;
		return new LinearLocation(this._componentIndex, nseg, 1.0, false);
	},
	getCoordinate: function (linearGeom) {
		var lineComp = linearGeom.getGeometryN(this._componentIndex);
		var p0 = lineComp.getCoordinateN(this._segmentIndex);
		if (this._segmentIndex >= lineComp.getNumPoints() - 1) return p0;
		var p1 = lineComp.getCoordinateN(this._segmentIndex + 1);
		return LinearLocation.pointAlongSegmentByFraction(p0, p1, this._segmentFraction);
	},
	getSegmentFraction: function () {
		return this._segmentFraction;
	},
	getSegment: function (linearGeom) {
		var lineComp = linearGeom.getGeometryN(this._componentIndex);
		var p0 = lineComp.getCoordinateN(this._segmentIndex);
		if (this._segmentIndex >= lineComp.getNumPoints() - 1) {
			var prev = lineComp.getCoordinateN(lineComp.getNumPoints() - 2);
			return new LineSegment(prev, p0);
		}
		var p1 = lineComp.getCoordinateN(this._segmentIndex + 1);
		return new LineSegment(p0, p1);
	},
	clamp: function (linear) {
		if (this._componentIndex >= linear.getNumGeometries()) {
			this.setToEnd(linear);
			return null;
		}
		if (this._segmentIndex >= linear.getNumPoints()) {
			var line = linear.getGeometryN(this._componentIndex);
			this._segmentIndex = line.getNumPoints() - 1;
			this._segmentFraction = 1.0;
		}
	},
	setToEnd: function (linear) {
		this._componentIndex = linear.getNumGeometries() - 1;
		var lastLine = linear.getGeometryN(this._componentIndex);
		this._segmentIndex = lastLine.getNumPoints() - 1;
		this._segmentFraction = 1.0;
	},
	compareTo: function (o) {
		var other = o;
		if (this._componentIndex < other._componentIndex) return -1;
		if (this._componentIndex > other._componentIndex) return 1;
		if (this._segmentIndex < other._segmentIndex) return -1;
		if (this._segmentIndex > other._segmentIndex) return 1;
		if (this._segmentFraction < other._segmentFraction) return -1;
		if (this._segmentFraction > other._segmentFraction) return 1;
		return 0;
	},
	clone: function () {
		return new LinearLocation(this._componentIndex, this._segmentIndex, this._segmentFraction);
	},
	toString: function () {
		return "LinearLoc[" + this._componentIndex + ", " + this._segmentIndex + ", " + this._segmentFraction + "]";
	},
	isOnSameSegment: function (loc) {
		if (this._componentIndex !== loc._componentIndex) return false;
		if (this._segmentIndex === loc._segmentIndex) return true;
		if (loc._segmentIndex - this._segmentIndex === 1 && loc._segmentFraction === 0.0) return true;
		if (this._segmentIndex - loc._segmentIndex === 1 && this._segmentFraction === 0.0) return true;
		return false;
	},
	snapToVertex: function (linearGeom, minDistance) {
		if (this._segmentFraction <= 0.0 || this._segmentFraction >= 1.0) return null;
		var segLen = this.getSegmentLength(linearGeom);
		var lenToStart = this._segmentFraction * segLen;
		var lenToEnd = segLen - lenToStart;
		if (lenToStart <= lenToEnd && lenToStart < minDistance) {
			this._segmentFraction = 0.0;
		} else if (lenToEnd <= lenToStart && lenToEnd < minDistance) {
			this._segmentFraction = 1.0;
		}
	},
	compareLocationValues: function (componentIndex1, segmentIndex1, segmentFraction1) {
		if (this._componentIndex < componentIndex1) return -1;
		if (this._componentIndex > componentIndex1) return 1;
		if (this._segmentIndex < segmentIndex1) return -1;
		if (this._segmentIndex > segmentIndex1) return 1;
		if (this._segmentFraction < segmentFraction1) return -1;
		if (this._segmentFraction > segmentFraction1) return 1;
		return 0;
	},
	getSegmentLength: function (linearGeom) {
		var lineComp = linearGeom.getGeometryN(this._componentIndex);
		var segIndex = this._segmentIndex;
		if (this._segmentIndex >= lineComp.getNumPoints() - 1) segIndex = lineComp.getNumPoints() - 2;
		var p0 = lineComp.getCoordinateN(segIndex);
		var p1 = lineComp.getCoordinateN(segIndex + 1);
		return p0.distance(p1);
	},
	isVertex: function () {
		return this._segmentFraction <= 0.0 || this._segmentFraction >= 1.0;
	},
	interfaces_: function () {
		return [Comparable];
	},
	getClass: function () {
		return LinearLocation;
	}
});
LinearLocation.getEndLocation = function (linear) {
	var loc = new LinearLocation();
	loc.setToEnd(linear);
	return loc;
};
LinearLocation.pointAlongSegmentByFraction = function (p0, p1, frac) {
	if (frac <= 0.0) return p0;
	if (frac >= 1.0) return p1;
	var x = (p1.x - p0.x) * frac + p0.x;
	var y = (p1.y - p0.y) * frac + p0.y;
	var z = (p1.z - p0.z) * frac + p0.z;
	return new Coordinate(x, y, z);
};
LinearLocation.compareLocationValues = function (componentIndex0, segmentIndex0, segmentFraction0, componentIndex1, segmentIndex1, segmentFraction1) {
	if (componentIndex0 < componentIndex1) return -1;
	if (componentIndex0 > componentIndex1) return 1;
	if (segmentIndex0 < segmentIndex1) return -1;
	if (segmentIndex0 > segmentIndex1) return 1;
	if (segmentFraction0 < segmentFraction1) return -1;
	if (segmentFraction0 > segmentFraction1) return 1;
	return 0;
};
