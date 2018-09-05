import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import Coordinate from './Coordinate';
import ArrayList from '../../../../java/util/ArrayList';
export default class CoordinateList extends ArrayList {
	constructor() {
		super();
		CoordinateList.constructor_.apply(this, arguments);
	}
	getCoordinate(i) {
		return this.get(i);
	}
	addAll() {
		if (arguments.length === 2 && (typeof arguments[1] === "boolean" && hasInterface(arguments[0], Collection))) {
			let coll = arguments[0], allowRepeated = arguments[1];
			var isChanged = false;
			for (var i = coll.iterator(); i.hasNext(); ) {
				this.add(i.next(), allowRepeated);
				isChanged = true;
			}
			return isChanged;
		} else return super.addAll.apply(this, arguments);
	}
	clone() {
		var clone = super.clone.call(this);
		for (var i = 0; i < this.size(); i++) {
			clone.add(i, this.get(i).clone());
		}
		return clone;
	}
	toCoordinateArray() {
		return this.toArray(CoordinateList.coordArrayType);
	}
	add() {
		if (arguments.length === 1) {
			let coord = arguments[0];
			super.add.call(this, coord);
		} else if (arguments.length === 2) {
			if (arguments[0] instanceof Array && typeof arguments[1] === "boolean") {
				let coord = arguments[0], allowRepeated = arguments[1];
				this.add(coord, allowRepeated, true);
				return true;
			} else if (arguments[0] instanceof Coordinate && typeof arguments[1] === "boolean") {
				let coord = arguments[0], allowRepeated = arguments[1];
				if (!allowRepeated) {
					if (this.size() >= 1) {
						var last = this.get(this.size() - 1);
						if (last.equals2D(coord)) return null;
					}
				}
				super.add.call(this, coord);
			} else if (arguments[0] instanceof Object && typeof arguments[1] === "boolean") {
				let obj = arguments[0], allowRepeated = arguments[1];
				this.add(obj, allowRepeated);
				return true;
			}
		} else if (arguments.length === 3) {
			if (typeof arguments[2] === "boolean" && (arguments[0] instanceof Array && typeof arguments[1] === "boolean")) {
				let coord = arguments[0], allowRepeated = arguments[1], direction = arguments[2];
				if (direction) {
					for (var i = 0; i < coord.length; i++) {
						this.add(coord[i], allowRepeated);
					}
				} else {
					for (var i = coord.length - 1; i >= 0; i--) {
						this.add(coord[i], allowRepeated);
					}
				}
				return true;
			} else if (typeof arguments[2] === "boolean" && (Number.isInteger(arguments[0]) && arguments[1] instanceof Coordinate)) {
				let i = arguments[0], coord = arguments[1], allowRepeated = arguments[2];
				if (!allowRepeated) {
					var size = this.size();
					if (size > 0) {
						if (i > 0) {
							var prev = this.get(i - 1);
							if (prev.equals2D(coord)) return null;
						}
						if (i < size) {
							var next = this.get(i);
							if (next.equals2D(coord)) return null;
						}
					}
				}
				super.add.call(this, i, coord);
			}
		} else if (arguments.length === 4) {
			let coord = arguments[0], allowRepeated = arguments[1], start = arguments[2], end = arguments[3];
			var inc = 1;
			if (start > end) inc = -1;
			for (var i = start; i !== end; i += inc) {
				this.add(coord[i], allowRepeated);
			}
			return true;
		}
	}
	closeRing() {
		if (this.size() > 0) this.add(new Coordinate(this.get(0)), false);
	}
	getClass() {
		return CoordinateList;
	}
	get interfaces_() {
		return [];
	}
}
CoordinateList.constructor_ = function () {
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let coord = arguments[0];
		this.ensureCapacity(coord.length);
		this.add(coord, true);
	} else if (arguments.length === 2) {
		let coord = arguments[0], allowRepeated = arguments[1];
		this.ensureCapacity(coord.length);
		this.add(coord, allowRepeated);
	}
};
CoordinateList.coordArrayType = new Array(0).fill(null);
