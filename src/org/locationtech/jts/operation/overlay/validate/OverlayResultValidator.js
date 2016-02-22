import GeometrySnapper from '../snap/GeometrySnapper';
import Location from '../../../geom/Location';
import FuzzyPointLocator from './FuzzyPointLocator';
import extend from '../../../../../../extend';
import OffsetPointGenerator from './OffsetPointGenerator';
import System from '../../../../../../java/lang/System';
import ArrayList from '../../../../../../java/util/ArrayList';
import OverlayOp from '../OverlayOp';
export default function OverlayResultValidator() {
	this.geom = null;
	this.locFinder = null;
	this.location = new Array(3).fill(null);
	this.invalidLocation = null;
	this.boundaryDistanceTolerance = OverlayResultValidator.TOLERANCE;
	this.testCoords = new ArrayList();
	let a = arguments[0], b = arguments[1], result = arguments[2];
	this.boundaryDistanceTolerance = OverlayResultValidator.computeBoundaryDistanceTolerance(a, b);
	this.geom = [a, b, result];
	this.locFinder = [new FuzzyPointLocator(this.geom[0], this.boundaryDistanceTolerance), new FuzzyPointLocator(this.geom[1], this.boundaryDistanceTolerance), new FuzzyPointLocator(this.geom[2], this.boundaryDistanceTolerance)];
}
extend(OverlayResultValidator.prototype, {
	reportResult: function (overlayOp, location, expectedInterior) {
		System.out.println("Overlay result invalid - A:" + Location.toLocationSymbol(location[0]) + " B:" + Location.toLocationSymbol(location[1]) + " expected:" + (expectedInterior ? 'i' : 'e') + " actual:" + Location.toLocationSymbol(location[2]));
	},
	isValid: function (overlayOp) {
		this.addTestPts(this.geom[0]);
		this.addTestPts(this.geom[1]);
		var isValid = this.checkValid(overlayOp);
		return isValid;
	},
	checkValid: function () {
		if (arguments.length === 1) {
			let overlayOp = arguments[0];
			for (var i = 0; i < this.testCoords.size(); i++) {
				var pt = this.testCoords.get(i);
				if (!this.checkValid(overlayOp, pt)) {
					this.invalidLocation = pt;
					return false;
				}
			}
			return true;
		} else if (arguments.length === 2) {
			let overlayOp = arguments[0], pt = arguments[1];
			this.location[0] = this.locFinder[0].getLocation(pt);
			this.location[1] = this.locFinder[1].getLocation(pt);
			this.location[2] = this.locFinder[2].getLocation(pt);
			if (OverlayResultValidator.hasLocation(this.location, Location.BOUNDARY)) return true;
			return this.isValidResult(overlayOp, this.location);
		}
	},
	addTestPts: function (g) {
		var ptGen = new OffsetPointGenerator(g);
		this.testCoords.addAll(ptGen.getPoints(5 * this.boundaryDistanceTolerance));
	},
	isValidResult: function (overlayOp, location) {
		var expectedInterior = OverlayOp.isResultOfOp(location[0], location[1], overlayOp);
		var resultInInterior = location[2] === Location.INTERIOR;
		var isValid = !(expectedInterior ^ resultInInterior);
		if (!isValid) this.reportResult(overlayOp, location, expectedInterior);
		return isValid;
	},
	getInvalidLocation: function () {
		return this.invalidLocation;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OverlayResultValidator;
	}
});
OverlayResultValidator.hasLocation = function (location, loc) {
	for (var i = 0; i < 3; i++) {
		if (location[i] === loc) return true;
	}
	return false;
};
OverlayResultValidator.computeBoundaryDistanceTolerance = function (g0, g1) {
	return Math.min(GeometrySnapper.computeSizeBasedSnapTolerance(g0), GeometrySnapper.computeSizeBasedSnapTolerance(g1));
};
OverlayResultValidator.isValid = function (a, b, overlayOp, result) {
	var validator = new OverlayResultValidator(a, b, result);
	return validator.isValid(overlayOp);
};
OverlayResultValidator.TOLERANCE = 0.000001;

