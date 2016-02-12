import RuntimeException from '../../../../java/lang/RuntimeException';
export default class AssertionFailedException extends RuntimeException {
	constructor(...args) {
		super();
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
					super();
				})(...args);
			} else if (args.length === 1) {
				return ((...args) => {
					let [message] = args;
					super(message);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return AssertionFailedException;
	}
}

