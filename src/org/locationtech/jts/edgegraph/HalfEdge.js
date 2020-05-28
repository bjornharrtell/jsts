import WKTWriter from '../io/WKTWriter'
import Coordinate from '../geom/Coordinate'
import Orientation from '../algorithm/Orientation'
import Quadrant from '../geomgraph/Quadrant'
import Assert from '../util/Assert'
import StringBuilder from '../../../../java/lang/StringBuilder'
export default class HalfEdge {
  constructor() {
    HalfEdge.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._orig = null
    this._sym = null
    this._next = null
    const orig = arguments[0]
    this._orig = orig
  }
  static create(p0, p1) {
    const e0 = new HalfEdge(p0)
    const e1 = new HalfEdge(p1)
    e0.link(e1)
    return e0
  }
  find(dest) {
    let oNext = this
    do {
      if (oNext === null) return null
      if (oNext.dest().equals2D(dest)) return oNext
      oNext = oNext.oNext()
    } while (oNext !== this)
    return null
  }
  dest() {
    return this._sym._orig
  }
  isEdgesSorted() {
    const lowest = this.findLowest()
    let e = lowest
    do {
      const eNext = e.oNext()
      if (eNext === lowest) break
      const isSorted = eNext.compareTo(e) > 0
      if (!isSorted) 
        return false
      
      e = eNext
    } while (e !== lowest)
    return true
  }
  oNext() {
    return this._sym._next
  }
  directionY() {
    return this.directionPt().getY() - this._orig.getY()
  }
  insert(eAdd) {
    if (this.oNext() === this) {
      this.insertAfter(eAdd)
      return null
    }
    const ePrev = this.insertionEdge(eAdd)
    ePrev.insertAfter(eAdd)
  }
  insertAfter(e) {
    Assert.equals(this._orig, e.orig())
    const save = this.oNext()
    this._sym.setNext(e)
    e.sym().setNext(save)
  }
  degree() {
    let degree = 0
    let e = this
    do {
      degree++
      e = e.oNext()
    } while (e !== this)
    return degree
  }
  equals() {
    if (arguments.length === 2 && (arguments[1] instanceof Coordinate && arguments[0] instanceof Coordinate)) {
      const p0 = arguments[0], p1 = arguments[1]
      return this._orig.equals2D(p0) && this._sym._orig.equals(p1)
    }
  }
  findLowest() {
    let lowest = this
    let e = this.oNext()
    do {
      if (e.compareTo(lowest) < 0) lowest = e
      e = e.oNext()
    } while (e !== this)
    return lowest
  }
  directionPt() {
    return this.dest()
  }
  sym() {
    return this._sym
  }
  prev() {
    return this._sym.next()._sym
  }
  compareAngularDirection(e) {
    const dx = this.directionX()
    const dy = this.directionY()
    const dx2 = e.directionX()
    const dy2 = e.directionY()
    if (dx === dx2 && dy === dy2) return 0
    const quadrant = Quadrant.quadrant(dx, dy)
    const quadrant2 = Quadrant.quadrant(dx2, dy2)
    if (quadrant > quadrant2) return 1
    if (quadrant < quadrant2) return -1
    const dir1 = this.directionPt()
    const dir2 = e.directionPt()
    return Orientation.index(e._orig, dir2, dir1)
  }
  prevNode() {
    let e = this
    while (e.degree() === 2) {
      e = e.prev()
      if (e === this) return null
    }
    return e
  }
  directionX() {
    return this.directionPt().getX() - this._orig.getX()
  }
  insertionEdge(eAdd) {
    let ePrev = this
    do {
      const eNext = ePrev.oNext()
      if (eNext.compareTo(ePrev) > 0 && eAdd.compareTo(ePrev) >= 0 && eAdd.compareTo(eNext) <= 0) 
        return ePrev
      
      if (eNext.compareTo(ePrev) <= 0 && (eAdd.compareTo(eNext) <= 0 || eAdd.compareTo(ePrev) >= 0)) 
        return ePrev
      
      ePrev = eNext
    } while (ePrev !== this)
    Assert.shouldNeverReachHere()
    return null
  }
  compareTo(obj) {
    const e = obj
    const comp = this.compareAngularDirection(e)
    return comp
  }
  toStringNode() {
    const orig = this.orig()
    const dest = this.dest()
    const sb = new StringBuilder()
    sb.append('Node( ' + WKTWriter.format(orig) + ' )' + '\n')
    let e = this
    do {
      sb.append('  -> ' + e)
      sb.append('\n')
      e = e.oNext()
    } while (e !== this)
    return sb.toString()
  }
  link(sym) {
    this.setSym(sym)
    sym.setSym(this)
    this.setNext(sym)
    sym.setNext(this)
  }
  next() {
    return this._next
  }
  setSym(e) {
    this._sym = e
  }
  orig() {
    return this._orig
  }
  toString() {
    return 'HE(' + this._orig.x + ' ' + this._orig.y + ', ' + this._sym._orig.x + ' ' + this._sym._orig.y + ')'
  }
  toStringNodeEdge() {
    return '  -> (' + WKTWriter.format(this.dest())
  }
  setNext(e) {
    this._next = e
  }
}
