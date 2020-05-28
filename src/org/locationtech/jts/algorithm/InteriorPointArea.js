import Coordinate from '../geom/Coordinate'
import Polygon from '../geom/Polygon'
import Double from '../../../../java/lang/Double'
import GeometryCollection from '../geom/GeometryCollection'
import ArrayList from '../../../../java/util/ArrayList'
import Comparator from '../../../../java/util/Comparator'
import Assert from '../util/Assert'
export default class InteriorPointArea {
  constructor() {
    InteriorPointArea.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._interiorPoint = null
    this._maxWidth = -1
    const g = arguments[0]
    this.process(g)
  }
  static getInteriorPoint(geom) {
    const intPt = new InteriorPointArea(geom)
    return intPt.getInteriorPoint()
  }
  static avg(a, b) {
    return (a + b) / 2.0
  }
  getInteriorPoint() {
    return this._interiorPoint
  }
  process(geom) {
    if (geom.isEmpty()) return null
    if (geom instanceof Polygon) {
      this.processPolygon(geom)
    } else if (geom instanceof GeometryCollection) {
      const gc = geom
      for (let i = 0; i < gc.getNumGeometries(); i++) 
        this.process(gc.getGeometryN(i))
      
    }
  }
  processPolygon(polygon) {
    const intPtPoly = new InteriorPointPolygon(polygon)
    intPtPoly.process()
    const width = intPtPoly.getWidth()
    if (width > this._maxWidth) {
      this._maxWidth = width
      this._interiorPoint = intPtPoly.getInteriorPoint()
    }
  }
}
class InteriorPointPolygon {
  constructor() {
    InteriorPointPolygon.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._polygon = null
    this._interiorPointY = null
    this._interiorSectionWidth = 0.0
    this._interiorPoint = null
    const polygon = arguments[0]
    this._polygon = polygon
    this._interiorPointY = ScanLineYOrdinateFinder.getScanLineY(polygon)
  }
  static isEdgeCrossingCounted(p0, p1, scanY) {
    const y0 = p0.getY()
    const y1 = p1.getY()
    if (y0 === y1) return false
    if (y0 === scanY && y1 < scanY) return false
    if (y1 === scanY && y0 < scanY) return false
    return true
  }
  static intersectsHorizontalLine() {
    if (arguments.length === 2) {
      const env = arguments[0], y = arguments[1]
      if (y < env.getMinY()) return false
      if (y > env.getMaxY()) return false
      return true
    } else if (arguments.length === 3) {
      const p0 = arguments[0], p1 = arguments[1], y = arguments[2]
      if (p0.getY() > y && p1.getY() > y) return false
      if (p0.getY() < y && p1.getY() < y) return false
      return true
    }
  }
  static intersection(p0, p1, Y) {
    const x0 = p0.getX()
    const x1 = p1.getX()
    if (x0 === x1) return x0
    const segDX = x1 - x0
    const segDY = p1.getY() - p0.getY()
    const m = segDY / segDX
    const x = x0 + (Y - p0.getY()) / m
    return x
  }
  findBestMidpoint(crossings) {
    if (crossings.size() === 0) return null
    Assert.isTrue(0 === crossings.size() % 2, 'Interior Point robustness failure: odd number of scanline crossings')
    crossings.sort(new DoubleComparator())
    for (let i = 0; i < crossings.size(); i += 2) {
      const x1 = crossings.get(i)
      const x2 = crossings.get(i + 1)
      const width = x2 - x1
      if (width > this._interiorSectionWidth) {
        this._interiorSectionWidth = width
        const interiorPointX = InteriorPointArea.avg(x1, x2)
        this._interiorPoint = new Coordinate(interiorPointX, this._interiorPointY)
      }
    }
  }
  process() {
    if (this._polygon.isEmpty()) return null
    this._interiorPoint = new Coordinate(this._polygon.getCoordinate())
    const crossings = new ArrayList()
    this.scanRing(this._polygon.getExteriorRing(), crossings)
    for (let i = 0; i < this._polygon.getNumInteriorRing(); i++) 
      this.scanRing(this._polygon.getInteriorRingN(i), crossings)
    
    this.findBestMidpoint(crossings)
  }
  scanRing(ring, crossings) {
    if (!InteriorPointPolygon.intersectsHorizontalLine(ring.getEnvelopeInternal(), this._interiorPointY)) return null
    const seq = ring.getCoordinateSequence()
    for (let i = 1; i < seq.size(); i++) {
      const ptPrev = seq.getCoordinate(i - 1)
      const pt = seq.getCoordinate(i)
      this.addEdgeCrossing(ptPrev, pt, this._interiorPointY, crossings)
    }
  }
  getWidth() {
    return this._interiorSectionWidth
  }
  getInteriorPoint() {
    return this._interiorPoint
  }
  addEdgeCrossing(p0, p1, scanY, crossings) {
    if (!InteriorPointPolygon.intersectsHorizontalLine(p0, p1, scanY)) return null
    if (!InteriorPointPolygon.isEdgeCrossingCounted(p0, p1, scanY)) return null
    const xInt = InteriorPointPolygon.intersection(p0, p1, scanY)
    crossings.add(xInt)
  }
}
class DoubleComparator {
  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? +1 : 0
  }
  get interfaces_() {
    return [Comparator]
  }
}
InteriorPointPolygon.DoubleComparator = DoubleComparator
class ScanLineYOrdinateFinder {
  constructor() {
    ScanLineYOrdinateFinder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._poly = null
    this._centreY = null
    this._hiY = Double.MAX_VALUE
    this._loY = -Double.MAX_VALUE
    const poly = arguments[0]
    this._poly = poly
    this._hiY = poly.getEnvelopeInternal().getMaxY()
    this._loY = poly.getEnvelopeInternal().getMinY()
    this._centreY = InteriorPointArea.avg(this._loY, this._hiY)
  }
  static getScanLineY(poly) {
    const finder = new ScanLineYOrdinateFinder(poly)
    return finder.getScanLineY()
  }
  updateInterval(y) {
    if (y <= this._centreY) {
      if (y > this._loY) this._loY = y
    } else if (y > this._centreY) {
      if (y < this._hiY) 
        this._hiY = y
      
    }
  }
  getScanLineY() {
    this.process(this._poly.getExteriorRing())
    for (let i = 0; i < this._poly.getNumInteriorRing(); i++) 
      this.process(this._poly.getInteriorRingN(i))
    
    const scanLineY = InteriorPointArea.avg(this._hiY, this._loY)
    return scanLineY
  }
  process(line) {
    const seq = line.getCoordinateSequence()
    for (let i = 0; i < seq.size(); i++) {
      const y = seq.getY(i)
      this.updateInterval(y)
    }
  }
}
InteriorPointArea.InteriorPointPolygon = InteriorPointPolygon
InteriorPointArea.ScanLineYOrdinateFinder = ScanLineYOrdinateFinder
