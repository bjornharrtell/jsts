import InteriorPointArea from './InteriorPointArea'
import InteriorPointLine from './InteriorPointLine'
import InteriorPointPoint from './InteriorPointPoint'
export default class InteriorPoint {
  static getInteriorPoint(geom) {
    if (geom.isEmpty()) return null
    let interiorPt = null
    const dim = geom.getDimension()
    if (dim === 0) 
      interiorPt = InteriorPointPoint.getInteriorPoint(geom)
    else if (dim === 1) 
      interiorPt = InteriorPointLine.getInteriorPoint(geom)
    else 
      interiorPt = InteriorPointArea.getInteriorPoint(geom)
    
    return interiorPt
  }
}
