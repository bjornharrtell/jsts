import Coordinate from '../../geom/Coordinate';
import Polygon from '../../geom/Polygon';
import RectangleLineIntersector from '../../algorithm/RectangleLineIntersector';
import extend from '../../../../../extend';
import ShortCircuitedGeometryVisitor from '../../geom/util/ShortCircuitedGeometryVisitor';
import SimplePointInAreaLocator from '../../algorithm/locate/SimplePointInAreaLocator';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
import inherits from '../../../../../inherits';
export default function RectangleIntersects() {
	this.rectangle = null;
	this.rectEnv = null;
	let rectangle = arguments[0];
	this.rectangle = rectangle;
	this.rectEnv = rectangle.getEnvelopeInternal();
}
extend(RectangleIntersects.prototype, {
	intersects: function (geom) {
		if (!this.rectEnv.intersects(geom.getEnvelopeInternal())) return false;
		var visitor = new EnvelopeIntersectsVisitor(this.rectEnv);
		visitor.applyTo(geom);
		if (visitor.intersects()) return true;
		var ecpVisitor = new GeometryContainsPointVisitor(this.rectangle);
		ecpVisitor.applyTo(geom);
		if (ecpVisitor.containsPoint()) return true;
		var riVisitor = new RectangleIntersectsSegmentVisitor(this.rectangle);
		riVisitor.applyTo(geom);
		if (riVisitor.intersects()) return true;
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RectangleIntersects;
	}
});
RectangleIntersects.intersects = function (rectangle, b) {
	var rp = new RectangleIntersects(rectangle);
	return rp.intersects(b);
};
function EnvelopeIntersectsVisitor() {
	ShortCircuitedGeometryVisitor.apply(this);
	this.rectEnv = null;
	this._intersects = false;
	let rectEnv = arguments[0];
	this.rectEnv = rectEnv;
}
inherits(EnvelopeIntersectsVisitor, ShortCircuitedGeometryVisitor);
extend(EnvelopeIntersectsVisitor.prototype, {
	isDone: function () {
		return this._intersects === true;
	},
	visit: function (element) {
		var elementEnv = element.getEnvelopeInternal();
		if (!this.rectEnv.intersects(elementEnv)) {
			return null;
		}
		if (this.rectEnv.contains(elementEnv)) {
			this._intersects = true;
			return null;
		}
		if (elementEnv.getMinX() >= this.rectEnv.getMinX() && elementEnv.getMaxX() <= this.rectEnv.getMaxX()) {
			this._intersects = true;
			return null;
		}
		if (elementEnv.getMinY() >= this.rectEnv.getMinY() && elementEnv.getMaxY() <= this.rectEnv.getMaxY()) {
			this._intersects = true;
			return null;
		}
	},
	intersects: function () {
		return this._intersects;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EnvelopeIntersectsVisitor;
	}
});
function GeometryContainsPointVisitor() {
	ShortCircuitedGeometryVisitor.apply(this);
	this.rectSeq = null;
	this.rectEnv = null;
	this._containsPoint = false;
	let rectangle = arguments[0];
	this.rectSeq = rectangle.getExteriorRing().getCoordinateSequence();
	this.rectEnv = rectangle.getEnvelopeInternal();
}
inherits(GeometryContainsPointVisitor, ShortCircuitedGeometryVisitor);
extend(GeometryContainsPointVisitor.prototype, {
	isDone: function () {
		return this._containsPoint === true;
	},
	visit: function (geom) {
		if (!(geom instanceof Polygon)) return null;
		var elementEnv = geom.getEnvelopeInternal();
		if (!this.rectEnv.intersects(elementEnv)) return null;
		var rectPt = new Coordinate();
		for (var i = 0; i < 4; i++) {
			this.rectSeq.getCoordinate(i, rectPt);
			if (!elementEnv.contains(rectPt)) continue;
			if (SimplePointInAreaLocator.containsPointInPolygon(rectPt, geom)) {
				this._containsPoint = true;
				return null;
			}
		}
	},
	containsPoint: function () {
		return this._containsPoint;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryContainsPointVisitor;
	}
});
function RectangleIntersectsSegmentVisitor() {
	ShortCircuitedGeometryVisitor.apply(this);
	this.rectEnv = null;
	this.rectIntersector = null;
	this.hasIntersection = false;
	this.p0 = new Coordinate();
	this.p1 = new Coordinate();
	let rectangle = arguments[0];
	this.rectEnv = rectangle.getEnvelopeInternal();
	this.rectIntersector = new RectangleLineIntersector(this.rectEnv);
}
inherits(RectangleIntersectsSegmentVisitor, ShortCircuitedGeometryVisitor);
extend(RectangleIntersectsSegmentVisitor.prototype, {
	intersects: function () {
		return this.hasIntersection;
	},
	isDone: function () {
		return this.hasIntersection === true;
	},
	visit: function (geom) {
		var elementEnv = geom.getEnvelopeInternal();
		if (!this.rectEnv.intersects(elementEnv)) return null;
		var lines = LinearComponentExtracter.getLines(geom);
		this.checkIntersectionWithLineStrings(lines);
	},
	checkIntersectionWithLineStrings: function (lines) {
		for (var i = lines.iterator(); i.hasNext(); ) {
			var testLine = i.next();
			this.checkIntersectionWithSegments(testLine);
			if (this.hasIntersection) return null;
		}
	},
	checkIntersectionWithSegments: function (testLine) {
		var seq1 = testLine.getCoordinateSequence();
		for (var j = 1; j < seq1.size(); j++) {
			seq1.getCoordinate(j - 1, this.p0);
			seq1.getCoordinate(j, this.p1);
			if (this.rectIntersector.intersects(this.p0, this.p1)) {
				this.hasIntersection = true;
				return null;
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RectangleIntersectsSegmentVisitor;
	}
});
