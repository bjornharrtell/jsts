import hasInterface from '../../../../hasInterface';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import Lineal from '../geom/Lineal';
export default function LinearIterator() {
	this.linearGeom = null;
	this.numLines = null;
	this.currentLine = null;
	this.componentIndex = 0;
	this.vertexIndex = 0;
	if (arguments.length === 1) {
		let linear = arguments[0];
		LinearIterator.call(this, linear, 0, 0);
	} else if (arguments.length === 2) {
		let linear = arguments[0], start = arguments[1];
		LinearIterator.call(this, linear, start.getComponentIndex(), LinearIterator.segmentEndVertexIndex(start));
	} else if (arguments.length === 3) {
		let linearGeom = arguments[0], componentIndex = arguments[1], vertexIndex = arguments[2];
		if (!hasInterface(linearGeom, Lineal)) throw new IllegalArgumentException("Lineal geometry is required");
		this.linearGeom = linearGeom;
		this.numLines = linearGeom.getNumGeometries();
		this.componentIndex = componentIndex;
		this.vertexIndex = vertexIndex;
		this.loadCurrentLine();
	}
}
extend(LinearIterator.prototype, {
	getComponentIndex: function () {
		return this.componentIndex;
	},
	getLine: function () {
		return this.currentLine;
	},
	getVertexIndex: function () {
		return this.vertexIndex;
	},
	getSegmentEnd: function () {
		if (this.vertexIndex < this.getLine().getNumPoints() - 1) return this.currentLine.getCoordinateN(this.vertexIndex + 1);
		return null;
	},
	next: function () {
		if (!this.hasNext()) return null;
		this.vertexIndex++;
		if (this.vertexIndex >= this.currentLine.getNumPoints()) {
			this.componentIndex++;
			this.loadCurrentLine();
			this.vertexIndex = 0;
		}
	},
	loadCurrentLine: function () {
		if (this.componentIndex >= this.numLines) {
			this.currentLine = null;
			return null;
		}
		this.currentLine = this.linearGeom.getGeometryN(this.componentIndex);
	},
	getSegmentStart: function () {
		return this.currentLine.getCoordinateN(this.vertexIndex);
	},
	isEndOfLine: function () {
		if (this.componentIndex >= this.numLines) return false;
		if (this.vertexIndex < this.currentLine.getNumPoints() - 1) return false;
		return true;
	},
	hasNext: function () {
		if (this.componentIndex >= this.numLines) return false;
		if (this.componentIndex === this.numLines - 1 && this.vertexIndex >= this.currentLine.getNumPoints()) return false;
		return true;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LinearIterator;
	}
});
LinearIterator.segmentEndVertexIndex = function (loc) {
	if (loc.getSegmentFraction() > 0.0) return loc.getSegmentIndex() + 1;
	return loc.getSegmentIndex();
};

