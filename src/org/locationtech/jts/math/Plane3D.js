import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Double from '../../../../java/lang/Double';
import Vector3D from './Vector3D';
export default class Plane3D {
	constructor(...args) {
		this.normal = null;
		this.basePt = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [normal, basePt] = args;
						this.normal = normal;
						this.basePt = basePt;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	closestAxisPlane() {
		var xmag = Math.abs(this.normal.getX());
		var ymag = Math.abs(this.normal.getY());
		var zmag = Math.abs(this.normal.getZ());
		if (xmag > ymag) {
			if (xmag > zmag) return Plane3D.YZ_PLANE; else return Plane3D.XY_PLANE;
		} else if (zmag > ymag) {
			return Plane3D.XY_PLANE;
		}
		return Plane3D.XZ_PLANE;
	}
	orientedDistance(p) {
		var pb = new Vector3D(p, this.basePt);
		var pbdDotNormal = pb.dot(this.normal);
		if (Double.isNaN(pbdDotNormal)) throw new IllegalArgumentException("3D Coordinate has NaN ordinate");
		var d = pbdDotNormal / this.normal.length();
		return d;
	}
	getClass() {
		return Plane3D;
	}
}
Plane3D.XY_PLANE = 1;
Plane3D.YZ_PLANE = 2;
Plane3D.XZ_PLANE = 3;

