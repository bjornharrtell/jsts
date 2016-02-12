import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Lineal from '../geom/Lineal';
export default class LinearIterator {
	constructor(...args) {
		this.linearGeom = null;
		this.numLines = null;
		this.currentLine = null;
		this.componentIndex = 0;
		this.vertexIndex = 0;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [linear] = args;
				overloaded.call(this, linear, 0, 0);
			} else if (args.length === 2) {
				let [linear, start] = args;
				overloaded.call(this, linear, start.getComponentIndex(), LinearIterator.segmentEndVertexIndex(start));
			} else if (args.length === 3) {
				let [linearGeom, componentIndex, vertexIndex] = args;
				if (!(linearGeom.interfaces_ && linearGeom.interfaces_.indexOf(Lineal) > -1)) throw new IllegalArgumentException("Lineal geometry is required");
				this.linearGeom = linearGeom;
				this.numLines = linearGeom.getNumGeometries();
				this.componentIndex = componentIndex;
				this.vertexIndex = vertexIndex;
				this.loadCurrentLine();
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static segmentEndVertexIndex(loc) {
		if (loc.getSegmentFraction() > 0.0) return loc.getSegmentIndex() + 1;
		return loc.getSegmentIndex();
	}
	getComponentIndex() {
		return this.componentIndex;
	}
	getLine() {
		return this.currentLine;
	}
	getVertexIndex() {
		return this.vertexIndex;
	}
	getSegmentEnd() {
		if (this.vertexIndex < this.getLine().getNumPoints() - 1) return this.currentLine.getCoordinateN(this.vertexIndex + 1);
		return null;
	}
	next() {
		if (!this.hasNext()) return null;
		this.vertexIndex++;
		if (this.vertexIndex >= this.currentLine.getNumPoints()) {
			this.componentIndex++;
			this.loadCurrentLine();
			this.vertexIndex = 0;
		}
	}
	loadCurrentLine() {
		if (this.componentIndex >= this.numLines) {
			this.currentLine = null;
			return null;
		}
		this.currentLine = this.linearGeom.getGeometryN(this.componentIndex);
	}
	getSegmentStart() {
		return this.currentLine.getCoordinateN(this.vertexIndex);
	}
	isEndOfLine() {
		if (this.componentIndex >= this.numLines) return false;
		if (this.vertexIndex < this.currentLine.getNumPoints() - 1) return false;
		return true;
	}
	hasNext() {
		if (this.componentIndex >= this.numLines) return false;
		if (this.componentIndex === this.numLines - 1 && this.vertexIndex >= this.currentLine.getNumPoints()) return false;
		return true;
	}
	getClass() {
		return LinearIterator;
	}
}

