import Location from '../geom/Location';
import Position from './Position';
export default class Depth {
	constructor(...args) {
		this.depth = Array(2).fill().map(() => Array(3));
		if (args.length === 0) {
			let [] = args;
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 3; j++) {
					this.depth[i][j] = Depth.NULL_VALUE;
				}
			}
		}
	}
	get interfaces_() {
		return [];
	}
	static depthAtLocation(location) {
		if (location === Location.EXTERIOR) return 0;
		if (location === Location.INTERIOR) return 1;
		return Depth.NULL_VALUE;
	}
	getDepth(geomIndex, posIndex) {
		return this.depth[geomIndex][posIndex];
	}
	setDepth(geomIndex, posIndex, depthValue) {
		this.depth[geomIndex][posIndex] = depthValue;
	}
	isNull(...args) {
		if (args.length === 0) {
			let [] = args;
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 3; j++) {
					if (this.depth[i][j] !== Depth.NULL_VALUE) return false;
				}
			}
			return true;
		} else if (args.length === 1) {
			let [geomIndex] = args;
			return this.depth[geomIndex][1] === Depth.NULL_VALUE;
		} else if (args.length === 2) {
			let [geomIndex, posIndex] = args;
			return this.depth[geomIndex][posIndex] === Depth.NULL_VALUE;
		}
	}
	normalize() {
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
	}
	getDelta(geomIndex) {
		return this.depth[geomIndex][Position.RIGHT] - this.depth[geomIndex][Position.LEFT];
	}
	getLocation(geomIndex, posIndex) {
		if (this.depth[geomIndex][posIndex] <= 0) return Location.EXTERIOR;
		return Location.INTERIOR;
	}
	toString() {
		return "A: " + this.depth[0][1] + "," + this.depth[0][2] + " B: " + this.depth[1][1] + "," + this.depth[1][2];
	}
	add(...args) {
		if (args.length === 1) {
			let [lbl] = args;
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
		} else if (args.length === 3) {
			let [geomIndex, posIndex, location] = args;
			if (location === Location.INTERIOR) this.depth[geomIndex][posIndex]++;
		}
	}
	getClass() {
		return Depth;
	}
}
Depth.NULL_VALUE = -1;

