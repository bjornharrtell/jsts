import Collection from './Collection'
import NoSuchElementException from './NoSuchElementException'
import UnsupportedOperationException from '../lang/UnsupportedOperationException'
import SortedSet from './SortedSet'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html
 */
export default class TreeSet extends SortedSet {
  #array = []

  constructor(o) {
    super()
    if (o instanceof Collection)
      this.addAll(o)
  }

  contains(o) {
    for (let i = 0, len = this.#array.length; i < len; i++) {
      const e = this.#array[i]
      if (e.compareTo(o) === 0)
        return true
    }
    return false
  }

  add(o) {
    if (this.contains(o)) return false

    for (let i = 0, len = this.#array.length; i < len; i++) {
      const e = this.#array[i]
      if (e.compareTo(o) === 1) {
        this.#array.splice(i, 0, o)
        return true
      }
    }

    this.#array.push(o)

    return true
  }

  addAll(c) {
    for (const e of c)
      this.add(e)
    return true
  }

  remove() {
    throw new UnsupportedOperationException()
  }

  size() {
    return this.#array.length
  }

  isEmpty() {
    return this.#array.length === 0
  }

  toArray() {
    return this.#array.slice()
  }

  iterator() {
    return new Iterator(this.#array)
  }
}

class Iterator {
  #array
  #position = 0

  constructor(array) {
    this.#array = array
  }

  next() {
    if (this.#position === this.#array.length)
      throw new NoSuchElementException()
    return this.#array[this.#position++]
  }

  hasNext() {
    return this.#position < this.#array.length
  }

  remove() {
    throw new UnsupportedOperationException()
  }
}
