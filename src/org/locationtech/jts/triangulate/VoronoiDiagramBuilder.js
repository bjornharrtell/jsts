import Geometry from '../geom/Geometry.js'
import hasInterface from '../../../../hasInterface.js'
import GeometryFactory from '../geom/GeometryFactory.js'
import Collection from '../../../../java/util/Collection.js'
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator.js'
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision.js'
import DelaunayTriangulationBuilder from './DelaunayTriangulationBuilder.js'
import CoordinateArrays from '../geom/CoordinateArrays.js'
import ArrayList from '../../../../java/util/ArrayList.js'
import OverlayOp from '../operation/overlay/OverlayOp.js'
export default class VoronoiDiagramBuilder {
  constructor() {
    VoronoiDiagramBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._siteCoords = null
    this._tolerance = 0.0
    this._subdiv = null
    this._clipEnv = null
    this._diagramEnv = null
  }
  static clipGeometryCollection(geom, clipEnv) {
    const clipPoly = geom.getFactory().toGeometry(clipEnv)
    const clipped = new ArrayList()
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const g = geom.getGeometryN(i)
      let result = null
      if (clipEnv.contains(g.getEnvelopeInternal())) {
        result = g
      } else if (clipEnv.intersects(g.getEnvelopeInternal())) {
        result = OverlayOp.intersection(clipPoly, g)
        result.setUserData(g.getUserData())
      }
      if (result !== null && !result.isEmpty()) 
        clipped.add(result)
      
    }
    return geom.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(clipped))
  }
  create() {
    if (this._subdiv !== null) return null
    const siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords)
    this._diagramEnv = this._clipEnv
    if (this._diagramEnv === null) {
      this._diagramEnv = siteEnv
      const expandBy = this._diagramEnv.getDiameter()
      this._diagramEnv.expandBy(expandBy)
    }
    const vertices = DelaunayTriangulationBuilder.toVertices(this._siteCoords)
    this._subdiv = new QuadEdgeSubdivision(siteEnv, this._tolerance)
    const triangulator = new IncrementalDelaunayTriangulator(this._subdiv)
    triangulator.insertSites(vertices)
  }
  getDiagram(geomFact) {
    this.create()
    const polys = this._subdiv.getVoronoiDiagram(geomFact)
    return VoronoiDiagramBuilder.clipGeometryCollection(polys, this._diagramEnv)
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
  setClipEnvelope(clipEnv) {
    this._clipEnv = clipEnv
  }
  getSubdivision() {
    this.create()
    return this._subdiv
  }
}
