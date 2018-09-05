import PointLocator from '../../algorithm/PointLocator';
import ComponentCoordinateExtracter from '../util/ComponentCoordinateExtracter';
import PreparedGeometry from './PreparedGeometry';
export default class BasicPreparedGeometry {
	constructor() {
		BasicPreparedGeometry.constructor_.apply(this, arguments);
	}
	getRepresentativePoints() {
		return this._representativePts;
	}
	containsProperly(g) {
		if (!this._baseGeom.getEnvelopeInternal().contains(g.getEnvelopeInternal())) return false;
		return this._baseGeom.relate(g, "T**FF*FF*");
	}
	getGeometry() {
		return this._baseGeom;
	}
	envelopesIntersect(g) {
		if (!this._baseGeom.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return true;
	}
	covers(g) {
		return this._baseGeom.covers(g);
	}
	intersects(g) {
		return this._baseGeom.intersects(g);
	}
	touches(g) {
		return this._baseGeom.touches(g);
	}
	within(g) {
		return this._baseGeom.within(g);
	}
	isAnyTargetComponentInTest(testGeom) {
		var locator = new PointLocator();
		for (var i = this._representativePts.iterator(); i.hasNext(); ) {
			var p = i.next();
			if (locator.intersects(p, testGeom)) return true;
		}
		return false;
	}
	coveredBy(g) {
		return this._baseGeom.coveredBy(g);
	}
	overlaps(g) {
		return this._baseGeom.overlaps(g);
	}
	toString() {
		return this._baseGeom.toString();
	}
	disjoint(g) {
		return !this.intersects(g);
	}
	crosses(g) {
		return this._baseGeom.crosses(g);
	}
	contains(g) {
		return this._baseGeom.contains(g);
	}
	envelopeCovers(g) {
		if (!this._baseGeom.getEnvelopeInternal().covers(g.getEnvelopeInternal())) return false;
		return true;
	}
	getClass() {
		return BasicPreparedGeometry;
	}
	get interfaces_() {
		return [PreparedGeometry];
	}
}
BasicPreparedGeometry.constructor_ = function () {
	this._baseGeom = null;
	this._representativePts = null;
	let geom = arguments[0];
	this._baseGeom = geom;
	this._representativePts = ComponentCoordinateExtracter.getCoordinates(geom);
};
