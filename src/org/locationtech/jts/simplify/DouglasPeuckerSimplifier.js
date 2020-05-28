import DouglasPeuckerLineSimplifier from './DouglasPeuckerLineSimplifier'
import GeometryTransformer from '../geom/util/GeometryTransformer'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import Polygon from '../geom/Polygon'
import LinearRing from '../geom/LinearRing'
import MultiPolygon from '../geom/MultiPolygon'
export default class DouglasPeuckerSimplifier {
  constructor() {
    DouglasPeuckerSimplifier.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._distanceTolerance = null
    this._isEnsureValidTopology = true
    const inputGeom = arguments[0]
    this._inputGeom = inputGeom
  }
  static simplify(geom, distanceTolerance) {
    const tss = new DouglasPeuckerSimplifier(geom)
    tss.setDistanceTolerance(distanceTolerance)
    return tss.getResultGeometry()
  }
  setEnsureValid(isEnsureValidTopology) {
    this._isEnsureValidTopology = isEnsureValidTopology
  }
  getResultGeometry() {
    if (this._inputGeom.isEmpty()) return this._inputGeom.copy()
    return new DPTransformer(this._isEnsureValidTopology, this._distanceTolerance).transform(this._inputGeom)
  }
  setDistanceTolerance(distanceTolerance) {
    if (distanceTolerance < 0.0) throw new IllegalArgumentException('Tolerance must be non-negative')
    this._distanceTolerance = distanceTolerance
  }
}
class DPTransformer extends GeometryTransformer {
  constructor() {
    super()
    DPTransformer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isEnsureValidTopology = true
    this._distanceTolerance = null
    const isEnsureValidTopology = arguments[0], distanceTolerance = arguments[1]
    this._isEnsureValidTopology = isEnsureValidTopology
    this._distanceTolerance = distanceTolerance
  }
  transformPolygon(geom, parent) {
    if (geom.isEmpty()) return null
    const rawGeom = super.transformPolygon.call(this, geom, parent)
    if (parent instanceof MultiPolygon) 
      return rawGeom
    
    return this.createValidArea(rawGeom)
  }
  createValidArea(rawAreaGeom) {
    if (this._isEnsureValidTopology) return rawAreaGeom.buffer(0.0)
    return rawAreaGeom
  }
  transformCoordinates(coords, parent) {
    const inputPts = coords.toCoordinateArray()
    let newPts = null
    if (inputPts.length === 0) 
      newPts = new Array(0).fill(null)
    else 
      newPts = DouglasPeuckerLineSimplifier.simplify(inputPts, this._distanceTolerance)
    
    return this._factory.getCoordinateSequenceFactory().create(newPts)
  }
  transformMultiPolygon(geom, parent) {
    const rawGeom = super.transformMultiPolygon.call(this, geom, parent)
    return this.createValidArea(rawGeom)
  }
  transformLinearRing(geom, parent) {
    const removeDegenerateRings = parent instanceof Polygon
    const simpResult = super.transformLinearRing.call(this, geom, parent)
    if (removeDegenerateRings && !(simpResult instanceof LinearRing)) return null
    
    return simpResult
  }
}
DouglasPeuckerSimplifier.DPTransformer = DPTransformer
