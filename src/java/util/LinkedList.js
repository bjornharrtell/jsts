export default class LinkedList {
  constructor() {
    this.array_ = []
  }
  addLast(e) {
    this.array_.push(e)
  }
  removeFirst() {
    return this.array_.shift()
  }
  isEmpty() {
    return this.array_.length === 0
  }
}
