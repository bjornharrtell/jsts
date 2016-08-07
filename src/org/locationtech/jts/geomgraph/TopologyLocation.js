import StringBuffer from '../../../../java/lang/StringBuffer';
import Location from '../geom/Location';
import Position from './Position';
import extend from '../../../../extend';
export default function TopologyLocation() {
	this.location = null;
	if (arguments.length === 1) {
		if (arguments[0] instanceof Array) {
			let location = arguments[0];
			this.init(location.length);
		} else if (Number.isInteger(arguments[0])) {
			let on = arguments[0];
			this.init(1);
			this.location[Position.ON] = on;
		} else if (arguments[0] instanceof TopologyLocation) {
			let gl = arguments[0];
			this.init(gl.location.length);
			if (gl !== null) {
				for (var i = 0; i < this.location.length; i++) {
					this.location[i] = gl.location[i];
				}
			}
		}
	} else if (arguments.length === 3) {
		let on = arguments[0], left = arguments[1], right = arguments[2];
		this.init(3);
		this.location[Position.ON] = on;
		this.location[Position.LEFT] = left;
		this.location[Position.RIGHT] = right;
	}
}
extend(TopologyLocation.prototype, {
	setAllLocations: function (locValue) {
		for (var i = 0; i < this.location.length; i++) {
			this.location[i] = locValue;
		}
	},
	isNull: function () {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] !== Location.NONE) return false;
		}
		return true;
	},
	setAllLocationsIfNull: function (locValue) {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE) this.location[i] = locValue;
		}
	},
	isLine: function () {
		return this.location.length === 1;
	},
	merge: function (gl) {
		if (gl.location.length > this.location.length) {
			var newLoc = new Array(3).fill(null);
			newLoc[Position.ON] = this.location[Position.ON];
			newLoc[Position.LEFT] = Location.NONE;
			newLoc[Position.RIGHT] = Location.NONE;
			this.location = newLoc;
		}
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE && i < gl.location.length) this.location[i] = gl.location[i];
		}
	},
	getLocations: function () {
		return this.location;
	},
	flip: function () {
		if (this.location.length <= 1) return null;
		var temp = this.location[Position.LEFT];
		this.location[Position.LEFT] = this.location[Position.RIGHT];
		this.location[Position.RIGHT] = temp;
	},
	toString: function () {
		var buf = new StringBuffer();
		if (this.location.length > 1) buf.append(Location.toLocationSymbol(this.location[Position.LEFT]));
		buf.append(Location.toLocationSymbol(this.location[Position.ON]));
		if (this.location.length > 1) buf.append(Location.toLocationSymbol(this.location[Position.RIGHT]));
		return buf.toString();
	},
	setLocations: function (on, left, right) {
		this.location[Position.ON] = on;
		this.location[Position.LEFT] = left;
		this.location[Position.RIGHT] = right;
	},
	get: function (posIndex) {
		if (posIndex < this.location.length) return this.location[posIndex];
		return Location.NONE;
	},
	isArea: function () {
		return this.location.length > 1;
	},
	isAnyNull: function () {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE) return true;
		}
		return false;
	},
	setLocation: function () {
		if (arguments.length === 1) {
			let locValue = arguments[0];
			this.setLocation(Position.ON, locValue);
		} else if (arguments.length === 2) {
			let locIndex = arguments[0], locValue = arguments[1];
			this.location[locIndex] = locValue;
		}
	},
	init: function (size) {
		this.location = new Array(size).fill(null);
		this.setAllLocations(Location.NONE);
	},
	isEqualOnSide: function (le, locIndex) {
		return this.location[locIndex] === le.location[locIndex];
	},
	allPositionsEqual: function (loc) {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] !== loc) return false;
		}
		return true;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TopologyLocation;
	}
});
