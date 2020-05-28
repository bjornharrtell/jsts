import TreeSet from '../../../../../../java/util/TreeSet'
import GeometryTransformer from '../../../geom/util/GeometryTransformer'
import hasInterface from '../../../../../../hasInterface'
import Double from '../../../../../../java/lang/Double'
import LineStringSnapper from './LineStringSnapper'
import PrecisionModel from '../../../geom/PrecisionModel'
import Polygonal from '../../../geom/Polygonal'
export default class GeometrySnapper {
  constructor() {
    GeometrySnapper.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._srcGeom = null
    const srcGeom = arguments[0]
    this._srcGeom = srcGeom
  }
  static snap(g0, g1, snapTolerance) {
    const snapGeom = new Array(2).fill(null)
    const snapper0 = new GeometrySnapper(g0)
    snapGeom[0] = snapper0.snapTo(g1, snapTolerance)
    const snapper1 = new GeometrySnapper(g1)
    snapGeom[1] = snapper1.snapTo(snapGeom[0], snapTolerance)
    return snapGeom
  }
  static computeOverlaySnapTolerance() {
    if (arguments.length === 1) {
      const g = arguments[0]
      let snapTolerance = GeometrySnapper.computeSizeBasedSnapTolerance(g)
      const pm = g.getPrecisionModel()
      if (pm.getType() === PrecisionModel.FIXED) {
        const fixedSnapTol = 1 / pm.getScale() * 2 / 1.415
        if (fixedSnapTol > snapTolerance) snapTolerance = fixedSnapTol
      }
      return snapTolerance
    } else if (arguments.length === 2) {
      const g0 = arguments[0], g1 = arguments[1]
      return Math.min(GeometrySnapper.computeOverlaySnapTolerance(g0), GeometrySnapper.computeOverlaySnapTolerance(g1))
    }
  }
  static computeSizeBasedSnapTolerance(g) {
    const env = g.getEnvelopeInternal()
    const minDimension = Math.min(env.getHeight(), env.getWidth())
    const snapTol = minDimension * GeometrySnapper.SNAP_PRECISION_FACTOR
    return snapTol
  }
  static snapToSelf(geom, snapTolerance, cleanResult) {
    const snapper0 = new GeometrySnapper(geom)
    return snapper0.snapToSelf(snapTolerance, cleanResult)
  }
  snapTo(snapGeom, snapTolerance) {
    const snapPts = this.extractTargetCoordinates(snapGeom)
    const snapTrans = new SnapTransformer(snapTolerance, snapPts)
    return snapTrans.transform(this._srcGeom)
  }
  snapToSelf(snapTolerance, cleanResult) {
    const snapPts = this.extractTargetCoordinates(this._srcGeom)
    const snapTrans = new SnapTransformer(snapTolerance, snapPts, true)
    const snappedGeom = snapTrans.transform(this._srcGeom)
    let result = snappedGeom
    if (cleanResult && hasInterface(result, Polygonal)) 
      result = snappedGeom.buffer(0)
    
    return result
  }
  computeSnapTolerance(ringPts) {
    const minSegLen = this.computeMinimumSegmentLength(ringPts)
    const snapTol = minSegLen / 10
    return snapTol
  }
  extractTargetCoordinates(g) {
    const ptSet = new TreeSet()
    const pts = g.getCoordinates()
    for (let i = 0; i < pts.length; i++) 
      ptSet.add(pts[i])
    
    return ptSet.toArray(new Array(0).fill(null))
  }
  computeMinimumSegmentLength(pts) {
    let minSegLen = Double.MAX_VALUE
    for (let i = 0; i < pts.length - 1; i++) {
      const segLen = pts[i].distance(pts[i + 1])
      if (segLen < minSegLen) minSegLen = segLen
    }
    return minSegLen
  }
}
GeometrySnapper.SNAP_PRECISION_FACTOR = 1e-9
class SnapTransformer extends GeometryTransformer {
  constructor() {
    super()
    SnapTransformer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._snapTolerance = null
    this._snapPts = null
    this._isSelfSnap = false
    if (arguments.length === 2) {
      const snapTolerance = arguments[0], snapPts = arguments[1]
      this._snapTolerance = snapTolerance
      this._snapPts = snapPts
    } else if (arguments.length === 3) {
      const snapTolerance = arguments[0], snapPts = arguments[1], isSelfSnap = arguments[2]
      this._snapTolerance = snapTolerance
      this._snapPts = snapPts
      this._isSelfSnap = isSelfSnap
    }
  }
  snapLine(srcPts, snapPts) {
    const snapper = new LineStringSnapper(srcPts, this._snapTolerance)
    snapper.setAllowSnappingToSourceVertices(this._isSelfSnap)
    return snapper.snapTo(snapPts)
  }
  transformCoordinates(coords, parent) {
    const srcPts = coords.toCoordinateArray()
    const newPts = this.snapLine(srcPts, this._snapPts)
    return this._factory.getCoordinateSequenceFactory().create(newPts)
  }
}
