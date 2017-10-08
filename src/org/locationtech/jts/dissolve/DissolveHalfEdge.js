import extend from '../../../../extend';
import MarkHalfEdge from '../edgegraph/MarkHalfEdge';
import inherits from '../../../../inherits';
export default function DissolveHalfEdge() {
	this._isStart = false;
	let orig = arguments[0];
	MarkHalfEdge.call(this, orig);
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
