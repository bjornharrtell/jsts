import Location from '../../geom/Location';
import Geometry from '../../geom/Geometry';
import hasInterface from '../../../../../hasInterface';
import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import extend from '../../../../../extend';
import Polygonal from '../../geom/Polygonal';
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator';
import inherits from '../../../../../inherits';
import GeometricShapeBuilder from '../GeometricShapeBuilder';
export default function RandomPointsBuilder() {
	this._maskPoly = null;
	this._extentLocator = null;
	if (arguments.length === 0) {
		GeometricShapeBuilder.call(this, new GeometryFactory());
	} else if (arguments.length === 1) {
		let geomFact = arguments[0];
		GeometricShapeBuilder.call(this, geomFact);
	}
}
inherits(RandomPointsBuilder, GeometricShapeBuilder);
extend(RandomPointsBuilder.prototype, {
	getGeometry: function () {
		var pts = new Array(this._numPts).fill(null);
		var i = 0;
		while (i < this._numPts) {
			var p = this.createRandomCoord(this.getExtent());
			if (this._extentLocator !== null && !this.isInExtent(p)) continue;
			pts[i++] = p;
		}
		return this._geomFactory.createMultiPointFromCoords(pts);
	},
	createRandomCoord: function (env) {
		var x = env.getMinX() + env.getWidth() * Math.random();
		var y = env.getMinY() + env.getHeight() * Math.random();
		return this.createCoord(x, y);
	},
	isInExtent: function (p) {
		if (this._extentLocator !== null) return this._extentLocator.locate(p) !== Location.EXTERIOR;
		return this.getExtent().contains(p);
	},
	setExtent: function () {
		if (arguments.length === 1 && arguments[0] instanceof Geometry) {
			let mask = arguments[0];
			if (!hasInterface(mask, Polygonal)) throw new IllegalArgumentException("Only polygonal extents are supported");
			this._maskPoly = mask;
			this.setExtent(mask.getEnvelopeInternal());
			this._extentLocator = new IndexedPointInAreaLocator(mask);
		} else return GeometricShapeBuilder.prototype.setExtent.apply(this, arguments);
	},
	createCoord: function (x, y) {
		var pt = new Coordinate(x, y);
		this._geomFactory.getPrecisionModel().makePrecise(pt);
		return pt;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RandomPointsBuilder;
	}
});
