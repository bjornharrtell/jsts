import extend from '../../../../../extend';
export default function TriangleVisitor() {}
extend(TriangleVisitor.prototype, {
	visit: function (triEdges) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TriangleVisitor;
	}
});

