import extend from '../../../../extend';
import HalfEdge from './HalfEdge';
import inherits from '../../../../inherits';
export default function MarkHalfEdge() {
	this._isMarked = false;
	let orig = arguments[0];
	HalfEdge.call(this, orig);
}
inherits(MarkHalfEdge, HalfEdge);
extend(MarkHalfEdge.prototype, {
	mark: function () {
		this._isMarked = true;
	},
	setMark: function (isMarked) {
		this._isMarked = isMarked;
	},
	isMarked: function () {
		return this._isMarked;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MarkHalfEdge;
	}
});
MarkHalfEdge.setMarkBoth = function (e, isMarked) {
	e.setMark(isMarked);
	e.sym().setMark(isMarked);
};
MarkHalfEdge.isMarked = function (e) {
	return e.isMarked();
};
MarkHalfEdge.setMark = function (e, isMarked) {
	e.setMark(isMarked);
};
MarkHalfEdge.markBoth = function (e) {
	e.mark();
	e.sym().mark();
};
MarkHalfEdge.mark = function (e) {
	e.mark();
};
