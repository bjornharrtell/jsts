import LineSegment from '../../geom/LineSegment';
import RuntimeException from '../../../../../java/lang/RuntimeException';
export default class LocateFailureException extends RuntimeException {
	constructor(...args) {
		super();
		this.seg = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (typeof args[0] === "string") {
						return ((...args) => {
							let [msg] = args;
							super(msg);
						})(...args);
					} else if (args[0] instanceof LineSegment) {
						return ((...args) => {
							let [seg] = args;
							super("Locate failed to converge (at edge: " + seg + ").  Possible causes include invalid Subdivision topology or very close sites");
							this.seg = new LineSegment(seg);
						})(...args);
					}
				case 2:
					return ((...args) => {
						let [msg, seg] = args;
						super(LocateFailureException.msgWithSpatial(msg, seg));
						this.seg = new LineSegment(seg);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static msgWithSpatial(msg, seg) {
		if (seg !== null) return msg + " [ " + seg + " ]";
		return msg;
	}
	getSegment() {
		return this.seg;
	}
	getClass() {
		return LocateFailureException;
	}
}

