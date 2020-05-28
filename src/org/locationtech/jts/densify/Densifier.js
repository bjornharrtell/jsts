import LineString from '../geom/LineString'
import CoordinateList from '../geom/CoordinateList'
import GeometryTransformer from '../geom/util/GeometryTransformer'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import MultiPolygon from '../geom/MultiPolygon'
import LineSegment from '../geom/LineSegment'
export default class Densifier {
  constructor() {
    Densifier.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._distanceTolerance = null
    const inputGeom = arguments[0]
    this._inputGeom = inputGeom
  }
  static densifyPoints(pts, distanceTolerance, precModel) {
    const seg = new LineSegment()
    const coordList = new CoordinateList()
    for (let i = 0; i < pts.length - 1; i++) {
      seg.p0 = pts[i]
      seg.p1 = pts[i + 1]
      coordList.add(seg.p0, false)
      const len = seg.getLength()
      const densifiedSegCount = Math.trunc(len / distanceTolerance) + 1
      if (densifiedSegCount > 1) {
        const densifiedSegLen = len / densifiedSegCount
        for (let j = 1; j < densifiedSegCount; j++) {
          const segFract = j * densifiedSegLen / len
          const p = seg.pointAlong(segFract)
          precModel.makePrecise(p)
          coordList.add(p, false)
        }
      }
    }
    coordList.add(pts[pts.length - 1], false)
    return coordList.toCoordinateArray()
  }
  static densify(geom, distanceTolerance) {
    const densifier = new Densifier(geom)
    densifier.setDistanceTolerance(distanceTolerance)
    return densifier.getResultGeometry()
  }
  getResultGeometry() {
    return new DensifyTransformer(this._distanceTolerance).transform(this._inputGeom)
  }
  setDistanceTolerance(distanceTolerance) {
    if (distanceTolerance <= 0.0) throw new IllegalArgumentException('Tolerance must be positive')
    this._distanceTolerance = distanceTolerance
  }
}
class DensifyTransformer extends GeometryTransformer {
  constructor() {
    super()
    DensifyTransformer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.distanceTolerance = null
    const distanceTolerance = arguments[0]
    this.distanceTolerance = distanceTolerance
  }
  transformMultiPolygon(geom, parent) {
    const roughGeom = super.transformMultiPolygon.call(this, geom, parent)
    return this.createValidArea(roughGeom)
  }
  transformPolygon(geom, parent) {
    const roughGeom = super.transformPolygon.call(this, geom, parent)
    if (parent instanceof MultiPolygon) 
      return roughGeom
    
    return this.createValidArea(roughGeom)
  }
  transformCoordinates(coords, parent) {
    const inputPts = coords.toCoordinateArray()
    let newPts = Densifier.densifyPoints(inputPts, this.distanceTolerance, parent.getPrecisionModel())
    if (parent instanceof LineString && newPts.length === 1) 
      newPts = new Array(0).fill(null)
    
    return this._factory.getCoordinateSequenceFactory().create(newPts)
  }
  createValidArea(roughAreaGeom) {
    return roughAreaGeom.buffer(0.0)
  }
}
Densifier.DensifyTransformer = DensifyTransformer
