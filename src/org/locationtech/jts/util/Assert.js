import extend from '../../../../extend';
import AssertionFailedException from './AssertionFailedException';
export default function Assert() {}
extend(Assert.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Assert;
	}
});
Assert.shouldNeverReachHere = function () {
	if (arguments.length === 0) {
		Assert.shouldNeverReachHere(null);
	} else if (arguments.length === 1) {
		let message = arguments[0];
		throw new AssertionFailedException("Should never reach here" + (message !== null ? ": " + message : ""));
	}
};
Assert.isTrue = function () {
	if (arguments.length === 1) {
		let assertion = arguments[0];
		Assert.isTrue(assertion, null);
	} else if (arguments.length === 2) {
		let assertion = arguments[0], message = arguments[1];
		if (!assertion) {
			if (message === null) {
				throw new AssertionFailedException();
			} else {
				throw new AssertionFailedException(message);
			}
		}
	}
};
Assert.equals = function () {
	if (arguments.length === 2) {
		let expectedValue = arguments[0], actualValue = arguments[1];
		Assert.equals(expectedValue, actualValue, null);
	} else if (arguments.length === 3) {
		let expectedValue = arguments[0], actualValue = arguments[1], message = arguments[2];
		if (!actualValue.equals(expectedValue)) {
			throw new AssertionFailedException("Expected " + expectedValue + " but encountered " + actualValue + (message !== null ? ": " + message : ""));
		}
	}
};

