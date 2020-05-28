import Coordinate from '../geom/Coordinate'
import Orientation from './Orientation'
import Intersection from './Intersection'
import CGAlgorithmsDD from './CGAlgorithmsDD'
import System from '../../../../java/lang/System'
import Envelope from '../geom/Envelope'
import Distance from './Distance'
import LineIntersector from './LineIntersector'
export default class RobustLineIntersector extends LineIntersector {
  constructor() {
    super()
  }
  static nearestEndpoint(p1, p2, q1, q2) {
    let nearestPt = p1
    let minDist = Distance.pointToSegment(p1, q1, q2)
    let dist = Distance.pointToSegment(p2, q1, q2)
    if (dist < minDist) {
      minDist = dist
      nearestPt = p2
    }
    dist = Distance.pointToSegment(q1, p1, p2)
    if (dist < minDist) {
      minDist = dist
      nearestPt = q1
    }
    dist = Distance.pointToSegment(q2, p1, p2)
    if (dist < minDist) {
      minDist = dist
      nearestPt = q2
    }
    return nearestPt
  }
  isInSegmentEnvelopes(intPt) {
    const env0 = new Envelope(this._inputLines[0][0], this._inputLines[0][1])
    const env1 = new Envelope(this._inputLines[1][0], this._inputLines[1][1])
    return env0.contains(intPt) && env1.contains(intPt)
  }
  computeIntersection() {
    if (arguments.length === 3) {
      const p = arguments[0], p1 = arguments[1], p2 = arguments[2]
      this._isProper = false
      if (Envelope.intersects(p1, p2, p)) 
        if (Orientation.index(p1, p2, p) === 0 && Orientation.index(p2, p1, p) === 0) {
          this._isProper = true
          if (p.equals(p1) || p.equals(p2)) 
            this._isProper = false
          
          this._result = LineIntersector.POINT_INTERSECTION
          return null
        }
      
      this._result = LineIntersector.NO_INTERSECTION
    } else {
      return super.computeIntersection.apply(this, arguments)
    }
  }
  intersection(p1, p2, q1, q2) {
    let intPt = this.intersectionSafe(p1, p2, q1, q2)
    if (!this.isInSegmentEnvelopes(intPt)) 
      intPt = new Coordinate(RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2))
    
    if (this._precisionModel !== null) 
      this._precisionModel.makePrecise(intPt)
    
    return intPt
  }
  checkDD(p1, p2, q1, q2, intPt) {
    const intPtDD = CGAlgorithmsDD.intersection(p1, p2, q1, q2)
    const isIn = this.isInSegmentEnvelopes(intPtDD)
    System.out.println('DD in env = ' + isIn + '  --------------------- ' + intPtDD)
    if (intPt.distance(intPtDD) > 0.0001) 
      System.out.println('Distance = ' + intPt.distance(intPtDD))
    
  }
  intersectionSafe(p1, p2, q1, q2) {
    let intPt = Intersection.intersection(p1, p2, q1, q2)
    if (intPt === null) intPt = RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2)
    return intPt
  }
  computeCollinearIntersection(p1, p2, q1, q2) {
    const p1q1p2 = Envelope.intersects(p1, p2, q1)
    const p1q2p2 = Envelope.intersects(p1, p2, q2)
    const q1p1q2 = Envelope.intersects(q1, q2, p1)
    const q1p2q2 = Envelope.intersects(q1, q2, p2)
    if (p1q1p2 && p1q2p2) {
      this._intPt[0] = q1
      this._intPt[1] = q2
      return LineIntersector.COLLINEAR_INTERSECTION
    }
    if (q1p1q2 && q1p2q2) {
      this._intPt[0] = p1
      this._intPt[1] = p2
      return LineIntersector.COLLINEAR_INTERSECTION
    }
    if (p1q1p2 && q1p1q2) {
      this._intPt[0] = q1
      this._intPt[1] = p1
      return q1.equals(p1) && !p1q2p2 && !q1p2q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION
    }
    if (p1q1p2 && q1p2q2) {
      this._intPt[0] = q1
      this._intPt[1] = p2
      return q1.equals(p2) && !p1q2p2 && !q1p1q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION
    }
    if (p1q2p2 && q1p1q2) {
      this._intPt[0] = q2
      this._intPt[1] = p1
      return q2.equals(p1) && !p1q1p2 && !q1p2q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION
    }
    if (p1q2p2 && q1p2q2) {
      this._intPt[0] = q2
      this._intPt[1] = p2
      return q2.equals(p2) && !p1q1p2 && !q1p1q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION
    }
    return LineIntersector.NO_INTERSECTION
  }
  computeIntersect(p1, p2, q1, q2) {
    this._isProper = false
    if (!Envelope.intersects(p1, p2, q1, q2)) return LineIntersector.NO_INTERSECTION
    const Pq1 = Orientation.index(p1, p2, q1)
    const Pq2 = Orientation.index(p1, p2, q2)
    if (Pq1 > 0 && Pq2 > 0 || Pq1 < 0 && Pq2 < 0) 
      return LineIntersector.NO_INTERSECTION
    
    const Qp1 = Orientation.index(q1, q2, p1)
    const Qp2 = Orientation.index(q1, q2, p2)
    if (Qp1 > 0 && Qp2 > 0 || Qp1 < 0 && Qp2 < 0) 
      return LineIntersector.NO_INTERSECTION
    
    const collinear = Pq1 === 0 && Pq2 === 0 && Qp1 === 0 && Qp2 === 0
    if (collinear) 
      return this.computeCollinearIntersection(p1, p2, q1, q2)
    
    if (Pq1 === 0 || Pq2 === 0 || Qp1 === 0 || Qp2 === 0) {
      this._isProper = false
      if (p1.equals2D(q1) || p1.equals2D(q2)) 
        this._intPt[0] = p1
      else if (p2.equals2D(q1) || p2.equals2D(q2)) 
        this._intPt[0] = p2
      else if (Pq1 === 0) 
        this._intPt[0] = new Coordinate(q1)
      else if (Pq2 === 0) 
        this._intPt[0] = new Coordinate(q2)
      else if (Qp1 === 0) 
        this._intPt[0] = new Coordinate(p1)
      else if (Qp2 === 0) 
        this._intPt[0] = new Coordinate(p2)
      
    } else {
      this._isProper = true
      this._intPt[0] = this.intersection(p1, p2, q1, q2)
    }
    return LineIntersector.POINT_INTERSECTION
  }
}
