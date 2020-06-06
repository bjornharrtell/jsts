import EmptyStackException from './EmptyStackException'
import IndexOutOfBoundsException from '../lang/IndexOutOfBoundsException'
import List from './List'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Stack.html
 */
export default class Stack extends List {
  constructor() {
    super()
    this.array = []
  }

  add(e) {
    this.array.push(e)
    return true
  }

  get(index) {
    if (index < 0 || index >= this.size())
      throw new IndexOutOfBoundsException()
    return this.array[index]
  }

  /**
   * Pushes an item onto the top of this stack.
   * @param {Object} e
   * @return {Object}
   */
  push(e) {
    this.array.push(e)
    return e
  }

  /**
   * Removes the object at the top of this stack and returns that object as the value of this function.
   * @return {Object}
   */
  pop() {
    if (this.array.length === 0)
      throw new EmptyStackException()
    return this.array.pop()
  }

  /**
   * Looks at the object at the top of this stack without removing it from the
   * stack.
   * @return {Object}
   */
  peek() {
    if (this.array.length === 0)
      throw new EmptyStackException()
    return this.array[this.array.length - 1]
  }

  /**
   * Tests if this stack is empty.
   * @return {boolean} true if and only if this stack contains no items; false
   *         otherwise.
   */
  empty() {
    return this.array.length === 0
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return this.empty()
  }

  /**
   * Returns the 1-based position where an object is on this stack. If the object
   * o occurs as an item in this stack, this method returns the distance from the
   * top of the stack of the occurrence nearest the top of the stack; the topmost
   * item on the stack is considered to be at distance 1. The equals method is
   * used to compare o to the items in this stack.
   *
   * NOTE: does not currently actually use equals. (=== is used)
   *
   * @param {Object} o
   * @return {number} the 1-based position from the top of the stack where the
   *         object is located; the return value -1 indicates that the object is
   *         not on the stack.
   */
  search(o) {
    return this.array.indexOf(o)
  }

  /**
   * @return {number}
   */
  size() {
    return this.array.length
  }

  /**
   * @return {Array}
   */
  toArray() {
    return this.array.slice()
  }
}
