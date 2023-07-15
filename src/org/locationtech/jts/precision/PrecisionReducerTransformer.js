import LineString from '../geom/LineString.js'
import CoordinateList from '../geom/CoordinateList.js'
import GeometryTransformer from '../geom/util/GeometryTransformer.js'
import LinearRing from '../geom/LinearRing.js'
import PrecisionReducer from '../operation/overlayng/PrecisionReducer.js'
export default class PrecisionReducerTransformer extends GeometryTransformer {
  constructor() {
    super()
    PrecisionReducerTransformer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._targetPM = null
    this._isRemoveCollapsed = false
    const targetPM = arguments[0], isRemoveCollapsed = arguments[1]
    this._targetPM = targetPM
    this._isRemoveCollapsed = isRemoveCollapsed
  }
  static reduce(geom, targetPM, isRemoveCollapsed) {
    const trans = new PrecisionReducerTransformer(targetPM, isRemoveCollapsed)
    return trans.transform(geom)
  }
  transformPolygon(geom, parent) {
    return this.reduceArea(geom)
  }
  reduceCompress(coordinates) {
    const noRepeatCoordList = new CoordinateList()
    for (let i = 0; i < coordinates.size(); i++) {
      const coord = coordinates.getCoordinate(i).copy()
      this._targetPM.makePrecise(coord)
      noRepeatCoordList.add(coord, false)
    }
    const noRepeatCoords = noRepeatCoordList.toCoordinateArray()
    return noRepeatCoords
  }
  transformCoordinates(coordinates, parent) {
    if (coordinates.size() === 0) return null
    let coordsReduce = this.reduceCompress(coordinates)
    let minSize = 0
    if (parent instanceof LineString) minSize = 2
    if (parent instanceof LinearRing) minSize = LinearRing.MINIMUM_VALID_SIZE
    if (coordsReduce.length < minSize) {
      if (this._isRemoveCollapsed) 
        return null
      
      coordsReduce = this.extend(coordsReduce, minSize)
    }
    return this._factory.getCoordinateSequenceFactory().create(coordsReduce)
  }
  extend(coords, minLength) {
    if (coords.length >= minLength) return coords
    const exCoords = new Array(minLength).fill(null)
    for (let i = 0; i < exCoords.length; i++) {
      const iSrc = i < coords.length ? i : coords.length - 1
      exCoords[i] = coords[iSrc].copy()
    }
    return exCoords
  }
  transformMultiPolygon(geom, parent) {
    return this.reduceArea(geom)
  }
  reduceArea(geom) {
    const reduced = PrecisionReducer.reducePrecision(geom, this._targetPM)
    return reduced
  }
}
