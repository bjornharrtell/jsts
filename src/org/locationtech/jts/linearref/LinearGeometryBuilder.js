import CoordinateList from '../geom/CoordinateList';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
export default function LinearGeometryBuilder() {
	this.geomFact = null;
	this.lines = new ArrayList();
	this.coordList = null;
	this.ignoreInvalidLines = false;
	this.fixInvalidLines = false;
	this.lastPt = null;
	let geomFact = arguments[0];
	this.geomFact = geomFact;
}
extend(LinearGeometryBuilder.prototype, {
	getGeometry: function () {
		this.endLine();
		return this.geomFact.buildGeometry(this.lines);
	},
	getLastCoordinate: function () {
		return this.lastPt;
	},
	endLine: function () {
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
	},
	setFixInvalidLines: function (fixInvalidLines) {
		this.fixInvalidLines = fixInvalidLines;
	},
	add: function () {
		if (arguments.length === 1) {
			let pt = arguments[0];
			this.add(pt, true);
		} else if (arguments.length === 2) {
			let pt = arguments[0], allowRepeatedPoints = arguments[1];
			if (this.coordList === null) this.coordList = new CoordinateList();
			this.coordList.add(pt, allowRepeatedPoints);
			this.lastPt = pt;
		}
	},
	setIgnoreInvalidLines: function (ignoreInvalidLines) {
		this.ignoreInvalidLines = ignoreInvalidLines;
	},
	validCoordinateSequence: function (pts) {
		if (pts.length >= 2) return pts;
		var validPts = [pts[0], pts[0]];
		return validPts;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LinearGeometryBuilder;
	}
});
