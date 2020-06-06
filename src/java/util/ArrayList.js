import Collection from './Collection'
import IndexOutOfBoundsException from '../lang/IndexOutOfBoundsException'
import List from './List'
import NoSuchElementException from './NoSuchElementException'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/ArrayList.html
 */
export default class ArrayList extends List {

  constructor(o) {
    super()
    this.array = []
    if (o instanceof Collection) this.addAll(o)
  }

  get interfaces_() {
    return [List, Collection]
  }

  ensureCapacity() { }

  add(e) {
    if (arguments.length === 1)
      this.array.push(e)
    else
      this.array.splice(arguments[0], 0, arguments[1])
    return true
  }

  clear() {
    this.array = []
  }

  addAll(c) {
    for (const e of c)
      this.array.push(e)
  }

  set(index, element) {
    const oldElement = this.array[index]
    this.array[index] = element
    return oldElement
  }

  iterator() {
    return new Iterator(this)
  }

  get(index) {
    if (index < 0 || index >= this.size())
      throw new IndexOutOfBoundsException()
    return this.array[index]
  }

  isEmpty() {
    return this.array.length === 0
  }

  sort(comparator) {
    if (comparator)
      this.array.sort((a, b) => comparator.compare(a, b))
    else this.array.sort()
  }

  size() {
    return this.array.length
  }

  toArray() {
    return this.array.slice()
  }

  remove(o) {
    for (let i = 0, len = this.array.length; i < len; i++)
      if (this.array[i] === o)
        return !!this.array.splice(i, 1)
    return false
  }

  [Symbol.iterator]() {
    return this.array.values()
  }
}

class Iterator {
  constructor(arrayList) {
    this.arrayList = arrayList
    this.position = 0
  }

  next() {
    if (this.position === this.arrayList.size())
      throw new NoSuchElementException()
    return this.arrayList.get(this.position++)
  }

  hasNext() {
    return this.position < this.arrayList.size()
  }

  set(element) {
    return this.arrayList.set(this.position - 1, element)
  }

  remove() {
    this.arrayList.remove(this.arrayList.get(this.position))
  }
}
