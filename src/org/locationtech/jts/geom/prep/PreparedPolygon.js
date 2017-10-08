import PreparedPolygonIntersects from './PreparedPolygonIntersects';
import FastSegmentSetIntersectionFinder from '../../noding/FastSegmentSetIntersectionFinder';
import extend from '../../../../../extend';
import SegmentStringUtil from '../../noding/SegmentStringUtil';
import PreparedPolygonContainsProperly from './PreparedPolygonContainsProperly';
import PreparedPolygonContains from './PreparedPolygonContains';
import PreparedPolygonCovers from './PreparedPolygonCovers';
import BasicPreparedGeometry from './BasicPreparedGeometry';
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator';
import RectangleContains from '../../operation/predicate/RectangleContains';
import inherits from '../../../../../inherits';
import RectangleIntersects from '../../operation/predicate/RectangleIntersects';
export default function PreparedPolygon() {
	this._isRectangle = null;
	this._segIntFinder = null;
	this._pia = null;
	let poly = arguments[0];
	BasicPreparedGeometry.call(this, poly);
	this._isRectangle = this.getGeometry().isRectangle();
}
inherits(PreparedPolygon, BasicPreparedGeometry);
extend(PreparedPolygon.prototype, {
	containsProperly: function (g) {
		if (!this.envelopeCovers(g)) return false;
		return PreparedPolygonContainsProperly.containsProperly(this, g);
	},
	getPointLocator: function () {
		if (this._pia === null) this._pia = new IndexedPointInAreaLocator(this.getGeometry());
		return this._pia;
	},
	covers: function (g) {
		if (!this.envelopeCovers(g)) return false;
		if (this._isRectangle) {
			return true;
		}
		return PreparedPolygonCovers.covers(this, g);
	},
	intersects: function (g) {
		if (!this.envelopesIntersect(g)) return false;
		if (this._isRectangle) {
			return RectangleIntersects.intersects(this.getGeometry(), g);
		}
		return PreparedPolygonIntersects.intersects(this, g);
	},
	contains: function (g) {
		if (!this.envelopeCovers(g)) return false;
		if (this._isRectangle) {
			return RectangleContains.contains(this.getGeometry(), g);
		}
		return PreparedPolygonContains.contains(this, g);
	},
	getIntersectionFinder: function () {
		if (this._segIntFinder === null) this._segIntFinder = new FastSegmentSetIntersectionFinder(SegmentStringUtil.extractSegmentStrings(this.getGeometry()));
		return this._segIntFinder;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedPolygon;
	}
});
