import StringBuffer from '../../../../java/lang/StringBuffer';
import NodedSegmentString from './NodedSegmentString';
import ArrayList from '../../../../java/util/ArrayList';
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter';
export default class SegmentStringUtil {
	get interfaces_() {
		return [];
	}
	static toGeometry(segStrings, geomFact) {
		var lines = new Array(segStrings.size());
		var index = 0;
		for (var i = segStrings.iterator(); i.hasNext(); ) {
			var ss = i.next();
			var line = geomFact.createLineString(ss.getCoordinates());
			lines[index++] = line;
		}
		if (lines.length === 1) return lines[0];
		return geomFact.createMultiLineString(lines);
	}
	static extractNodedSegmentStrings(geom) {
		var segStr = new ArrayList();
		var lines = LinearComponentExtracter.getLines(geom);
		for (var i = lines.iterator(); i.hasNext(); ) {
			var line = i.next();
			var pts = line.getCoordinates();
			segStr.add(new NodedSegmentString(pts, geom));
		}
		return segStr;
	}
	static extractSegmentStrings(geom) {
		return SegmentStringUtil.extractNodedSegmentStrings(geom);
	}
	static toString(...args) {
		if (args.length === 1) {
			let [segStrings] = args;
			var buf = new StringBuffer();
			for (var i = segStrings.iterator(); i.hasNext(); ) {
				var segStr = i.next();
				buf.append(segStr.toString());
				buf.append("\n");
			}
			return buf.toString();
		} else return super.toString(...args);
	}
	getClass() {
		return SegmentStringUtil;
	}
}

