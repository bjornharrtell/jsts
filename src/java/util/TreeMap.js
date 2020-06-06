import ArrayList from './ArrayList'
import SortedMap from './SortedMap'
import HashSet from './HashSet'

const BLACK = 0
const RED = 1

function colorOf(p) {
  return (p == null ? BLACK : p.color)
}
function parentOf(p) {
  return (p == null ? null : p.parent)
}
function setColor(p, c) {
  if (p !== null) p.color = c
}
function leftOf(p) {
  return (p == null ? null : p.left)
}
function rightOf(p) {
  return (p == null ? null : p.right)
}

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeMap.html
 */
export default class TreeMap extends SortedMap {
  constructor() {
    super()
    this.root_ = null
    this.size_ = 0
  }

  get(key) {
    let p = this.root_
    while (p !== null) {
      const cmp = key.compareTo(p.key)
      if (cmp < 0)
        p = p.left
      else if (cmp > 0)
        p = p.right
      else return p.value
    }
    return null
  }

  put(key, value) {
    if (this.root_ === null) {
      this.root_ = {
        key: key,
        value: value,
        left: null,
        right: null,
        parent: null,
        color: BLACK,
        getValue() {
          return this.value
        },
        getKey() {
          return this.key
        }
      }
      this.size_ = 1
      return null
    }
    let t = this.root_; let parent; let cmp
    do {
      parent = t
      cmp = key.compareTo(t.key)
      if (cmp < 0) {
        t = t.left
      } else if (cmp > 0) {
        t = t.right
      } else {
        const oldValue = t.value
        t.value = value
        return oldValue
      }
    } while (t !== null)
    const e = {
      key: key,
      left: null,
      right: null,
      value: value,
      parent: parent,
      color: BLACK,
      getValue() {
        return this.value
      },
      getKey() {
        return this.key
      }
    }
    if (cmp < 0)
      parent.left = e
    else parent.right = e

    this.fixAfterInsertion(e)
    this.size_++
    return null
  }

  /**
   * @param {Object} x
   */
  fixAfterInsertion(x) {
    let y
    x.color = RED
    while (x != null && x !== this.root_ && x.parent.color === RED)
      if (parentOf(x) === leftOf(parentOf(parentOf(x)))) {
        y = rightOf(parentOf(parentOf(x)))
        if (colorOf(y) === RED) {
          setColor(parentOf(x), BLACK)
          setColor(y, BLACK)
          setColor(parentOf(parentOf(x)), RED)
          x = parentOf(parentOf(x))
        } else {
          if (x === rightOf(parentOf(x))) {
            x = parentOf(x)
            this.rotateLeft(x)
          }
          setColor(parentOf(x), BLACK)
          setColor(parentOf(parentOf(x)), RED)
          this.rotateRight(parentOf(parentOf(x)))
        }
      } else {
        y = leftOf(parentOf(parentOf(x)))
        if (colorOf(y) === RED) {
          setColor(parentOf(x), BLACK)
          setColor(y, BLACK)
          setColor(parentOf(parentOf(x)), RED)
          x = parentOf(parentOf(x))
        } else {
          if (x === leftOf(parentOf(x))) {
            x = parentOf(x)
            this.rotateRight(x)
          }
          setColor(parentOf(x), BLACK)
          setColor(parentOf(parentOf(x)), RED)
          this.rotateLeft(parentOf(parentOf(x)))
        }
      }

    this.root_.color = BLACK
  }

  values() {
    const arrayList = new ArrayList()
    let p = this.getFirstEntry()
    if (p !== null) {
      arrayList.add(p.value)
      while ((p = TreeMap.successor(p)) !== null)
        arrayList.add(p.value)
    }
    return arrayList
  }

  entrySet() {
    const hashSet = new HashSet()
    let p = this.getFirstEntry()
    if (p !== null) {
      hashSet.add(p)
      while ((p = TreeMap.successor(p)) !== null)
        hashSet.add(p)
    }
    return hashSet
  }

  /**
   * @param {Object} p
   */
  rotateLeft(p) {
    if (p != null) {
      const r = p.right
      p.right = r.left
      if (r.left != null)
        r.left.parent = p
      r.parent = p.parent
      if (p.parent == null)
        this.root_ = r
      else if (p.parent.left === p)
        p.parent.left = r
      else
        p.parent.right = r
      r.left = p
      p.parent = r
    }
  }

  /**
   * @param {Object} p
   */
  rotateRight(p) {
    if (p != null) {
      const l = p.left
      p.left = l.right
      if (l.right != null)
        l.right.parent = p
      l.parent = p.parent
      if (p.parent == null)
        this.root_ = l
      else if (p.parent.right === p)
        p.parent.right = l
      else
        p.parent.left = l
      l.right = p
      p.parent = l
    }
  }

  /**
   * @return {Object}
   */
  getFirstEntry() {
    let p = this.root_
    if (p != null)
      while (p.left != null) p = p.left
    return p
  }

  /**
   * @param {Object} t
   * @return {Object}
   * @private
   */
  static successor(t) {
    let p
    if (t === null) {
      return null
    } else if (t.right !== null) {
      p = t.right
      while (p.left !== null)
        p = p.left
      return p
    } else {
      p = t.parent
      let ch = t
      while (p !== null && ch === p.right) {
        ch = p
        p = p.parent
      }
      return p
    }
  }

  size() {
    return this.size_
  }

  containsKey(key) {
    let p = this.root_
    while (p !== null) {
      const cmp = key.compareTo(p.key)
      if (cmp < 0)
        p = p.left
      else if (cmp > 0)
        p = p.right
      else return true
    }
    return false
  }
}
