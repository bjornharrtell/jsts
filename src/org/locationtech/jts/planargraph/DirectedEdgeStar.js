import Collections from '../../../../java/util/Collections'
import DirectedEdge from './DirectedEdge'
import ArrayList from '../../../../java/util/ArrayList'
import Edge from './Edge'
export default class DirectedEdgeStar {
  constructor() {
    DirectedEdgeStar.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._outEdges = new ArrayList()
    this._sorted = false
  }
  getNextEdge(dirEdge) {
    const i = this.getIndex(dirEdge)
    return this._outEdges.get(this.getIndex(i + 1))
  }
  getCoordinate() {
    const it = this.iterator()
    if (!it.hasNext()) return null
    const e = it.next()
    return e.getCoordinate()
  }
  iterator() {
    this.sortEdges()
    return this._outEdges.iterator()
  }
  sortEdges() {
    if (!this._sorted) {
      Collections.sort(this._outEdges)
      this._sorted = true
    }
  }
  remove(de) {
    this._outEdges.remove(de)
  }
  getEdges() {
    this.sortEdges()
    return this._outEdges
  }
  getNextCWEdge(dirEdge) {
    const i = this.getIndex(dirEdge)
    return this._outEdges.get(this.getIndex(i - 1))
  }
  getIndex() {
    if (arguments[0] instanceof Edge) {
      const edge = arguments[0]
      this.sortEdges()
      for (let i = 0; i < this._outEdges.size(); i++) {
        const de = this._outEdges.get(i)
        if (de.getEdge() === edge) return i
      }
      return -1
    } else if (arguments[0] instanceof DirectedEdge) {
      const dirEdge = arguments[0]
      this.sortEdges()
      for (let i = 0; i < this._outEdges.size(); i++) {
        const de = this._outEdges.get(i)
        if (de === dirEdge) return i
      }
      return -1
    } else if (Number.isInteger(arguments[0])) {
      const i = arguments[0]
      let modi = i % this._outEdges.size()
      if (modi < 0) modi += this._outEdges.size()
      return modi
    }
  }
  add(de) {
    this._outEdges.add(de)
    this._sorted = false
  }
  getDegree() {
    return this._outEdges.size()
  }
}
