import IndexedPointOnLineLocator from './IndexedPointOnLineLocator.js'
import Location from '../../geom/Location.js'
import CoordinateList from '../../geom/CoordinateList.js'
import HashSet from '../../../../../java/util/HashSet.js'
import CoordinateFilter from '../../geom/CoordinateFilter.js'
import GeometryFactory from '../../geom/GeometryFactory.js'
import OverlayNG from './OverlayNG.js'
import OverlayUtil from './OverlayUtil.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator.js'
import Assert from '../../util/Assert.js'
export default class OverlayMixedPoints {
  constructor() {
    OverlayMixedPoints.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._opCode = null
    this._pm = null
    this._geomPoint = null
    this._geomNonPointInput = null
    this._geometryFactory = null
    this._isPointRHS = null
    this._geomNonPoint = null
    this._geomNonPointDim = null
    this._locator = null
    this._resultDim = null
    const opCode = arguments[0], geom0 = arguments[1], geom1 = arguments[2], pm = arguments[3]
    this._opCode = opCode
    this._pm = pm
    this._geometryFactory = geom0.getFactory()
    this._resultDim = OverlayUtil.resultDimension(opCode, geom0.getDimension(), geom1.getDimension())
    if (geom0.getDimension() === 0) {
      this._geomPoint = geom0
      this._geomNonPointInput = geom1
      this._isPointRHS = false
    } else {
      this._geomPoint = geom1
      this._geomNonPointInput = geom0
      this._isPointRHS = true
    }
  }
  static overlay(opCode, geom0, geom1, pm) {
    const overlay = new OverlayMixedPoints(opCode, geom0, geom1, pm)
    return overlay.getResult()
  }
  static extractCoordinates(points, pm) {
    const coords = new CoordinateList()
    points.apply(new (class {
      get interfaces_() {
        return [CoordinateFilter]
      }
      filter(coord) {
        const p = OverlayUtil.round(coord, pm)
        coords.add(p, false)
      }
    })())
    return coords.toCoordinateArray()
  }
  static extractPolygons(geom) {
    const list = new ArrayList()
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const poly = geom.getGeometryN(i)
      if (!poly.isEmpty()) 
        list.add(poly)
      
    }
    return list
  }
  static extractLines(geom) {
    const list = new ArrayList()
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const line = geom.getGeometryN(i)
      if (!line.isEmpty()) 
        list.add(line)
      
    }
    return list
  }
  createLocator(geomNonPoint) {
    if (this._geomNonPointDim === 2) 
      return new IndexedPointInAreaLocator(geomNonPoint)
    else 
      return new IndexedPointOnLineLocator(geomNonPoint)
    
  }
  hasLocation(isCovered, coord) {
    const isExterior = Location.EXTERIOR === this._locator.locate(coord)
    if (isCovered) 
      return !isExterior
    
    return isExterior
  }
  computeIntersection(coords) {
    return this.createPointResult(this.findPoints(true, coords))
  }
  computeDifference(coords) {
    if (this._isPointRHS) 
      return this.copyNonPoint()
    
    return this.createPointResult(this.findPoints(false, coords))
  }
  computeUnion(coords) {
    const resultPointList = this.findPoints(false, coords)
    let resultLineList = null
    if (this._geomNonPointDim === 1) 
      resultLineList = OverlayMixedPoints.extractLines(this._geomNonPoint)
    
    let resultPolyList = null
    if (this._geomNonPointDim === 2) 
      resultPolyList = OverlayMixedPoints.extractPolygons(this._geomNonPoint)
    
    return OverlayUtil.createResultGeometry(resultPolyList, resultLineList, resultPointList, this._geometryFactory)
  }
  getResult() {
    this._geomNonPoint = this.prepareNonPoint(this._geomNonPointInput)
    this._geomNonPointDim = this._geomNonPoint.getDimension()
    this._locator = this.createLocator(this._geomNonPoint)
    const coords = OverlayMixedPoints.extractCoordinates(this._geomPoint, this._pm)
    switch (this._opCode) {
    case OverlayNG.INTERSECTION:
      return this.computeIntersection(coords)
    case OverlayNG.UNION:
    case OverlayNG.SYMDIFFERENCE:
      return this.computeUnion(coords)
    case OverlayNG.DIFFERENCE:
      return this.computeDifference(coords)
    }
    Assert.shouldNeverReachHere('Unknown overlay op code')
    return null
  }
  copyNonPoint() {
    if (this._geomNonPointInput !== this._geomNonPoint) return this._geomNonPoint
    return this._geomNonPoint.copy()
  }
  prepareNonPoint(geomInput) {
    if (this._resultDim === 0) 
      return geomInput
    
    const geomPrep = OverlayNG.union(this._geomNonPointInput, this._pm)
    return geomPrep
  }
  createPointResult(points) {
    if (points.size() === 0) 
      return this._geometryFactory.createEmpty(0)
    else if (points.size() === 1) 
      return points.get(0)
    
    const pointsArray = GeometryFactory.toPointArray(points)
    return this._geometryFactory.createMultiPoint(pointsArray)
  }
  findPoints(isCovered, coords) {
    const resultCoords = new HashSet()
    for (const coord of coords) 
      if (this.hasLocation(isCovered, coord)) 
        resultCoords.add(coord.copy())
      
    
    return this.createPoints(resultCoords)
  }
  createPoints(coords) {
    const points = new ArrayList()
    for (const coord of coords) {
      const point = this._geometryFactory.createPoint(coord)
      points.add(point)
    }
    return points
  }
}
