import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import Vector3D from './Vector3D';
export default function Plane3D() {
	this._normal = null;
	this._basePt = null;
	let normal = arguments[0], basePt = arguments[1];
	this._normal = normal;
	this._basePt = basePt;
}
extend(Plane3D.prototype, {
	closestAxisPlane: function () {
		var xmag = Math.abs(this._normal.getX());
		var ymag = Math.abs(this._normal.getY());
		var zmag = Math.abs(this._normal.getZ());
		if (xmag > ymag) {
			if (xmag > zmag) return Plane3D.YZ_PLANE; else return Plane3D.XY_PLANE;
		} else if (zmag > ymag) {
			return Plane3D.XY_PLANE;
		}
		return Plane3D.XZ_PLANE;
	},
	orientedDistance: function (p) {
		var pb = new Vector3D(p, this._basePt);
		var pbdDotNormal = pb.dot(this._normal);
		if (Double.isNaN(pbdDotNormal)) throw new IllegalArgumentException("3D Coordinate has NaN ordinate");
		var d = pbdDotNormal / this._normal.length();
		return d;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Plane3D;
	}
});
Plane3D.XY_PLANE = 1;
Plane3D.YZ_PLANE = 2;
Plane3D.XZ_PLANE = 3;
