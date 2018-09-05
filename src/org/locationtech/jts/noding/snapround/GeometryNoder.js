import NodingValidator from '../NodingValidator';
import NodedSegmentString from '../NodedSegmentString';
import ArrayList from '../../../../../java/util/ArrayList';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
import MCIndexSnapRounder from './MCIndexSnapRounder';
export default class GeometryNoder {
	constructor() {
		GeometryNoder.constructor_.apply(this, arguments);
	}
	extractLines(geoms) {
		var lines = new ArrayList();
		var lce = new LinearComponentExtracter(lines);
		for (var it = geoms.iterator(); it.hasNext(); ) {
			var geom = it.next();
			geom.apply(lce);
		}
		return lines;
	}
	setValidate(isValidityChecked) {
		this._isValidityChecked = isValidityChecked;
	}
	node(geoms) {
		var geom0 = geoms.iterator().next();
		this._geomFact = geom0.getFactory();
		var segStrings = this.toSegmentStrings(this.extractLines(geoms));
		var sr = new MCIndexSnapRounder(this._pm);
		sr.computeNodes(segStrings);
		var nodedLines = sr.getNodedSubstrings();
		if (this._isValidityChecked) {
			var nv = new NodingValidator(nodedLines);
			nv.checkValid();
		}
		return this.toLineStrings(nodedLines);
	}
	toSegmentStrings(lines) {
		var segStrings = new ArrayList();
		for (var it = lines.iterator(); it.hasNext(); ) {
			var line = it.next();
			segStrings.add(new NodedSegmentString(line.getCoordinates(), null));
		}
		return segStrings;
	}
	toLineStrings(segStrings) {
		var lines = new ArrayList();
		for (var it = segStrings.iterator(); it.hasNext(); ) {
			var ss = it.next();
			if (ss.size() < 2) continue;
			lines.add(this._geomFact.createLineString(ss.getCoordinates()));
		}
		return lines;
	}
	getClass() {
		return GeometryNoder;
	}
	get interfaces_() {
		return [];
	}
}
GeometryNoder.constructor_ = function () {
	this._geomFact = null;
	this._pm = null;
	this._isValidityChecked = false;
	let pm = arguments[0];
	this._pm = pm;
};
