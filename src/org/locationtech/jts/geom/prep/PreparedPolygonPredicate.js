import Location from '../Location';
import ComponentCoordinateExtracter from '../util/ComponentCoordinateExtracter';
import SimplePointInAreaLocator from '../../algorithm/locate/SimplePointInAreaLocator';
export default class PreparedPolygonPredicate {
	constructor() {
		PreparedPolygonPredicate.constructor_.apply(this, arguments);
	}
	isAnyTargetComponentInAreaTest(testGeom, targetRepPts) {
		var piaLoc = new SimplePointInAreaLocator(testGeom);
		for (var i = targetRepPts.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = piaLoc.locate(p);
			if (loc !== Location.EXTERIOR) return true;
		}
		return false;
	}
	isAllTestComponentsInTarget(testGeom) {
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = this._targetPointLocator.locate(p);
			if (loc === Location.EXTERIOR) return false;
		}
		return true;
	}
	isAnyTestComponentInTargetInterior(testGeom) {
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = this._targetPointLocator.locate(p);
			if (loc === Location.INTERIOR) return true;
		}
		return false;
	}
	isAllTestComponentsInTargetInterior(testGeom) {
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = this._targetPointLocator.locate(p);
			if (loc !== Location.INTERIOR) return false;
		}
		return true;
	}
	isAnyTestComponentInTarget(testGeom) {
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = this._targetPointLocator.locate(p);
			if (loc !== Location.EXTERIOR) return true;
		}
		return false;
	}
	getClass() {
		return PreparedPolygonPredicate;
	}
	get interfaces_() {
		return [];
	}
}
PreparedPolygonPredicate.constructor_ = function () {
	this._prepPoly = null;
	this._targetPointLocator = null;
	let prepPoly = arguments[0];
	this._prepPoly = prepPoly;
	this._targetPointLocator = prepPoly.getPointLocator();
};
