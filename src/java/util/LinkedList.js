export default class LinkedList {
  constructor() {
    this.array = []
  }

  addLast(e) {
    this.array.push(e)
  }

  removeFirst() {
    return this.array.shift()
  }

  isEmpty() {
    return this.array.length === 0
  }
}
