import Coordinate from '../geom/Coordinate';
import LineSegment from '../geom/LineSegment';
import Envelope from '../geom/Envelope';
export default class GeometricShapeBuilder {
	constructor() {
		GeometricShapeBuilder.constructor_.apply(this, arguments);
	}
	setNumPoints(numPts) {
		this._numPts = numPts;
	}
	getRadius() {
		return this.getDiameter() / 2;
	}
	getDiameter() {
		return Math.min(this._extent.getHeight(), this._extent.getWidth());
	}
	getSquareBaseLine() {
		var radius = this.getRadius();
		var centre = this.getCentre();
		var p0 = new Coordinate(centre.x - radius, centre.y - radius);
		var p1 = new Coordinate(centre.x + radius, centre.y - radius);
		return new LineSegment(p0, p1);
	}
	setExtent(extent) {
		this._extent = extent;
	}
	getCentre() {
		return this._extent.centre();
	}
	getExtent() {
		return this._extent;
	}
	getSquareExtent() {
		var radius = this.getRadius();
		var centre = this.getCentre();
		return new Envelope(centre.x - radius, centre.x + radius, centre.y - radius, centre.y + radius);
	}
	createCoord(x, y) {
		var pt = new Coordinate(x, y);
		this._geomFactory.getPrecisionModel().makePrecise(pt);
		return pt;
	}
	getClass() {
		return GeometricShapeBuilder;
	}
	get interfaces_() {
		return [];
	}
}
GeometricShapeBuilder.constructor_ = function () {
	this._extent = new Envelope(0, 1, 0, 1);
	this._numPts = 0;
	this._geomFactory = null;
	let geomFactory = arguments[0];
	this._geomFactory = geomFactory;
};
