import HashMap from '../../../../../java/util/HashMap.js'
import Point from '../../geom/Point.js'
import OverlayNG from './OverlayNG.js'
import OverlayUtil from './OverlayUtil.js'
import GeometryComponentFilter from '../../geom/GeometryComponentFilter.js'
import CoordinateSequence from '../../geom/CoordinateSequence.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
export default class OverlayPoints {
  constructor() {
    OverlayPoints.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._opCode = null
    this._geom0 = null
    this._geom1 = null
    this._pm = null
    this._geometryFactory = null
    this._resultList = null
    const opCode = arguments[0], geom0 = arguments[1], geom1 = arguments[2], pm = arguments[3]
    this._opCode = opCode
    this._geom0 = geom0
    this._geom1 = geom1
    this._pm = pm
    this._geometryFactory = geom0.getFactory()
  }
  static overlay(opCode, geom0, geom1, pm) {
    const overlay = new OverlayPoints(opCode, geom0, geom1, pm)
    return overlay.getResult()
  }
  static roundCoord(pt, pm) {
    const p = pt.getCoordinate()
    if (OverlayUtil.isFloating(pm)) return p
    const p2 = p.copy()
    pm.makePrecise(p2)
    return p2
  }
  buildPointMap(geoms) {
    const map = new HashMap()
    geoms.apply(new (class {
      get interfaces_() {
        return [GeometryComponentFilter]
      }
      filter(geom) {
        if (!(geom instanceof Point)) return null
        if (geom.isEmpty()) return null
        const pt = geom
        const p = OverlayPoints.roundCoord(pt, this._pm)
        if (!map.containsKey(p)) map.put(p, pt)
      }
    })())
    return map
  }
  computeIntersection(map0, map1, resultList) {
    for (const entry of map0.entrySet()) 
      if (map1.containsKey(entry.getKey())) 
        resultList.add(this.copyPoint(entry.getValue()))
      
    
  }
  computeDifference(map0, map1, resultList) {
    for (const entry of map0.entrySet()) 
      if (!map1.containsKey(entry.getKey())) 
        resultList.add(this.copyPoint(entry.getValue()))
      
    
  }
  computeUnion(map0, map1, resultList) {
    for (const p of map0.values()) 
      resultList.add(this.copyPoint(p))
    
    for (const entry of map1.entrySet()) 
      if (!map0.containsKey(entry.getKey())) 
        resultList.add(this.copyPoint(entry.getValue()))
      
    
  }
  getResult() {
    const map0 = this.buildPointMap(this._geom0)
    const map1 = this.buildPointMap(this._geom1)
    this._resultList = new ArrayList()
    switch (this._opCode) {
    case OverlayNG.INTERSECTION:
      this.computeIntersection(map0, map1, this._resultList)
      break
    case OverlayNG.UNION:
      this.computeUnion(map0, map1, this._resultList)
      break
    case OverlayNG.DIFFERENCE:
      this.computeDifference(map0, map1, this._resultList)
      break
    case OverlayNG.SYMDIFFERENCE:
      this.computeDifference(map0, map1, this._resultList)
      this.computeDifference(map1, map0, this._resultList)
      break
    }
    if (this._resultList.isEmpty()) return OverlayUtil.createEmptyResult(0, this._geometryFactory)
    return this._geometryFactory.buildGeometry(this._resultList)
  }
  copyPoint(pt) {
    if (OverlayUtil.isFloating(this._pm)) return pt.copy()
    const seq = pt.getCoordinateSequence()
    const seq2 = seq.copy()
    seq2.setOrdinate(0, CoordinateSequence.X, this._pm.makePrecise(seq.getX(0)))
    seq2.setOrdinate(0, CoordinateSequence.Y, this._pm.makePrecise(seq.getY(0)))
    return this._geometryFactory.createPoint(seq2)
  }
}
