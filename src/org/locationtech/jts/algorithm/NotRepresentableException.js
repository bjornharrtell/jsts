import extend from '../../../../extend';
import Exception from '../../../../java/lang/Exception';
import inherits from '../../../../inherits';
export default function NotRepresentableException() {
	Exception.call(this, "Projective point not representable on the Cartesian plane.");
}
inherits(NotRepresentableException, Exception);
extend(NotRepresentableException.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NotRepresentableException;
	}
});

