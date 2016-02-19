import extend from '../../../../extend';
import MarkHalfEdge from '../edgegraph/MarkHalfEdge';
import inherits from '../../../../inherits';
export default function DissolveHalfEdge() {
	MarkHalfEdge.apply(this);
	this._isStart = false;
	if (arguments.length === 1) {
		let orig = arguments[0];
		MarkHalfEdge.call(this, orig);
	}
}
inherits(DissolveHalfEdge, MarkHalfEdge);
extend(DissolveHalfEdge.prototype, {
	setStart: function () {
		this._isStart = true;
	},
	isStart: function () {
		return this._isStart;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DissolveHalfEdge;
	}
});

