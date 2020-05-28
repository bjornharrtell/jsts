/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Iterator.html
 * @constructor
 * @private
 */
export default class Iterator {
  /**
     * Returns true if the iteration has more elements.
     * @return {boolean}
     */
  hasNext() {}

  /**
     * Returns the next element in the iteration.
     * @return {Object}
     */
  next() {}

  /**
     * Removes from the underlying collection the last element returned by the
     * iterator (optional operation).
     */
  remove() {}
}
