import BufferParameters from './BufferParameters'
import CoordinateList from '../../geom/CoordinateList'
import GeometryFactory from '../../geom/GeometryFactory'
import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import Double from '../../../../../java/lang/Double'
import LineSegment from '../../geom/LineSegment'
import ArrayList from '../../../../../java/util/ArrayList'
import Angle from '../../algorithm/Angle'
export default class VariableBuffer {
  constructor() {
    VariableBuffer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._line = null
    this._distance = null
    this._geomFactory = null
    this._quadrantSegs = BufferParameters.DEFAULT_QUADRANT_SEGMENTS
    const line = arguments[0], distance = arguments[1]
    this._line = line
    this._distance = distance
    this._geomFactory = line.getFactory()
    if (distance.length !== this._line.getNumPoints()) 
      throw new IllegalArgumentException('Number of distances is not equal to number of vertices')
    
  }
  static buffer() {
    if (arguments.length === 2) {
      const line = arguments[0], distance = arguments[1]
      const vb = new VariableBuffer(line, distance)
      return vb.getResult()
    } else if (arguments.length === 3) {
      const line = arguments[0], startDistance = arguments[1], endDistance = arguments[2]
      const distance = VariableBuffer.interpolate(line, startDistance, endDistance)
      const vb = new VariableBuffer(line, distance)
      return vb.getResult()
    } else if (arguments.length === 4) {
      const line = arguments[0], startDistance = arguments[1], midDistance = arguments[2], endDistance = arguments[3]
      const distance = VariableBuffer.interpolate(line, startDistance, midDistance, endDistance)
      const vb = new VariableBuffer(line, distance)
      return vb.getResult()
    }
  }
  static snapTrig(x) {
    if (x > 1 - VariableBuffer.SNAP_TRIG_TOL) return 1
    if (x < -1 + VariableBuffer.SNAP_TRIG_TOL) return -1
    if (Math.abs(x) < VariableBuffer.SNAP_TRIG_TOL) return 0
    return x
  }
  static interpolate() {
    if (arguments.length === 3) {
      let line = arguments[0], startValue = arguments[1], endValue = arguments[2]
      startValue = Math.abs(startValue)
      endValue = Math.abs(endValue)
      const values = new Array(line.getNumPoints()).fill(null)
      values[0] = startValue
      values[values.length - 1] = endValue
      const totalLen = line.getLength()
      const pts = line.getCoordinates()
      let currLen = 0
      for (let i = 1; i < values.length - 1; i++) {
        const segLen = pts[i].distance(pts[i - 1])
        currLen += segLen
        const lenFrac = currLen / totalLen
        const delta = lenFrac * (endValue - startValue)
        values[i] = startValue + delta
      }
      return values
    } else if (arguments.length === 4) {
      let line = arguments[0], startValue = arguments[1], midValue = arguments[2], endValue = arguments[3]
      startValue = Math.abs(startValue)
      midValue = Math.abs(midValue)
      endValue = Math.abs(endValue)
      const values = new Array(line.getNumPoints()).fill(null)
      values[0] = startValue
      values[values.length - 1] = endValue
      const pts = line.getCoordinates()
      const lineLen = line.getLength()
      const midIndex = VariableBuffer.indexAtLength(pts, lineLen / 2)
      const delMidStart = midValue - startValue
      const delEndMid = endValue - midValue
      const lenSM = VariableBuffer.length(pts, 0, midIndex)
      let currLen = 0
      for (let i = 1; i <= midIndex; i++) {
        const segLen = pts[i].distance(pts[i - 1])
        currLen += segLen
        const lenFrac = currLen / lenSM
        const val = startValue + lenFrac * delMidStart
        values[i] = val
      }
      const lenME = VariableBuffer.length(pts, midIndex, pts.length - 1)
      currLen = 0
      for (let i = midIndex + 1; i < values.length - 1; i++) {
        const segLen = pts[i].distance(pts[i - 1])
        currLen += segLen
        const lenFrac = currLen / lenME
        const val = midValue + lenFrac * delEndMid
        values[i] = val
      }
      return values
    }
  }
  static indexAtLength(pts, targetLen) {
    let len = 0
    for (let i = 1; i < pts.length; i++) {
      len += pts[i].distance(pts[i - 1])
      if (len > targetLen) return i
    }
    return pts.length - 1
  }
  static length(pts, i1, i2) {
    let len = 0
    for (let i = i1 + 1; i <= i2; i++) 
      len += pts[i].distance(pts[i - 1])
    
    return len
  }
  static outerTangent(c1, r1, c2, r2) {
    if (r1 > r2) {
      const seg = VariableBuffer.outerTangent(c2, r2, c1, r1)
      return new LineSegment(seg.p1, seg.p0)
    }
    const x1 = c1.getX()
    const y1 = c1.getY()
    const x2 = c2.getX()
    const y2 = c2.getY()
    const a3 = -Math.atan2(y2 - y1, x2 - x1)
    const dr = r2 - r1
    const d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
    const a2 = Math.asin(dr / d)
    if (Double.isNaN(a2)) return null
    const a1 = a3 - a2
    const aa = Math.PI / 2 - a1
    const x3 = x1 + r1 * Math.cos(aa)
    const y3 = y1 + r1 * Math.sin(aa)
    const x4 = x2 + r2 * Math.cos(aa)
    const y4 = y2 + r2 * Math.sin(aa)
    return new LineSegment(x3, y3, x4, y4)
  }
  static projectPolar(p, r, ang) {
    const x = p.getX() + r * VariableBuffer.snapTrig(Math.cos(ang))
    const y = p.getY() + r * VariableBuffer.snapTrig(Math.sin(ang))
    return new Coordinate(x, y)
  }
  capAngleIndex(ang) {
    const capSegAng = Math.PI / 2 / this._quadrantSegs
    const index = Math.trunc(ang / capSegAng)
    return index
  }
  circle(center, radius) {
    if (radius <= 0) return null
    const nPts = 4 * this._quadrantSegs
    const pts = new Array(nPts + 1).fill(null)
    const angInc = Math.PI / 2 / this._quadrantSegs
    for (let i = 0; i < nPts; i++) 
      pts[i] = VariableBuffer.projectPolar(center, radius, i * angInc)
    
    pts[pts.length - 1] = pts[0].copy()
    return this._geomFactory.createPolygon(pts)
  }
  getResult() {
    const parts = new ArrayList()
    const pts = this._line.getCoordinates()
    for (let i = 1; i < pts.length; i++) {
      const dist0 = this._distance[i - 1]
      const dist1 = this._distance[i]
      if (dist0 > 0 || dist1 > 0) {
        const poly = this.segmentBuffer(pts[i - 1], pts[i], dist0, dist1)
        if (poly !== null) parts.add(poly)
      }
    }
    const partsGeom = this._geomFactory.createGeometryCollection(GeometryFactory.toGeometryArray(parts))
    const buffer = partsGeom.union()
    if (buffer.isEmpty()) 
      return this._geomFactory.createPolygon()
    
    return buffer
  }
  addCap(p, r, t1, t2, coords) {
    let angStart = Angle.angle(p, t1)
    const angEnd = Angle.angle(p, t2)
    if (angStart < angEnd) angStart += 2 * Math.PI
    const indexStart = this.capAngleIndex(angStart)
    const indexEnd = this.capAngleIndex(angEnd)
    for (let i = indexStart; i > indexEnd; i--) {
      const ang = this.capAngle(i)
      coords.add(VariableBuffer.projectPolar(p, r, ang))
    }
  }
  segmentBuffer(p0, p1, dist0, dist1) {
    if (dist0 > dist1) 
      return this.segmentBuffer(p1, p0, dist1, dist0)
    
    const tangent = VariableBuffer.outerTangent(p0, dist0, p1, dist1)
    if (tangent === null) {
      let center = p0
      let dist = dist0
      if (dist1 > dist0) {
        center = p1
        dist = dist1
      }
      return this.circle(center, dist)
    }
    const t0 = tangent.getCoordinate(0)
    const t1 = tangent.getCoordinate(1)
    const seg = new LineSegment(p0, p1)
    const tr0 = seg.reflect(t0)
    const tr1 = seg.reflect(t1)
    const coords = new CoordinateList()
    coords.add(t0)
    coords.add(t1)
    this.addCap(p1, dist1, t1, tr1, coords)
    coords.add(tr1)
    coords.add(tr0)
    this.addCap(p0, dist0, tr0, t0, coords)
    coords.add(t0)
    const pts = coords.toCoordinateArray()
    const polygon = this._geomFactory.createPolygon(pts)
    return polygon
  }
  capAngle(index) {
    const capSegAng = Math.PI / 2 / this._quadrantSegs
    return index * capSegAng
  }
}
VariableBuffer.SNAP_TRIG_TOL = 1e-6
