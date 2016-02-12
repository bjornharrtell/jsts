import WKTWriter from '../io/WKTWriter';
import Coordinate from '../geom/Coordinate';
import RuntimeException from '../../../../java/lang/RuntimeException';
export default class ConstraintEnforcementException extends RuntimeException {
	constructor(...args) {
		super();
		this.pt = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				return ((...args) => {
					let [msg] = args;
					super(msg);
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [msg, pt] = args;
					super(ConstraintEnforcementException.msgWithCoord(msg, pt));
					this.pt = new Coordinate(pt);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static msgWithCoord(msg, pt) {
		if (pt !== null) return msg + " [ " + WKTWriter.toPoint(pt) + " ]";
		return msg;
	}
	getCoordinate() {
		return this.pt;
	}
	getClass() {
		return ConstraintEnforcementException;
	}
}
ConstraintEnforcementException.serialVersionUID = 386496846550080140;

