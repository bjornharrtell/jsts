import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import MathUtil from '../math/MathUtil'
import Envelope from '../geom/Envelope'
export default class Distance {
  static segmentToSegment(A, B, C, D) {
    if (A.equals(B)) return Distance.pointToSegment(A, C, D)
    if (C.equals(D)) return Distance.pointToSegment(D, A, B)
    let noIntersection = false
    if (!Envelope.intersects(A, B, C, D)) {
      noIntersection = true
    } else {
      const denom = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x)
      if (denom === 0) {
        noIntersection = true
      } else {
        const r_num = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y)
        const s_num = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y)
        const s = s_num / denom
        const r = r_num / denom
        if (r < 0 || r > 1 || s < 0 || s > 1) 
          noIntersection = true
        
      }
    }
    if (noIntersection) 
      return MathUtil.min(Distance.pointToSegment(A, C, D), Distance.pointToSegment(B, C, D), Distance.pointToSegment(C, A, B), Distance.pointToSegment(D, A, B))
    
    return 0.0
  }
  static pointToSegment(p, A, B) {
    if (A.x === B.x && A.y === B.y) return p.distance(A)
    const len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y)
    const r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) / len2
    if (r <= 0.0) return p.distance(A)
    if (r >= 1.0) return p.distance(B)
    const s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2
    return Math.abs(s) * Math.sqrt(len2)
  }
  static pointToLinePerpendicular(p, A, B) {
    const len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y)
    const s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2
    return Math.abs(s) * Math.sqrt(len2)
  }
  static pointToSegmentString(p, line) {
    if (line.length === 0) throw new IllegalArgumentException('Line array must contain at least one vertex')
    let minDistance = p.distance(line[0])
    for (let i = 0; i < line.length - 1; i++) {
      const dist = Distance.pointToSegment(p, line[i], line[i + 1])
      if (dist < minDistance) 
        minDistance = dist
      
    }
    return minDistance
  }
}
