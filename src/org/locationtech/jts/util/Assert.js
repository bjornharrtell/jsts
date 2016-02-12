import AssertionFailedException from './AssertionFailedException';
export default class Assert {
	get interfaces_() {
		return [];
	}
	static shouldNeverReachHere(...args) {
		switch (args.length) {
			case 0:
				{
					let [] = args;
					Assert.shouldNeverReachHere(null);
					break;
				}
			case 1:
				{
					let [message] = args;
					throw new AssertionFailedException("Should never reach here" + (message !== null ? ": " + message : ""));
					break;
				}
		}
	}
	static isTrue(...args) {
		switch (args.length) {
			case 1:
				{
					let [assertion] = args;
					Assert.isTrue(assertion, null);
					break;
				}
			case 2:
				{
					let [assertion, message] = args;
					if (!assertion) {
						if (message === null) {
							throw new AssertionFailedException();
						} else {
							throw new AssertionFailedException(message);
						}
					}
					break;
				}
		}
	}
	static equals(...args) {
		switch (args.length) {
			case 2:
				{
					let [expectedValue, actualValue] = args;
					Assert.equals(expectedValue, actualValue, null);
					break;
				}
			case 3:
				{
					let [expectedValue, actualValue, message] = args;
					if (!actualValue.equals(expectedValue)) {
						throw new AssertionFailedException("Expected " + expectedValue + " but encountered " + actualValue + (message !== null ? ": " + message : ""));
					}
					break;
				}
		}
	}
	getClass() {
		return Assert;
	}
}

