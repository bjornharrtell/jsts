export default class Position {
	get interfaces_() {
		return [];
	}
	static opposite(position) {
		if (position === Position.LEFT) return Position.RIGHT;
		if (position === Position.RIGHT) return Position.LEFT;
		return position;
	}
	getClass() {
		return Position;
	}
}
Position.ON = 0;
Position.LEFT = 1;
Position.RIGHT = 2;

