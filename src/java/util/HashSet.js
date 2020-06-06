import Collection from './Collection'
import NoSuchElementException from './NoSuchElementException'
import UnsupportedOperationException from '../lang/UnsupportedOperationException'
import Set from './Set'

/**
 * @see http://docs.oracle.com/javase/6/docs/api/java/util/HashSet.html
 */
export default class HashSet extends Set {
  constructor(o) {
    super()
    this.map = new Map()
    if (o instanceof Collection)
      this.addAll(o)
  }

  contains(o) {
    const hashCode = o.hashCode ? o.hashCode() : o
    if (this.map.has(hashCode))
      return true
    return false
  }

  add(o) {
    const hashCode = o.hashCode ? o.hashCode() : o
    if (this.map.has(hashCode))
      return false
    return !!this.map.set(hashCode, o)
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
    return this.map.size
  }

  isEmpty() {
    return this.map.size === 0
  }

  toArray() {
    return Array.from(this.map.values())
  }

  iterator() {
    return new Iterator(this.map)
  }

  [Symbol.iterator]() {
    return this.map
  }
}

class Iterator {
  constructor(map) {
    this.iterator = map.values()
    const { done, value } = this.iterator.next()
    this.done = done
    this.value = value
  }

  next() {
    if (this.done)
      throw new NoSuchElementException()
    const current = this.value
    const { done, value } = this.iterator.next()
    this.done = done
    this.value = value
    return current
  }

  hasNext() {
    return !this.done
  }

  remove() {
    throw new UnsupportedOperationException()
  }
}
