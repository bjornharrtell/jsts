import CoordinateList from '../../geom/CoordinateList';
import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import inherits from '../../../../../inherits';
import GeometricShapeBuilder from '../GeometricShapeBuilder';
export default function SierpinskiCarpetBuilder() {
	this.coordList = new CoordinateList();
	let geomFactory = arguments[0];
	GeometricShapeBuilder.call(this, geomFactory);
}
inherits(SierpinskiCarpetBuilder, GeometricShapeBuilder);
extend(SierpinskiCarpetBuilder.prototype, {
	addHoles: function (n, originX, originY, width, holeList) {
		if (n < 0) return null;
		var n2 = n - 1;
		var widthThird = width / 3.0;
		var widthTwoThirds = width * 2.0 / 3.0;
		var widthNinth = width / 9.0;
		this.addHoles(n2, originX, originY, widthThird, holeList);
		this.addHoles(n2, originX + widthThird, originY, widthThird, holeList);
		this.addHoles(n2, originX + 2 * widthThird, originY, widthThird, holeList);
		this.addHoles(n2, originX, originY + widthThird, widthThird, holeList);
		this.addHoles(n2, originX + 2 * widthThird, originY + widthThird, widthThird, holeList);
		this.addHoles(n2, originX, originY + 2 * widthThird, widthThird, holeList);
		this.addHoles(n2, originX + widthThird, originY + 2 * widthThird, widthThird, holeList);
		this.addHoles(n2, originX + 2 * widthThird, originY + 2 * widthThird, widthThird, holeList);
		holeList.add(this.createSquareHole(originX + widthThird, originY + widthThird, widthThird));
	},
	getHoles: function (n, originX, originY, width) {
		var holeList = new ArrayList();
		this.addHoles(n, originX, originY, width, holeList);
		return GeometryFactory.toLinearRingArray(holeList);
	},
	createSquareHole: function (x, y, width) {
		var pts = [new Coordinate(x, y), new Coordinate(x + width, y), new Coordinate(x + width, y + width), new Coordinate(x, y + width), new Coordinate(x, y)];
		return this.geomFactory.createLinearRing(pts);
	},
	getGeometry: function () {
		var level = SierpinskiCarpetBuilder.recursionLevelForSize(this.numPts);
		var baseLine = this.getSquareBaseLine();
		var origin = baseLine.getCoordinate(0);
		var holes = this.getHoles(level, origin.x, origin.y, this.getDiameter());
		var shell = this.geomFactory.toGeometry(this.getSquareExtent()).getExteriorRing();
		return this.geomFactory.createPolygon(shell, holes);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SierpinskiCarpetBuilder;
	}
});
SierpinskiCarpetBuilder.recursionLevelForSize = function (numPts) {
	var pow4 = Math.trunc(numPts / 3);
	var exp = Math.log(pow4) / Math.log(4);
	return Math.trunc(exp);
};

