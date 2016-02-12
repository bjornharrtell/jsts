import LinearIterator from './LinearIterator';
import LinearLocation from './LinearLocation';
export default class LengthLocationMap {
	constructor(...args) {
		this.linearGeom = null;
		switch (args.length) {
			case 1:
				{
					let [linearGeom] = args;
					this.linearGeom = linearGeom;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	static getLength(linearGeom, loc) {
		var locater = new LengthLocationMap(linearGeom);
		return locater.getLength(loc);
	}
	static getLocation(...args) {
		switch (args.length) {
			case 2:
				{
					let [linearGeom, length] = args;
					var locater = new LengthLocationMap(linearGeom);
					return locater.getLocation(length);
					break;
				}
			case 3:
				{
					let [linearGeom, length, resolveLower] = args;
					var locater = new LengthLocationMap(linearGeom);
					return locater.getLocation(length, resolveLower);
					break;
				}
		}
	}
	getLength(loc) {
		var totalLength = 0.0;
		var it = new LinearIterator(this.linearGeom);
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
		if (!loc.isEndpoint(this.linearGeom)) return loc;
		var compIndex = loc.getComponentIndex();
		if (compIndex >= this.linearGeom.getNumGeometries() - 1) return loc;
		do {
			compIndex++;
		} while (compIndex < this.linearGeom.getNumGeometries() - 1 && this.linearGeom.getGeometryN(compIndex).getLength() === 0);
		return new LinearLocation(compIndex, 0, 0.0);
	}
	getLocation(...args) {
		switch (args.length) {
			case 1:
				{
					let [length] = args;
					return this.getLocation(length, true);
					break;
				}
			case 2:
				{
					let [length, resolveLower] = args;
					var forwardLength = length;
					if (length < 0.0) {
						var lineLen = this.linearGeom.getLength();
						forwardLength = lineLen + length;
					}
					var loc = this.getLocationForward(forwardLength);
					if (resolveLower) {
						return loc;
					}
					return this.resolveHigher(loc);
					break;
				}
		}
	}
	getLocationForward(length) {
		if (length <= 0.0) return new LinearLocation();
		var totalLength = 0.0;
		var it = new LinearIterator(this.linearGeom);
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
		return LinearLocation.getEndLocation(this.linearGeom);
	}
	getClass() {
		return LengthLocationMap;
	}
}

