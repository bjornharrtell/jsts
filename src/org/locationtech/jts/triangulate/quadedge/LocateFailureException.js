import LineSegment from '../../geom/LineSegment';
import RuntimeException from '../../../../../java/lang/RuntimeException';
export default class LocateFailureException extends RuntimeException {
	constructor() {
		super();
		LocateFailureException.constructor_.apply(this, arguments);
	}
	static msgWithSpatial(msg, seg) {
		if (seg !== null) return msg + " [ " + seg + " ]";
		return msg;
	}
	getSegment() {
		return this._seg;
	}
	getClass() {
		return LocateFailureException;
	}
	get interfaces_() {
		return [];
	}
}
LocateFailureException.constructor_ = function () {
	this._seg = null;
	if (arguments.length === 1) {
		if (typeof arguments[0] === "string") {
			let msg = arguments[0];
			RuntimeException.constructor_.call(this, msg);
		} else if (arguments[0] instanceof LineSegment) {
			let seg = arguments[0];
			RuntimeException.constructor_.call(this, "Locate failed to converge (at edge: " + seg + ").  Possible causes include invalid Subdivision topology or very close sites");
			this._seg = new LineSegment(seg);
		}
	} else if (arguments.length === 2) {
		let msg = arguments[0], seg = arguments[1];
		RuntimeException.constructor_.call(this, LocateFailureException.msgWithSpatial(msg, seg));
		this._seg = new LineSegment(seg);
	}
};
