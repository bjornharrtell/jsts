import RuntimeException from '../../../../java/lang/RuntimeException';
export default class AssertionFailedException extends RuntimeException {
	constructor() {
		super();
		AssertionFailedException.constructor_.apply(this, arguments);
	}
	getClass() {
		return AssertionFailedException;
	}
	get interfaces_() {
		return [];
	}
}
AssertionFailedException.constructor_ = function () {
	if (arguments.length === 0) {
		RuntimeException.constructor_.call(this);
	} else if (arguments.length === 1) {
		let message = arguments[0];
		RuntimeException.constructor_.call(this, message);
	}
};
