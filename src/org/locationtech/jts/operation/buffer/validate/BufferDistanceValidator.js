import PolygonExtracter from '../../../geom/util/PolygonExtracter';
import WKTWriter from '../../../io/WKTWriter';
import Polygon from '../../../geom/Polygon';
import extend from '../../../../../../extend';
import MultiPolygon from '../../../geom/MultiPolygon';
import System from '../../../../../../java/lang/System';
import GeometryCollection from '../../../geom/GeometryCollection';
import ArrayList from '../../../../../../java/util/ArrayList';
import LinearComponentExtracter from '../../../geom/util/LinearComponentExtracter';
import DistanceOp from '../../distance/DistanceOp';
import DiscreteHausdorffDistance from '../../../algorithm/distance/DiscreteHausdorffDistance';
export default function BufferDistanceValidator() {
	this._input = null;
	this._bufDistance = null;
	this._result = null;
	this._minValidDistance = null;
	this._maxValidDistance = null;
	this._minDistanceFound = null;
	this._maxDistanceFound = null;
	this._isValid = true;
	this._errMsg = null;
	this._errorLocation = null;
	this._errorIndicator = null;
	let input = arguments[0], bufDistance = arguments[1], result = arguments[2];
	this._input = input;
	this._bufDistance = bufDistance;
	this._result = result;
}
extend(BufferDistanceValidator.prototype, {
	checkMaximumDistance: function (input, bufCurve, maxDist) {
		var haus = new DiscreteHausdorffDistance(bufCurve, input);
		haus.setDensifyFraction(0.25);
		this._maxDistanceFound = haus.orientedDistance();
		if (this._maxDistanceFound > maxDist) {
			this._isValid = false;
			var pts = haus.getCoordinates();
			this._errorLocation = pts[1];
			this._errorIndicator = input.getFactory().createLineString(pts);
			this._errMsg = "Distance between buffer curve and input is too large " + "(" + this._maxDistanceFound + " at " + WKTWriter.toLineString(pts[0], pts[1]) + ")";
		}
	},
	isValid: function () {
		var posDistance = Math.abs(this._bufDistance);
		var distDelta = BufferDistanceValidator.MAX_DISTANCE_DIFF_FRAC * posDistance;
		this._minValidDistance = posDistance - distDelta;
		this._maxValidDistance = posDistance + distDelta;
		if (this._input.isEmpty() || this._result.isEmpty()) return true;
		if (this._bufDistance > 0.0) {
			this.checkPositiveValid();
		} else {
			this.checkNegativeValid();
		}
		if (BufferDistanceValidator.VERBOSE) {
			System.out.println("Min Dist= " + this._minDistanceFound + "  err= " + (1.0 - this._minDistanceFound / this._bufDistance) + "  Max Dist= " + this._maxDistanceFound + "  err= " + (this._maxDistanceFound / this._bufDistance - 1.0));
		}
		return this._isValid;
	},
	checkNegativeValid: function () {
		if (!(this._input instanceof Polygon || this._input instanceof MultiPolygon || this._input instanceof GeometryCollection)) {
			return null;
		}
		var inputCurve = this.getPolygonLines(this._input);
		this.checkMinimumDistance(inputCurve, this._result, this._minValidDistance);
		if (!this._isValid) return null;
		this.checkMaximumDistance(inputCurve, this._result, this._maxValidDistance);
	},
	getErrorIndicator: function () {
		return this._errorIndicator;
	},
	checkMinimumDistance: function (g1, g2, minDist) {
		var distOp = new DistanceOp(g1, g2, minDist);
		this._minDistanceFound = distOp.distance();
		if (this._minDistanceFound < minDist) {
			this._isValid = false;
			var pts = distOp.nearestPoints();
			this._errorLocation = distOp.nearestPoints()[1];
			this._errorIndicator = g1.getFactory().createLineString(pts);
			this._errMsg = "Distance between buffer curve and input is too small " + "(" + this._minDistanceFound + " at " + WKTWriter.toLineString(pts[0], pts[1]) + " )";
		}
	},
	checkPositiveValid: function () {
		var bufCurve = this._result.getBoundary();
		this.checkMinimumDistance(this._input, bufCurve, this._minValidDistance);
		if (!this._isValid) return null;
		this.checkMaximumDistance(this._input, bufCurve, this._maxValidDistance);
	},
	getErrorLocation: function () {
		return this._errorLocation;
	},
	getPolygonLines: function (g) {
		var lines = new ArrayList();
		var lineExtracter = new LinearComponentExtracter(lines);
		var polys = PolygonExtracter.getPolygons(g);
		for (var i = polys.iterator(); i.hasNext(); ) {
			var poly = i.next();
			poly.apply(lineExtracter);
		}
		return g.getFactory().buildGeometry(lines);
	},
	getErrorMessage: function () {
		return this._errMsg;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BufferDistanceValidator;
	}
});
BufferDistanceValidator.VERBOSE = false;
BufferDistanceValidator.MAX_DISTANCE_DIFF_FRAC = .012;
