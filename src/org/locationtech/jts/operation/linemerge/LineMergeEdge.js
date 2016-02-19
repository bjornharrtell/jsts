import extend from '../../../../../extend';
import Edge from '../../planargraph/Edge';
import inherits from '../../../../../inherits';
export default function LineMergeEdge() {
	Edge.apply(this);
	this.line = null;
	if (arguments.length === 1) {
		let line = arguments[0];
		this.line = line;
	}
}
inherits(LineMergeEdge, Edge);
extend(LineMergeEdge.prototype, {
	getLine: function () {
		return this.line;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineMergeEdge;
	}
});

