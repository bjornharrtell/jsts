import extend from '../../../../extend';
import TaggedLineSegment from './TaggedLineSegment';
import ArrayList from '../../../../java/util/ArrayList';
export default function TaggedLineString() {
	this.parentLine = null;
	this.segs = null;
	this.resultSegs = new ArrayList();
	this.minimumSize = null;
	if (arguments.length === 1) {
		let parentLine = arguments[0];
		TaggedLineString.call(this, parentLine, 2);
	} else if (arguments.length === 2) {
		let parentLine = arguments[0], minimumSize = arguments[1];
		this.parentLine = parentLine;
		this.minimumSize = minimumSize;
		this.init();
	}
}
extend(TaggedLineString.prototype, {
	addToResult: function (seg) {
		this.resultSegs.add(seg);
	},
	asLineString: function () {
		return this.parentLine.getFactory().createLineString(TaggedLineString.extractCoordinates(this.resultSegs));
	},
	getResultSize: function () {
		var resultSegsSize = this.resultSegs.size();
		return resultSegsSize === 0 ? 0 : resultSegsSize + 1;
	},
	getParent: function () {
		return this.parentLine;
	},
	getSegment: function (i) {
		return this.segs[i];
	},
	getParentCoordinates: function () {
		return this.parentLine.getCoordinates();
	},
	getMinimumSize: function () {
		return this.minimumSize;
	},
	asLinearRing: function () {
		return this.parentLine.getFactory().createLinearRing(TaggedLineString.extractCoordinates(this.resultSegs));
	},
	getSegments: function () {
		return this.segs;
	},
	init: function () {
		var pts = this.parentLine.getCoordinates();
		this.segs = new Array(pts.length - 1).fill(null);
		for (var i = 0; i < pts.length - 1; i++) {
			var seg = new TaggedLineSegment(pts[i], pts[i + 1], this.parentLine, i);
			this.segs[i] = seg;
		}
	},
	getResultCoordinates: function () {
		return TaggedLineString.extractCoordinates(this.resultSegs);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TaggedLineString;
	}
});
TaggedLineString.extractCoordinates = function (segs) {
	var pts = new Array(segs.size() + 1).fill(null);
	var seg = null;
	for (var i = 0; i < segs.size(); i++) {
		seg = segs.get(i);
		pts[i] = seg.p0;
	}
	pts[pts.length - 1] = seg.p1;
	return pts;
};
