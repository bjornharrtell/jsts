import Coordinate from '../../../geom/Coordinate';
import Double from '../../../../../../java/lang/Double';
export default class PointPairDistance {
	constructor(...args) {
		this.pt = [new Coordinate(), new Coordinate()];
		this.distance = Double.NaN;
		this.isNull = true;
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
				})(...args);
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
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [ptDist] = args;
					this.setMinimum(ptDist.pt[0], ptDist.pt[1]);
				})(...args);
			case 2:
				return ((...args) => {
					let [p0, p1] = args;
					if (this.isNull) {
						this.initialize(p0, p1);
						return null;
					}
					var dist = p0.distance(p1);
					if (dist < this.distance) this.initialize(p0, p1, dist);
				})(...args);
		}
	}
	initialize(...args) {
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
					this.isNull = true;
				})(...args);
			case 2:
				return ((...args) => {
					let [p0, p1] = args;
					this.pt[0].setCoordinate(p0);
					this.pt[1].setCoordinate(p1);
					this.distance = p0.distance(p1);
					this.isNull = false;
				})(...args);
			case 3:
				return ((...args) => {
					let [p0, p1, distance] = args;
					this.pt[0].setCoordinate(p0);
					this.pt[1].setCoordinate(p1);
					this.distance = distance;
					this.isNull = false;
				})(...args);
		}
	}
	getDistance() {
		return this.distance;
	}
	setMaximum(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [ptDist] = args;
					this.setMaximum(ptDist.pt[0], ptDist.pt[1]);
				})(...args);
			case 2:
				return ((...args) => {
					let [p0, p1] = args;
					if (this.isNull) {
						this.initialize(p0, p1);
						return null;
					}
					var dist = p0.distance(p1);
					if (dist > this.distance) this.initialize(p0, p1, dist);
				})(...args);
		}
	}
	getClass() {
		return PointPairDistance;
	}
}

