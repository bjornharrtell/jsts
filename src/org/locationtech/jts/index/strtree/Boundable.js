import extend from '../../../../../extend';
export default function Boundable() {}
extend(Boundable.prototype, {
	getBounds: function () {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Boundable;
	}
});
