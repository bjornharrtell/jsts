import BufferParameters from './BufferParameters'
import Position from '../../geomgraph/Position'
import Coordinate from '../../geom/Coordinate'
import BufferInputLineSimplifier from './BufferInputLineSimplifier'
import CoordinateArrays from '../../geom/CoordinateArrays'
import OffsetSegmentGenerator from './OffsetSegmentGenerator'
export default class OffsetCurveBuilder {
  constructor() {
    OffsetCurveBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._distance = 0.0
    this._precisionModel = null
    this._bufParams = null
    const precisionModel = arguments[0], bufParams = arguments[1]
    this._precisionModel = precisionModel
    this._bufParams = bufParams
  }
  static copyCoordinates(pts) {
    const copy = new Array(pts.length).fill(null)
    for (let i = 0; i < copy.length; i++) 
      copy[i] = new Coordinate(pts[i])
    
    return copy
  }
  getOffsetCurve(inputPts, distance) {
    this._distance = distance
    if (distance === 0.0) return null
    const isRightSide = distance < 0.0
    const posDistance = Math.abs(distance)
    const segGen = this.getSegGen(posDistance)
    if (inputPts.length <= 1) 
      this.computePointCurve(inputPts[0], segGen)
    else 
      this.computeOffsetCurve(inputPts, isRightSide, segGen)
    
    const curvePts = segGen.getCoordinates()
    if (isRightSide) CoordinateArrays.reverse(curvePts)
    return curvePts
  }
  computeSingleSidedBufferCurve(inputPts, isRightSide, segGen) {
    const distTol = this.simplifyTolerance(this._distance)
    if (isRightSide) {
      segGen.addSegments(inputPts, true)
      const simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol)
      const n2 = simp2.length - 1
      segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT)
      segGen.addFirstSegment()
      for (let i = n2 - 2; i >= 0; i--) 
        segGen.addNextSegment(simp2[i], true)
      
    } else {
      segGen.addSegments(inputPts, false)
      const simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol)
      const n1 = simp1.length - 1
      segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT)
      segGen.addFirstSegment()
      for (let i = 2; i <= n1; i++) 
        segGen.addNextSegment(simp1[i], true)
      
    }
    segGen.addLastSegment()
    segGen.closeRing()
  }
  computeRingBufferCurve(inputPts, side, segGen) {
    let distTol = this.simplifyTolerance(this._distance)
    if (side === Position.RIGHT) distTol = -distTol
    const simp = BufferInputLineSimplifier.simplify(inputPts, distTol)
    const n = simp.length - 1
    segGen.initSideSegments(simp[n - 1], simp[0], side)
    for (let i = 1; i <= n; i++) {
      const addStartPoint = i !== 1
      segGen.addNextSegment(simp[i], addStartPoint)
    }
    segGen.closeRing()
  }
  computeLineBufferCurve(inputPts, segGen) {
    const distTol = this.simplifyTolerance(this._distance)
    const simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol)
    const n1 = simp1.length - 1
    segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT)
    for (let i = 2; i <= n1; i++) 
      segGen.addNextSegment(simp1[i], true)
    
    segGen.addLastSegment()
    segGen.addLineEndCap(simp1[n1 - 1], simp1[n1])
    const simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol)
    const n2 = simp2.length - 1
    segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT)
    for (let i = n2 - 2; i >= 0; i--) 
      segGen.addNextSegment(simp2[i], true)
    
    segGen.addLastSegment()
    segGen.addLineEndCap(simp2[1], simp2[0])
    segGen.closeRing()
  }
  computePointCurve(pt, segGen) {
    switch (this._bufParams.getEndCapStyle()) {
    case BufferParameters.CAP_ROUND:
      segGen.createCircle(pt)
      break
    case BufferParameters.CAP_SQUARE:
      segGen.createSquare(pt)
      break
    }
  }
  getLineCurve(inputPts, distance) {
    this._distance = distance
    if (this.isLineOffsetEmpty(distance)) return null
    const posDistance = Math.abs(distance)
    const segGen = this.getSegGen(posDistance)
    if (inputPts.length <= 1) {
      this.computePointCurve(inputPts[0], segGen)
    } else 
    if (this._bufParams.isSingleSided()) {
      const isRightSide = distance < 0.0
      this.computeSingleSidedBufferCurve(inputPts, isRightSide, segGen)
    } else {
      this.computeLineBufferCurve(inputPts, segGen)
    }
    
    const lineCoord = segGen.getCoordinates()
    return lineCoord
  }
  getBufferParameters() {
    return this._bufParams
  }
  simplifyTolerance(bufDistance) {
    return bufDistance * this._bufParams.getSimplifyFactor()
  }
  getRingCurve(inputPts, side, distance) {
    this._distance = distance
    if (inputPts.length <= 2) return this.getLineCurve(inputPts, distance)
    if (distance === 0.0) 
      return OffsetCurveBuilder.copyCoordinates(inputPts)
    
    const segGen = this.getSegGen(distance)
    this.computeRingBufferCurve(inputPts, side, segGen)
    return segGen.getCoordinates()
  }
  computeOffsetCurve(inputPts, isRightSide, segGen) {
    const distTol = this.simplifyTolerance(this._distance)
    if (isRightSide) {
      const simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol)
      const n2 = simp2.length - 1
      segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT)
      segGen.addFirstSegment()
      for (let i = n2 - 2; i >= 0; i--) 
        segGen.addNextSegment(simp2[i], true)
      
    } else {
      const simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol)
      const n1 = simp1.length - 1
      segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT)
      segGen.addFirstSegment()
      for (let i = 2; i <= n1; i++) 
        segGen.addNextSegment(simp1[i], true)
      
    }
    segGen.addLastSegment()
  }
  isLineOffsetEmpty(distance) {
    if (distance === 0.0) return true
    if (distance < 0.0 && !this._bufParams.isSingleSided()) return true
    return false
  }
  getSegGen(distance) {
    return new OffsetSegmentGenerator(this._precisionModel, this._bufParams, distance)
  }
}
