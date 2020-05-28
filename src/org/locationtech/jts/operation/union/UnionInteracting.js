import GeometryCombiner from '../../geom/util/GeometryCombiner'
import System from '../../../../../java/lang/System'
import ArrayList from '../../../../../java/util/ArrayList'
export default class UnionInteracting {
  constructor() {
    UnionInteracting.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geomFactory = null
    this._g0 = null
    this._g1 = null
    this._interacts0 = null
    this._interacts1 = null
    const g0 = arguments[0], g1 = arguments[1]
    this._g0 = g0
    this._g1 = g1
    this._geomFactory = g0.getFactory()
    this._interacts0 = new Array(g0.getNumGeometries()).fill(null)
    this._interacts1 = new Array(g1.getNumGeometries()).fill(null)
  }
  static union(g0, g1) {
    const uue = new UnionInteracting(g0, g1)
    return uue.union()
  }
  extractElements(geom, interacts, isInteracting) {
    const extractedGeoms = new ArrayList()
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const elem = geom.getGeometryN(i)
      if (interacts[i] === isInteracting) extractedGeoms.add(elem)
    }
    return this._geomFactory.buildGeometry(extractedGeoms)
  }
  computeInteracting() {
    if (arguments.length === 0) {
      for (let i = 0; i < this._g0.getNumGeometries(); i++) {
        const elem = this._g0.getGeometryN(i)
        this._interacts0[i] = this.computeInteracting(elem)
      }
    } else if (arguments.length === 1) {
      const elem0 = arguments[0]
      let interactsWithAny = false
      for (let i = 0; i < this._g1.getNumGeometries(); i++) {
        const elem1 = this._g1.getGeometryN(i)
        const interacts = elem1.getEnvelopeInternal().intersects(elem0.getEnvelopeInternal())
        if (interacts) this._interacts1[i] = true
        if (interacts) interactsWithAny = true
      }
      return interactsWithAny
    }
  }
  union() {
    this.computeInteracting()
    const int0 = this.extractElements(this._g0, this._interacts0, true)
    const int1 = this.extractElements(this._g1, this._interacts1, true)
    if (int0.isEmpty() || int1.isEmpty()) 
      System.out.println('found empty!')
    
    const union = int0.union(int1)
    const disjoint0 = this.extractElements(this._g0, this._interacts0, false)
    const disjoint1 = this.extractElements(this._g1, this._interacts1, false)
    const overallUnion = GeometryCombiner.combine(union, disjoint0, disjoint1)
    return overallUnion
  }
  bufferUnion(g0, g1) {
    const factory = g0.getFactory()
    const gColl = factory.createGeometryCollection([g0, g1])
    const unionAll = gColl.buffer(0.0)
    return unionAll
  }
}
