import hasInterface from '../../../../hasInterface';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import Lineal from '../geom/Lineal';
export default function LinearIterator() {
	this._linearGeom = null;
	this._numLines = null;
	this._currentLine = null;
	this._componentIndex = 0;
	this._vertexIndex = 0;
	if (arguments.length === 1) {
		let linear = arguments[0];
		LinearIterator.call(this, linear, 0, 0);
	} else if (arguments.length === 2) {
		let linear = arguments[0], start = arguments[1];
		LinearIterator.call(this, linear, start.getComponentIndex(), LinearIterator.segmentEndVertexIndex(start));
	} else if (arguments.length === 3) {
		let linearGeom = arguments[0], componentIndex = arguments[1], vertexIndex = arguments[2];
		if (!hasInterface(linearGeom, Lineal)) throw new IllegalArgumentException("Lineal geometry is required");
		this._linearGeom = linearGeom;
		this._numLines = linearGeom.getNumGeometries();
		this._componentIndex = componentIndex;
		this._vertexIndex = vertexIndex;
		this.loadCurrentLine();
	}
}
extend(LinearIterator.prototype, {
	getComponentIndex: function () {
		return this._componentIndex;
	},
	getLine: function () {
		return this._currentLine;
	},
	getVertexIndex: function () {
		return this._vertexIndex;
	},
	getSegmentEnd: function () {
		if (this._vertexIndex < this.getLine().getNumPoints() - 1) return this._currentLine.getCoordinateN(this._vertexIndex + 1);
		return null;
	},
	next: function () {
		if (!this.hasNext()) return null;
		this._vertexIndex++;
		if (this._vertexIndex >= this._currentLine.getNumPoints()) {
			this._componentIndex++;
			this.loadCurrentLine();
			this._vertexIndex = 0;
		}
	},
	loadCurrentLine: function () {
		if (this._componentIndex >= this._numLines) {
			this._currentLine = null;
			return null;
		}
		this._currentLine = this._linearGeom.getGeometryN(this._componentIndex);
	},
	getSegmentStart: function () {
		return this._currentLine.getCoordinateN(this._vertexIndex);
	},
	isEndOfLine: function () {
		if (this._componentIndex >= this._numLines) return false;
		if (this._vertexIndex < this._currentLine.getNumPoints() - 1) return false;
		return true;
	},
	hasNext: function () {
		if (this._componentIndex >= this._numLines) return false;
		if (this._componentIndex === this._numLines - 1 && this._vertexIndex >= this._currentLine.getNumPoints()) return false;
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
