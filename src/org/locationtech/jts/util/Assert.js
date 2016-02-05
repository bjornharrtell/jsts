import AssertionFailedException from './AssertionFailedException';
export default class Assert {
	get interfaces_() {
		return [];
	}
	static shouldNeverReachHere(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						Assert.shouldNeverReachHere(null);
					})(...args);
				case 1:
					return ((...args) => {
						let [message] = args;
						throw new AssertionFailedException("Should never reach here" + (message !== null ? ": " + message : ""));
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	static isTrue(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [assertion] = args;
						Assert.isTrue(assertion, null);
					})(...args);
				case 2:
					return ((...args) => {
						let [assertion, message] = args;
						if (!assertion) {
							if (message === null) {
								throw new AssertionFailedException();
							} else {
								throw new AssertionFailedException(message);
							}
						}
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	static equals(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [expectedValue, actualValue] = args;
						Assert.equals(expectedValue, actualValue, null);
					})(...args);
				case 3:
					return ((...args) => {
						let [expectedValue, actualValue, message] = args;
						if (!actualValue.equals(expectedValue)) {
							throw new AssertionFailedException("Expected " + expectedValue + " but encountered " + actualValue + (message !== null ? ": " + message : ""));
						}
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return Assert;
	}
}

