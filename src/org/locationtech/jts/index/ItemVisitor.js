import extend from '../../../../extend';
export default function ItemVisitor() {}
extend(ItemVisitor.prototype, {
	visitItem: function (item) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ItemVisitor;
	}
});

