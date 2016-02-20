import BufferDistanceValidator from './BufferDistanceValidator';
import Polygon from '../../../geom/Polygon';
import extend from '../../../../../../extend';
import MultiPolygon from '../../../geom/MultiPolygon';
import System from '../../../../../../java/lang/System';
import Envelope from '../../../geom/Envelope';
export default function BufferResultValidator() {
	this.input = null;
	this.distance = null;
	this.result = null;
	this._isValid = true;
	this.errorMsg = null;
	this.errorLocation = null;
	this.errorIndicator = null;
	let input = arguments[0], distance = arguments[1], result = arguments[2];
	this.input = input;
	this.distance = distance;
	this.result = result;
}
extend(BufferResultValidator.prototype, {
	isValid: function () {
		this.checkPolygonal();
		if (!this._isValid) return this._isValid;
		this.checkExpectedEmpty();
		if (!this._isValid) return this._isValid;
		this.checkEnvelope();
		if (!this._isValid) return this._isValid;
		this.checkArea();
		if (!this._isValid) return this._isValid;
		this.checkDistance();
		return this._isValid;
	},
	checkEnvelope: function () {
		if (this.distance < 0.0) return null;
		var padding = this.distance * BufferResultValidator.MAX_ENV_DIFF_FRAC;
		if (padding === 0.0) padding = 0.001;
		var expectedEnv = new Envelope(this.input.getEnvelopeInternal());
		expectedEnv.expandBy(this.distance);
		var bufEnv = new Envelope(this.result.getEnvelopeInternal());
		bufEnv.expandBy(padding);
		if (!bufEnv.contains(expectedEnv)) {
			this._isValid = false;
			this.errorMsg = "Buffer envelope is incorrect";
			this.errorIndicator = this.input.getFactory().toGeometry(bufEnv);
		}
		this.report("Envelope");
	},
	checkDistance: function () {
		var distValid = new BufferDistanceValidator(this.input, this.distance, this.result);
		if (!distValid.isValid()) {
			this._isValid = false;
			this.errorMsg = distValid.getErrorMessage();
			this.errorLocation = distValid.getErrorLocation();
			this.errorIndicator = distValid.getErrorIndicator();
		}
		this.report("Distance");
	},
	checkArea: function () {
		var inputArea = this.input.getArea();
		var resultArea = this.result.getArea();
		if (this.distance > 0.0 && inputArea > resultArea) {
			this._isValid = false;
			this.errorMsg = "Area of positive buffer is smaller than input";
			this.errorIndicator = this.result;
		}
		if (this.distance < 0.0 && inputArea < resultArea) {
			this._isValid = false;
			this.errorMsg = "Area of negative buffer is larger than input";
			this.errorIndicator = this.result;
		}
		this.report("Area");
	},
	checkPolygonal: function () {
		if (!(this.result instanceof Polygon || this.result instanceof MultiPolygon)) this._isValid = false;
		this.errorMsg = "Result is not polygonal";
		this.errorIndicator = this.result;
		this.report("Polygonal");
	},
	getErrorIndicator: function () {
		return this.errorIndicator;
	},
	getErrorLocation: function () {
		return this.errorLocation;
	},
	checkExpectedEmpty: function () {
		if (this.input.getDimension() >= 2) return null;
		if (this.distance > 0.0) return null;
		if (!this.result.isEmpty()) {
			this._isValid = false;
			this.errorMsg = "Result is non-empty";
			this.errorIndicator = this.result;
		}
		this.report("ExpectedEmpty");
	},
	report: function (checkName) {
		if (!BufferResultValidator.VERBOSE) return null;
		System.out.println("Check " + checkName + ": " + (this._isValid ? "passed" : "FAILED"));
	},
	getErrorMessage: function () {
		return this.errorMsg;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BufferResultValidator;
	}
});
BufferResultValidator.isValidMsg = function (g, distance, result) {
	var validator = new BufferResultValidator(g, distance, result);
	if (!validator.isValid()) return validator.getErrorMessage();
	return null;
};
BufferResultValidator.isValid = function (g, distance, result) {
	var validator = new BufferResultValidator(g, distance, result);
	if (validator.isValid()) return true;
	return false;
};
BufferResultValidator.VERBOSE = false;
BufferResultValidator.MAX_ENV_DIFF_FRAC = .012;

