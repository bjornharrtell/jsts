import Coordinate from '../geom/Coordinate';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import Vector3D from '../math/Vector3D';
export default function CGAlgorithms3D() {}
extend(CGAlgorithms3D.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CGAlgorithms3D;
	}
});
CGAlgorithms3D.distanceSegmentSegment = function (A, B, C, D) {
	if (A.equals3D(B)) return CGAlgorithms3D.distancePointSegment(A, C, D);
	if (C.equals3D(B)) return CGAlgorithms3D.distancePointSegment(C, A, B);
	var a = Vector3D.dot(A, B, A, B);
	var b = Vector3D.dot(A, B, C, D);
	var c = Vector3D.dot(C, D, C, D);
	var d = Vector3D.dot(A, B, C, A);
	var e = Vector3D.dot(C, D, C, A);
	var denom = a * c - b * b;
	if (Double.isNaN(denom)) throw new IllegalArgumentException("Ordinates must not be NaN");
	var s = null;
	var t = null;
	if (denom <= 0.0) {
		s = 0;
		if (b > c) t = d / b; else t = e / c;
	} else {
		s = (b * e - c * d) / denom;
		t = (a * e - b * d) / denom;
	}
	if (s < 0) return CGAlgorithms3D.distancePointSegment(A, C, D); else if (s > 1) return CGAlgorithms3D.distancePointSegment(B, C, D); else if (t < 0) return CGAlgorithms3D.distancePointSegment(C, A, B); else if (t > 1) {
		return CGAlgorithms3D.distancePointSegment(D, A, B);
	}
	var x1 = A.x + s * (B.x - A.x);
	var y1 = A.y + s * (B.y - A.y);
	var z1 = A.z + s * (B.z - A.z);
	var x2 = C.x + t * (D.x - C.x);
	var y2 = C.y + t * (D.y - C.y);
	var z2 = C.z + t * (D.z - C.z);
	return CGAlgorithms3D.distance(new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2));
};
CGAlgorithms3D.distance = function (p0, p1) {
	if (Double.isNaN(p0.z) || Double.isNaN(p1.z)) return p0.distance(p1);
	var dx = p0.x - p1.x;
	var dy = p0.y - p1.y;
	var dz = p0.z - p1.z;
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
CGAlgorithms3D.distancePointSegment = function (p, A, B) {
	if (A.equals3D(B)) return CGAlgorithms3D.distance(p, A);
	var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y) + (B.z - A.z) * (B.z - A.z);
	if (Double.isNaN(len2)) throw new IllegalArgumentException("Ordinates must not be NaN");
	var r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y) + (p.z - A.z) * (B.z - A.z)) / len2;
	if (r <= 0.0) return CGAlgorithms3D.distance(p, A);
	if (r >= 1.0) return CGAlgorithms3D.distance(p, B);
	var qx = A.x + r * (B.x - A.x);
	var qy = A.y + r * (B.y - A.y);
	var qz = A.z + r * (B.z - A.z);
	var dx = p.x - qx;
	var dy = p.y - qy;
	var dz = p.z - qz;
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

