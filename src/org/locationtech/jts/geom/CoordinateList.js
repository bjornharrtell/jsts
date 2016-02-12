import Coordinate from './Coordinate';
import ArrayList from '../../../../java/util/ArrayList';
export default class CoordinateList extends ArrayList {
	constructor(...args) {
		super();
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						super();
					})(...args);
				case 1:
					return ((...args) => {
						let [coord] = args;
						this.ensureCapacity(coord.length);
						this.add(coord, true);
					})(...args);
				case 2:
					return ((...args) => {
						let [coord, allowRepeated] = args;
						this.ensureCapacity(coord.length);
						this.add(coord, allowRepeated);
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getCoordinate(i) {
		return this.get(i);
	}
	addAll(...args) {
		if (args.length === 2) {
			let [coll, allowRepeated] = args;
			var isChanged = false;
			for (var i = coll.iterator(); i.hasNext(); ) {
				this.add(i.next(), allowRepeated);
				isChanged = true;
			}
			return isChanged;
		} else return super.addAll(...args);
	}
	clone() {
		var clone = super.clone();
		for (var i = 0; i < this.size(); i++) {
			clone.add(i, this.get(i).copy());
		}
		return clone;
	}
	toCoordinateArray() {
		return this.toArray(CoordinateList.coordArrayType);
	}
	add(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [coord] = args;
					super.add(coord);
				})(...args);
			case 2:
				if (args[0] instanceof Array && typeof args[1] === "boolean") {
					return ((...args) => {
						let [coord, allowRepeated] = args;
						this.add(coord, allowRepeated, true);
						return true;
					})(...args);
				} else if (args[0] instanceof Coordinate && typeof args[1] === "boolean") {
					return ((...args) => {
						let [coord, allowRepeated] = args;
						if (!allowRepeated) {
							if (this.size() >= 1) {
								var last = this.get(this.size() - 1);
								if (last.equals2D(coord)) return null;
							}
						}
						super.add(coord);
					})(...args);
				} else if (args[0] instanceof Object && typeof args[1] === "boolean") {
					return ((...args) => {
						let [obj, allowRepeated] = args;
						this.add(obj, allowRepeated);
						return true;
					})(...args);
				}
			case 3:
				if (typeof args[2] === "boolean" && (args[0] instanceof Array && typeof args[1] === "boolean")) {
					return ((...args) => {
						let [coord, allowRepeated, direction] = args;
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
					})(...args);
				} else if (typeof args[2] === "boolean" && (Number.isInteger(args[0]) && args[1] instanceof Coordinate)) {
					return ((...args) => {
						let [i, coord, allowRepeated] = args;
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
						super.add(i, coord);
					})(...args);
				}
			case 4:
				return ((...args) => {
					let [coord, allowRepeated, start, end] = args;
					var inc = 1;
					if (start > end) inc = -1;
					for (var i = start; i !== end; i += inc) {
						this.add(coord[i], allowRepeated);
					}
					return true;
				})(...args);
		}
	}
	closeRing() {
		if (this.size() > 0) this.add(new Coordinate(this.get(0)), false);
	}
	getClass() {
		return CoordinateList;
	}
}
CoordinateList.coordArrayType = new Array(0);

