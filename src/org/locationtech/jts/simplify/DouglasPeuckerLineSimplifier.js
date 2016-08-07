import CoordinateList from '../geom/CoordinateList';
import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
export default function DouglasPeuckerLineSimplifier() {
	this.pts = null;
	this.usePt = null;
	this.distanceTolerance = null;
	this.seg = new LineSegment();
	let pts = arguments[0];
	this.pts = pts;
}
extend(DouglasPeuckerLineSimplifier.prototype, {
	simplifySection: function (i, j) {
		if (i + 1 === j) {
			return null;
		}
		this.seg.p0 = this.pts[i];
		this.seg.p1 = this.pts[j];
		var maxDistance = -1.0;
		var maxIndex = i;
		for (var k = i + 1; k < j; k++) {
			var distance = this.seg.distance(this.pts[k]);
			if (distance > maxDistance) {
				maxDistance = distance;
				maxIndex = k;
			}
		}
		if (maxDistance <= this.distanceTolerance) {
			for (var k = i + 1; k < j; k++) {
				this.usePt[k] = false;
			}
		} else {
			this.simplifySection(i, maxIndex);
			this.simplifySection(maxIndex, j);
		}
	},
	setDistanceTolerance: function (distanceTolerance) {
		this.distanceTolerance = distanceTolerance;
	},
	simplify: function () {
		this.usePt = new Array(this.pts.length).fill(null);
		for (var i = 0; i < this.pts.length; i++) {
			this.usePt[i] = true;
		}
		this.simplifySection(0, this.pts.length - 1);
		var coordList = new CoordinateList();
		for (var i = 0; i < this.pts.length; i++) {
			if (this.usePt[i]) coordList.add(new Coordinate(this.pts[i]));
		}
		return coordList.toCoordinateArray();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DouglasPeuckerLineSimplifier;
	}
});
DouglasPeuckerLineSimplifier.simplify = function (pts, distanceTolerance) {
	var simp = new DouglasPeuckerLineSimplifier(pts);
	simp.setDistanceTolerance(distanceTolerance);
	return simp.simplify();
};
