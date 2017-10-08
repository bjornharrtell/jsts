import PointLocator from '../../algorithm/PointLocator';
import extend from '../../../../../extend';
import ComponentCoordinateExtracter from '../util/ComponentCoordinateExtracter';
import PreparedGeometry from './PreparedGeometry';
export default function BasicPreparedGeometry() {
	this._baseGeom = null;
	this._representativePts = null;
	let geom = arguments[0];
	this._baseGeom = geom;
	this._representativePts = ComponentCoordinateExtracter.getCoordinates(geom);
}
extend(BasicPreparedGeometry.prototype, {
	getRepresentativePoints: function () {
		return this._representativePts;
	},
	containsProperly: function (g) {
		if (!this._baseGeom.getEnvelopeInternal().contains(g.getEnvelopeInternal())) return false;
		return this._baseGeom.relate(g, "T**FF*FF*");
	},
	getGeometry: function () {
		return this._baseGeom;
	},
	envelopesIntersect: function (g) {
		if (!this._baseGeom.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return true;
	},
	covers: function (g) {
		return this._baseGeom.covers(g);
	},
	intersects: function (g) {
		return this._baseGeom.intersects(g);
	},
	touches: function (g) {
		return this._baseGeom.touches(g);
	},
	within: function (g) {
		return this._baseGeom.within(g);
	},
	isAnyTargetComponentInTest: function (testGeom) {
		var locator = new PointLocator();
		for (var i = this._representativePts.iterator(); i.hasNext(); ) {
			var p = i.next();
			if (locator.intersects(p, testGeom)) return true;
		}
		return false;
	},
	coveredBy: function (g) {
		return this._baseGeom.coveredBy(g);
	},
	overlaps: function (g) {
		return this._baseGeom.overlaps(g);
	},
	toString: function () {
		return this._baseGeom.toString();
	},
	disjoint: function (g) {
		return !this.intersects(g);
	},
	crosses: function (g) {
		return this._baseGeom.crosses(g);
	},
	contains: function (g) {
		return this._baseGeom.contains(g);
	},
	envelopeCovers: function (g) {
		if (!this._baseGeom.getEnvelopeInternal().covers(g.getEnvelopeInternal())) return false;
		return true;
	},
	interfaces_: function () {
		return [PreparedGeometry];
	},
	getClass: function () {
		return BasicPreparedGeometry;
	}
});
