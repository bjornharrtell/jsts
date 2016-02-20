import CoordinateList from '../../geom/CoordinateList';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
import Vector2D from '../../math/Vector2D';
import GeometricShapeBuilder from '../GeometricShapeBuilder';
export default function KochSnowflakeBuilder() {
	this.coordList = new CoordinateList();
	let geomFactory = arguments[0];
	GeometricShapeBuilder.call(this, geomFactory);
}
inherits(KochSnowflakeBuilder, GeometricShapeBuilder);
extend(KochSnowflakeBuilder.prototype, {
	getBoundary: function (level, origin, width) {
		var y = origin.y;
		if (level > 0) {
			y += KochSnowflakeBuilder.THIRD_HEIGHT * width;
		}
		var p0 = new Coordinate(origin.x, y);
		var p1 = new Coordinate(origin.x + width / 2, y + width * KochSnowflakeBuilder.HEIGHT_FACTOR);
		var p2 = new Coordinate(origin.x + width, y);
		this.addSide(level, p0, p1);
		this.addSide(level, p1, p2);
		this.addSide(level, p2, p0);
		this.coordList.closeRing();
		return this.coordList.toCoordinateArray();
	},
	getGeometry: function () {
		var level = KochSnowflakeBuilder.recursionLevelForSize(this.numPts);
		var baseLine = this.getSquareBaseLine();
		var pts = this.getBoundary(level, baseLine.getCoordinate(0), baseLine.getLength());
		return this.geomFactory.createPolygon(this.geomFactory.createLinearRing(pts), null);
	},
	addSegment: function (p0, p1) {
		this.coordList.add(p1);
	},
	addSide: function (level, p0, p1) {
		if (level === 0) this.addSegment(p0, p1); else {
			var base = Vector2D.create(p0, p1);
			var midPt = base.multiply(0.5).translate(p0);
			var heightVec = base.multiply(KochSnowflakeBuilder.THIRD_HEIGHT);
			var offsetVec = heightVec.rotateByQuarterCircle(1);
			var offsetPt = offsetVec.translate(midPt);
			var n2 = level - 1;
			var thirdPt = base.multiply(KochSnowflakeBuilder.ONE_THIRD).translate(p0);
			var twoThirdPt = base.multiply(KochSnowflakeBuilder.TWO_THIRDS).translate(p0);
			this.addSide(n2, p0, thirdPt);
			this.addSide(n2, thirdPt, offsetPt);
			this.addSide(n2, offsetPt, twoThirdPt);
			this.addSide(n2, twoThirdPt, p1);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return KochSnowflakeBuilder;
	}
});
KochSnowflakeBuilder.recursionLevelForSize = function (numPts) {
	var pow4 = Math.trunc(numPts / 3);
	var exp = Math.log(pow4) / Math.log(4);
	return Math.trunc(exp);
};
KochSnowflakeBuilder.HEIGHT_FACTOR = Math.sin(Math.PI / 3.0);
KochSnowflakeBuilder.ONE_THIRD = 1.0 / 3.0;
KochSnowflakeBuilder.THIRD_HEIGHT = KochSnowflakeBuilder.HEIGHT_FACTOR / 3.0;
KochSnowflakeBuilder.TWO_THIRDS = 2.0 / 3.0;

