import Coordinate from '../../../geom/Coordinate';
import extend from '../../../../../../extend';
import ArrayList from '../../../../../../java/util/ArrayList';
import LinearComponentExtracter from '../../../geom/util/LinearComponentExtracter';
export default function OffsetPointGenerator() {
	this.g = null;
	this.doLeft = true;
	this.doRight = true;
	let g = arguments[0];
	this.g = g;
}
extend(OffsetPointGenerator.prototype, {
	extractPoints: function (line, offsetDistance, offsetPts) {
		var pts = line.getCoordinates();
		for (var i = 0; i < pts.length - 1; i++) {
			this.computeOffsetPoints(pts[i], pts[i + 1], offsetDistance, offsetPts);
		}
	},
	setSidesToGenerate: function (doLeft, doRight) {
		this.doLeft = doLeft;
		this.doRight = doRight;
	},
	getPoints: function (offsetDistance) {
		var offsetPts = new ArrayList();
		var lines = LinearComponentExtracter.getLines(this.g);
		for (var i = lines.iterator(); i.hasNext(); ) {
			var line = i.next();
			this.extractPoints(line, offsetDistance, offsetPts);
		}
		return offsetPts;
	},
	computeOffsetPoints: function (p0, p1, offsetDistance, offsetPts) {
		var dx = p1.x - p0.x;
		var dy = p1.y - p0.y;
		var len = Math.sqrt(dx * dx + dy * dy);
		var ux = offsetDistance * dx / len;
		var uy = offsetDistance * dy / len;
		var midX = (p1.x + p0.x) / 2;
		var midY = (p1.y + p0.y) / 2;
		if (this.doLeft) {
			var offsetLeft = new Coordinate(midX - uy, midY + ux);
			offsetPts.add(offsetLeft);
		}
		if (this.doRight) {
			var offsetRight = new Coordinate(midX + uy, midY - ux);
			offsetPts.add(offsetRight);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OffsetPointGenerator;
	}
});
