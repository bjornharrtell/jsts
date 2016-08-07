import NodingValidator from '../NodingValidator';
import NodedSegmentString from '../NodedSegmentString';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
import MCIndexSnapRounder from './MCIndexSnapRounder';
export default function GeometryNoder() {
	this.geomFact = null;
	this.pm = null;
	this.isValidityChecked = false;
	let pm = arguments[0];
	this.pm = pm;
}
extend(GeometryNoder.prototype, {
	extractLines: function (geoms) {
		var lines = new ArrayList();
		var lce = new LinearComponentExtracter(lines);
		for (var it = geoms.iterator(); it.hasNext(); ) {
			var geom = it.next();
			geom.apply(lce);
		}
		return lines;
	},
	setValidate: function (isValidityChecked) {
		this.isValidityChecked = isValidityChecked;
	},
	node: function (geoms) {
		var geom0 = geoms.iterator().next();
		this.geomFact = geom0.getFactory();
		var segStrings = this.toSegmentStrings(this.extractLines(geoms));
		var sr = new MCIndexSnapRounder(this.pm);
		sr.computeNodes(segStrings);
		var nodedLines = sr.getNodedSubstrings();
		if (this.isValidityChecked) {
			var nv = new NodingValidator(nodedLines);
			nv.checkValid();
		}
		return this.toLineStrings(nodedLines);
	},
	toSegmentStrings: function (lines) {
		var segStrings = new ArrayList();
		for (var it = lines.iterator(); it.hasNext(); ) {
			var line = it.next();
			segStrings.add(new NodedSegmentString(line.getCoordinates(), null));
		}
		return segStrings;
	},
	toLineStrings: function (segStrings) {
		var lines = new ArrayList();
		for (var it = segStrings.iterator(); it.hasNext(); ) {
			var ss = it.next();
			if (ss.size() < 2) continue;
			lines.add(this.geomFact.createLineString(ss.getCoordinates()));
		}
		return lines;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryNoder;
	}
});
