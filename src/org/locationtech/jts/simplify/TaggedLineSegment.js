import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import inherits from '../../../../inherits';
export default function TaggedLineSegment() {
	this.parent = null;
	this.index = null;
	if (arguments.length === 2) {
		let p0 = arguments[0], p1 = arguments[1];
		TaggedLineSegment.call(this, p0, p1, null, -1);
	} else if (arguments.length === 4) {
		let p0 = arguments[0], p1 = arguments[1], parent = arguments[2], index = arguments[3];
		LineSegment.call(this, p0, p1);
		this.parent = parent;
		this.index = index;
	}
}
inherits(TaggedLineSegment, LineSegment);
extend(TaggedLineSegment.prototype, {
	getIndex: function () {
		return this.index;
	},
	getParent: function () {
		return this.parent;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TaggedLineSegment;
	}
});
