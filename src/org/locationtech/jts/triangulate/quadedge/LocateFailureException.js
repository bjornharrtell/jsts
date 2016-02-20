import extend from '../../../../../extend';
import LineSegment from '../../geom/LineSegment';
import RuntimeException from '../../../../../java/lang/RuntimeException';
import inherits from '../../../../../inherits';
export default function LocateFailureException() {
	this.seg = null;
	if (arguments.length === 1) {
		if (typeof arguments[0] === "string") {
			let msg = arguments[0];
			RuntimeException.call(this, msg);
		} else if (arguments[0] instanceof LineSegment) {
			let seg = arguments[0];
			RuntimeException.call(this, "Locate failed to converge (at edge: " + seg + ").  Possible causes include invalid Subdivision topology or very close sites");
			this.seg = new LineSegment(seg);
		}
	} else if (arguments.length === 2) {
		let msg = arguments[0], seg = arguments[1];
		RuntimeException.call(this, LocateFailureException.msgWithSpatial(msg, seg));
		this.seg = new LineSegment(seg);
	}
}
inherits(LocateFailureException, RuntimeException);
extend(LocateFailureException.prototype, {
	getSegment: function () {
		return this.seg;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LocateFailureException;
	}
});
LocateFailureException.msgWithSpatial = function (msg, seg) {
	if (seg !== null) return msg + " [ " + seg + " ]";
	return msg;
};

