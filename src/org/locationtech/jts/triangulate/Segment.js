import Coordinate from '../geom/Coordinate';
import LineSegment from '../geom/LineSegment';
export default class Segment {
	constructor(...args) {
		this.ls = null;
		this.data = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [p0, p1] = args;
						this.ls = new LineSegment(p0, p1);
					})(...args);
				case 3:
					return ((...args) => {
						let [p0, p1, data] = args;
						this.ls = new LineSegment(p0, p1);
						this.data = data;
					})(...args);
				case 6:
					return ((...args) => {
						let [x1, y1, z1, x2, y2, z2] = args;
						overloaded.call(this, new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2));
					})(...args);
				case 7:
					return ((...args) => {
						let [x1, y1, z1, x2, y2, z2, data] = args;
						overloaded.call(this, new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2), data);
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getLineSegment() {
		return this.ls;
	}
	getEndZ() {
		var p = this.ls.getCoordinate(1);
		return p.z;
	}
	getStartZ() {
		var p = this.ls.getCoordinate(0);
		return p.z;
	}
	intersection(s) {
		return this.ls.intersection(s.getLineSegment());
	}
	getStart() {
		return this.ls.getCoordinate(0);
	}
	getEnd() {
		return this.ls.getCoordinate(1);
	}
	getEndY() {
		var p = this.ls.getCoordinate(1);
		return p.y;
	}
	getStartX() {
		var p = this.ls.getCoordinate(0);
		return p.x;
	}
	equalsTopo(s) {
		return this.ls.equalsTopo(s.getLineSegment());
	}
	getStartY() {
		var p = this.ls.getCoordinate(0);
		return p.y;
	}
	setData(data) {
		this.data = data;
	}
	getData() {
		return this.data;
	}
	getEndX() {
		var p = this.ls.getCoordinate(1);
		return p.x;
	}
	toString() {
		return this.ls.toString();
	}
	getClass() {
		return Segment;
	}
}

