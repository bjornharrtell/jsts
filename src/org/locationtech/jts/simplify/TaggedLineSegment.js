import LineSegment from '../geom/LineSegment';
export default class TaggedLineSegment extends LineSegment {
	constructor() {
		super();
		TaggedLineSegment.constructor_.apply(this, arguments);
	}
	getIndex() {
		return this._index;
	}
	getParent() {
		return this._parent;
	}
	getClass() {
		return TaggedLineSegment;
	}
	get interfaces_() {
		return [];
	}
}
TaggedLineSegment.constructor_ = function () {
	this._parent = null;
	this._index = null;
	if (arguments.length === 2) {
		let p0 = arguments[0], p1 = arguments[1];
		TaggedLineSegment.constructor_.call(this, p0, p1, null, -1);
	} else if (arguments.length === 4) {
		let p0 = arguments[0], p1 = arguments[1], parent = arguments[2], index = arguments[3];
		LineSegment.constructor_.call(this, p0, p1);
		this._parent = parent;
		this._index = index;
	}
};
