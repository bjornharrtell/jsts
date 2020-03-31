import Collection from './Collection'
import NoSuchElementException from './NoSuchElementException'
import UnsupportedOperationException from '../lang/UnsupportedOperationException'
import Set from './Set'

/**
 * @see http://docs.oracle.com/javase/6/docs/api/java/util/HashSet.html
 *
 * @extends {javascript.util.Set}
 * @constructor
 * @private
 */
export default function HashSet () {
  /**
   * @type {Array}
   * @private
  */
  this.array_ = []

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0])
  }
};
HashSet.prototype = new Set()

/**
 * @override
 */
HashSet.prototype.contains = function (o) {
  for (let i = 0, len = this.array_.length; i < len; i++) {
    const e = this.array_[i]
    if (e === o) {
      return true
    }
  }
  return false
}

/**
 * @override
 */
HashSet.prototype.add = function (o) {
  if (this.contains(o)) {
    return false
  }

  this.array_.push(o)

  return true
}

/**
 * @override
 */
HashSet.prototype.addAll = function (c) {
  for (let i = c.iterator(); i.hasNext();) {
    this.add(i.next())
  }
  return true
}

/**
 * @override
 */
HashSet.prototype.remove = function (o) {
  throw new UnsupportedOperationException()
}

/**
 * @override
 */
HashSet.prototype.size = function () {
  return this.array_.length
}

/**
 * @override
 */
HashSet.prototype.isEmpty = function () {
  return this.array_.length === 0
}

/**
 * @override
 */
HashSet.prototype.toArray = function () {
  const array = []

  for (let i = 0, len = this.array_.length; i < len; i++) {
    array.push(this.array_[i])
  }

  return array
}

/**
 * @override
 */
HashSet.prototype.iterator = function () {
  return new Iterator_(this)
}

/**
 * @extends {Iterator}
 * @param {HashSet} hashSet
 * @constructor
 * @private
 */
const Iterator_ = function (hashSet) {
  /**
   * @type {HashSet}
   * @private
   */
  this.hashSet_ = hashSet
  /**
   * @type {number}
   * @private
   */
  this.position_ = 0
}

/**
 * @override
 */
Iterator_.prototype.next = function () {
  if (this.position_ === this.hashSet_.size()) {
    throw new NoSuchElementException()
  }
  return this.hashSet_.array_[this.position_++]
}

/**
 * @override
 */
Iterator_.prototype.hasNext = function () {
  if (this.position_ < this.hashSet_.size()) {
    return true
  } else {
    return false
  }
}

/**
 * @override
 */
Iterator_.prototype.remove = function () {
  throw new UnsupportedOperationException()
}
