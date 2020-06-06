import ArrayList from './ArrayList'
import MapInterface from './Map'
import HashSet from './HashSet'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/HashMap.html
 */
export default class HashMap extends MapInterface {
  constructor() {
    super()
    this.map = new Map()
  }

  get(key) {
    return this.map.get(key) || null
  }

  put(key, value) {
    this.map.set(key, value)
    return value
  }

  values() {
    const arrayList = new ArrayList()
    const it = this.map.values()
    let o = it.next()
    while (!o.done) {
      arrayList.add(o.value)
      o = it.next()
    }
    return arrayList
  }

  entrySet() {
    const hashSet = new HashSet()
    this.map.entries().forEach(entry => hashSet.add(entry))
    return hashSet
  }

  size() {
    return this.map.size()
  }
}
