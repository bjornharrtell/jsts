import Coordinate from '../Coordinate';
import GeometricShapeFactory from '../../util/GeometricShapeFactory';
export default class SineStarFactory extends GeometricShapeFactory {
	constructor(...args) {
		super();
		this.numArms = 8;
		this.armLengthRatio = 0.5;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						super();
					})(...args);
				case 1:
					return ((...args) => {
						let [geomFact] = args;
						super(geomFact);
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	setNumArms(numArms) {
		this.numArms = numArms;
	}
	setArmLengthRatio(armLengthRatio) {
		this.armLengthRatio = armLengthRatio;
	}
	createSineStar() {
		var env = this.dim.getEnvelope();
		var radius = env.getWidth() / 2.0;
		var armRatio = this.armLengthRatio;
		if (armRatio < 0.0) armRatio = 0.0;
		if (armRatio > 1.0) armRatio = 1.0;
		var armMaxLen = armRatio * radius;
		var insideRadius = (1 - armRatio) * radius;
		var centreX = env.getMinX() + radius;
		var centreY = env.getMinY() + radius;
		var pts = new Array(this.nPts + 1);
		var iPt = 0;
		for (var i = 0; i < this.nPts; i++) {
			var ptArcFrac = i / this.nPts * this.numArms;
			var armAngFrac = ptArcFrac - Math.floor(ptArcFrac);
			var armAng = 2 * Math.PI * armAngFrac;
			var armLenFrac = (Math.cos(armAng) + 1.0) / 2.0;
			var curveRadius = insideRadius + armMaxLen * armLenFrac;
			var ang = i * (2 * Math.PI / this.nPts);
			var x = curveRadius * Math.cos(ang) + centreX;
			var y = curveRadius * Math.sin(ang) + centreY;
			pts[iPt++] = this.coord(x, y);
		}
		pts[iPt] = new Coordinate(pts[0]);
		var ring = this.geomFact.createLinearRing(pts);
		var poly = this.geomFact.createPolygon(ring, null);
		return poly;
	}
	getClass() {
		return SineStarFactory;
	}
}

