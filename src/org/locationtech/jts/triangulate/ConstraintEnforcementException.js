import WKTWriter from '../io/WKTWriter';
import Coordinate from '../geom/Coordinate';
import RuntimeException from '../../../../java/lang/RuntimeException';
export default class ConstraintEnforcementException extends RuntimeException {
	constructor() {
		super();
		ConstraintEnforcementException.constructor_.apply(this, arguments);
	}
	static msgWithCoord(msg, pt) {
		if (pt !== null) return msg + " [ " + WKTWriter.toPoint(pt) + " ]";
		return msg;
	}
	getCoordinate() {
		return this._pt;
	}
	getClass() {
		return ConstraintEnforcementException;
	}
	get interfaces_() {
		return [];
	}
}
ConstraintEnforcementException.constructor_ = function () {
	this._pt = null;
	if (arguments.length === 1) {
		let msg = arguments[0];
		RuntimeException.constructor_.call(this, msg);
	} else if (arguments.length === 2) {
		let msg = arguments[0], pt = arguments[1];
		RuntimeException.constructor_.call(this, ConstraintEnforcementException.msgWithCoord(msg, pt));
		this._pt = new Coordinate(pt);
	}
};
ConstraintEnforcementException.serialVersionUID = 386496846550080140;
