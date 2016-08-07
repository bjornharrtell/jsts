import GeometryFactory from '../geom/GeometryFactory';
import Coordinate from '../geom/Coordinate';
import AffineTransformation from '../geom/util/AffineTransformation';
import extend from '../../../../extend';
import Envelope from '../geom/Envelope';
export default function GeometricShapeFactory() {
	this.geomFact = null;
	this.precModel = null;
	this.dim = new Dimensions();
	this.nPts = 100;
	this.rotationAngle = 0.0;
	if (arguments.length === 0) {
		GeometricShapeFactory.call(this, new GeometryFactory());
	} else if (arguments.length === 1) {
		let geomFact = arguments[0];
		this.geomFact = geomFact;
		this.precModel = geomFact.getPrecisionModel();
	}
}
extend(GeometricShapeFactory.prototype, {
	createSupercircle: function (power) {
		var recipPow = 1.0 / power;
		var radius = this.dim.getMinSize() / 2;
		var centre = this.dim.getCentre();
		var r4 = Math.pow(radius, power);
		var y0 = radius;
		var xyInt = Math.pow(r4 / 2, recipPow);
		var nSegsInOct = Math.trunc(this.nPts / 8);
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
		var ring = this.geomFact.createLinearRing(pts);
		var poly = this.geomFact.createPolygon(ring, null);
		return this.rotate(poly);
	},
	setNumPoints: function (nPts) {
		this.nPts = nPts;
	},
	setBase: function (base) {
		this.dim.setBase(base);
	},
	setRotation: function (radians) {
		this.rotationAngle = radians;
	},
	setWidth: function (width) {
		this.dim.setWidth(width);
	},
	createEllipse: function () {
		var env = this.dim.getEnvelope();
		var xRadius = env.getWidth() / 2.0;
		var yRadius = env.getHeight() / 2.0;
		var centreX = env.getMinX() + xRadius;
		var centreY = env.getMinY() + yRadius;
		var pts = new Array(this.nPts + 1).fill(null);
		var iPt = 0;
		for (var i = 0; i < this.nPts; i++) {
			var ang = i * (2 * Math.PI / this.nPts);
			var x = xRadius * Math.cos(ang) + centreX;
			var y = yRadius * Math.sin(ang) + centreY;
			pts[iPt++] = this.coord(x, y);
		}
		pts[iPt] = new Coordinate(pts[0]);
		var ring = this.geomFact.createLinearRing(pts);
		var poly = this.geomFact.createPolygon(ring, null);
		return this.rotate(poly);
	},
	coordTrans: function (x, y, trans) {
		return this.coord(x + trans.x, y + trans.y);
	},
	createSquircle: function () {
		return this.createSupercircle(4);
	},
	setEnvelope: function (env) {
		this.dim.setEnvelope(env);
	},
	setCentre: function (centre) {
		this.dim.setCentre(centre);
	},
	createArc: function (startAng, angExtent) {
		var env = this.dim.getEnvelope();
		var xRadius = env.getWidth() / 2.0;
		var yRadius = env.getHeight() / 2.0;
		var centreX = env.getMinX() + xRadius;
		var centreY = env.getMinY() + yRadius;
		var angSize = angExtent;
		if (angSize <= 0.0 || angSize > 2 * Math.PI) angSize = 2 * Math.PI;
		var angInc = angSize / (this.nPts - 1);
		var pts = new Array(this.nPts).fill(null);
		var iPt = 0;
		for (var i = 0; i < this.nPts; i++) {
			var ang = startAng + i * angInc;
			var x = xRadius * Math.cos(ang) + centreX;
			var y = yRadius * Math.sin(ang) + centreY;
			pts[iPt++] = this.coord(x, y);
		}
		var line = this.geomFact.createLineString(pts);
		return this.rotate(line);
	},
	rotate: function (geom) {
		if (this.rotationAngle !== 0.0) {
			var trans = AffineTransformation.rotationInstance(this.rotationAngle, this.dim.getCentre().x, this.dim.getCentre().y);
			geom.apply(trans);
		}
		return geom;
	},
	coord: function (x, y) {
		var pt = new Coordinate(x, y);
		this.precModel.makePrecise(pt);
		return pt;
	},
	createArcPolygon: function (startAng, angExtent) {
		var env = this.dim.getEnvelope();
		var xRadius = env.getWidth() / 2.0;
		var yRadius = env.getHeight() / 2.0;
		var centreX = env.getMinX() + xRadius;
		var centreY = env.getMinY() + yRadius;
		var angSize = angExtent;
		if (angSize <= 0.0 || angSize > 2 * Math.PI) angSize = 2 * Math.PI;
		var angInc = angSize / (this.nPts - 1);
		var pts = new Array(this.nPts + 2).fill(null);
		var iPt = 0;
		pts[iPt++] = this.coord(centreX, centreY);
		for (var i = 0; i < this.nPts; i++) {
			var ang = startAng + angInc * i;
			var x = xRadius * Math.cos(ang) + centreX;
			var y = yRadius * Math.sin(ang) + centreY;
			pts[iPt++] = this.coord(x, y);
		}
		pts[iPt++] = this.coord(centreX, centreY);
		var ring = this.geomFact.createLinearRing(pts);
		var poly = this.geomFact.createPolygon(ring, null);
		return this.rotate(poly);
	},
	createRectangle: function () {
		var i = null;
		var ipt = 0;
		var nSide = Math.trunc(this.nPts / 4);
		if (nSide < 1) nSide = 1;
		var XsegLen = this.dim.getEnvelope().getWidth() / nSide;
		var YsegLen = this.dim.getEnvelope().getHeight() / nSide;
		var pts = new Array(4 * nSide + 1).fill(null);
		var env = this.dim.getEnvelope();
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
		var ring = this.geomFact.createLinearRing(pts);
		var poly = this.geomFact.createPolygon(ring, null);
		return this.rotate(poly);
	},
	createCircle: function () {
		return this.createEllipse();
	},
	setHeight: function (height) {
		this.dim.setHeight(height);
	},
	setSize: function (size) {
		this.dim.setSize(size);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometricShapeFactory;
	}
});
function Dimensions() {
	this.base = null;
	this.centre = null;
	this.width = null;
	this.height = null;
}
extend(Dimensions.prototype, {
	setBase: function (base) {
		this.base = base;
	},
	setWidth: function (width) {
		this.width = width;
	},
	getBase: function () {
		return this.base;
	},
	getWidth: function () {
		return this.width;
	},
	setEnvelope: function (env) {
		this.width = env.getWidth();
		this.height = env.getHeight();
		this.base = new Coordinate(env.getMinX(), env.getMinY());
		this.centre = new Coordinate(env.centre());
	},
	setCentre: function (centre) {
		this.centre = centre;
	},
	getMinSize: function () {
		return Math.min(this.width, this.height);
	},
	getEnvelope: function () {
		if (this.base !== null) {
			return new Envelope(this.base.x, this.base.x + this.width, this.base.y, this.base.y + this.height);
		}
		if (this.centre !== null) {
			return new Envelope(this.centre.x - this.width / 2, this.centre.x + this.width / 2, this.centre.y - this.height / 2, this.centre.y + this.height / 2);
		}
		return new Envelope(0, this.width, 0, this.height);
	},
	getCentre: function () {
		if (this.centre === null) {
			this.centre = new Coordinate(this.base.x + this.width / 2, this.base.y + this.height / 2);
		}
		return this.centre;
	},
	getHeight: function () {
		return this.height;
	},
	setHeight: function (height) {
		this.height = height;
	},
	setSize: function (size) {
		this.height = size;
		this.width = size;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Dimensions;
	}
});
GeometricShapeFactory.Dimensions = Dimensions;
