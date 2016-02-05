import RuntimeException from '../../../../java/lang/RuntimeException';
export default class AssertionFailedException extends RuntimeException {
	constructor(...args) {
		super();
		(() => {})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						super();
					})(...args);
				case 1:
					return ((...args) => {
						let [message] = args;
						super(message);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return AssertionFailedException;
	}
}

