import GeometryFactory from '../geom/GeometryFactory'
import RobustLineIntersector from '../algorithm/RobustLineIntersector'
import RuntimeException from '../../../../java/lang/RuntimeException'
export default class NodingValidator {
  constructor() {
    NodingValidator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._li = new RobustLineIntersector()
    this._segStrings = null
    const segStrings = arguments[0]
    this._segStrings = segStrings
  }
  checkEndPtVertexIntersections() {
    if (arguments.length === 0) {
      for (let i = this._segStrings.iterator(); i.hasNext(); ) {
        const ss = i.next()
        const pts = ss.getCoordinates()
        this.checkEndPtVertexIntersections(pts[0], this._segStrings)
        this.checkEndPtVertexIntersections(pts[pts.length - 1], this._segStrings)
      }
    } else if (arguments.length === 2) {
      const testPt = arguments[0], segStrings = arguments[1]
      for (let i = segStrings.iterator(); i.hasNext(); ) {
        const ss = i.next()
        const pts = ss.getCoordinates()
        for (let j = 1; j < pts.length - 1; j++) 
          if (pts[j].equals(testPt)) throw new RuntimeException('found endpt/interior pt intersection at index ' + j + ' :pt ' + testPt)
        
      }
    }
  }
  checkInteriorIntersections() {
    if (arguments.length === 0) {
      for (let i = this._segStrings.iterator(); i.hasNext(); ) {
        const ss0 = i.next()
        for (let j = this._segStrings.iterator(); j.hasNext(); ) {
          const ss1 = j.next()
          this.checkInteriorIntersections(ss0, ss1)
        }
      }
    } else if (arguments.length === 2) {
      const ss0 = arguments[0], ss1 = arguments[1]
      const pts0 = ss0.getCoordinates()
      const pts1 = ss1.getCoordinates()
      for (let i0 = 0; i0 < pts0.length - 1; i0++) 
        for (let i1 = 0; i1 < pts1.length - 1; i1++) 
          this.checkInteriorIntersections(ss0, i0, ss1, i1)
        
      
    } else if (arguments.length === 4) {
      const e0 = arguments[0], segIndex0 = arguments[1], e1 = arguments[2], segIndex1 = arguments[3]
      if (e0 === e1 && segIndex0 === segIndex1) return null
      const p00 = e0.getCoordinates()[segIndex0]
      const p01 = e0.getCoordinates()[segIndex0 + 1]
      const p10 = e1.getCoordinates()[segIndex1]
      const p11 = e1.getCoordinates()[segIndex1 + 1]
      this._li.computeIntersection(p00, p01, p10, p11)
      if (this._li.hasIntersection()) 
        if (this._li.isProper() || this.hasInteriorIntersection(this._li, p00, p01) || this.hasInteriorIntersection(this._li, p10, p11)) 
          throw new RuntimeException('found non-noded intersection at ' + p00 + '-' + p01 + ' and ' + p10 + '-' + p11)
        
      
    }
  }
  checkValid() {
    this.checkEndPtVertexIntersections()
    this.checkInteriorIntersections()
    this.checkCollapses()
  }
  checkCollapses() {
    if (arguments.length === 0) {
      for (let i = this._segStrings.iterator(); i.hasNext(); ) {
        const ss = i.next()
        this.checkCollapses(ss)
      }
    } else if (arguments.length === 1) {
      const ss = arguments[0]
      const pts = ss.getCoordinates()
      for (let i = 0; i < pts.length - 2; i++) 
        this.checkCollapse(pts[i], pts[i + 1], pts[i + 2])
      
    }
  }
  hasInteriorIntersection(li, p0, p1) {
    for (let i = 0; i < li.getIntersectionNum(); i++) {
      const intPt = li.getIntersection(i)
      if (!(intPt.equals(p0) || intPt.equals(p1))) return true
    }
    return false
  }
  checkCollapse(p0, p1, p2) {
    if (p0.equals(p2)) throw new RuntimeException('found non-noded collapse at ' + NodingValidator.fact.createLineString([p0, p1, p2]))
  }
}
NodingValidator.fact = new GeometryFactory()
