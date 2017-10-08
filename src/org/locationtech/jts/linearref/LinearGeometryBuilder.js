import CoordinateList from '../geom/CoordinateList';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
export default function LinearGeometryBuilder() {
	this._geomFact = null;
	this._lines = new ArrayList();
	this._coordList = null;
	this._ignoreInvalidLines = false;
	this._fixInvalidLines = false;
	this._lastPt = null;
	let geomFact = arguments[0];
	this._geomFact = geomFact;
}
extend(LinearGeometryBuilder.prototype, {
	getGeometry: function () {
		this.endLine();
		return this._geomFact.buildGeometry(this._lines);
	},
	getLastCoordinate: function () {
		return this._lastPt;
	},
	endLine: function () {
		if (this._coordList === null) {
			return null;
		}
		if (this._ignoreInvalidLines && this._coordList.size() < 2) {
			this._coordList = null;
			return null;
		}
		var rawPts = this._coordList.toCoordinateArray();
		var pts = rawPts;
		if (this._fixInvalidLines) pts = this.validCoordinateSequence(rawPts);
		this._coordList = null;
		var line = null;
		try {
			line = this._geomFact.createLineString(pts);
		} catch (ex) {
			if (ex instanceof IllegalArgumentException) {
				if (!this._ignoreInvalidLines) throw ex;
			} else throw ex;
		} finally {}
		if (line !== null) this._lines.add(line);
	},
	setFixInvalidLines: function (fixInvalidLines) {
		this._fixInvalidLines = fixInvalidLines;
	},
	add: function () {
		if (arguments.length === 1) {
			let pt = arguments[0];
			this.add(pt, true);
		} else if (arguments.length === 2) {
			let pt = arguments[0], allowRepeatedPoints = arguments[1];
			if (this._coordList === null) this._coordList = new CoordinateList();
			this._coordList.add(pt, allowRepeatedPoints);
			this._lastPt = pt;
		}
	},
	setIgnoreInvalidLines: function (ignoreInvalidLines) {
		this._ignoreInvalidLines = ignoreInvalidLines;
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
