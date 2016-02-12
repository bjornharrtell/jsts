import TaggedLineSegment from './TaggedLineSegment';
import ArrayList from '../../../../java/util/ArrayList';
export default class TaggedLineString {
	constructor(...args) {
		this.parentLine = null;
		this.segs = null;
		this.resultSegs = new ArrayList();
		this.minimumSize = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [parentLine] = args;
				overloaded.call(this, parentLine, 2);
			} else if (args.length === 2) {
				let [parentLine, minimumSize] = args;
				this.parentLine = parentLine;
				this.minimumSize = minimumSize;
				this.init();
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static extractCoordinates(segs) {
		var pts = new Array(segs.size() + 1);
		var seg = null;
		for (var i = 0; i < segs.size(); i++) {
			seg = segs.get(i);
			pts[i] = seg.p0;
		}
		pts[pts.length - 1] = seg.p1;
		return pts;
	}
	addToResult(seg) {
		this.resultSegs.add(seg);
	}
	asLineString() {
		return this.parentLine.getFactory().createLineString(TaggedLineString.extractCoordinates(this.resultSegs));
	}
	getResultSize() {
		var resultSegsSize = this.resultSegs.size();
		return resultSegsSize === 0 ? 0 : resultSegsSize + 1;
	}
	getParent() {
		return this.parentLine;
	}
	getSegment(i) {
		return this.segs[i];
	}
	getParentCoordinates() {
		return this.parentLine.getCoordinates();
	}
	getMinimumSize() {
		return this.minimumSize;
	}
	asLinearRing() {
		return this.parentLine.getFactory().createLinearRing(TaggedLineString.extractCoordinates(this.resultSegs));
	}
	getSegments() {
		return this.segs;
	}
	init() {
		var pts = this.parentLine.getCoordinates();
		this.segs = new Array(pts.length - 1);
		for (var i = 0; i < pts.length - 1; i++) {
			var seg = new TaggedLineSegment(pts[i], pts[i + 1], this.parentLine, i);
			this.segs[i] = seg;
		}
	}
	getResultCoordinates() {
		return TaggedLineString.extractCoordinates(this.resultSegs);
	}
	getClass() {
		return TaggedLineString;
	}
}

