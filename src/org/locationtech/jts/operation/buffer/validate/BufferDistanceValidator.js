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
	this.input = null;
	this.bufDistance = null;
	this.result = null;
	this.minValidDistance = null;
	this.maxValidDistance = null;
	this.minDistanceFound = null;
	this.maxDistanceFound = null;
	this._isValid = true;
	this.errMsg = null;
	this.errorLocation = null;
	this.errorIndicator = null;
	let input = arguments[0], bufDistance = arguments[1], result = arguments[2];
	this.input = input;
	this.bufDistance = bufDistance;
	this.result = result;
}
extend(BufferDistanceValidator.prototype, {
	checkMaximumDistance: function (input, bufCurve, maxDist) {
		var haus = new DiscreteHausdorffDistance(bufCurve, input);
		haus.setDensifyFraction(0.25);
		this.maxDistanceFound = haus.orientedDistance();
		if (this.maxDistanceFound > maxDist) {
			this._isValid = false;
			var pts = haus.getCoordinates();
			this.errorLocation = pts[1];
			this.errorIndicator = input.getFactory().createLineString(pts);
			this.errMsg = "Distance between buffer curve and input is too large " + "(" + this.maxDistanceFound + " at " + WKTWriter.toLineString(pts[0], pts[1]) + ")";
		}
	},
	isValid: function () {
		var posDistance = Math.abs(this.bufDistance);
		var distDelta = BufferDistanceValidator.MAX_DISTANCE_DIFF_FRAC * posDistance;
		this.minValidDistance = posDistance - distDelta;
		this.maxValidDistance = posDistance + distDelta;
		if (this.input.isEmpty() || this.result.isEmpty()) return true;
		if (this.bufDistance > 0.0) {
			this.checkPositiveValid();
		} else {
			this.checkNegativeValid();
		}
		if (BufferDistanceValidator.VERBOSE) {
			System.out.println("Min Dist= " + this.minDistanceFound + "  err= " + (1.0 - this.minDistanceFound / this.bufDistance) + "  Max Dist= " + this.maxDistanceFound + "  err= " + (this.maxDistanceFound / this.bufDistance - 1.0));
		}
		return this._isValid;
	},
	checkNegativeValid: function () {
		if (!(this.input instanceof Polygon || this.input instanceof MultiPolygon || this.input instanceof GeometryCollection)) {
			return null;
		}
		var inputCurve = this.getPolygonLines(this.input);
		this.checkMinimumDistance(inputCurve, this.result, this.minValidDistance);
		if (!this._isValid) return null;
		this.checkMaximumDistance(inputCurve, this.result, this.maxValidDistance);
	},
	getErrorIndicator: function () {
		return this.errorIndicator;
	},
	checkMinimumDistance: function (g1, g2, minDist) {
		var distOp = new DistanceOp(g1, g2, minDist);
		this.minDistanceFound = distOp.distance();
		if (this.minDistanceFound < minDist) {
			this._isValid = false;
			var pts = distOp.nearestPoints();
			this.errorLocation = distOp.nearestPoints()[1];
			this.errorIndicator = g1.getFactory().createLineString(pts);
			this.errMsg = "Distance between buffer curve and input is too small " + "(" + this.minDistanceFound + " at " + WKTWriter.toLineString(pts[0], pts[1]) + " )";
		}
	},
	checkPositiveValid: function () {
		var bufCurve = this.result.getBoundary();
		this.checkMinimumDistance(this.input, bufCurve, this.minValidDistance);
		if (!this._isValid) return null;
		this.checkMaximumDistance(this.input, bufCurve, this.maxValidDistance);
	},
	getErrorLocation: function () {
		return this.errorLocation;
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
		return this.errMsg;
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

