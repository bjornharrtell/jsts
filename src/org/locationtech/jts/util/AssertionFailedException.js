import extend from '../../../../extend';
import RuntimeException from '../../../../java/lang/RuntimeException';
import inherits from '../../../../inherits';
export default function AssertionFailedException() {
	if (arguments.length === 0) {
		RuntimeException.call(this);
	} else if (arguments.length === 1) {
		let message = arguments[0];
		RuntimeException.call(this, message);
	}
}
inherits(AssertionFailedException, RuntimeException);
extend(AssertionFailedException.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return AssertionFailedException;
	}
});

