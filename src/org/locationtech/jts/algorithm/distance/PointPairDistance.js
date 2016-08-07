import WKTWriter from '../../io/WKTWriter';
import Coordinate from '../../geom/Coordinate';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
export default function PointPairDistance() {
	this.pt = [new Coordinate(), new Coordinate()];
	this.distance = Double.NaN;
	this.isNull = true;
}
extend(PointPairDistance.prototype, {
	getCoordinates: function () {
		return this.pt;
	},
	getCoordinate: function (i) {
		return this.pt[i];
	},
	setMinimum: function () {
		if (arguments.length === 1) {
			let ptDist = arguments[0];
			this.setMinimum(ptDist.pt[0], ptDist.pt[1]);
		} else if (arguments.length === 2) {
			let p0 = arguments[0], p1 = arguments[1];
			if (this.isNull) {
				this.initialize(p0, p1);
				return null;
			}
			var dist = p0.distance(p1);
			if (dist < this.distance) this.initialize(p0, p1, dist);
		}
	},
	initialize: function () {
		if (arguments.length === 0) {
			this.isNull = true;
		} else if (arguments.length === 2) {
			let p0 = arguments[0], p1 = arguments[1];
			this.pt[0].setCoordinate(p0);
			this.pt[1].setCoordinate(p1);
			this.distance = p0.distance(p1);
			this.isNull = false;
		} else if (arguments.length === 3) {
			let p0 = arguments[0], p1 = arguments[1], distance = arguments[2];
			this.pt[0].setCoordinate(p0);
			this.pt[1].setCoordinate(p1);
			this.distance = distance;
			this.isNull = false;
		}
	},
	toString: function () {
		return WKTWriter.toLineString(this.pt[0], this.pt[1]);
	},
	getDistance: function () {
		return this.distance;
	},
	setMaximum: function () {
		if (arguments.length === 1) {
			let ptDist = arguments[0];
			this.setMaximum(ptDist.pt[0], ptDist.pt[1]);
		} else if (arguments.length === 2) {
			let p0 = arguments[0], p1 = arguments[1];
			if (this.isNull) {
				this.initialize(p0, p1);
				return null;
			}
			var dist = p0.distance(p1);
			if (dist > this.distance) this.initialize(p0, p1, dist);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PointPairDistance;
	}
});
