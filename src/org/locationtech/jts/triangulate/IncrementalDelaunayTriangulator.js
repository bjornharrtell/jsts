import QuadEdge from './quadedge/QuadEdge'
export default class IncrementalDelaunayTriangulator {
  constructor() {
    IncrementalDelaunayTriangulator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._subdiv = null
    this._isUsingTolerance = false
    const subdiv = arguments[0]
    this._subdiv = subdiv
    this._isUsingTolerance = subdiv.getTolerance() > 0.0
  }
  insertSite(v) {
    let e = this._subdiv.locate(v)
    if (this._subdiv.isVertexOfEdge(e, v)) {
      return e
    } else if (this._subdiv.isOnEdge(e, v.getCoordinate())) {
      e = e.oPrev()
      this._subdiv.delete(e.oNext())
    }
    let base = this._subdiv.makeEdge(e.orig(), v)
    QuadEdge.splice(base, e)
    const startEdge = base
    do {
      base = this._subdiv.connect(e, base.sym())
      e = base.oPrev()
    } while (e.lNext() !== startEdge)
    do {
      const t = e.oPrev()
      if (t.dest().rightOf(e) && v.isInCircle(e.orig(), t.dest(), e.dest())) {
        QuadEdge.swap(e)
        e = e.oPrev()
      } else if (e.oNext() === startEdge) {
        return base
      } else {
        e = e.oNext().lPrev()
      }
    } while (true)
  }
  insertSites(vertices) {
    for (let i = vertices.iterator(); i.hasNext(); ) {
      const v = i.next()
      this.insertSite(v)
    }
  }
}
