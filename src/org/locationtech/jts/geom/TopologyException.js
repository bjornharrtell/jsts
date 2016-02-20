import Coordinate from './Coordinate';
import extend from '../../../../extend';
import RuntimeException from '../../../../java/lang/RuntimeException';
import inherits from '../../../../inherits';
export default function TopologyException() {
	this.pt = null;
	if (arguments.length === 1) {
		let msg = arguments[0];
		RuntimeException.call(this, msg);
	} else if (arguments.length === 2) {
		let msg = arguments[0], pt = arguments[1];
		RuntimeException.call(this, TopologyException.msgWithCoord(msg, pt));
		this.pt = new Coordinate(pt);
	}
}
inherits(TopologyException, RuntimeException);
extend(TopologyException.prototype, {
	getCoordinate: function () {
		return this.pt;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TopologyException;
	}
});
TopologyException.msgWithCoord = function (msg, pt) {
	if (pt !== null) return msg + " [ " + pt + " ]";
	return msg;
};

