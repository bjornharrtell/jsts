import Coordinate from './Coordinate';
import RuntimeException from '../../../../java/lang/RuntimeException';
export default class TopologyException extends RuntimeException {
	constructor() {
		if (arguments.length === 1) {
			let msg = arguments[0];
			super(msg)
			RuntimeException.call(this, msg);
		} else if (arguments.length === 2) {
			let msg = arguments[0], pt = arguments[1];
			super(TopologyException.msgWithCoord(msg, pt))
			this.name = 'TopologyException';
			this.pt = new Coordinate(pt);
		}
	}
	getCoordinate() {
		return this.pt;
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return TopologyException;
	}
	static msgWithCoord (msg, pt) {
		if (pt !== null) return msg + " [ " + pt + " ]";
		return msg;
	}
}