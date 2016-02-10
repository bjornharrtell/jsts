import Coordinate from './Coordinate';
import RuntimeException from '../../../../java/lang/RuntimeException';
export default class TopologyException extends RuntimeException {
	constructor(...args) {
		super();
		this.pt = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [msg] = args;
						super(msg);
					})(...args);
				case 2:
					return ((...args) => {
						let [msg, pt] = args;
						super(TopologyException.msgWithCoord(msg, pt));
						this.pt = new Coordinate(pt);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static msgWithCoord(msg, pt) {
		if (pt !== null) return msg + " [ " + pt + " ]";
		return msg;
	}
	getCoordinate() {
		return this.pt;
	}
	getClass() {
		return TopologyException;
	}
}

