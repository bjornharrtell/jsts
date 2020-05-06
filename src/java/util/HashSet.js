import Collection from './Collection'
import NoSuchElementException from './NoSuchElementException'
import UnsupportedOperationException from '../lang/UnsupportedOperationException'
import Set from './Set'

/**
 * @see http://docs.oracle.com/javase/6/docs/api/java/util/HashSet.html
 */
export default class HashSet extends Set {
  array_ = []

  constructor(o) {
    super()
    if (o instanceof Collection)
      this.addAll(o)
  }

  contains(o) {
    return this.array_.indexOf(o) != -1
  }

  add(o) {
    if (this.contains(o))
      return false
    this.array_.push(o)
    return true
  }

  addAll(c) {
    for (let i = c.iterator(); i.hasNext();)
      this.add(i.next())
    return true
  }

  remove(o) {
    throw new UnsupportedOperationException()
  }

  size() {
    return this.array_.length
  }

  isEmpty() {
    return this.array_.length === 0
  }

  toArray() {
    return this.array_.slice()
  }

  iterator() {
    return new Iterator(this)
  }
};


class Iterator {
  #hashSet
  #position = 0

  constructor(hashSet) {
    this.#hashSet = hashSet
  }

  next() {
    if (this.#position === this.#hashSet.size())
      throw new NoSuchElementException()
    return this.#hashSet.array_[this.#position++]
  }

  hasNext() {
    if (this.#position < this.#hashSet.size())
      return true
    else
      return false
  }

  remove() {
    throw new UnsupportedOperationException()
  }

}

