import WKTWriter from '../io/WKTWriter';
import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import RuntimeException from '../../../../java/lang/RuntimeException';
import inherits from '../../../../inherits';
export default function ConstraintEnforcementException() {
	this.pt = null;
	if (arguments.length === 1) {
		let msg = arguments[0];
		RuntimeException.call(this, msg);
	} else if (arguments.length === 2) {
		let msg = arguments[0], pt = arguments[1];
		RuntimeException.call(this, ConstraintEnforcementException.msgWithCoord(msg, pt));
		this.pt = new Coordinate(pt);
	}
}
inherits(ConstraintEnforcementException, RuntimeException);
extend(ConstraintEnforcementException.prototype, {
	getCoordinate: function () {
		return this.pt;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConstraintEnforcementException;
	}
});
ConstraintEnforcementException.msgWithCoord = function (msg, pt) {
	if (pt !== null) return msg + " [ " + WKTWriter.toPoint(pt) + " ]";
	return msg;
};
ConstraintEnforcementException.serialVersionUID = 386496846550080140;

