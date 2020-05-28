import Coordinate from '../geom/Coordinate'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import Double from '../../../../java/lang/Double'
import Vector3D from '../math/Vector3D'
export default class CGAlgorithms3D {
  static distanceSegmentSegment(A, B, C, D) {
    if (A.equals3D(B)) return CGAlgorithms3D.distancePointSegment(A, C, D)
    if (C.equals3D(B)) return CGAlgorithms3D.distancePointSegment(C, A, B)
    const a = Vector3D.dot(A, B, A, B)
    const b = Vector3D.dot(A, B, C, D)
    const c = Vector3D.dot(C, D, C, D)
    const d = Vector3D.dot(A, B, C, A)
    const e = Vector3D.dot(C, D, C, A)
    const denom = a * c - b * b
    if (Double.isNaN(denom)) throw new IllegalArgumentException('Ordinates must not be NaN')
    let s = null
    let t = null
    if (denom <= 0.0) {
      s = 0
      if (b > c) t = d / b; else t = e / c
    } else {
      s = (b * e - c * d) / denom
      t = (a * e - b * d) / denom
    }
    if (s < 0) return CGAlgorithms3D.distancePointSegment(A, C, D); else if (s > 1) return CGAlgorithms3D.distancePointSegment(B, C, D); else if (t < 0) return CGAlgorithms3D.distancePointSegment(C, A, B); else if (t > 1) 
      return CGAlgorithms3D.distancePointSegment(D, A, B)
    
    const x1 = A.x + s * (B.x - A.x)
    const y1 = A.y + s * (B.y - A.y)
    const z1 = A.getZ() + s * (B.getZ() - A.getZ())
    const x2 = C.x + t * (D.x - C.x)
    const y2 = C.y + t * (D.y - C.y)
    const z2 = C.getZ() + t * (D.getZ() - C.getZ())
    return CGAlgorithms3D.distance(new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2))
  }
  static distance(p0, p1) {
    if (Double.isNaN(p0.getZ()) || Double.isNaN(p1.getZ())) return p0.distance(p1)
    const dx = p0.x - p1.x
    const dy = p0.y - p1.y
    const dz = p0.getZ() - p1.getZ()
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }
  static distancePointSegment(p, A, B) {
    if (A.equals3D(B)) return CGAlgorithms3D.distance(p, A)
    const len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y) + (B.getZ() - A.getZ()) * (B.getZ() - A.getZ())
    if (Double.isNaN(len2)) throw new IllegalArgumentException('Ordinates must not be NaN')
    const r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y) + (p.getZ() - A.getZ()) * (B.getZ() - A.getZ())) / len2
    if (r <= 0.0) return CGAlgorithms3D.distance(p, A)
    if (r >= 1.0) return CGAlgorithms3D.distance(p, B)
    const qx = A.x + r * (B.x - A.x)
    const qy = A.y + r * (B.y - A.y)
    const qz = A.getZ() + r * (B.getZ() - A.getZ())
    const dx = p.x - qx
    const dy = p.y - qy
    const dz = p.getZ() - qz
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }
}
