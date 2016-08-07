import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import Envelope from '../geom/Envelope';
export default function GeometricShapeBuilder() {
	this.extent = new Envelope(0, 1, 0, 1);
	this.numPts = 0;
	this.geomFactory = null;
	let geomFactory = arguments[0];
	this.geomFactory = geomFactory;
}
extend(GeometricShapeBuilder.prototype, {
	setNumPoints: function (numPts) {
		this.numPts = numPts;
	},
	getRadius: function () {
		return this.getDiameter() / 2;
	},
	getDiameter: function () {
		return Math.min(this.extent.getHeight(), this.extent.getWidth());
	},
	getSquareBaseLine: function () {
		var radius = this.getRadius();
		var centre = this.getCentre();
		var p0 = new Coordinate(centre.x - radius, centre.y - radius);
		var p1 = new Coordinate(centre.x + radius, centre.y - radius);
		return new LineSegment(p0, p1);
	},
	setExtent: function (extent) {
		this.extent = extent;
	},
	getCentre: function () {
		return this.extent.centre();
	},
	getExtent: function () {
		return this.extent;
	},
	getSquareExtent: function () {
		var radius = this.getRadius();
		var centre = this.getCentre();
		return new Envelope(centre.x - radius, centre.x + radius, centre.y - radius, centre.y + radius);
	},
	createCoord: function (x, y) {
		var pt = new Coordinate(x, y);
		this.geomFactory.getPrecisionModel().makePrecise(pt);
		return pt;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometricShapeBuilder;
	}
});
