import FastSegmentSetIntersectionFinder from '../../noding/FastSegmentSetIntersectionFinder';
import extend from '../../../../../extend';
import SegmentStringUtil from '../../noding/SegmentStringUtil';
import PreparedLineStringIntersects from './PreparedLineStringIntersects';
import BasicPreparedGeometry from './BasicPreparedGeometry';
import inherits from '../../../../../inherits';
export default function PreparedLineString() {
	this._segIntFinder = null;
	let line = arguments[0];
	BasicPreparedGeometry.call(this, line);
}
inherits(PreparedLineString, BasicPreparedGeometry);
extend(PreparedLineString.prototype, {
	getIntersectionFinder: function () {
		if (this._segIntFinder === null) this._segIntFinder = new FastSegmentSetIntersectionFinder(SegmentStringUtil.extractSegmentStrings(this.getGeometry()));
		return this._segIntFinder;
	},
	intersects: function (g) {
		if (!this.envelopesIntersect(g)) return false;
		return PreparedLineStringIntersects.intersects(this, g);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedLineString;
	}
});
