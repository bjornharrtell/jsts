import Location from '../Location';
import extend from '../../../../../extend';
import ComponentCoordinateExtracter from '../util/ComponentCoordinateExtracter';
import SimplePointInAreaLocator from '../../algorithm/locate/SimplePointInAreaLocator';
export default function PreparedPolygonPredicate() {
	this._prepPoly = null;
	this._targetPointLocator = null;
	let prepPoly = arguments[0];
	this._prepPoly = prepPoly;
	this._targetPointLocator = prepPoly.getPointLocator();
}
extend(PreparedPolygonPredicate.prototype, {
	isAnyTargetComponentInAreaTest: function (testGeom, targetRepPts) {
		var piaLoc = new SimplePointInAreaLocator(testGeom);
		for (var i = targetRepPts.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = piaLoc.locate(p);
			if (loc !== Location.EXTERIOR) return true;
		}
		return false;
	},
	isAllTestComponentsInTarget: function (testGeom) {
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = this._targetPointLocator.locate(p);
			if (loc === Location.EXTERIOR) return false;
		}
		return true;
	},
	isAnyTestComponentInTargetInterior: function (testGeom) {
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = this._targetPointLocator.locate(p);
			if (loc === Location.INTERIOR) return true;
		}
		return false;
	},
	isAllTestComponentsInTargetInterior: function (testGeom) {
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = this._targetPointLocator.locate(p);
			if (loc !== Location.INTERIOR) return false;
		}
		return true;
	},
	isAnyTestComponentInTarget: function (testGeom) {
		var coords = ComponentCoordinateExtracter.getCoordinates(testGeom);
		for (var i = coords.iterator(); i.hasNext(); ) {
			var p = i.next();
			var loc = this._targetPointLocator.locate(p);
			if (loc !== Location.EXTERIOR) return true;
		}
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedPolygonPredicate;
	}
});
