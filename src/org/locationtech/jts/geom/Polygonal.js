import extend from '../../../../extend';
export default function Polygonal() {}
extend(Polygonal.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Polygonal;
	}
});
