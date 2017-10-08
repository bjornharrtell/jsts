import Coordinate from '../../../geom/Coordinate';
import Double from '../../../../../../java/lang/Double';
import extend from '../../../../../../extend';
export default function PointPairDistance() {
	this._pt = [new Coordinate(), new Coordinate()];
	this._distance = Double.NaN;
	this._isNull = true;
}
extend(PointPairDistance.prototype, {
	getCoordinates: function () {
		return this._pt;
	},
	getCoordinate: function (i) {
		return this._pt[i];
	},
	setMinimum: function () {
		if (arguments.length === 1) {
			let ptDist = arguments[0];
			this.setMinimum(ptDist._pt[0], ptDist._pt[1]);
		} else if (arguments.length === 2) {
			let p0 = arguments[0], p1 = arguments[1];
			if (this._isNull) {
				this.initialize(p0, p1);
				return null;
			}
			var dist = p0.distance(p1);
			if (dist < this._distance) this.initialize(p0, p1, dist);
		}
	},
	initialize: function () {
		if (arguments.length === 0) {
			this._isNull = true;
		} else if (arguments.length === 2) {
			let p0 = arguments[0], p1 = arguments[1];
			this._pt[0].setCoordinate(p0);
			this._pt[1].setCoordinate(p1);
			this._distance = p0.distance(p1);
			this._isNull = false;
		} else if (arguments.length === 3) {
			let p0 = arguments[0], p1 = arguments[1], distance = arguments[2];
			this._pt[0].setCoordinate(p0);
			this._pt[1].setCoordinate(p1);
			this._distance = distance;
			this._isNull = false;
		}
	},
	getDistance: function () {
		return this._distance;
	},
	setMaximum: function () {
		if (arguments.length === 1) {
			let ptDist = arguments[0];
			this.setMaximum(ptDist._pt[0], ptDist._pt[1]);
		} else if (arguments.length === 2) {
			let p0 = arguments[0], p1 = arguments[1];
			if (this._isNull) {
				this.initialize(p0, p1);
				return null;
			}
			var dist = p0.distance(p1);
			if (dist > this._distance) this.initialize(p0, p1, dist);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PointPairDistance;
	}
});
