import Collection from './Collection'
import NoSuchElementException from './NoSuchElementException'
import UnsupportedOperationException from '../lang/UnsupportedOperationException'
import SortedSet from './SortedSet'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html
 */
export default class TreeSet extends SortedSet {
  array_ = []

  constructor (o) {
    super()
    if (o instanceof Collection) { this.addAll(o) }
  }

  contains (o) {
    for (let i = 0, len = this.array_.length; i < len; i++) {
      const e = this.array_[i]
      if (e.compareTo(o) === 0) {
        return true
      }
    }
    return false
  }

  add (o) {
    if (this.contains(o)) {
      return false
    }

    for (let i = 0, len = this.array_.length; i < len; i++) {
      const e = this.array_[i]
      if (e.compareTo(o) === 1) {
        this.array_.splice(i, 0, o)
        return true
      }
    }

    this.array_.push(o)

    return true
  }

  addAll (c) {
    for (let i = c.iterator(); i.hasNext();) {
      this.add(i.next())
    }
    return true
  }

  remove (e) {
    throw new UnsupportedOperationException()
  }

  size () {
    return this.array_.length
  }

  isEmpty () {
    return this.array_.length === 0
  }

  toArray () {
    return this.array_.slice()
  }

  iterator () {
    return new Iterator(this)
  }
}

class Iterator {
  #treeSet
  #position = 0

  constructor (treeSet) {
    this.#treeSet = treeSet
  }

  next () {
    if (this.#position === this.#treeSet.size()) { throw new NoSuchElementException() }
    return this.#treeSet.array_[this.#position++]
  }

  hasNext () {
    return this.#position < this.#treeSet.size()
  }

  remove () {
    throw new UnsupportedOperationException()
  }
}
