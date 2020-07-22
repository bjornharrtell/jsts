import Location from '../../geom/Location'
import PriorityQueue from '../../../../../java/util/PriorityQueue'
import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import Polygon from '../../geom/Polygon'
import MultiPolygon from '../../geom/MultiPolygon'
import Centroid from '../Centroid'
import Comparable from '../../../../../java/lang/Comparable'
import IndexedFacetDistance from '../../operation/distance/IndexedFacetDistance'
import Envelope from '../../geom/Envelope'
import IndexedPointInAreaLocator from '../locate/IndexedPointInAreaLocator'
export default class MaximumInscribedCircle {
  constructor() {
    MaximumInscribedCircle.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._tolerance = null
    this._factory = null
    this._ptLocater = null
    this._indexedDistance = null
    this._centerCell = null
    this._centerPt = null
    this._radiusPt = null
    this._centerPoint = null
    this._radiusPoint = null
    const polygonal = arguments[0], tolerance = arguments[1]
    if (!(polygonal instanceof Polygon || polygonal instanceof MultiPolygon)) 
      throw new IllegalArgumentException('Input geometry must be a Polygon or MultiPolygon')
    
    if (polygonal.isEmpty()) 
      throw new IllegalArgumentException('Empty input geometry is not supported')
    
    this._inputGeom = polygonal
    this._factory = polygonal.getFactory()
    this._tolerance = tolerance
    this._ptLocater = new IndexedPointInAreaLocator(polygonal)
    this._indexedDistance = new IndexedFacetDistance(polygonal.getBoundary())
  }
  static getCenter(polygonal, tolerance) {
    const mic = new MaximumInscribedCircle(polygonal, tolerance)
    return mic.getCenter()
  }
  static getRadiusLine(polygonal, tolerance) {
    const mic = new MaximumInscribedCircle(polygonal, tolerance)
    return mic.getRadiusLine()
  }
  distanceToBoundary() {
    if (arguments.length === 1) {
      const p = arguments[0]
      const dist = this._indexedDistance.distance(p)
      const isOutide = Location.EXTERIOR === this._ptLocater.locate(p.getCoordinate())
      if (isOutide) return -dist
      return dist
    } else if (arguments.length === 2) {
      const x = arguments[0], y = arguments[1]
      const coord = new Coordinate(x, y)
      const pt = this._factory.createPoint(coord)
      return this.distanceToBoundary(pt)
    }
  }
  getRadiusLine() {
    this.compute()
    const radiusLine = this._factory.createLineString([this._centerPt.copy(), this._radiusPt.copy()])
    return radiusLine
  }
  compute() {
    if (this._centerCell !== null) return null
    const cellQueue = new PriorityQueue()
    this.createInitialGrid(this._inputGeom.getEnvelopeInternal(), cellQueue)
    let farthestCell = this.createCentroidCell(this._inputGeom)
    while (!cellQueue.isEmpty()) {
      const cell = cellQueue.remove()
      if (cell.getDistance() > farthestCell.getDistance()) 
        farthestCell = cell
      
      const potentialIncrease = cell.getMaxDistance() - farthestCell.getDistance()
      if (potentialIncrease > this._tolerance) {
        const h2 = cell.getHSide() / 2
        cellQueue.add(this.createCell(cell.getX() - h2, cell.getY() - h2, h2))
        cellQueue.add(this.createCell(cell.getX() + h2, cell.getY() - h2, h2))
        cellQueue.add(this.createCell(cell.getX() - h2, cell.getY() + h2, h2))
        cellQueue.add(this.createCell(cell.getX() + h2, cell.getY() + h2, h2))
      }
    }
    this._centerCell = farthestCell
    this._centerPt = new Coordinate(this._centerCell.getX(), this._centerCell.getY())
    this._centerPoint = this._factory.createPoint(this._centerPt)
    const nearestPts = this._indexedDistance.nearestPoints(this._centerPoint)
    this._radiusPt = nearestPts[0].copy()
    this._radiusPoint = this._factory.createPoint(this._radiusPt)
  }
  getRadiusPoint() {
    this.compute()
    return this._radiusPoint
  }
  createCentroidCell(geom) {
    const p = this._factory.createPoint(Centroid.getCentroid(geom))
    return new Cell(p.getX(), p.getY(), 0, this.distanceToBoundary(p))
  }
  getCenter() {
    this.compute()
    return this._centerPoint
  }
  createCell(x, y, hSide) {
    return new Cell(x, y, hSide, this.distanceToBoundary(x, y))
  }
  createInitialGrid(env, cellQueue) {
    const minX = env.getMinX()
    const maxX = env.getMaxX()
    const minY = env.getMinY()
    const maxY = env.getMaxY()
    const width = env.getWidth()
    const height = env.getHeight()
    const cellSize = Math.min(width, height)
    const hSide = cellSize / 2.0
    for (let x = minX; x < maxX; x += cellSize) 
      for (let y = minY; y < maxY; y += cellSize) 
        cellQueue.add(this.createCell(x + hSide, y + hSide, hSide))
      
    
  }
}
class Cell {
  constructor() {
    Cell.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._x = null
    this._y = null
    this._hSide = null
    this._distance = null
    this._maxDist = null
    const x = arguments[0], y = arguments[1], hSide = arguments[2], distanceToBoundary = arguments[3]
    this._x = x
    this._y = y
    this._hSide = hSide
    this._distance = distanceToBoundary
    this._maxDist = this._distance + hSide * Cell.SQRT2
  }
  getHSide() {
    return this._hSide
  }
  compareTo(o) {
    return Math.trunc(o._maxDist - this._maxDist)
  }
  getX() {
    return this._x
  }
  getMaxDistance() {
    return this._maxDist
  }
  getEnvelope() {
    return new Envelope(this._x - this._hSide, this._x + this._hSide, this._y - this._hSide, this._y + this._hSide)
  }
  getDistance() {
    return this._distance
  }
  getY() {
    return this._y
  }
  get interfaces_() {
    return [Comparable]
  }
}
Cell.SQRT2 = 1.4142135623730951
MaximumInscribedCircle.Cell = Cell
