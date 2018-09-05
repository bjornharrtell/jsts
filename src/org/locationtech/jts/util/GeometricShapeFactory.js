import GeometryFactory from '../geom/GeometryFactory';
import Coordinate from '../geom/Coordinate';
import AffineTransformation from '../geom/util/AffineTransformation';
import Envelope from '../geom/Envelope';
export default class GeometricShapeFactory {
	constructor() {
		GeometricShapeFactory.constructor_.apply(this, arguments);
	}
	createSupercircle(power) {
		var recipPow = 1.0 / power;
		var radius = this._dim.getMinSize() / 2;
		var centre = this._dim.getCentre();
		var r4 = Math.pow(radius, power);
		var y0 = radius;
		var xyInt = Math.pow(r4 / 2, recipPow);
		var nSegsInOct = Math.trunc(this._nPts / 8);
		var totPts = nSegsInOct * 8 + 1;
		var pts = new Array(totPts).fill(null);
		var xInc = xyInt / nSegsInOct;
		for (var i = 0; i <= nSegsInOct; i++) {
			var x = 0.0;
			var y = y0;
			if (i !== 0) {
				x = xInc * i;
				var x4 = Math.pow(x, power);
				y = Math.pow(r4 - x4, recipPow);
			}
			pts[i] = this.coordTrans(x, y, centre);
			pts[2 * nSegsInOct - i] = this.coordTrans(y, x, centre);
			pts[2 * nSegsInOct + i] = this.coordTrans(y, -x, centre);
			pts[4 * nSegsInOct - i] = this.coordTrans(x, -y, centre);
			pts[4 * nSegsInOct + i] = this.coordTrans(-x, -y, centre);
			pts[6 * nSegsInOct - i] = this.coordTrans(-y, -x, centre);
			pts[6 * nSegsInOct + i] = this.coordTrans(-y, x, centre);
			pts[8 * nSegsInOct - i] = this.coordTrans(-x, y, centre);
		}
		pts[pts.length - 1] = new Coordinate(pts[0]);
		var ring = this._geomFact.createLinearRing(pts);
		var poly = this._geomFact.createPolygon(ring);
		return this.rotate(poly);
	}
	setNumPoints(nPts) {
		this._nPts = nPts;
	}
	setBase(base) {
		this._dim.setBase(base);
	}
	setRotation(radians) {
		this._rotationAngle = radians;
	}
	setWidth(width) {
		this._dim.setWidth(width);
	}
	createEllipse() {
		var env = this._dim.getEnvelope();
		var xRadius = env.getWidth() / 2.0;
		var yRadius = env.getHeight() / 2.0;
		var centreX = env.getMinX() + xRadius;
		var centreY = env.getMinY() + yRadius;
		var pts = new Array(this._nPts + 1).fill(null);
		var iPt = 0;
		for (var i = 0; i < this._nPts; i++) {
			var ang = i * (2 * Math.PI / this._nPts);
			var x = xRadius * Math.cos(ang) + centreX;
			var y = yRadius * Math.sin(ang) + centreY;
			pts[iPt++] = this.coord(x, y);
		}
		pts[iPt] = new Coordinate(pts[0]);
		var ring = this._geomFact.createLinearRing(pts);
		var poly = this._geomFact.createPolygon(ring);
		return this.rotate(poly);
	}
	coordTrans(x, y, trans) {
		return this.coord(x + trans.x, y + trans.y);
	}
	createSquircle() {
		return this.createSupercircle(4);
	}
	setEnvelope(env) {
		this._dim.setEnvelope(env);
	}
	setCentre(centre) {
		this._dim.setCentre(centre);
	}
	createArc(startAng, angExtent) {
		var env = this._dim.getEnvelope();
		var xRadius = env.getWidth() / 2.0;
		var yRadius = env.getHeight() / 2.0;
		var centreX = env.getMinX() + xRadius;
		var centreY = env.getMinY() + yRadius;
		var angSize = angExtent;
		if (angSize <= 0.0 || angSize > 2 * Math.PI) angSize = 2 * Math.PI;
		var angInc = angSize / (this._nPts - 1);
		var pts = new Array(this._nPts).fill(null);
		var iPt = 0;
		for (var i = 0; i < this._nPts; i++) {
			var ang = startAng + i * angInc;
			var x = xRadius * Math.cos(ang) + centreX;
			var y = yRadius * Math.sin(ang) + centreY;
			pts[iPt++] = this.coord(x, y);
		}
		var line = this._geomFact.createLineString(pts);
		return this.rotate(line);
	}
	rotate(geom) {
		if (this._rotationAngle !== 0.0) {
			var trans = AffineTransformation.rotationInstance(this._rotationAngle, this._dim.getCentre().x, this._dim.getCentre().y);
			geom.apply(trans);
		}
		return geom;
	}
	coord(x, y) {
		var pt = new Coordinate(x, y);
		this._precModel.makePrecise(pt);
		return pt;
	}
	createArcPolygon(startAng, angExtent) {
		var env = this._dim.getEnvelope();
		var xRadius = env.getWidth() / 2.0;
		var yRadius = env.getHeight() / 2.0;
		var centreX = env.getMinX() + xRadius;
		var centreY = env.getMinY() + yRadius;
		var angSize = angExtent;
		if (angSize <= 0.0 || angSize > 2 * Math.PI) angSize = 2 * Math.PI;
		var angInc = angSize / (this._nPts - 1);
		var pts = new Array(this._nPts + 2).fill(null);
		var iPt = 0;
		pts[iPt++] = this.coord(centreX, centreY);
		for (var i = 0; i < this._nPts; i++) {
			var ang = startAng + angInc * i;
			var x = xRadius * Math.cos(ang) + centreX;
			var y = yRadius * Math.sin(ang) + centreY;
			pts[iPt++] = this.coord(x, y);
		}
		pts[iPt++] = this.coord(centreX, centreY);
		var ring = this._geomFact.createLinearRing(pts);
		var poly = this._geomFact.createPolygon(ring);
		return this.rotate(poly);
	}
	createRectangle() {
		var i = null;
		var ipt = 0;
		var nSide = Math.trunc(this._nPts / 4);
		if (nSide < 1) nSide = 1;
		var XsegLen = this._dim.getEnvelope().getWidth() / nSide;
		var YsegLen = this._dim.getEnvelope().getHeight() / nSide;
		var pts = new Array(4 * nSide + 1).fill(null);
		var env = this._dim.getEnvelope();
		for ((i = 0); i < nSide; i++) {
			var x = env.getMinX() + i * XsegLen;
			var y = env.getMinY();
			pts[ipt++] = this.coord(x, y);
		}
		for ((i = 0); i < nSide; i++) {
			var x = env.getMaxX();
			var y = env.getMinY() + i * YsegLen;
			pts[ipt++] = this.coord(x, y);
		}
		for ((i = 0); i < nSide; i++) {
			var x = env.getMaxX() - i * XsegLen;
			var y = env.getMaxY();
			pts[ipt++] = this.coord(x, y);
		}
		for ((i = 0); i < nSide; i++) {
			var x = env.getMinX();
			var y = env.getMaxY() - i * YsegLen;
			pts[ipt++] = this.coord(x, y);
		}
		pts[ipt++] = new Coordinate(pts[0]);
		var ring = this._geomFact.createLinearRing(pts);
		var poly = this._geomFact.createPolygon(ring);
		return this.rotate(poly);
	}
	createCircle() {
		return this.createEllipse();
	}
	setHeight(height) {
		this._dim.setHeight(height);
	}
	setSize(size) {
		this._dim.setSize(size);
	}
	getClass() {
		return GeometricShapeFactory;
	}
	get interfaces_() {
		return [];
	}
}
class Dimensions {
	constructor() {
		Dimensions.constructor_.apply(this, arguments);
	}
	setBase(base) {
		this.base = base;
	}
	setWidth(width) {
		this.width = width;
	}
	getBase() {
		return this.base;
	}
	getWidth() {
		return this.width;
	}
	setEnvelope(env) {
		this.width = env.getWidth();
		this.height = env.getHeight();
		this.base = new Coordinate(env.getMinX(), env.getMinY());
		this.centre = new Coordinate(env.centre());
	}
	setCentre(centre) {
		this.centre = centre;
	}
	getMinSize() {
		return Math.min(this.width, this.height);
	}
	getEnvelope() {
		if (this.base !== null) {
			return new Envelope(this.base.x, this.base.x + this.width, this.base.y, this.base.y + this.height);
		}
		if (this.centre !== null) {
			return new Envelope(this.centre.x - this.width / 2, this.centre.x + this.width / 2, this.centre.y - this.height / 2, this.centre.y + this.height / 2);
		}
		return new Envelope(0, this.width, 0, this.height);
	}
	getCentre() {
		if (this.centre === null) {
			this.centre = new Coordinate(this.base.x + this.width / 2, this.base.y + this.height / 2);
		}
		return this.centre;
	}
	getHeight() {
		return this.height;
	}
	setHeight(height) {
		this.height = height;
	}
	setSize(size) {
		this.height = size;
		this.width = size;
	}
	getClass() {
		return Dimensions;
	}
	get interfaces_() {
		return [];
	}
}
Dimensions.constructor_ = function () {
	this.base = null;
	this.centre = null;
	this.width = null;
	this.height = null;
};
GeometricShapeFactory.Dimensions = Dimensions;
GeometricShapeFactory.constructor_ = function () {
	this._geomFact = null;
	this._precModel = null;
	this._dim = new Dimensions();
	this._nPts = 100;
	this._rotationAngle = 0.0;
	if (arguments.length === 0) {
		GeometricShapeFactory.constructor_.call(this, new GeometryFactory());
	} else if (arguments.length === 1) {
		let geomFact = arguments[0];
		this._geomFact = geomFact;
		this._precModel = geomFact.getPrecisionModel();
	}
};
