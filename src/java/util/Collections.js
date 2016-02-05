import Arrays from './Arrays'

export default class Collections {
  static reverseOrder() {
    return {
      compare(a, b) {
        return b.compareTo(a)
      }
    }
  }
  static min(l) {
    Collections.sort(l)
    return l.get(0)
  }
  static sort(l, c) {
    const a = l.toArray();
    if (c) {
      Arrays.sort(a, c);
    } else {
      Arrays.sort(a);
    }
    const i = l.iterator();
    for (let pos = 0, alen = a.length;  pos < alen;  pos++) {
      i.next();
      i.set(a[pos]);
    }
  }
}
