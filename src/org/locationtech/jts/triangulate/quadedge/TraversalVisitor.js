import extend from '../../../../../extend';
export default function TraversalVisitor() {}
extend(TraversalVisitor.prototype, {
	visit: function (currTri, edgeIndex, neighbTri) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TraversalVisitor;
	}
});
