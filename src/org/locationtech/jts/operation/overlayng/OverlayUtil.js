import Coordinate from '../../geom/Coordinate.js'
import Point from '../../geom/Point.js'
import OverlayNG from './OverlayNG.js'
import RobustClipEnvelopeComputer from './RobustClipEnvelopeComputer.js'
import PrecisionModel from '../../geom/PrecisionModel.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import Assert from '../../util/Assert.js'
export default class OverlayUtil {
  static labelForResult(edge) {
    return edge.getLabel().toString(edge.isForward()) + (edge.isInResultArea() ? ' Res' : '')
  }
  static isGreater(v1, v2, tol) {
    return v1 >= v2 * (1 - tol)
  }
  static isEmptyResult(opCode, a, b, pm) {
    switch (opCode) {
    case OverlayNG.INTERSECTION:
      if (OverlayUtil.isEnvDisjoint(a, b, pm)) return true
      break
    case OverlayNG.DIFFERENCE:
      if (OverlayUtil.isEmpty(a)) return true
      break
    case OverlayNG.UNION:
    case OverlayNG.SYMDIFFERENCE:
      if (OverlayUtil.isEmpty(a) && OverlayUtil.isEmpty(b)) return true
      break
    }
    return false
  }
  static isEnvDisjoint(a, b, pm) {
    if (OverlayUtil.isEmpty(a) || OverlayUtil.isEmpty(b)) return true
    if (OverlayUtil.isFloating(pm)) 
      return a.getEnvelopeInternal().disjoint(b.getEnvelopeInternal())
    
    return OverlayUtil.isDisjoint(a.getEnvelopeInternal(), b.getEnvelopeInternal(), pm)
  }
  static safeExpandDistance(env, pm) {
    let envExpandDist = null
    if (OverlayUtil.isFloating(pm)) {
      let minSize = Math.min(env.getHeight(), env.getWidth())
      if (minSize <= 0.0) 
        minSize = Math.max(env.getHeight(), env.getWidth())
      
      envExpandDist = OverlayUtil.SAFE_ENV_BUFFER_FACTOR * minSize
    } else {
      const gridSize = 1.0 / pm.getScale()
      envExpandDist = OverlayUtil.SAFE_ENV_GRID_FACTOR * gridSize
    }
    return envExpandDist
  }
  static createResultGeometry(resultPolyList, resultLineList, resultPointList, geometryFactory) {
    const geomList = new ArrayList()
    if (resultPolyList !== null) geomList.addAll(resultPolyList)
    if (resultLineList !== null) geomList.addAll(resultLineList)
    if (resultPointList !== null) geomList.addAll(resultPointList)
    return geometryFactory.buildGeometry(geomList)
  }
  static safeEnv(env, pm) {
    const envExpandDist = OverlayUtil.safeExpandDistance(env, pm)
    const safeEnv = env.copy()
    safeEnv.expandBy(envExpandDist)
    return safeEnv
  }
  static isFloating(pm) {
    if (pm === null) return true
    return pm.isFloating()
  }
  static isResultAreaConsistent(geom0, geom1, opCode, result) {
    if (geom0 === null || geom1 === null) return true
    const areaResult = result.getArea()
    const areaA = geom0.getArea()
    const areaB = geom1.getArea()
    let isConsistent = true
    switch (opCode) {
    case OverlayNG.INTERSECTION:
      isConsistent = OverlayUtil.isLess(areaResult, areaA, OverlayUtil.AREA_HEURISTIC_TOLERANCE) && OverlayUtil.isLess(areaResult, areaB, OverlayUtil.AREA_HEURISTIC_TOLERANCE)
      break
    case OverlayNG.DIFFERENCE:
      isConsistent = OverlayUtil.isLess(areaResult, areaA, OverlayUtil.AREA_HEURISTIC_TOLERANCE) && OverlayUtil.isGreater(areaResult, areaA - areaB, OverlayUtil.AREA_HEURISTIC_TOLERANCE)
      break
    case OverlayNG.SYMDIFFERENCE:
      isConsistent = OverlayUtil.isLess(areaResult, areaA + areaB, OverlayUtil.AREA_HEURISTIC_TOLERANCE)
      break
    case OverlayNG.UNION:
      isConsistent = OverlayUtil.isLess(areaA, areaResult, OverlayUtil.AREA_HEURISTIC_TOLERANCE) && OverlayUtil.isLess(areaB, areaResult, OverlayUtil.AREA_HEURISTIC_TOLERANCE) && OverlayUtil.isGreater(areaResult, areaA - areaB, OverlayUtil.AREA_HEURISTIC_TOLERANCE)
      break
    }
    return isConsistent
  }
  static clippingEnvelope(opCode, inputGeom, pm) {
    const resultEnv = OverlayUtil.resultEnvelope(opCode, inputGeom, pm)
    if (resultEnv === null) return null
    const clipEnv = RobustClipEnvelopeComputer.getEnvelope(inputGeom.getGeometry(0), inputGeom.getGeometry(1), resultEnv)
    const safeEnv = OverlayUtil.safeEnv(clipEnv, pm)
    return safeEnv
  }
  static round() {
    if (arguments[0] instanceof Point && arguments[1] instanceof PrecisionModel) {
      const pt = arguments[0], pm = arguments[1]
      if (pt.isEmpty()) return null
      return OverlayUtil.round(pt.getCoordinate(), pm)
    } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof PrecisionModel) {
      const p = arguments[0], pm = arguments[1]
      if (!OverlayUtil.isFloating(pm)) {
        const pRound = p.copy()
        pm.makePrecise(pRound)
        return pRound
      }
      return p
    }
  }
  static resultDimension(opCode, dim0, dim1) {
    let resultDimension = -1
    switch (opCode) {
    case OverlayNG.INTERSECTION:
      resultDimension = Math.min(dim0, dim1)
      break
    case OverlayNG.UNION:
      resultDimension = Math.max(dim0, dim1)
      break
    case OverlayNG.DIFFERENCE:
      resultDimension = dim0
      break
    case OverlayNG.SYMDIFFERENCE:
      resultDimension = Math.max(dim0, dim1)
      break
    }
    return resultDimension
  }
  static toLines(graph, isOutputEdges, geomFact) {
    const lines = new ArrayList()
    for (const edge of graph.getEdges()) {
      const includeEdge = isOutputEdges || edge.isInResultArea()
      if (!includeEdge) continue
      const pts = edge.getCoordinatesOriented()
      const line = geomFact.createLineString(pts)
      line.setUserData(OverlayUtil.labelForResult(edge))
      lines.add(line)
    }
    return geomFact.buildGeometry(lines)
  }
  static createEmptyResult(dim, geomFact) {
    let result = null
    switch (dim) {
    case 0:
      result = geomFact.createPoint()
      break
    case 1:
      result = geomFact.createLineString()
      break
    case 2:
      result = geomFact.createPolygon()
      break
    case -1:
      result = geomFact.createGeometryCollection()
      break
    default:
      Assert.shouldNeverReachHere('Unable to determine overlay result geometry dimension')
    }
    return result
  }
  static resultEnvelope(opCode, inputGeom, pm) {
    let overlapEnv = null
    switch (opCode) {
    case OverlayNG.INTERSECTION:
      const envA = OverlayUtil.safeEnv(inputGeom.getEnvelope(0), pm)
      const envB = OverlayUtil.safeEnv(inputGeom.getEnvelope(1), pm)
      overlapEnv = envA.intersection(envB)
      break
    case OverlayNG.DIFFERENCE:
      overlapEnv = OverlayUtil.safeEnv(inputGeom.getEnvelope(0), pm)
      break
    }
    return overlapEnv
  }
  static isEmpty(geom) {
    return geom === null || geom.isEmpty()
  }
  static isLess(v1, v2, tol) {
    return v1 <= v2 * (1 + tol)
  }
  static isDisjoint(envA, envB, pm) {
    if (pm.makePrecise(envB.getMinX()) > pm.makePrecise(envA.getMaxX())) return true
    if (pm.makePrecise(envB.getMaxX()) < pm.makePrecise(envA.getMinX())) return true
    if (pm.makePrecise(envB.getMinY()) > pm.makePrecise(envA.getMaxY())) return true
    if (pm.makePrecise(envB.getMaxY()) < pm.makePrecise(envA.getMinY())) return true
    return false
  }
}
OverlayUtil.SAFE_ENV_BUFFER_FACTOR = 0.1
OverlayUtil.SAFE_ENV_GRID_FACTOR = 3
OverlayUtil.AREA_HEURISTIC_TOLERANCE = 0.1
