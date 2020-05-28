import CoordinateList from './CoordinateList'
import Coordinates from './Coordinates'
import MathUtil from '../math/MathUtil'
import System from '../../../../java/lang/System'
import Comparator from '../../../../java/util/Comparator'
import Envelope from './Envelope'
export default class CoordinateArrays {
  static isRing(pts) {
    if (pts.length < 4) return false
    if (!pts[0].equals2D(pts[pts.length - 1])) return false
    return true
  }
  static ptNotInList(testPts, pts) {
    for (let i = 0; i < testPts.length; i++) {
      const testPt = testPts[i]
      if (CoordinateArrays.indexOf(testPt, pts) < 0) return testPt
    }
    return null
  }
  static scroll(coordinates, firstCoordinate) {
    const i = CoordinateArrays.indexOf(firstCoordinate, coordinates)
    if (i < 0) return null
    const newCoordinates = new Array(coordinates.length).fill(null)
    System.arraycopy(coordinates, i, newCoordinates, 0, coordinates.length - i)
    System.arraycopy(coordinates, 0, newCoordinates, coordinates.length - i, i)
    System.arraycopy(newCoordinates, 0, coordinates, 0, coordinates.length)
  }
  static equals() {
    if (arguments.length === 2) {
      const coord1 = arguments[0], coord2 = arguments[1]
      if (coord1 === coord2) return true
      if (coord1 === null || coord2 === null) return false
      if (coord1.length !== coord2.length) return false
      for (let i = 0; i < coord1.length; i++) 
        if (!coord1[i].equals(coord2[i])) return false
      
      return true
    } else if (arguments.length === 3) {
      const coord1 = arguments[0], coord2 = arguments[1], coordinateComparator = arguments[2]
      if (coord1 === coord2) return true
      if (coord1 === null || coord2 === null) return false
      if (coord1.length !== coord2.length) return false
      for (let i = 0; i < coord1.length; i++) 
        if (coordinateComparator.compare(coord1[i], coord2[i]) !== 0) return false
      
      return true
    }
  }
  static intersection(coordinates, env) {
    const coordList = new CoordinateList()
    for (let i = 0; i < coordinates.length; i++) 
      if (env.intersects(coordinates[i])) coordList.add(coordinates[i], true)
    
    return coordList.toCoordinateArray()
  }
  static measures(pts) {
    if (pts === null || pts.length === 0) 
      return 0
    
    let measures = 0
    for (const coordinate of pts) 
      measures = Math.max(measures, Coordinates.measures(coordinate))
    
    return measures
  }
  static hasRepeatedPoints(coord) {
    for (let i = 1; i < coord.length; i++) 
      if (coord[i - 1].equals(coord[i])) 
        return true
      
    
    return false
  }
  static removeRepeatedPoints(coord) {
    if (!CoordinateArrays.hasRepeatedPoints(coord)) return coord
    const coordList = new CoordinateList(coord, false)
    return coordList.toCoordinateArray()
  }
  static reverse(coord) {
    const last = coord.length - 1
    const mid = Math.trunc(last / 2)
    for (let i = 0; i <= mid; i++) {
      const tmp = coord[i]
      coord[i] = coord[last - i]
      coord[last - i] = tmp
    }
  }
  static removeNull(coord) {
    let nonNull = 0
    for (let i = 0; i < coord.length; i++) 
      if (coord[i] !== null) nonNull++
    
    const newCoord = new Array(nonNull).fill(null)
    if (nonNull === 0) return newCoord
    let j = 0
    for (let i = 0; i < coord.length; i++) 
      if (coord[i] !== null) newCoord[j++] = coord[i]
    
    return newCoord
  }
  static copyDeep() {
    if (arguments.length === 1) {
      const coordinates = arguments[0]
      const copy = new Array(coordinates.length).fill(null)
      for (let i = 0; i < coordinates.length; i++) 
        copy[i] = coordinates[i].copy()
      
      return copy
    } else if (arguments.length === 5) {
      const src = arguments[0], srcStart = arguments[1], dest = arguments[2], destStart = arguments[3], length = arguments[4]
      for (let i = 0; i < length; i++) 
        dest[destStart + i] = src[srcStart + i].copy()
      
    }
  }
  static isEqualReversed(pts1, pts2) {
    for (let i = 0; i < pts1.length; i++) {
      const p1 = pts1[i]
      const p2 = pts2[pts1.length - i - 1]
      if (p1.compareTo(p2) !== 0) return false
    }
    return true
  }
  static envelope(coordinates) {
    const env = new Envelope()
    for (let i = 0; i < coordinates.length; i++) 
      env.expandToInclude(coordinates[i])
    
    return env
  }
  static toCoordinateArray(coordList) {
    return coordList.toArray(CoordinateArrays.coordArrayType)
  }
  static dimension(pts) {
    if (pts === null || pts.length === 0) 
      return 3
    
    let dimension = 0
    for (const coordinate of pts) 
      dimension = Math.max(dimension, Coordinates.dimension(coordinate))
    
    return dimension
  }
  static atLeastNCoordinatesOrNothing(n, c) {
    return c.length >= n ? c : []
  }
  static indexOf(coordinate, coordinates) {
    for (let i = 0; i < coordinates.length; i++) 
      if (coordinate.equals(coordinates[i])) 
        return i
      
    
    return -1
  }
  static increasingDirection(pts) {
    for (let i = 0; i < Math.trunc(pts.length / 2); i++) {
      const j = pts.length - 1 - i
      const comp = pts[i].compareTo(pts[j])
      if (comp !== 0) return comp
    }
    return 1
  }
  static compare(pts1, pts2) {
    let i = 0
    while (i < pts1.length && i < pts2.length) {
      const compare = pts1[i].compareTo(pts2[i])
      if (compare !== 0) return compare
      i++
    }
    if (i < pts2.length) return -1
    if (i < pts1.length) return 1
    return 0
  }
  static minCoordinate(coordinates) {
    let minCoord = null
    for (let i = 0; i < coordinates.length; i++) 
      if (minCoord === null || minCoord.compareTo(coordinates[i]) > 0) 
        minCoord = coordinates[i]
      
    
    return minCoord
  }
  static extract(pts, start, end) {
    start = MathUtil.clamp(start, 0, pts.length)
    end = MathUtil.clamp(end, -1, pts.length)
    let npts = end - start + 1
    if (end < 0) npts = 0
    if (start >= pts.length) npts = 0
    if (end < start) npts = 0
    const extractPts = new Array(npts).fill(null)
    if (npts === 0) return extractPts
    let iPts = 0
    for (let i = start; i <= end; i++) 
      extractPts[iPts++] = pts[i]
    
    return extractPts
  }
}
class ForwardComparator {
  compare(o1, o2) {
    const pts1 = o1
    const pts2 = o2
    return CoordinateArrays.compare(pts1, pts2)
  }
  get interfaces_() {
    return [Comparator]
  }
}
class BidirectionalComparator {
  compare(o1, o2) {
    const pts1 = o1
    const pts2 = o2
    if (pts1.length < pts2.length) return -1
    if (pts1.length > pts2.length) return 1
    if (pts1.length === 0) return 0
    const forwardComp = CoordinateArrays.compare(pts1, pts2)
    const isEqualRev = CoordinateArrays.isEqualReversed(pts1, pts2)
    if (isEqualRev) return 0
    return forwardComp
  }
  OLDcompare(o1, o2) {
    const pts1 = o1
    const pts2 = o2
    if (pts1.length < pts2.length) return -1
    if (pts1.length > pts2.length) return 1
    if (pts1.length === 0) return 0
    const dir1 = CoordinateArrays.increasingDirection(pts1)
    const dir2 = CoordinateArrays.increasingDirection(pts2)
    let i1 = dir1 > 0 ? 0 : pts1.length - 1
    let i2 = dir2 > 0 ? 0 : pts1.length - 1
    for (let i = 0; i < pts1.length; i++) {
      const comparePt = pts1[i1].compareTo(pts2[i2])
      if (comparePt !== 0) return comparePt
      i1 += dir1
      i2 += dir2
    }
    return 0
  }
  get interfaces_() {
    return [Comparator]
  }
}
CoordinateArrays.ForwardComparator = ForwardComparator
CoordinateArrays.BidirectionalComparator = BidirectionalComparator
CoordinateArrays.coordArrayType = new Array(0).fill(null)
