import WKTWriter from '../../io/WKTWriter';
import Coordinate from '../../geom/Coordinate';
import Double from '../../../../../java/lang/Double';
export default class PointPairDistance {
	constructor(...args) {
		this.pt = [new Coordinate(), new Coordinate()];
		this.distance = Double.NaN;
		this.isNull = true;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	getCoordinates() {
		return this.pt;
	}
	getCoordinate(i) {
		return this.pt[i];
	}
	setMinimum(...args) {
		if (args.length === 1) {
			let [ptDist] = args;
			this.setMinimum(ptDist.pt[0], ptDist.pt[1]);
		} else if (args.length === 2) {
			let [p0, p1] = args;
			if (this.isNull) {
				this.initialize(p0, p1);
				return null;
			}
			var dist = p0.distance(p1);
			if (dist < this.distance) this.initialize(p0, p1, dist);
		}
	}
	initialize(...args) {
		if (args.length === 0) {
			let [] = args;
			this.isNull = true;
		} else if (args.length === 2) {
			let [p0, p1] = args;
			this.pt[0].setCoordinate(p0);
			this.pt[1].setCoordinate(p1);
			this.distance = p0.distance(p1);
			this.isNull = false;
		} else if (args.length === 3) {
			let [p0, p1, distance] = args;
			this.pt[0].setCoordinate(p0);
			this.pt[1].setCoordinate(p1);
			this.distance = distance;
			this.isNull = false;
		}
	}
	toString() {
		return WKTWriter.toLineString(this.pt[0], this.pt[1]);
	}
	getDistance() {
		return this.distance;
	}
	setMaximum(...args) {
		if (args.length === 1) {
			let [ptDist] = args;
			this.setMaximum(ptDist.pt[0], ptDist.pt[1]);
		} else if (args.length === 2) {
			let [p0, p1] = args;
			if (this.isNull) {
				this.initialize(p0, p1);
				return null;
			}
			var dist = p0.distance(p1);
			if (dist > this.distance) this.initialize(p0, p1, dist);
		}
	}
	getClass() {
		return PointPairDistance;
	}
}

