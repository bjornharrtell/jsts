import Location from '../../geom/Location';
import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Polygonal from '../../geom/Polygonal';
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator';
import GeometricShapeBuilder from '../GeometricShapeBuilder';
export default class RandomPointsBuilder extends GeometricShapeBuilder {
	constructor(...args) {
		super();
		this.maskPoly = null;
		this.extentLocator = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						super(new GeometryFactory());
					})(...args);
				case 1:
					return ((...args) => {
						let [geomFact] = args;
						super(geomFact);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getGeometry() {
		var pts = new Array(this.numPts);
		var i = 0;
		while (i < this.numPts) {
			var p = this.createRandomCoord(this.getExtent());
			if (this.extentLocator !== null && !this.isInExtent(p)) continue;
			pts[i++] = p;
		}
		return this.geomFactory.createMultiPointFromCoords(pts);
	}
	createRandomCoord(env) {
		var x = env.getMinX() + env.getWidth() * Math.random();
		var y = env.getMinY() + env.getHeight() * Math.random();
		return this.createCoord(x, y);
	}
	isInExtent(p) {
		if (this.extentLocator !== null) return this.extentLocator.locate(p) !== Location.EXTERIOR;
		return this.getExtent().contains(p);
	}
	setExtent(...args) {
		if (args.length === 1) {
			let [mask] = args;
			if (!(mask.interfaces_ && mask.interfaces_.indexOf(Polygonal) > -1)) throw new IllegalArgumentException("Only polygonal extents are supported");
			this.maskPoly = mask;
			this.setExtent(mask.getEnvelopeInternal());
			this.extentLocator = new IndexedPointInAreaLocator(mask);
		} else return super.setExtent(...args);
	}
	createCoord(x, y) {
		var pt = new Coordinate(x, y);
		this.geomFactory.getPrecisionModel().makePrecise(pt);
		return pt;
	}
	getClass() {
		return RandomPointsBuilder;
	}
}

