import ArrayList from './ArrayList'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Arrays.html
 */
export default class Arrays {
  static sort() {
    const a = arguments[0]
    if (arguments.length === 1) {
      a.sort((a, b) => a.compareTo(b))
    } else if (arguments.length === 2) {
      a.sort((a, b) => arguments[1].compare(a, b))
    } else if (arguments.length === 3) {
      const t = a.slice(arguments[1], arguments[2])
      t.sort()
      const r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length))
      a.splice(0, a.length)
      for (const e of r)
        a.push(e)
    } else if (arguments.length === 4) {
      const t = a.slice(arguments[1], arguments[2])
      t.sort((a, b) => arguments[3].compare(a, b))
      const r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length))
      a.splice(0, a.length)
      for (const e of r)
        a.push(e)
    }
  }

  /**
   * @param {Array} array
   * @return {ArrayList}
   */
  static asList(array) {
    const arrayList = new ArrayList()
    for (const e of array)
      arrayList.add(e)
    return arrayList
  }

  static copyOf(original, newLength) {
    return original.slice(0, newLength)
  }
}
