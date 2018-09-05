import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import MathUtil from '../../math/MathUtil';
import GeometricShapeBuilder from '../GeometricShapeBuilder';
export default class RandomPointsInGridBuilder extends GeometricShapeBuilder {
	constructor() {
		super();
		RandomPointsInGridBuilder.constructor_.apply(this, arguments);
	}
	static randomPointInCircle(orgX, orgY, width, height) {
		var centreX = orgX + width / 2;
		var centreY = orgY + height / 2;
		var rndAng = 2 * Math.PI * Math.random();
		var rndRadius = Math.random();
		var rndRadius2 = Math.sqrt(rndRadius);
		var rndX = width / 2 * rndRadius2 * Math.cos(rndAng);
		var rndY = height / 2 * rndRadius2 * Math.sin(rndAng);
		var x0 = centreX + rndX;
		var y0 = centreY + rndY;
		return new Coordinate(x0, y0);
	}
	randomPointInCell(orgX, orgY, xLen, yLen) {
		if (this._isConstrainedToCircle) {
			return RandomPointsInGridBuilder.randomPointInCircle(orgX, orgY, xLen, yLen);
		}
		return this.randomPointInGridCell(orgX, orgY, xLen, yLen);
	}
	getGeometry() {
		var nCells = Math.trunc(Math.sqrt(this._numPts));
		if (nCells * nCells < this._numPts) nCells += 1;
		var gridDX = this.getExtent().getWidth() / nCells;
		var gridDY = this.getExtent().getHeight() / nCells;
		var gutterFrac = MathUtil.clamp(this._gutterFraction, 0.0, 1.0);
		var gutterOffsetX = gridDX * gutterFrac / 2;
		var gutterOffsetY = gridDY * gutterFrac / 2;
		var cellFrac = 1.0 - gutterFrac;
		var cellDX = cellFrac * gridDX;
		var cellDY = cellFrac * gridDY;
		var pts = new Array(nCells * nCells).fill(null);
		var index = 0;
		for (var i = 0; i < nCells; i++) {
			for (var j = 0; j < nCells; j++) {
				var orgX = this.getExtent().getMinX() + i * gridDX + gutterOffsetX;
				var orgY = this.getExtent().getMinY() + j * gridDY + gutterOffsetY;
				pts[index++] = this.randomPointInCell(orgX, orgY, cellDX, cellDY);
			}
		}
		return this._geomFactory.createMultiPointFromCoords(pts);
	}
	setConstrainedToCircle(isConstrainedToCircle) {
		this._isConstrainedToCircle = isConstrainedToCircle;
	}
	setGutterFraction(gutterFraction) {
		this._gutterFraction = gutterFraction;
	}
	randomPointInGridCell(orgX, orgY, xLen, yLen) {
		var x = orgX + xLen * Math.random();
		var y = orgY + yLen * Math.random();
		return this.createCoord(x, y);
	}
	getClass() {
		return RandomPointsInGridBuilder;
	}
	get interfaces_() {
		return [];
	}
}
RandomPointsInGridBuilder.constructor_ = function () {
	this._isConstrainedToCircle = false;
	this._gutterFraction = 0;
	if (arguments.length === 0) {
		GeometricShapeBuilder.constructor_.call(this, new GeometryFactory());
	} else if (arguments.length === 1) {
		let geomFact = arguments[0];
		GeometricShapeBuilder.constructor_.call(this, geomFact);
	}
};
