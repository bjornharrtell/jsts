import extend from '../../../../../extend';
import Edge from '../../planargraph/Edge';
import inherits from '../../../../../inherits';
export default function LineMergeEdge() {
	Edge.apply(this);
	this._line = null;
	let line = arguments[0];
	this._line = line;
}
inherits(LineMergeEdge, Edge);
extend(LineMergeEdge.prototype, {
	getLine: function () {
		return this._line;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineMergeEdge;
	}
});
