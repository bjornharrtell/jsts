import Exception from '../../../../../java/lang/Exception';
export default class NoninvertibleTransformationException extends Exception {
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
					let [msg] = args;
					super(msg);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return NoninvertibleTransformationException;
	}
}

