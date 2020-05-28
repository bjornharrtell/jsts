import HashSet from '../../../../../java/util/HashSet'
import TopologyException from '../../geom/TopologyException'
import GeometryCombiner from '../../geom/util/GeometryCombiner'
import LineSegment from '../../geom/LineSegment'
import ArrayList from '../../../../../java/util/ArrayList'
import CoordinateSequenceFilter from '../../geom/CoordinateSequenceFilter'
export default class OverlapUnion {
  constructor() {
    OverlapUnion.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geomFactory = null
    this._g0 = null
    this._g1 = null
    this._isUnionSafe = null
    const g0 = arguments[0], g1 = arguments[1]
    this._g0 = g0
    this._g1 = g1
    this._geomFactory = g0.getFactory()
  }
  static containsProperly() {
    if (arguments.length === 2) {
      const env = arguments[0], p = arguments[1]
      if (env.isNull()) return false
      return p.getX() > env.getMinX() && p.getX() < env.getMaxX() && p.getY() > env.getMinY() && p.getY() < env.getMaxY()
    } else if (arguments.length === 3) {
      const env = arguments[0], p0 = arguments[1], p1 = arguments[2]
      return OverlapUnion.containsProperly(env, p0) && OverlapUnion.containsProperly(env, p1)
    }
  }
  static union(g0, g1) {
    const union = new OverlapUnion(g0, g1)
    return union.union()
  }
  static intersects(env, p0, p1) {
    return env.intersects(p0) || env.intersects(p1)
  }
  static overlapEnvelope(g0, g1) {
    const g0Env = g0.getEnvelopeInternal()
    const g1Env = g1.getEnvelopeInternal()
    const overlapEnv = g0Env.intersection(g1Env)
    return overlapEnv
  }
  static extractBorderSegments(geom, env, segs) {
    geom.apply(new (class {
      get interfaces_() {
        return [CoordinateSequenceFilter]
      }
      filter(seq, i) {
        if (i <= 0) return null
        const p0 = seq.getCoordinate(i - 1)
        const p1 = seq.getCoordinate(i)
        const isBorder = OverlapUnion.intersects(env, p0, p1) && !OverlapUnion.containsProperly(env, p0, p1)
        if (isBorder) {
          const seg = new LineSegment(p0, p1)
          segs.add(seg)
        }
      }
      isDone() {
        return false
      }
      isGeometryChanged() {
        return false
      }
    })())
  }
  static unionBuffer(g0, g1) {
    const factory = g0.getFactory()
    const gColl = factory.createGeometryCollection([g0, g1])
    const union = gColl.buffer(0.0)
    return union
  }
  isBorderSegmentsSame(result, env) {
    const segsBefore = this.extractBorderSegments(this._g0, this._g1, env)
    const segsAfter = new ArrayList()
    OverlapUnion.extractBorderSegments(result, env, segsAfter)
    return this.isEqual(segsBefore, segsAfter)
  }
  extractByEnvelope(env, geom, disjointGeoms) {
    const intersectingGeoms = new ArrayList()
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const elem = geom.getGeometryN(i)
      if (elem.getEnvelopeInternal().intersects(env)) {
        intersectingGeoms.add(elem)
      } else {
        const copy = elem.copy()
        disjointGeoms.add(copy)
      }
    }
    return this._geomFactory.buildGeometry(intersectingGeoms)
  }
  isEqual(segs0, segs1) {
    if (segs0.size() !== segs1.size()) return false
    const segIndex = new HashSet(segs0)
    for (const seg of segs1) 
      if (!segIndex.contains(seg)) 
        return false
      
    
    return true
  }
  union() {
    const overlapEnv = OverlapUnion.overlapEnvelope(this._g0, this._g1)
    if (overlapEnv.isNull()) {
      const g0Copy = this._g0.copy()
      const g1Copy = this._g1.copy()
      return GeometryCombiner.combine(g0Copy, g1Copy)
    }
    const disjointPolys = new ArrayList()
    const g0Overlap = this.extractByEnvelope(overlapEnv, this._g0, disjointPolys)
    const g1Overlap = this.extractByEnvelope(overlapEnv, this._g1, disjointPolys)
    const unionGeom = this.unionFull(g0Overlap, g1Overlap)
    let result = null
    this._isUnionSafe = this.isBorderSegmentsSame(unionGeom, overlapEnv)
    if (!this._isUnionSafe) 
      result = this.unionFull(this._g0, this._g1)
    else 
      result = this.combine(unionGeom, disjointPolys)
    
    return result
  }
  combine(unionGeom, disjointPolys) {
    if (disjointPolys.size() <= 0) return unionGeom
    disjointPolys.add(unionGeom)
    const result = GeometryCombiner.combine(disjointPolys)
    return result
  }
  unionFull(geom0, geom1) {
    try {
      return geom0.union(geom1)
    } catch (ex) {
      if (ex instanceof TopologyException) 
        return OverlapUnion.unionBuffer(geom0, geom1)
      else throw ex
    } finally {}
  }
  extractBorderSegments(geom0, geom1, env) {
    const segs = new ArrayList()
    OverlapUnion.extractBorderSegments(geom0, env, segs)
    if (geom1 !== null) OverlapUnion.extractBorderSegments(geom1, env, segs)
    return segs
  }
  isUnionOptimized() {
    return this._isUnionSafe
  }
}
