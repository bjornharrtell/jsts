import Location from '../../geom/Location';
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
	this.maskPoly = null;
	this.extentLocator = null;
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
		var pts = new Array(this.numPts).fill(null);
		var i = 0;
		while (i < this.numPts) {
			var p = this.createRandomCoord(this.getExtent());
			if (this.extentLocator !== null && !this.isInExtent(p)) continue;
			pts[i++] = p;
		}
		return this.geomFactory.createMultiPointFromCoords(pts);
	},
	createRandomCoord: function (env) {
		var x = env.getMinX() + env.getWidth() * Math.random();
		var y = env.getMinY() + env.getHeight() * Math.random();
		return this.createCoord(x, y);
	},
	isInExtent: function (p) {
		if (this.extentLocator !== null) return this.extentLocator.locate(p) !== Location.EXTERIOR;
		return this.getExtent().contains(p);
	},
	setExtent: function () {
		if (arguments.length === 1) {
			let mask = arguments[0];
			if (!hasInterface(mask, Polygonal)) throw new IllegalArgumentException("Only polygonal extents are supported");
			this.maskPoly = mask;
			this.setExtent(mask.getEnvelopeInternal());
			this.extentLocator = new IndexedPointInAreaLocator(mask);
		} else return GeometricShapeBuilder.prototype.setExtent.apply(this, arguments);
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
		return RandomPointsBuilder;
	}
});

