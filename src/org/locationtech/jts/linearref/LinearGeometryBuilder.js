import CoordinateList from '../geom/CoordinateList';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import ArrayList from '../../../../java/util/ArrayList';
export default class LinearGeometryBuilder {
	constructor(...args) {
		this.geomFact = null;
		this.lines = new ArrayList();
		this.coordList = null;
		this.ignoreInvalidLines = false;
		this.fixInvalidLines = false;
		this.lastPt = null;
		if (args.length === 1) {
			let [geomFact] = args;
			this.geomFact = geomFact;
		}
	}
	get interfaces_() {
		return [];
	}
	getGeometry() {
		this.endLine();
		return this.geomFact.buildGeometry(this.lines);
	}
	getLastCoordinate() {
		return this.lastPt;
	}
	endLine() {
		if (this.coordList === null) {
			return null;
		}
		if (this.ignoreInvalidLines && this.coordList.size() < 2) {
			this.coordList = null;
			return null;
		}
		var rawPts = this.coordList.toCoordinateArray();
		var pts = rawPts;
		if (this.fixInvalidLines) pts = this.validCoordinateSequence(rawPts);
		this.coordList = null;
		var line = null;
		try {
			line = this.geomFact.createLineString(pts);
		} catch (ex) {
			if (ex instanceof IllegalArgumentException) {
				if (!this.ignoreInvalidLines) throw ex;
			} else throw ex;
		} finally {}
		if (line !== null) this.lines.add(line);
	}
	setFixInvalidLines(fixInvalidLines) {
		this.fixInvalidLines = fixInvalidLines;
	}
	add(...args) {
		if (args.length === 1) {
			let [pt] = args;
			this.add(pt, true);
		} else if (args.length === 2) {
			let [pt, allowRepeatedPoints] = args;
			if (this.coordList === null) this.coordList = new CoordinateList();
			this.coordList.add(pt, allowRepeatedPoints);
			this.lastPt = pt;
		}
	}
	setIgnoreInvalidLines(ignoreInvalidLines) {
		this.ignoreInvalidLines = ignoreInvalidLines;
	}
	validCoordinateSequence(pts) {
		if (pts.length >= 2) return pts;
		var validPts = [pts[0], pts[0]];
		return validPts;
	}
	getClass() {
		return LinearGeometryBuilder;
	}
}

