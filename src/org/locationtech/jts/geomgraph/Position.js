export default class Position {
  static opposite(position) {
    if (position === Position.LEFT) return Position.RIGHT
    if (position === Position.RIGHT) return Position.LEFT
    return position
  }
}
Position.ON = 0
Position.LEFT = 1
Position.RIGHT = 2
