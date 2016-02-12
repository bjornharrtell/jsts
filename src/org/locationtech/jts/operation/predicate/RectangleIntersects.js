import Coordinate from '../../geom/Coordinate';
import Polygon from '../../geom/Polygon';
import RectangleLineIntersector from '../../algorithm/RectangleLineIntersector';
import ShortCircuitedGeometryVisitor from '../../geom/util/ShortCircuitedGeometryVisitor';
import SimplePointInAreaLocator from '../../algorithm/locate/SimplePointInAreaLocator';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
export default class RectangleIntersects {
	constructor(...args) {
		this.rectangle = null;
		this.rectEnv = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [rectangle] = args;
					this.rectangle = rectangle;
					this.rectEnv = rectangle.getEnvelopeInternal();
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static intersects(rectangle, b) {
		var rp = new RectangleIntersects(rectangle);
		return rp.intersects(b);
	}
	intersects(geom) {
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
	}
	getClass() {
		return RectangleIntersects;
	}
}
class EnvelopeIntersectsVisitor extends ShortCircuitedGeometryVisitor {
	constructor(...args) {
		super();
		this.rectEnv = null;
		this._intersects = false;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [rectEnv] = args;
					this.rectEnv = rectEnv;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	isDone() {
		return this._intersects === true;
	}
	visit(element) {
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
	}
	intersects() {
		return this._intersects;
	}
	getClass() {
		return EnvelopeIntersectsVisitor;
	}
}
class GeometryContainsPointVisitor extends ShortCircuitedGeometryVisitor {
	constructor(...args) {
		super();
		this.rectSeq = null;
		this.rectEnv = null;
		this._containsPoint = false;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [rectangle] = args;
					this.rectSeq = rectangle.getExteriorRing().getCoordinateSequence();
					this.rectEnv = rectangle.getEnvelopeInternal();
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	isDone() {
		return this._containsPoint === true;
	}
	visit(geom) {
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
	}
	containsPoint() {
		return this._containsPoint;
	}
	getClass() {
		return GeometryContainsPointVisitor;
	}
}
class RectangleIntersectsSegmentVisitor extends ShortCircuitedGeometryVisitor {
	constructor(...args) {
		super();
		this.rectEnv = null;
		this.rectIntersector = null;
		this.hasIntersection = false;
		this.p0 = new Coordinate();
		this.p1 = new Coordinate();
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [rectangle] = args;
					this.rectEnv = rectangle.getEnvelopeInternal();
					this.rectIntersector = new RectangleLineIntersector(this.rectEnv);
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	intersects() {
		return this.hasIntersection;
	}
	isDone() {
		return this.hasIntersection === true;
	}
	visit(geom) {
		var elementEnv = geom.getEnvelopeInternal();
		if (!this.rectEnv.intersects(elementEnv)) return null;
		var lines = LinearComponentExtracter.getLines(geom);
		this.checkIntersectionWithLineStrings(lines);
	}
	checkIntersectionWithLineStrings(lines) {
		for (var i = lines.iterator(); i.hasNext(); ) {
			var testLine = i.next();
			this.checkIntersectionWithSegments(testLine);
			if (this.hasIntersection) return null;
		}
	}
	checkIntersectionWithSegments(testLine) {
		var seq1 = testLine.getCoordinateSequence();
		for (var j = 1; j < seq1.size(); j++) {
			seq1.getCoordinate(j - 1, this.p0);
			seq1.getCoordinate(j, this.p1);
			if (this.rectIntersector.intersects(this.p0, this.p1)) {
				this.hasIntersection = true;
				return null;
			}
		}
	}
	getClass() {
		return RectangleIntersectsSegmentVisitor;
	}
}

