import StringBuffer from '../../../../java/lang/StringBuffer';
import Location from '../geom/Location';
import Position from './Position';
export default class TopologyLocation {
	constructor(...args) {
		this.location = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Array) {
						return ((...args) => {
							let [location] = args;
							this.init(location.length);
						})(...args);
					} else if (Number.isInteger(args[0])) {
						return ((...args) => {
							let [on] = args;
							this.init(1);
							this.location[Position.ON] = on;
						})(...args);
					} else if (args[0] instanceof TopologyLocation) {
						return ((...args) => {
							let [gl] = args;
							this.init(gl.location.length);
							if (gl !== null) {
								for (var i = 0; i < this.location.length; i++) {
									this.location[i] = gl.location[i];
								}
							}
						})(...args);
					}
				case 3:
					return ((...args) => {
						let [on, left, right] = args;
						this.init(3);
						this.location[Position.ON] = on;
						this.location[Position.LEFT] = left;
						this.location[Position.RIGHT] = right;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	setAllLocations(locValue) {
		for (var i = 0; i < this.location.length; i++) {
			this.location[i] = locValue;
		}
	}
	isNull() {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] !== Location.NONE) return false;
		}
		return true;
	}
	setAllLocationsIfNull(locValue) {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE) this.location[i] = locValue;
		}
	}
	isLine() {
		return this.location.length === 1;
	}
	merge(gl) {
		if (gl.location.length > this.location.length) {
			var newLoc = new Array(3);
			newLoc[Position.ON] = this.location[Position.ON];
			newLoc[Position.LEFT] = Location.NONE;
			newLoc[Position.RIGHT] = Location.NONE;
			this.location = newLoc;
		}
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE && i < gl.location.length) this.location[i] = gl.location[i];
		}
	}
	getLocations() {
		return this.location;
	}
	flip() {
		if (this.location.length <= 1) return null;
		var temp = this.location[Position.LEFT];
		this.location[Position.LEFT] = this.location[Position.RIGHT];
		this.location[Position.RIGHT] = temp;
	}
	toString() {
		var buf = new StringBuffer();
		if (this.location.length > 1) buf.append(Location.toLocationSymbol(this.location[Position.LEFT]));
		buf.append(Location.toLocationSymbol(this.location[Position.ON]));
		if (this.location.length > 1) buf.append(Location.toLocationSymbol(this.location[Position.RIGHT]));
		return buf.toString();
	}
	setLocations(on, left, right) {
		this.location[Position.ON] = on;
		this.location[Position.LEFT] = left;
		this.location[Position.RIGHT] = right;
	}
	get(posIndex) {
		if (posIndex < this.location.length) return this.location[posIndex];
		return Location.NONE;
	}
	isArea() {
		return this.location.length > 1;
	}
	isAnyNull() {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE) return true;
		}
		return false;
	}
	setLocation(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [locValue] = args;
					this.setLocation(Position.ON, locValue);
				})(...args);
			case 2:
				return ((...args) => {
					let [locIndex, locValue] = args;
					this.location[locIndex] = locValue;
				})(...args);
		}
	}
	init(size) {
		this.location = new Array(size);
		this.setAllLocations(Location.NONE);
	}
	isEqualOnSide(le, locIndex) {
		return this.location[locIndex] === le.location[locIndex];
	}
	allPositionsEqual(loc) {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] !== loc) return false;
		}
		return true;
	}
	getClass() {
		return TopologyLocation;
	}
}

