import FastPriorityQueue from 'fastpriorityqueue'

export default class PriorityQueue {

  constructor() {
    this._fpQueue = new FastPriorityQueue((a,b) => a.compareTo(b) < 0)
  }

  poll() {
    return this._fpQueue.poll()
  }
  size() {
    return this._fpQueue.size
  }
  clear() {
    this._fpQueue = new FastPriorityQueue()
  }
  peek() {
    return this._fpQueue.peek()
  }
  remove() {
    return this._fpQueue.poll()
  }
  isEmpty() {
    return this._fpQueue.isEmpty()
  }
  add(x) {
    this._fpQueue.add(x)
  }
}
