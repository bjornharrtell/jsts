import Coordinate from '../geom/Coordinate'
import Orientation from '../algorithm/Orientation'
import Quadrant from '../geomgraph/Quadrant'
import Assert from '../util/Assert'
export default class HalfEdge {
  constructor () {
    HalfEdge.constructor_.apply(this, arguments)
  }

  static init (e0, e1) {
    if (e0._sym !== null || e1._sym !== null || e0._next !== null || e1._next !== null) throw new IllegalStateException('Edges are already initialized')
    e0.init(e1)
    return e0
  }

  static create (p0, p1) {
    const e0 = new HalfEdge(p0)
    const e1 = new HalfEdge(p1)
    e0.init(e1)
    return e0
  }

  find (dest) {
    let oNext = this
    do {
      if (oNext === null) return null
      if (oNext.dest().equals2D(dest)) return oNext
      oNext = oNext.oNext()
    } while (oNext !== this)
    return null
  }

  dest () {
    return this._sym._orig
  }

  oNext () {
    return this._sym._next
  }

  insert (e) {
    if (this.oNext() === this) {
      this.insertAfter(e)
      return null
    }
    const ecmp = this.compareTo(e)
    let ePrev = this
    do {
      const oNext = ePrev.oNext()
      const cmp = oNext.compareTo(e)
      if (cmp !== ecmp || oNext === this) {
        ePrev.insertAfter(e)
        return null
      }
      ePrev = oNext
    } while (ePrev !== this)
    Assert.shouldNeverReachHere()
  }

  insertAfter (e) {
    Assert.equals(this._orig, e.orig())
    const save = this.oNext()
    this._sym.setNext(e)
    e.sym().setNext(save)
  }

  degree () {
    let degree = 0
    let e = this
    do {
      degree++
      e = e.oNext()
    } while (e !== this)
    return degree
  }

  equals () {
    if (arguments.length === 2 && (arguments[1] instanceof Coordinate && arguments[0] instanceof Coordinate)) {
      const p0 = arguments[0]; const p1 = arguments[1]
      return this._orig.equals2D(p0) && this._sym._orig.equals(p1)
    }
  }

  deltaY () {
    return this._sym._orig.y - this._orig.y
  }

  sym () {
    return this._sym
  }

  prev () {
    return this._sym.next()._sym
  }

  compareAngularDirection (e) {
    const dx = this.deltaX()
    const dy = this.deltaY()
    const dx2 = e.deltaX()
    const dy2 = e.deltaY()
    if (dx === dx2 && dy === dy2) return 0
    const quadrant = Quadrant.quadrant(dx, dy)
    const quadrant2 = Quadrant.quadrant(dx2, dy2)
    if (quadrant > quadrant2) return 1
    if (quadrant < quadrant2) return -1
    return Orientation.index(e._orig, e.dest(), this.dest())
  }

  prevNode () {
    let e = this
    while (e.degree() === 2) {
      e = e.prev()
      if (e === this) return null
    }
    return e
  }

  compareTo (obj) {
    const e = obj
    const comp = this.compareAngularDirection(e)
    return comp
  }

  next () {
    return this._next
  }

  setSym (e) {
    this._sym = e
  }

  orig () {
    return this._orig
  }

  toString () {
    return 'HE(' + this._orig.x + ' ' + this._orig.y + ', ' + this._sym._orig.x + ' ' + this._sym._orig.y + ')'
  }

  setNext (e) {
    this._next = e
  }

  init (e) {
    this.setSym(e)
    e.setSym(this)
    this.setNext(e)
    e.setNext(this)
  }

  deltaX () {
    return this._sym._orig.x - this._orig.x
  }

  getClass () {
    return HalfEdge
  }

  get interfaces_ () {
    return []
  }
}
HalfEdge.constructor_ = function () {
  this._orig = null
  this._sym = null
  this._next = null
  const orig = arguments[0]
  this._orig = orig
}
