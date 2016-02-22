import StringBuffer from '../../../../java/lang/StringBuffer';
import NodedSegmentString from './NodedSegmentString';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter';
export default function SegmentStringUtil() {}
extend(SegmentStringUtil.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SegmentStringUtil;
	}
});
SegmentStringUtil.toGeometry = function (segStrings, geomFact) {
	var lines = new Array(segStrings.size()).fill(null);
	var index = 0;
	for (var i = segStrings.iterator(); i.hasNext(); ) {
		var ss = i.next();
		var line = geomFact.createLineString(ss.getCoordinates());
		lines[index++] = line;
	}
	if (lines.length === 1) return lines[0];
	return geomFact.createMultiLineString(lines);
};
SegmentStringUtil.extractNodedSegmentStrings = function (geom) {
	var segStr = new ArrayList();
	var lines = LinearComponentExtracter.getLines(geom);
	for (var i = lines.iterator(); i.hasNext(); ) {
		var line = i.next();
		var pts = line.getCoordinates();
		segStr.add(new NodedSegmentString(pts, geom));
	}
	return segStr;
};
SegmentStringUtil.extractSegmentStrings = function (geom) {
	return SegmentStringUtil.extractNodedSegmentStrings(geom);
};
SegmentStringUtil.toString = function () {
	if (arguments.length === 1) {
		let segStrings = arguments[0];
		var buf = new StringBuffer();
		for (var i = segStrings.iterator(); i.hasNext(); ) {
			var segStr = i.next();
			buf.append(segStr.toString());
			buf.append("\n");
		}
		return buf.toString();
	}
};

