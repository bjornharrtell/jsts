import FastSegmentSetIntersectionFinder from '../../noding/FastSegmentSetIntersectionFinder';
import SegmentStringUtil from '../../noding/SegmentStringUtil';
import PreparedLineStringIntersects from './PreparedLineStringIntersects';
import BasicPreparedGeometry from './BasicPreparedGeometry';
export default class PreparedLineString extends BasicPreparedGeometry {
	constructor() {
		super();
		PreparedLineString.constructor_.apply(this, arguments);
	}
	getIntersectionFinder() {
		if (this._segIntFinder === null) this._segIntFinder = new FastSegmentSetIntersectionFinder(SegmentStringUtil.extractSegmentStrings(this.getGeometry()));
		return this._segIntFinder;
	}
	intersects(g) {
		if (!this.envelopesIntersect(g)) return false;
		return PreparedLineStringIntersects.intersects(this, g);
	}
	getClass() {
		return PreparedLineString;
	}
	get interfaces_() {
		return [];
	}
}
PreparedLineString.constructor_ = function () {
	this._segIntFinder = null;
	let line = arguments[0];
	BasicPreparedGeometry.constructor_.call(this, line);
};
