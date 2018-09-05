import Coordinate from '../Coordinate';
import GeometricShapeFactory from '../../util/GeometricShapeFactory';
export default class SineStarFactory extends GeometricShapeFactory {
	constructor() {
		super();
		SineStarFactory.constructor_.apply(this, arguments);
	}
	setNumArms(numArms) {
		this._numArms = numArms;
	}
	setArmLengthRatio(armLengthRatio) {
		this._armLengthRatio = armLengthRatio;
	}
	createSineStar() {
		var env = this._dim.getEnvelope();
		var radius = env.getWidth() / 2.0;
		var armRatio = this._armLengthRatio;
		if (armRatio < 0.0) armRatio = 0.0;
		if (armRatio > 1.0) armRatio = 1.0;
		var armMaxLen = armRatio * radius;
		var insideRadius = (1 - armRatio) * radius;
		var centreX = env.getMinX() + radius;
		var centreY = env.getMinY() + radius;
		var pts = new Array(this._nPts + 1).fill(null);
		var iPt = 0;
		for (var i = 0; i < this._nPts; i++) {
			var ptArcFrac = i / this._nPts * this._numArms;
			var armAngFrac = ptArcFrac - Math.floor(ptArcFrac);
			var armAng = 2 * Math.PI * armAngFrac;
			var armLenFrac = (Math.cos(armAng) + 1.0) / 2.0;
			var curveRadius = insideRadius + armMaxLen * armLenFrac;
			var ang = i * (2 * Math.PI / this._nPts);
			var x = curveRadius * Math.cos(ang) + centreX;
			var y = curveRadius * Math.sin(ang) + centreY;
			pts[iPt++] = this.coord(x, y);
		}
		pts[iPt] = new Coordinate(pts[0]);
		var ring = this._geomFact.createLinearRing(pts);
		var poly = this._geomFact.createPolygon(ring);
		return poly;
	}
	getClass() {
		return SineStarFactory;
	}
	get interfaces_() {
		return [];
	}
}
SineStarFactory.constructor_ = function () {
	this._numArms = 8;
	this._armLengthRatio = 0.5;
	if (arguments.length === 0) {
		GeometricShapeFactory.constructor_.call(this);
	} else if (arguments.length === 1) {
		let geomFact = arguments[0];
		GeometricShapeFactory.constructor_.call(this, geomFact);
	}
};
