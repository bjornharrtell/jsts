import extend from '../../../../../extend';
export default function KdNodeVisitor() {}
extend(KdNodeVisitor.prototype, {
	visit: function (node) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return KdNodeVisitor;
	}
});

