import CoordinateList from '../geom/CoordinateList'
import Geometry from '../geom/Geometry'
import Arrays from '../../../../java/util/Arrays'
import hasInterface from '../../../../hasInterface'
import Collection from '../../../../java/util/Collection'
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator'
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision'
import Vertex from './quadedge/Vertex'
import CoordinateArrays from '../geom/CoordinateArrays'
import ArrayList from '../../../../java/util/ArrayList'
import Envelope from '../geom/Envelope'
export default class DelaunayTriangulationBuilder {
  constructor() {
    DelaunayTriangulationBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._siteCoords = null
    this._tolerance = 0.0
    this._subdiv = null
  }
  static extractUniqueCoordinates(geom) {
    if (geom === null) return new CoordinateList()
    const coords = geom.getCoordinates()
    return DelaunayTriangulationBuilder.unique(coords)
  }
  static envelope(coords) {
    const env = new Envelope()
    for (let i = coords.iterator(); i.hasNext(); ) {
      const coord = i.next()
      env.expandToInclude(coord)
    }
    return env
  }
  static unique(coords) {
    const coordsCopy = CoordinateArrays.copyDeep(coords)
    Arrays.sort(coordsCopy)
    const coordList = new CoordinateList(coordsCopy, false)
    return coordList
  }
  static toVertices(coords) {
    const verts = new ArrayList()
    for (let i = coords.iterator(); i.hasNext(); ) {
      const coord = i.next()
      verts.add(new Vertex(coord))
    }
    return verts
  }
  create() {
    if (this._subdiv !== null) return null
    const siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords)
    const vertices = DelaunayTriangulationBuilder.toVertices(this._siteCoords)
    this._subdiv = new QuadEdgeSubdivision(siteEnv, this._tolerance)
    const triangulator = new IncrementalDelaunayTriangulator(this._subdiv)
    triangulator.insertSites(vertices)
  }
  setTolerance(tolerance) {
    this._tolerance = tolerance
  }
  setSites() {
    if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      this._siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom)
    } else if (hasInterface(arguments[0], Collection)) {
      const coords = arguments[0]
      this._siteCoords = DelaunayTriangulationBuilder.unique(CoordinateArrays.toCoordinateArray(coords))
    }
  }
  getEdges(geomFact) {
    this.create()
    return this._subdiv.getEdges(geomFact)
  }
  getSubdivision() {
    this.create()
    return this._subdiv
  }
  getTriangles(geomFact) {
    this.create()
    return this._subdiv.getTriangles(geomFact)
  }
}
