export default class Character {
  static isWhitespace(c) {
    return ((c <= 32 && c >= 0) || c === 127)
  }

  static toUpperCase(c) {
    return c.toUpperCase()
  }
}
