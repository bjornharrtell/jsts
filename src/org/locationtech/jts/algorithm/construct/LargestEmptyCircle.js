import Location from '../../geom/Location'
import PriorityQueue from '../../../../../java/util/PriorityQueue'
import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import Centroid from '../Centroid'
import Comparable from '../../../../../java/lang/Comparable'
import IndexedFacetDistance from '../../operation/distance/IndexedFacetDistance'
import IndexedPointInAreaLocator from '../locate/IndexedPointInAreaLocator'
export default class LargestEmptyCircle {
  constructor() {
    LargestEmptyCircle.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._obstacles = null
    this._tolerance = null
    this._factory = null
    this._boundary = null
    this._ptLocater = null
    this._obstacleDistance = null
    this._boundaryDistance = null
    this._farthestCell = null
    this._centerCell = null
    this._centerPt = null
    this._centerPoint = null
    this._radiusPt = null
    this._radiusPoint = null
    const obstacles = arguments[0], tolerance = arguments[1]
    if (obstacles.isEmpty()) 
      throw new IllegalArgumentException('Empty obstacles geometry is not supported')
    
    this._obstacles = obstacles
    this._factory = obstacles.getFactory()
    this._tolerance = tolerance
    this._obstacleDistance = new IndexedFacetDistance(obstacles)
    this.setBoundary(obstacles)
  }
  static getCenter(obstacles, tolerance) {
    const lec = new LargestEmptyCircle(obstacles, tolerance)
    return lec.getCenter()
  }
  static getRadiusLine(obstacles, tolerance) {
    const lec = new LargestEmptyCircle(obstacles, tolerance)
    return lec.getRadiusLine()
  }
  getRadiusLine() {
    this.compute()
    const radiusLine = this._factory.createLineString([this._centerPt.copy(), this._radiusPt.copy()])
    return radiusLine
  }
  compute() {
    if (this._centerCell !== null) return null
    if (this._ptLocater === null) {
      const pt = this._obstacles.getCoordinate()
      this._centerPt = pt.copy()
      this._centerPoint = this._factory.createPoint(pt)
      this._radiusPt = pt.copy()
      this._radiusPoint = this._factory.createPoint(pt)
      return null
    }
    const cellQueue = new PriorityQueue()
    this.createInitialGrid(this._obstacles.getEnvelopeInternal(), cellQueue)
    this._farthestCell = this.createCentroidCell(this._obstacles)
    while (!cellQueue.isEmpty()) {
      const cell = cellQueue.remove()
      if (cell.getDistance() > this._farthestCell.getDistance()) 
        this._farthestCell = cell
      
      if (this.mayContainCircleCenter(cell)) {
        const h2 = cell.getHSide() / 2
        cellQueue.add(this.createCell(cell.getX() - h2, cell.getY() - h2, h2))
        cellQueue.add(this.createCell(cell.getX() + h2, cell.getY() - h2, h2))
        cellQueue.add(this.createCell(cell.getX() - h2, cell.getY() + h2, h2))
        cellQueue.add(this.createCell(cell.getX() + h2, cell.getY() + h2, h2))
      }
    }
    this._centerCell = this._farthestCell
    this._centerPt = new Coordinate(this._centerCell.getX(), this._centerCell.getY())
    this._centerPoint = this._factory.createPoint(this._centerPt)
    const nearestPts = this._obstacleDistance.nearestPoints(this._centerPoint)
    this._radiusPt = nearestPts[0].copy()
    this._radiusPoint = this._factory.createPoint(this._radiusPt)
  }
  getRadiusPoint() {
    this.compute()
    return this._radiusPoint
  }
  createCentroidCell(geom) {
    const p = this._factory.createPoint(Centroid.getCentroid(geom))
    return new Cell(p.getX(), p.getY(), 0, this.distanceToConstraints(p))
  }
  getCenter() {
    this.compute()
    return this._centerPoint
  }
  distanceToConstraints() {
    if (arguments.length === 1) {
      const p = arguments[0]
      const isOutide = Location.EXTERIOR === this._ptLocater.locate(p.getCoordinate())
      if (isOutide) {
        const boundaryDist = this._boundaryDistance.distance(p)
        return -boundaryDist
      }
      const dist = this._obstacleDistance.distance(p)
      return dist
    } else if (arguments.length === 2) {
      const x = arguments[0], y = arguments[1]
      const coord = new Coordinate(x, y)
      const pt = this._factory.createPoint(coord)
      return this.distanceToConstraints(pt)
    }
  }
  mayContainCircleCenter(cell) {
    if (cell.isFullyOutside()) return false
    if (cell.isOutside()) {
      const isOverlapSignificant = cell.getMaxDistance() > this._tolerance
      return isOverlapSignificant
    }
    const potentialIncrease = cell.getMaxDistance() - this._farthestCell.getDistance()
    return potentialIncrease > this._tolerance
  }
  createCell(x, y, h) {
    return new Cell(x, y, h, this.distanceToConstraints(x, y))
  }
  createInitialGrid(env, cellQueue) {
    const minX = env.getMinX()
    const maxX = env.getMaxX()
    const minY = env.getMinY()
    const maxY = env.getMaxY()
    const width = env.getWidth()
    const height = env.getHeight()
    const cellSize = Math.min(width, height)
    const hSize = cellSize / 2.0
    for (let x = minX; x < maxX; x += cellSize) 
      for (let y = minY; y < maxY; y += cellSize) 
        cellQueue.add(this.createCell(x + hSize, y + hSize, hSize))
      
    
  }
  setBoundary(obstacles) {
    this._boundary = obstacles.convexHull()
    if (this._boundary.getDimension() >= 2) {
      this._ptLocater = new IndexedPointInAreaLocator(this._boundary)
      this._boundaryDistance = new IndexedFacetDistance(this._boundary)
    }
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
    const x = arguments[0], y = arguments[1], hSide = arguments[2], distanceToConstraints = arguments[3]
    this._x = x
    this._y = y
    this._hSide = hSide
    this._distance = distanceToConstraints
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
  getDistance() {
    return this._distance
  }
  isOutside() {
    return this._distance < 0
  }
  getY() {
    return this._y
  }
  isFullyOutside() {
    return this.getMaxDistance() < 0
  }
  get interfaces_() {
    return [Comparable]
  }
}
Cell.SQRT2 = 1.4142135623730951
LargestEmptyCircle.Cell = Cell
