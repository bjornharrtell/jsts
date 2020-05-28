import ConformingDelaunayTriangulator from './ConformingDelaunayTriangulator'
import ConstraintVertex from './ConstraintVertex'
import DelaunayTriangulationBuilder from './DelaunayTriangulationBuilder'
import Segment from './Segment'
import ArrayList from '../../../../java/util/ArrayList'
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter'
import TreeMap from '../../../../java/util/TreeMap'
export default class ConformingDelaunayTriangulationBuilder {
  constructor() {
    ConformingDelaunayTriangulationBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._siteCoords = null
    this._constraintLines = null
    this._tolerance = 0.0
    this._subdiv = null
    this._constraintVertexMap = new TreeMap()
  }
  static createConstraintSegments() {
    if (arguments.length === 1) {
      const geom = arguments[0]
      const lines = LinearComponentExtracter.getLines(geom)
      const constraintSegs = new ArrayList()
      for (let i = lines.iterator(); i.hasNext(); ) {
        const line = i.next()
        ConformingDelaunayTriangulationBuilder.createConstraintSegments(line, constraintSegs)
      }
      return constraintSegs
    } else if (arguments.length === 2) {
      const line = arguments[0], constraintSegs = arguments[1]
      const coords = line.getCoordinates()
      for (let i = 1; i < coords.length; i++) 
        constraintSegs.add(new Segment(coords[i - 1], coords[i]))
      
    }
  }
  createSiteVertices(coords) {
    const verts = new ArrayList()
    for (let i = coords.iterator(); i.hasNext(); ) {
      const coord = i.next()
      if (this._constraintVertexMap.containsKey(coord)) continue
      verts.add(new ConstraintVertex(coord))
    }
    return verts
  }
  create() {
    if (this._subdiv !== null) return null
    const siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords)
    let segments = new ArrayList()
    if (this._constraintLines !== null) {
      siteEnv.expandToInclude(this._constraintLines.getEnvelopeInternal())
      this.createVertices(this._constraintLines)
      segments = ConformingDelaunayTriangulationBuilder.createConstraintSegments(this._constraintLines)
    }
    const sites = this.createSiteVertices(this._siteCoords)
    const cdt = new ConformingDelaunayTriangulator(sites, this._tolerance)
    cdt.setConstraints(segments, new ArrayList(this._constraintVertexMap.values()))
    cdt.formInitialDelaunay()
    cdt.enforceConstraints()
    this._subdiv = cdt.getSubdivision()
  }
  setTolerance(tolerance) {
    this._tolerance = tolerance
  }
  setConstraints(constraintLines) {
    this._constraintLines = constraintLines
  }
  setSites(geom) {
    this._siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom)
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
  createVertices(geom) {
    const coords = geom.getCoordinates()
    for (let i = 0; i < coords.length; i++) {
      const v = new ConstraintVertex(coords[i])
      this._constraintVertexMap.put(coords[i], v)
    }
  }
}
