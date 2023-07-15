import GeometryTransformer from '../geom/util/GeometryTransformer.js'
export default class PointwisePrecisionReducerTransformer extends GeometryTransformer {
  constructor() {
    super()
    PointwisePrecisionReducerTransformer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._targetPM = null
    const targetPM = arguments[0]
    this._targetPM = targetPM
  }
  static reduce(geom, targetPM) {
    const trans = new PointwisePrecisionReducerTransformer(targetPM)
    return trans.transform(geom)
  }
  transformCoordinates(coordinates, parent) {
    if (coordinates.size() === 0) return null
    const coordsReduce = this.reducePointwise(coordinates)
    return this._factory.getCoordinateSequenceFactory().create(coordsReduce)
  }
  reducePointwise(coordinates) {
    const coordReduce = new Array(coordinates.size()).fill(null)
    for (let i = 0; i < coordinates.size(); i++) {
      const coord = coordinates.getCoordinate(i).copy()
      this._targetPM.makePrecise(coord)
      coordReduce[i] = coord
    }
    return coordReduce
  }
}
