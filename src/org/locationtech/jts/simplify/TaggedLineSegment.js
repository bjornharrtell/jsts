import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import inherits from '../../../../inherits';
export default function TaggedLineSegment() {
	this._parent = null;
	this._index = null;
	if (arguments.length === 2) {
		let p0 = arguments[0], p1 = arguments[1];
		TaggedLineSegment.call(this, p0, p1, null, -1);
	} else if (arguments.length === 4) {
		let p0 = arguments[0], p1 = arguments[1], parent = arguments[2], index = arguments[3];
		LineSegment.call(this, p0, p1);
		this._parent = parent;
		this._index = index;
	}
}
inherits(TaggedLineSegment, LineSegment);
extend(TaggedLineSegment.prototype, {
	getIndex: function () {
		return this._index;
	},
	getParent: function () {
		return this._parent;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TaggedLineSegment;
	}
});
