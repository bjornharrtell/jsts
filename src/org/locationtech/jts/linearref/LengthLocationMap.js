import LinearIterator from './LinearIterator';
import LinearLocation from './LinearLocation';
export default class LengthLocationMap {
	constructor() {
		LengthLocationMap.constructor_.apply(this, arguments);
	}
	static getLength(linearGeom, loc) {
		var locater = new LengthLocationMap(linearGeom);
		return locater.getLength(loc);
	}
	static getLocation() {
		if (arguments.length === 2) {
			let linearGeom = arguments[0], length = arguments[1];
			var locater = new LengthLocationMap(linearGeom);
			return locater.getLocation(length);
		} else if (arguments.length === 3) {
			let linearGeom = arguments[0], length = arguments[1], resolveLower = arguments[2];
			var locater = new LengthLocationMap(linearGeom);
			return locater.getLocation(length, resolveLower);
		}
	}
	getLength(loc) {
		var totalLength = 0.0;
		var it = new LinearIterator(this._linearGeom);
		while (it.hasNext()) {
			if (!it.isEndOfLine()) {
				var p0 = it.getSegmentStart();
				var p1 = it.getSegmentEnd();
				var segLen = p1.distance(p0);
				if (loc.getComponentIndex() === it.getComponentIndex() && loc.getSegmentIndex() === it.getVertexIndex()) {
					return totalLength + segLen * loc.getSegmentFraction();
				}
				totalLength += segLen;
			}
			it.next();
		}
		return totalLength;
	}
	resolveHigher(loc) {
		if (!loc.isEndpoint(this._linearGeom)) return loc;
		var compIndex = loc.getComponentIndex();
		if (compIndex >= this._linearGeom.getNumGeometries() - 1) return loc;
		do {
			compIndex++;
		} while (compIndex < this._linearGeom.getNumGeometries() - 1 && this._linearGeom.getGeometryN(compIndex).getLength() === 0);
		return new LinearLocation(compIndex, 0, 0.0);
	}
	getLocation() {
		if (arguments.length === 1) {
			let length = arguments[0];
			return this.getLocation(length, true);
		} else if (arguments.length === 2) {
			let length = arguments[0], resolveLower = arguments[1];
			var forwardLength = length;
			if (length < 0.0) {
				var lineLen = this._linearGeom.getLength();
				forwardLength = lineLen + length;
			}
			var loc = this.getLocationForward(forwardLength);
			if (resolveLower) {
				return loc;
			}
			return this.resolveHigher(loc);
		}
	}
	getLocationForward(length) {
		if (length <= 0.0) return new LinearLocation();
		var totalLength = 0.0;
		var it = new LinearIterator(this._linearGeom);
		while (it.hasNext()) {
			if (it.isEndOfLine()) {
				if (totalLength === length) {
					var compIndex = it.getComponentIndex();
					var segIndex = it.getVertexIndex();
					return new LinearLocation(compIndex, segIndex, 0.0);
				}
			} else {
				var p0 = it.getSegmentStart();
				var p1 = it.getSegmentEnd();
				var segLen = p1.distance(p0);
				if (totalLength + segLen > length) {
					var frac = (length - totalLength) / segLen;
					var compIndex = it.getComponentIndex();
					var segIndex = it.getVertexIndex();
					return new LinearLocation(compIndex, segIndex, frac);
				}
				totalLength += segLen;
			}
			it.next();
		}
		return LinearLocation.getEndLocation(this._linearGeom);
	}
	getClass() {
		return LengthLocationMap;
	}
	get interfaces_() {
		return [];
	}
}
LengthLocationMap.constructor_ = function () {
	this._linearGeom = null;
	let linearGeom = arguments[0];
	this._linearGeom = linearGeom;
};
