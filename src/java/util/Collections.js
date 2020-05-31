import Arrays from './Arrays'
import ArrayList from './ArrayList'

const Collections = {
  reverseOrder: function() {
    return {
      compare(a, b) {
        return b.compareTo(a)
      }
    }
  },
  min: function(l) {
    Collections.sort(l)
    return l.get(0)
  },
  sort: function(l, c) {
    const a = l.toArray()
    if (c)
      Arrays.sort(a, c)
    else
      Arrays.sort(a)
    const i = l.iterator()
    for (let pos = 0, alen = a.length; pos < alen; pos++) {
      i.next()
      i.set(a[pos])
    }
  },
  singletonList: function(o) {
    const arrayList = new ArrayList()
    arrayList.add(o)
    return arrayList
  }
}

export default Collections
