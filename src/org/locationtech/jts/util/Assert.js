import AssertionFailedException from './AssertionFailedException';
export default class Assert {
	get interfaces_() {
		return [];
	}
	static shouldNeverReachHere(...args) {
		if (args.length === 0) {
			let [] = args;
			Assert.shouldNeverReachHere(null);
		} else if (args.length === 1) {
			let [message] = args;
			throw new AssertionFailedException("Should never reach here" + (message !== null ? ": " + message : ""));
		}
	}
	static isTrue(...args) {
		if (args.length === 1) {
			let [assertion] = args;
			Assert.isTrue(assertion, null);
		} else if (args.length === 2) {
			let [assertion, message] = args;
			if (!assertion) {
				if (message === null) {
					throw new AssertionFailedException();
				} else {
					throw new AssertionFailedException(message);
				}
			}
		}
	}
	static equals(...args) {
		if (args.length === 2) {
			let [expectedValue, actualValue] = args;
			Assert.equals(expectedValue, actualValue, null);
		} else if (args.length === 3) {
			let [expectedValue, actualValue, message] = args;
			if (!actualValue.equals(expectedValue)) {
				throw new AssertionFailedException("Expected " + expectedValue + " but encountered " + actualValue + (message !== null ? ": " + message : ""));
			}
		}
	}
	getClass() {
		return Assert;
	}
}

