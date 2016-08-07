import extend from '../../../../extend';
export default function ConstraintVertexFactory() {}
extend(ConstraintVertexFactory.prototype, {
	createVertex: function (p, constraintSeg) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConstraintVertexFactory;
	}
});
