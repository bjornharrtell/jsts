import Polygon from '../../geom/Polygon.js'
import GeometryCollection from '../../geom/GeometryCollection.js'
export default class RobustClipEnvelopeComputer {
  constructor() {
    RobustClipEnvelopeComputer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._targetEnv = null
    this._clipEnv = null
    const targetEnv = arguments[0]
    this._targetEnv = targetEnv
    this._clipEnv = targetEnv.copy()
  }
  static getEnvelope(a, b, targetEnv) {
    const cec = new RobustClipEnvelopeComputer(targetEnv)
    cec.add(a)
    cec.add(b)
    return cec.getEnvelope()
  }
  static intersectsSegment(env, p1, p2) {
    return env.intersects(p1, p2)
  }
  addPolygon(poly) {
    const shell = poly.getExteriorRing()
    this.addPolygonRing(shell)
    for (let i = 0; i < poly.getNumInteriorRing(); i++) {
      const hole = poly.getInteriorRingN(i)
      this.addPolygonRing(hole)
    }
  }
  addSegment(p1, p2) {
    if (RobustClipEnvelopeComputer.intersectsSegment(this._targetEnv, p1, p2)) {
      this._clipEnv.expandToInclude(p1)
      this._clipEnv.expandToInclude(p2)
    }
  }
  getEnvelope() {
    return this._clipEnv
  }
  addPolygonRing(ring) {
    if (ring.isEmpty()) return null
    const seq = ring.getCoordinateSequence()
    for (let i = 1; i < seq.size(); i++) 
      this.addSegment(seq.getCoordinate(i - 1), seq.getCoordinate(i))
    
  }
  add(g) {
    if (g === null || g.isEmpty()) return null
    if (g instanceof Polygon) this.addPolygon(g); else if (g instanceof GeometryCollection) this.addCollection(g)
  }
  addCollection(gc) {
    for (let i = 0; i < gc.getNumGeometries(); i++) {
      const g = gc.getGeometryN(i)
      this.add(g)
    }
  }
}
