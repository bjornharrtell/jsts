import extend from '../../../../extend';
import TaggedLineSegment from './TaggedLineSegment';
import ArrayList from '../../../../java/util/ArrayList';
export default function TaggedLineString() {
	this._parentLine = null;
	this._segs = null;
	this._resultSegs = new ArrayList();
	this._minimumSize = null;
	if (arguments.length === 1) {
		let parentLine = arguments[0];
		TaggedLineString.call(this, parentLine, 2);
	} else if (arguments.length === 2) {
		let parentLine = arguments[0], minimumSize = arguments[1];
		this._parentLine = parentLine;
		this._minimumSize = minimumSize;
		this.init();
	}
}
extend(TaggedLineString.prototype, {
	addToResult: function (seg) {
		this._resultSegs.add(seg);
	},
	asLineString: function () {
		return this._parentLine.getFactory().createLineString(TaggedLineString.extractCoordinates(this._resultSegs));
	},
	getResultSize: function () {
		var resultSegsSize = this._resultSegs.size();
		return resultSegsSize === 0 ? 0 : resultSegsSize + 1;
	},
	getParent: function () {
		return this._parentLine;
	},
	getSegment: function (i) {
		return this._segs[i];
	},
	getParentCoordinates: function () {
		return this._parentLine.getCoordinates();
	},
	getMinimumSize: function () {
		return this._minimumSize;
	},
	asLinearRing: function () {
		return this._parentLine.getFactory().createLinearRing(TaggedLineString.extractCoordinates(this._resultSegs));
	},
	getSegments: function () {
		return this._segs;
	},
	init: function () {
		var pts = this._parentLine.getCoordinates();
		this._segs = new Array(pts.length - 1).fill(null);
		for (var i = 0; i < pts.length - 1; i++) {
			var seg = new TaggedLineSegment(pts[i], pts[i + 1], this._parentLine, i);
			this._segs[i] = seg;
		}
	},
	getResultCoordinates: function () {
		return TaggedLineString.extractCoordinates(this._resultSegs);
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
