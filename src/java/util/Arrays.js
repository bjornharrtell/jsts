import ArrayList from './ArrayList'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Arrays.html
 */
export default class Arrays {
  static sort () {
    const a = arguments[0]; let i; let t; let comparator; let compare
    if (arguments.length === 1) {
      compare = function (a, b) {
        return a.compareTo(b)
      }
      a.sort(compare)
    } else if (arguments.length === 2) {
      comparator = arguments[1]
      compare = function (a, b) {
        return comparator.compare(a, b)
      }
      a.sort(compare)
    } else if (arguments.length === 3) {
      t = a.slice(arguments[1], arguments[2])
      t.sort()
      const r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length))
      a.splice(0, a.length)
      for (i = 0; i < r.length; i++) a.push(r[i])
    } else if (arguments.length === 4) {
      t = a.slice(arguments[1], arguments[2])
      comparator = arguments[3]
      compare = function (a, b) {
        return comparator.compare(a, b)
      }
      t.sort(compare)
      const r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length))
      a.splice(0, a.length)
      for (i = 0; i < r.length; i++) a.push(r[i])
    }
  }

  /**
   * @param {Array} array
   * @return {ArrayList}
   */
  static asList (array) {
    const arrayList = new ArrayList()
    for (let i = 0, len = array.length; i < len; i++) arrayList.add(array[i])

    return arrayList
  }

  static copyOf (original, newLength) {
    return original.slice(0, newLength)
  }
}
