export default class Position {
	constructor() {
		Position.constructor_.apply(this, arguments);
	}
	static opposite(position) {
		if (position === Position.LEFT) return Position.RIGHT;
		if (position === Position.RIGHT) return Position.LEFT;
		return position;
	}
	getClass() {
		return Position;
	}
	get interfaces_() {
		return [];
	}
}
Position.constructor_ = function () {};
Position.ON = 0;
Position.LEFT = 1;
Position.RIGHT = 2;
