import LocationIndexOfPoint from './LocationIndexOfPoint';
export default class LocationIndexOfLine {
	constructor(...args) {
		(() => {
			this.linearGeom = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [linearGeom] = args;
						this.linearGeom = linearGeom;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static indicesOf(linearGeom, subLine) {
		var locater = new LocationIndexOfLine(linearGeom);
		return locater.indicesOf(subLine);
	}
	indicesOf(subLine) {
		var startPt = subLine.getGeometryN(0).getCoordinateN(0);
		var lastLine = subLine.getGeometryN(subLine.getNumGeometries() - 1);
		var endPt = lastLine.getCoordinateN(lastLine.getNumPoints() - 1);
		var locPt = new LocationIndexOfPoint(this.linearGeom);
		var subLineLoc = new Array(2);
		subLineLoc[0] = locPt.indexOf(startPt);
		if (subLine.getLength() === 0.0) {
			subLineLoc[1] = subLineLoc[0].clone();
		} else {
			subLineLoc[1] = locPt.indexOfAfter(endPt, subLineLoc[0]);
		}
		return subLineLoc;
	}
	getClass() {
		return LocationIndexOfLine;
	}
}

