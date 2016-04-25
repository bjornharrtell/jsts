import ArrayList from './ArrayList'
import MapInterface from './Map'
import HashSet from './HashSet'
import MapPolyfill from '../../Map'

let MapImpl = typeof Map === 'undefined' || !Map.prototype.values ? MapPolyfill : Map

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/HashMap.html
 *
 * @extends {javascript.util.Map}
 * @constructor
 * @private
 */
export default function HashMap () {
  /**
   * @type {Object}
   * @private
  */
  this.map_ = new MapImpl()
}
HashMap.prototype = new MapInterface()

/**
 * @override
 */
HashMap.prototype.get = function (key) {
  return this.map_.get(key) || null
}

/**
 * @override
 */
HashMap.prototype.put = function (key, value) {
  this.map_.set(key, value)
  return value
}

/**
 * @override
 */
HashMap.prototype.values = function () {
  const arrayList = new ArrayList()
  const it = this.map_.values()
  let o = it.next()
  while (!o.done) {
    arrayList.add(o.value)
    o = it.next()
  }
  return arrayList
}

/**
 * @override
 */
HashMap.prototype.entrySet = function () {
  const hashSet = new HashSet()
  this.map_.entries().forEach(entry => hashSet.add(entry))
  return hashSet
}

/**
 * @override
 */
HashMap.prototype.size = function () {
  return this.map_.size()
}
