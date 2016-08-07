import Location from '../geom/Location';
import Position from './Position';
import extend from '../../../../extend';
export default function Depth() {
	this.depth = Array(2).fill().map(() => Array(3));
	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < 3; j++) {
			this.depth[i][j] = Depth.NULL_VALUE;
		}
	}
}
extend(Depth.prototype, {
	getDepth: function (geomIndex, posIndex) {
		return this.depth[geomIndex][posIndex];
	},
	setDepth: function (geomIndex, posIndex, depthValue) {
		this.depth[geomIndex][posIndex] = depthValue;
	},
	isNull: function () {
		if (arguments.length === 0) {
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 3; j++) {
					if (this.depth[i][j] !== Depth.NULL_VALUE) return false;
				}
			}
			return true;
		} else if (arguments.length === 1) {
			let geomIndex = arguments[0];
			return this.depth[geomIndex][1] === Depth.NULL_VALUE;
		} else if (arguments.length === 2) {
			let geomIndex = arguments[0], posIndex = arguments[1];
			return this.depth[geomIndex][posIndex] === Depth.NULL_VALUE;
		}
	},
	normalize: function () {
		for (var i = 0; i < 2; i++) {
			if (!this.isNull(i)) {
				var minDepth = this.depth[i][1];
				if (this.depth[i][2] < minDepth) minDepth = this.depth[i][2];
				if (minDepth < 0) minDepth = 0;
				for (var j = 1; j < 3; j++) {
					var newValue = 0;
					if (this.depth[i][j] > minDepth) newValue = 1;
					this.depth[i][j] = newValue;
				}
			}
		}
	},
	getDelta: function (geomIndex) {
		return this.depth[geomIndex][Position.RIGHT] - this.depth[geomIndex][Position.LEFT];
	},
	getLocation: function (geomIndex, posIndex) {
		if (this.depth[geomIndex][posIndex] <= 0) return Location.EXTERIOR;
		return Location.INTERIOR;
	},
	toString: function () {
		return "A: " + this.depth[0][1] + "," + this.depth[0][2] + " B: " + this.depth[1][1] + "," + this.depth[1][2];
	},
	add: function () {
		if (arguments.length === 1) {
			let lbl = arguments[0];
			for (var i = 0; i < 2; i++) {
				for (var j = 1; j < 3; j++) {
					var loc = lbl.getLocation(i, j);
					if (loc === Location.EXTERIOR || loc === Location.INTERIOR) {
						if (this.isNull(i, j)) {
							this.depth[i][j] = Depth.depthAtLocation(loc);
						} else this.depth[i][j] += Depth.depthAtLocation(loc);
					}
				}
			}
		} else if (arguments.length === 3) {
			let geomIndex = arguments[0], posIndex = arguments[1], location = arguments[2];
			if (location === Location.INTERIOR) this.depth[geomIndex][posIndex]++;
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Depth;
	}
});
Depth.depthAtLocation = function (location) {
	if (location === Location.EXTERIOR) return 0;
	if (location === Location.INTERIOR) return 1;
	return Depth.NULL_VALUE;
};
Depth.NULL_VALUE = -1;
