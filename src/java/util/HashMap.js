import ArrayList from './ArrayList'
import MapInterface from './Map'
import HashSet from './HashSet'
import MapAlternative from '../../Map'

let MapInternal = Map
if (typeof Map === 'undefined') {
  MapInternal = MapAlternative
}

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
  this.map_ = new MapInternal()
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
  Array.from(this.map_.values()).forEach(value => arrayList.add(value))
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
