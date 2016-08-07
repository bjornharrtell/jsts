import CGAlgorithms from './CGAlgorithms';
import extend from '../../../../extend';
export default function Angle() {}
extend(Angle.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Angle;
	}
});
Angle.toDegrees = function (radians) {
	return radians * 180 / Math.PI;
};
Angle.normalize = function (angle) {
	while (angle > Math.PI) angle -= Angle.PI_TIMES_2;
	while (angle <= -Math.PI) angle += Angle.PI_TIMES_2;
	return angle;
};
Angle.angle = function () {
	if (arguments.length === 1) {
		let p = arguments[0];
		return Math.atan2(p.y, p.x);
	} else if (arguments.length === 2) {
		let p0 = arguments[0], p1 = arguments[1];
		var dx = p1.x - p0.x;
		var dy = p1.y - p0.y;
		return Math.atan2(dy, dx);
	}
};
Angle.isAcute = function (p0, p1, p2) {
	var dx0 = p0.x - p1.x;
	var dy0 = p0.y - p1.y;
	var dx1 = p2.x - p1.x;
	var dy1 = p2.y - p1.y;
	var dotprod = dx0 * dx1 + dy0 * dy1;
	return dotprod > 0;
};
Angle.isObtuse = function (p0, p1, p2) {
	var dx0 = p0.x - p1.x;
	var dy0 = p0.y - p1.y;
	var dx1 = p2.x - p1.x;
	var dy1 = p2.y - p1.y;
	var dotprod = dx0 * dx1 + dy0 * dy1;
	return dotprod < 0;
};
Angle.interiorAngle = function (p0, p1, p2) {
	var anglePrev = Angle.angle(p1, p0);
	var angleNext = Angle.angle(p1, p2);
	return Math.abs(angleNext - anglePrev);
};
Angle.normalizePositive = function (angle) {
	if (angle < 0.0) {
		while (angle < 0.0) angle += Angle.PI_TIMES_2;
		if (angle >= Angle.PI_TIMES_2) angle = 0.0;
	} else {
		while (angle >= Angle.PI_TIMES_2) angle -= Angle.PI_TIMES_2;
		if (angle < 0.0) angle = 0.0;
	}
	return angle;
};
Angle.angleBetween = function (tip1, tail, tip2) {
	var a1 = Angle.angle(tail, tip1);
	var a2 = Angle.angle(tail, tip2);
	return Angle.diff(a1, a2);
};
Angle.diff = function (ang1, ang2) {
	var delAngle = null;
	if (ang1 < ang2) {
		delAngle = ang2 - ang1;
	} else {
		delAngle = ang1 - ang2;
	}
	if (delAngle > Math.PI) {
		delAngle = 2 * Math.PI - delAngle;
	}
	return delAngle;
};
Angle.toRadians = function (angleDegrees) {
	return angleDegrees * Math.PI / 180.0;
};
Angle.getTurn = function (ang1, ang2) {
	var crossproduct = Math.sin(ang2 - ang1);
	if (crossproduct > 0) {
		return Angle.COUNTERCLOCKWISE;
	}
	if (crossproduct < 0) {
		return Angle.CLOCKWISE;
	}
	return Angle.NONE;
};
Angle.angleBetweenOriented = function (tip1, tail, tip2) {
	var a1 = Angle.angle(tail, tip1);
	var a2 = Angle.angle(tail, tip2);
	var angDel = a2 - a1;
	if (angDel <= -Math.PI) return angDel + Angle.PI_TIMES_2;
	if (angDel > Math.PI) return angDel - Angle.PI_TIMES_2;
	return angDel;
};
Angle.PI_TIMES_2 = 2.0 * Math.PI;
Angle.PI_OVER_2 = Math.PI / 2.0;
Angle.PI_OVER_4 = Math.PI / 4.0;
Angle.COUNTERCLOCKWISE = CGAlgorithms.COUNTERCLOCKWISE;
Angle.CLOCKWISE = CGAlgorithms.CLOCKWISE;
Angle.NONE = CGAlgorithms.COLLINEAR;
