import NodingValidator from '../NodingValidator';
import NodedSegmentString from '../NodedSegmentString';
import ArrayList from '../../../../../java/util/ArrayList';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
import MCIndexSnapRounder from './MCIndexSnapRounder';
export default class GeometryNoder {
	constructor(...args) {
		this.geomFact = null;
		this.pm = null;
		this.isValidityChecked = false;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [pm] = args;
						this.pm = pm;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
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
		this.isValidityChecked = isValidityChecked;
	}
	node(geoms) {
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
			lines.add(this.geomFact.createLineString(ss.getCoordinates()));
		}
		return lines;
	}
	getClass() {
		return GeometryNoder;
	}
}

