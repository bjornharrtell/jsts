import CGAlgorithms from './CGAlgorithms';
import PointInRing from './PointInRing';
export default class SimplePointInRing {
	constructor(...args) {
		this.pts = null;
		if (args.length === 1) {
			let [ring] = args;
			this.pts = ring.getCoordinates();
		}
	}
	get interfaces_() {
		return [PointInRing];
	}
	isInside(pt) {
		return CGAlgorithms.isPointInRing(pt, this.pts);
	}
	getClass() {
		return SimplePointInRing;
	}
}

