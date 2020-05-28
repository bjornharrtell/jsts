import Collection from './Collection'
import NoSuchElementException from './NoSuchElementException'
import UnsupportedOperationException from '../lang/UnsupportedOperationException'
import Set from './Set'

/**
 * @see http://docs.oracle.com/javase/6/docs/api/java/util/HashSet.html
 */
export default class HashSet extends Set {
  #array = []

  constructor (o) {
    super()
    if (o instanceof Collection) this.addAll(o)
  }

  contains (o) {
    if (o.compareTo)
      return this.#array.some(v => v.compareTo(o) === 0)
    else return this.#array.includes(o)
  }

  add (o) {
    if (this.contains(o)) return false
    this.#array.push(o)
    return true
  }

  addAll (c) {
    for (let i = c.iterator(); i.hasNext();) this.add(i.next())
    return true
  }

  remove (o) {
    throw new UnsupportedOperationException()
  }

  size () {
    return this.#array.length
  }

  isEmpty () {
    return this.#array.length === 0
  }

  toArray () {
    return this.#array.slice()
  }

  iterator () {
    return new Iterator(this.#array)
  }
}

class Iterator {
  #array
  #position = 0

  constructor (array) {
    this.#array = array
  }

  next () {
    if (this.#position === this.#array.length) throw new NoSuchElementException()
    return this.#array[this.#position++]
  }

  hasNext () {
    if (this.#position < this.#array.length)
      return true
    else return false
  }

  remove () {
    throw new UnsupportedOperationException()
  }
}
