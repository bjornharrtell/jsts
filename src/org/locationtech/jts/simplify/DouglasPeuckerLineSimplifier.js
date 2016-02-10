import CoordinateList from '../geom/CoordinateList';
import Coordinate from '../geom/Coordinate';
import LineSegment from '../geom/LineSegment';
export default class DouglasPeuckerLineSimplifier {
	constructor(...args) {
		this.pts = null;
		this.usePt = null;
		this.distanceTolerance = null;
		this.seg = new LineSegment();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [pts] = args;
						this.pts = pts;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static simplify(pts, distanceTolerance) {
		var simp = new DouglasPeuckerLineSimplifier(pts);
		simp.setDistanceTolerance(distanceTolerance);
		return simp.simplify();
	}
	simplifySection(i, j) {
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
	}
	setDistanceTolerance(distanceTolerance) {
		this.distanceTolerance = distanceTolerance;
	}
	simplify() {
		this.usePt = new Array(this.pts.length);
		for (var i = 0; i < this.pts.length; i++) {
			this.usePt[i] = true;
		}
		this.simplifySection(0, this.pts.length - 1);
		var coordList = new CoordinateList();
		for (var i = 0; i < this.pts.length; i++) {
			if (this.usePt[i]) coordList.add(new Coordinate(this.pts[i]));
		}
		return coordList.toCoordinateArray();
	}
	getClass() {
		return DouglasPeuckerLineSimplifier;
	}
}

