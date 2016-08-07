import extend from '../../../../extend';
export default function Position() {}
extend(Position.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Position;
	}
});
Position.opposite = function (position) {
	if (position === Position.LEFT) return Position.RIGHT;
	if (position === Position.RIGHT) return Position.LEFT;
	return position;
};
Position.ON = 0;
Position.LEFT = 1;
Position.RIGHT = 2;
