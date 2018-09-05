import Location from '../geom/Location';
import Position from './Position';
export default class Depth {
	constructor() {
		Depth.constructor_.apply(this, arguments);
	}
	static depthAtLocation(location) {
		if (location === Location.EXTERIOR) return 0;
		if (location === Location.INTERIOR) return 1;
		return Depth.NULL_VALUE;
	}
	getDepth(geomIndex, posIndex) {
		return this._depth[geomIndex][posIndex];
	}
	setDepth(geomIndex, posIndex, depthValue) {
		this._depth[geomIndex][posIndex] = depthValue;
	}
	isNull() {
		if (arguments.length === 0) {
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 3; j++) {
					if (this._depth[i][j] !== Depth.NULL_VALUE) return false;
				}
			}
			return true;
		} else if (arguments.length === 1) {
			let geomIndex = arguments[0];
			return this._depth[geomIndex][1] === Depth.NULL_VALUE;
		} else if (arguments.length === 2) {
			let geomIndex = arguments[0], posIndex = arguments[1];
			return this._depth[geomIndex][posIndex] === Depth.NULL_VALUE;
		}
	}
	normalize() {
		for (var i = 0; i < 2; i++) {
			if (!this.isNull(i)) {
				var minDepth = this._depth[i][1];
				if (this._depth[i][2] < minDepth) minDepth = this._depth[i][2];
				if (minDepth < 0) minDepth = 0;
				for (var j = 1; j < 3; j++) {
					var newValue = 0;
					if (this._depth[i][j] > minDepth) newValue = 1;
					this._depth[i][j] = newValue;
				}
			}
		}
	}
	getDelta(geomIndex) {
		return this._depth[geomIndex][Position.RIGHT] - this._depth[geomIndex][Position.LEFT];
	}
	getLocation(geomIndex, posIndex) {
		if (this._depth[geomIndex][posIndex] <= 0) return Location.EXTERIOR;
		return Location.INTERIOR;
	}
	toString() {
		return "A: " + this._depth[0][1] + "," + this._depth[0][2] + " B: " + this._depth[1][1] + "," + this._depth[1][2];
	}
	add() {
		if (arguments.length === 1) {
			let lbl = arguments[0];
			for (var i = 0; i < 2; i++) {
				for (var j = 1; j < 3; j++) {
					var loc = lbl.getLocation(i, j);
					if (loc === Location.EXTERIOR || loc === Location.INTERIOR) {
						if (this.isNull(i, j)) {
							this._depth[i][j] = Depth.depthAtLocation(loc);
						} else this._depth[i][j] += Depth.depthAtLocation(loc);
					}
				}
			}
		} else if (arguments.length === 3) {
			let geomIndex = arguments[0], posIndex = arguments[1], location = arguments[2];
			if (location === Location.INTERIOR) this._depth[geomIndex][posIndex]++;
		}
	}
	getClass() {
		return Depth;
	}
	get interfaces_() {
		return [];
	}
}
Depth.constructor_ = function () {
	this._depth = Array(2).fill().map(() => Array(3));
	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < 3; j++) {
			this._depth[i][j] = Depth.NULL_VALUE;
		}
	}
};
Depth.NULL_VALUE = -1;
