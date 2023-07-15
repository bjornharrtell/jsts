import LineString from '../geom/LineString.js'
import CoordinateList from '../geom/CoordinateList.js'
import Geometry from '../geom/Geometry.js'
import Coordinate from '../geom/Coordinate.js'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException.js'
import Polygon from '../geom/Polygon.js'
import GeometryMapper from '../geom/util/GeometryMapper.js'
import Angle from '../algorithm/Angle.js'
export default class CubicBezierCurve {
  constructor() {
    CubicBezierCurve.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._minSegmentLength = 0.0
    this._numVerticesPerSegment = 16
    this._inputGeom = null
    this._alpha = -1
    this._skew = 0
    this._controlPoints = null
    this._geomFactory = null
    this._bezierCurvePts = null
    this._interpolationParam = null
    this._controlPointIndex = 0
    if (arguments.length === 2) {
      if (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry) {
        const geom = arguments[0], controlPoints = arguments[1]
        this._inputGeom = geom
        this._geomFactory = geom.getFactory()
        this._controlPoints = controlPoints
      } else if (arguments[0] instanceof Geometry && typeof arguments[1] === 'number') {
        let geom = arguments[0], alpha = arguments[1]
        this._inputGeom = geom
        this._geomFactory = geom.getFactory()
        if (alpha < 0.0) alpha = 0
        this._alpha = alpha
      }
    } else if (arguments.length === 3) {
      let geom = arguments[0], alpha = arguments[1], skew = arguments[2]
      this._inputGeom = geom
      this._geomFactory = geom.getFactory()
      if (alpha < 0.0) alpha = 0
      this._alpha = alpha
      this._skew = skew
    }
  }
  static computeIterpolationParameters(n) {
    const param = Array(n).fill().map(() => Array(4))
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      const tc = 1.0 - t
      param[i][0] = tc * tc * tc
      param[i][1] = 3.0 * tc * tc * t
      param[i][2] = 3.0 * tc * t * t
      param[i][3] = t * t * t
    }
    return param
  }
  static mirrorControlPoint(c, p0, p1) {
    const vlinex = p1.x - p0.x
    const vliney = p1.y - p0.y
    const vrotx = -vliney
    const vroty = vlinex
    const midx = (p0.x + p1.x) / 2
    const midy = (p0.y + p1.y) / 2
    return CubicBezierCurve.reflectPointInLine(c, new Coordinate(midx, midy), new Coordinate(midx + vrotx, midy + vroty))
  }
  static bezierCurve() {
    if (arguments.length === 2) {
      if (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry) {
        const geom = arguments[0], controlPoints = arguments[1]
        const curve = new CubicBezierCurve(geom, controlPoints)
        return curve.getResult()
      } else if (arguments[0] instanceof Geometry && typeof arguments[1] === 'number') {
        const geom = arguments[0], alpha = arguments[1]
        const curve = new CubicBezierCurve(geom, alpha)
        return curve.getResult()
      }
    } else if (arguments.length === 3) {
      const geom = arguments[0], alpha = arguments[1], skew = arguments[2]
      const curve = new CubicBezierCurve(geom, alpha, skew)
      return curve.getResult()
    }
  }
  static reflectPointInLine(p, p0, p1) {
    const vx = p1.x - p0.x
    const vy = p1.y - p0.y
    const x = p0.x - p.x
    const y = p0.y - p.y
    const r = 1 / (vx * vx + vy * vy)
    const rx = p.x + 2 * (x - x * vx * vx * r - y * vx * vy * r)
    const ry = p.y + 2 * (y - y * vy * vy * r - x * vx * vy * r)
    return new Coordinate(rx, ry)
  }
  static aimedControlPoint(c, p1, p0) {
    const len = p1.distance(c)
    const ang = Angle.angle(p0, p1)
    return Angle.project(p0, ang, len)
  }
  getResult() {
    this._bezierCurvePts = new Array(this._numVerticesPerSegment).fill(null)
    this._interpolationParam = CubicBezierCurve.computeIterpolationParameters(this._numVerticesPerSegment)
    return GeometryMapper.flatMap(this._inputGeom, 1, new (class {
      get interfaces_() {
        return [MapOp]
      }
      map(geom) {
        if (geom instanceof LineString) 
          return this.bezierLine(geom)
        
        if (geom instanceof Polygon) 
          return this.bezierPolygon(geom)
        
        return geom.copy()
      }
    })())
  }
  bezierPolygon(poly) {
    const shell = this.bezierRing(poly.getExteriorRing())
    let holes = null
    if (poly.getNumInteriorRing() > 0) {
      holes = new Array(poly.getNumInteriorRing()).fill(null)
      for (let i = 0; i < poly.getNumInteriorRing(); i++) 
        holes[i] = this.bezierRing(poly.getInteriorRingN(i))
      
    }
    return this._geomFactory.createPolygon(shell, holes)
  }
  controlPoints() {
    if (arguments.length === 2) {
      const coords = arguments[0], isRing = arguments[1]
      if (this._controlPoints !== null) {
        if (this._controlPointIndex >= this._controlPoints.getNumGeometries()) 
          throw new IllegalArgumentException('Too few control point elements')
        
        const ctrlPtsGeom = this._controlPoints.getGeometryN(this._controlPointIndex++)
        const ctrlPts = ctrlPtsGeom.getCoordinates()
        const expectedNum1 = 2 * coords.length - 2
        const expectedNum2 = isRing ? coords.length - 1 : coords.length
        if (expectedNum1 !== ctrlPts.length && expectedNum2 !== ctrlPts.length) 
          throw new IllegalArgumentException(String.format('Wrong number of control points for element %d - expected %d or %d, found %d', this._controlPointIndex - 1, expectedNum1, expectedNum2, ctrlPts.length))
        
        return ctrlPts
      }
      return this.controlPoints(coords, isRing, this._alpha, this._skew)
    } else if (arguments.length === 4) {
      const coords = arguments[0], isRing = arguments[1], alpha = arguments[2], skew = arguments[3]
      let N = coords.length
      let start = 1
      let end = N - 1
      if (isRing) {
        N = coords.length - 1
        start = 0
        end = N
      }
      const nControl = 2 * coords.length - 2
      const ctrl = new Array(nControl).fill(null)
      for (let i = start; i < end; i++) {
        const iprev = i === 0 ? N - 1 : i - 1
        const v0 = coords[iprev]
        const v1 = coords[i]
        const v2 = coords[i + 1]
        const interiorAng = Angle.angleBetweenOriented(v0, v1, v2)
        const orient = Math.signum(interiorAng)
        const angBisect = Angle.bisector(v0, v1, v2)
        const ang0 = angBisect - orient * Angle.PI_OVER_2
        const ang1 = angBisect + orient * Angle.PI_OVER_2
        const dist0 = v1.distance(v0)
        const dist1 = v1.distance(v2)
        const lenBase = Math.min(dist0, dist1)
        const intAngAbs = Math.abs(interiorAng)
        const sharpnessFactor = intAngAbs >= Angle.PI_OVER_2 ? 1 : intAngAbs / Angle.PI_OVER_2
        const len = alpha * CubicBezierCurve.CIRCLE_LEN_FACTOR * sharpnessFactor * lenBase
        let stretch0 = 1
        let stretch1 = 1
        if (skew !== 0) {
          const stretch = Math.abs(dist0 - dist1) / Math.max(dist0, dist1)
          let skewIndex = dist0 > dist1 ? 0 : 1
          if (skew < 0) skewIndex = 1 - skewIndex
          if (skewIndex === 0) 
            stretch0 += Math.abs(skew) * stretch
          else 
            stretch1 += Math.abs(skew) * stretch
          
        }
        const ctl0 = Angle.project(v1, ang0, stretch0 * len)
        const ctl1 = Angle.project(v1, ang1, stretch1 * len)
        const index = 2 * i - 1
        const i0 = index < 0 ? nControl - 1 : index
        ctrl[i0] = ctl0
        ctrl[index + 1] = ctl1
      }
      if (!isRing) 
        this.setLineEndControlPoints(coords, ctrl)
      
      return ctrl
    }
  }
  bezierCurve(coords, isRing) {
    const control = this.controlPoints(coords, isRing)
    const curvePts = new CoordinateList()
    for (let i = 0; i < coords.length - 1; i++) {
      const ctrlIndex = 2 * i
      this.addCurve(coords[i], coords[i + 1], control[ctrlIndex], control[ctrlIndex + 1], curvePts)
    }
    return curvePts
  }
  setLineEndControlPoints(coords, ctrl) {
    const N = ctrl.length
    ctrl[0] = CubicBezierCurve.mirrorControlPoint(ctrl[1], coords[1], coords[0])
    ctrl[N - 1] = CubicBezierCurve.mirrorControlPoint(ctrl[N - 2], coords[coords.length - 1], coords[coords.length - 2])
  }
  bezierRing(ring) {
    const coords = ring.getCoordinates()
    const curvePts = this.bezierCurve(coords, true)
    curvePts.closeRing()
    return this._geomFactory.createLinearRing(curvePts.toCoordinateArray())
  }
  cubicBezier(p0, p1, ctrl1, ctrl2, param, curve) {
    const n = curve.length
    curve[0] = new Coordinate(p0)
    curve[n - 1] = new Coordinate(p1)
    for (let i = 1; i < n - 1; i++) {
      const c = new Coordinate()
      const sum = param[i][0] + param[i][1] + param[i][2] + param[i][3]
      c.x = param[i][0] * p0.x + param[i][1] * ctrl1.x + param[i][2] * ctrl2.x + param[i][3] * p1.x
      c.x /= sum
      c.y = param[i][0] * p0.y + param[i][1] * ctrl1.y + param[i][2] * ctrl2.y + param[i][3] * p1.y
      c.y /= sum
      curve[i] = c
    }
  }
  addCurve(p0, p1, ctrl0, crtl1, curvePts) {
    const len = p0.distance(p1)
    if (len < this._minSegmentLength) {
      curvePts.add(new Coordinate(p0))
    } else {
      this.cubicBezier(p0, p1, ctrl0, crtl1, this._interpolationParam, this._bezierCurvePts)
      for (let i = 0; i < this._bezierCurvePts.length - 1; i++) 
        curvePts.add(this._bezierCurvePts[i], false)
      
    }
  }
  bezierLine(ls) {
    const coords = ls.getCoordinates()
    const curvePts = this.bezierCurve(coords, false)
    curvePts.add(coords[coords.length - 1].copy(), false)
    return this._geomFactory.createLineString(curvePts.toCoordinateArray())
  }
}
CubicBezierCurve.CIRCLE_LEN_FACTOR = 3.0 / 8.0
