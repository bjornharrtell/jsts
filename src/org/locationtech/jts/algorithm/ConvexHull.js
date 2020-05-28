import TreeSet from '../../../../java/util/TreeSet'
import CoordinateList from '../geom/CoordinateList'
import Arrays from '../../../../java/util/Arrays'
import PointLocation from './PointLocation'
import Stack from '../../../../java/util/Stack'
import Orientation from './Orientation'
import CoordinateArrays from '../geom/CoordinateArrays'
import ArrayList from '../../../../java/util/ArrayList'
import Comparator from '../../../../java/util/Comparator'
import UniqueCoordinateArrayFilter from '../util/UniqueCoordinateArrayFilter'
import Assert from '../util/Assert'
export default class ConvexHull {
  constructor() {
    ConvexHull.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geomFactory = null
    this._inputPts = null
    if (arguments.length === 1) {
      const geometry = arguments[0]
      ConvexHull.constructor_.call(this, ConvexHull.extractCoordinates(geometry), geometry.getFactory())
    } else if (arguments.length === 2) {
      const pts = arguments[0], geomFactory = arguments[1]
      this._inputPts = UniqueCoordinateArrayFilter.filterCoordinates(pts)
      this._geomFactory = geomFactory
    }
  }
  static extractCoordinates(geom) {
    const filter = new UniqueCoordinateArrayFilter()
    geom.apply(filter)
    return filter.getCoordinates()
  }
  preSort(pts) {
    let t = null
    for (let i = 1; i < pts.length; i++) 
      if (pts[i].y < pts[0].y || pts[i].y === pts[0].y && pts[i].x < pts[0].x) {
        t = pts[0]
        pts[0] = pts[i]
        pts[i] = t
      }
    
    Arrays.sort(pts, 1, pts.length, new RadialComparator(pts[0]))
    return pts
  }
  computeOctRing(inputPts) {
    const octPts = this.computeOctPts(inputPts)
    const coordList = new CoordinateList()
    coordList.add(octPts, false)
    if (coordList.size() < 3) 
      return null
    
    coordList.closeRing()
    return coordList.toCoordinateArray()
  }
  lineOrPolygon(coordinates) {
    coordinates = this.cleanRing(coordinates)
    if (coordinates.length === 3) 
      return this._geomFactory.createLineString([coordinates[0], coordinates[1]])
    
    const linearRing = this._geomFactory.createLinearRing(coordinates)
    return this._geomFactory.createPolygon(linearRing)
  }
  cleanRing(original) {
    Assert.equals(original[0], original[original.length - 1])
    const cleanedRing = new ArrayList()
    let previousDistinctCoordinate = null
    for (let i = 0; i <= original.length - 2; i++) {
      const currentCoordinate = original[i]
      const nextCoordinate = original[i + 1]
      if (currentCoordinate.equals(nextCoordinate)) 
        continue
      
      if (previousDistinctCoordinate !== null && this.isBetween(previousDistinctCoordinate, currentCoordinate, nextCoordinate)) 
        continue
      
      cleanedRing.add(currentCoordinate)
      previousDistinctCoordinate = currentCoordinate
    }
    cleanedRing.add(original[original.length - 1])
    const cleanedRingCoordinates = new Array(cleanedRing.size()).fill(null)
    return cleanedRing.toArray(cleanedRingCoordinates)
  }
  isBetween(c1, c2, c3) {
    if (Orientation.index(c1, c2, c3) !== 0) 
      return false
    
    if (c1.x !== c3.x) {
      if (c1.x <= c2.x && c2.x <= c3.x) 
        return true
      
      if (c3.x <= c2.x && c2.x <= c1.x) 
        return true
      
    }
    if (c1.y !== c3.y) {
      if (c1.y <= c2.y && c2.y <= c3.y) 
        return true
      
      if (c3.y <= c2.y && c2.y <= c1.y) 
        return true
      
    }
    return false
  }
  reduce(inputPts) {
    const polyPts = this.computeOctRing(inputPts)
    if (polyPts === null) return inputPts
    const reducedSet = new TreeSet()
    for (let i = 0; i < polyPts.length; i++) 
      reducedSet.add(polyPts[i])
    
    for (let i = 0; i < inputPts.length; i++) 
      if (!PointLocation.isInRing(inputPts[i], polyPts)) 
        reducedSet.add(inputPts[i])
      
    
    const reducedPts = CoordinateArrays.toCoordinateArray(reducedSet)
    if (reducedPts.length < 3) return this.padArray3(reducedPts)
    return reducedPts
  }
  getConvexHull() {
    if (this._inputPts.length === 0) 
      return this._geomFactory.createGeometryCollection()
    
    if (this._inputPts.length === 1) 
      return this._geomFactory.createPoint(this._inputPts[0])
    
    if (this._inputPts.length === 2) 
      return this._geomFactory.createLineString(this._inputPts)
    
    let reducedPts = this._inputPts
    if (this._inputPts.length > 50) 
      reducedPts = this.reduce(this._inputPts)
    
    const sortedPts = this.preSort(reducedPts)
    const cHS = this.grahamScan(sortedPts)
    const cH = this.toCoordinateArray(cHS)
    return this.lineOrPolygon(cH)
  }
  padArray3(pts) {
    const pad = new Array(3).fill(null)
    for (let i = 0; i < pad.length; i++) 
      if (i < pts.length) 
        pad[i] = pts[i]
      else pad[i] = pts[0]
    
    return pad
  }
  computeOctPts(inputPts) {
    const pts = new Array(8).fill(null)
    for (let j = 0; j < pts.length; j++) 
      pts[j] = inputPts[0]
    
    for (let i = 1; i < inputPts.length; i++) {
      if (inputPts[i].x < pts[0].x) 
        pts[0] = inputPts[i]
      
      if (inputPts[i].x - inputPts[i].y < pts[1].x - pts[1].y) 
        pts[1] = inputPts[i]
      
      if (inputPts[i].y > pts[2].y) 
        pts[2] = inputPts[i]
      
      if (inputPts[i].x + inputPts[i].y > pts[3].x + pts[3].y) 
        pts[3] = inputPts[i]
      
      if (inputPts[i].x > pts[4].x) 
        pts[4] = inputPts[i]
      
      if (inputPts[i].x - inputPts[i].y > pts[5].x - pts[5].y) 
        pts[5] = inputPts[i]
      
      if (inputPts[i].y < pts[6].y) 
        pts[6] = inputPts[i]
      
      if (inputPts[i].x + inputPts[i].y < pts[7].x + pts[7].y) 
        pts[7] = inputPts[i]
      
    }
    return pts
  }
  toCoordinateArray(stack) {
    const coordinates = new Array(stack.size()).fill(null)
    for (let i = 0; i < stack.size(); i++) {
      const coordinate = stack.get(i)
      coordinates[i] = coordinate
    }
    return coordinates
  }
  grahamScan(c) {
    let p = null
    const ps = new Stack()
    ps.push(c[0])
    ps.push(c[1])
    ps.push(c[2])
    for (let i = 3; i < c.length; i++) {
      p = ps.pop()
      while (!ps.empty() && Orientation.index(ps.peek(), p, c[i]) > 0) 
        p = ps.pop()
      
      ps.push(p)
      ps.push(c[i])
    }
    ps.push(c[0])
    return ps
  }
}
class RadialComparator {
  constructor() {
    RadialComparator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._origin = null
    const origin = arguments[0]
    this._origin = origin
  }
  static polarCompare(o, p, q) {
    const dxp = p.x - o.x
    const dyp = p.y - o.y
    const dxq = q.x - o.x
    const dyq = q.y - o.y
    const orient = Orientation.index(o, p, q)
    if (orient === Orientation.COUNTERCLOCKWISE) return 1
    if (orient === Orientation.CLOCKWISE) return -1
    const op = dxp * dxp + dyp * dyp
    const oq = dxq * dxq + dyq * dyq
    if (op < oq) 
      return -1
    
    if (op > oq) 
      return 1
    
    return 0
  }
  compare(o1, o2) {
    const p1 = o1
    const p2 = o2
    return RadialComparator.polarCompare(this._origin, p1, p2)
  }
  get interfaces_() {
    return [Comparator]
  }
}
ConvexHull.RadialComparator = RadialComparator
