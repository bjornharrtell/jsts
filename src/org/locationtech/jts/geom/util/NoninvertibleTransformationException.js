import extend from '../../../../../extend';
import Exception from '../../../../../java/lang/Exception';
import inherits from '../../../../../inherits';
export default function NoninvertibleTransformationException() {
	if (arguments.length === 0) {
		Exception.call(this);
	} else if (arguments.length === 1) {
		let msg = arguments[0];
		Exception.call(this, msg);
	}
}
inherits(NoninvertibleTransformationException, Exception);
extend(NoninvertibleTransformationException.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NoninvertibleTransformationException;
	}
});

