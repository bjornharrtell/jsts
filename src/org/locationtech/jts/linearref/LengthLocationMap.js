import LinearIterator from './LinearIterator'
import LinearLocation from './LinearLocation'
export default class LengthLocationMap {
  constructor() {
    LengthLocationMap.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._linearGeom = null
    const linearGeom = arguments[0]
    this._linearGeom = linearGeom
  }
  static getLength(linearGeom, loc) {
    const locater = new LengthLocationMap(linearGeom)
    return locater.getLength(loc)
  }
  static getLocation() {
    if (arguments.length === 2) {
      const linearGeom = arguments[0], length = arguments[1]
      const locater = new LengthLocationMap(linearGeom)
      return locater.getLocation(length)
    } else if (arguments.length === 3) {
      const linearGeom = arguments[0], length = arguments[1], resolveLower = arguments[2]
      const locater = new LengthLocationMap(linearGeom)
      return locater.getLocation(length, resolveLower)
    }
  }
  getLength(loc) {
    let totalLength = 0.0
    const it = new LinearIterator(this._linearGeom)
    while (it.hasNext()) {
      if (!it.isEndOfLine()) {
        const p0 = it.getSegmentStart()
        const p1 = it.getSegmentEnd()
        const segLen = p1.distance(p0)
        if (loc.getComponentIndex() === it.getComponentIndex() && loc.getSegmentIndex() === it.getVertexIndex()) 
          return totalLength + segLen * loc.getSegmentFraction()
        
        totalLength += segLen
      }
      it.next()
    }
    return totalLength
  }
  resolveHigher(loc) {
    if (!loc.isEndpoint(this._linearGeom)) return loc
    let compIndex = loc.getComponentIndex()
    if (compIndex >= this._linearGeom.getNumGeometries() - 1) return loc
    do 
      compIndex++
    while (compIndex < this._linearGeom.getNumGeometries() - 1 && this._linearGeom.getGeometryN(compIndex).getLength() === 0)
    return new LinearLocation(compIndex, 0, 0.0)
  }
  getLocation() {
    if (arguments.length === 1) {
      const length = arguments[0]
      return this.getLocation(length, true)
    } else if (arguments.length === 2) {
      const length = arguments[0], resolveLower = arguments[1]
      let forwardLength = length
      if (length < 0.0) {
        const lineLen = this._linearGeom.getLength()
        forwardLength = lineLen + length
      }
      const loc = this.getLocationForward(forwardLength)
      if (resolveLower) 
        return loc
      
      return this.resolveHigher(loc)
    }
  }
  getLocationForward(length) {
    if (length <= 0.0) return new LinearLocation()
    let totalLength = 0.0
    const it = new LinearIterator(this._linearGeom)
    while (it.hasNext()) {
      if (it.isEndOfLine()) {
        if (totalLength === length) {
          const compIndex = it.getComponentIndex()
          const segIndex = it.getVertexIndex()
          return new LinearLocation(compIndex, segIndex, 0.0)
        }
      } else {
        const p0 = it.getSegmentStart()
        const p1 = it.getSegmentEnd()
        const segLen = p1.distance(p0)
        if (totalLength + segLen > length) {
          const frac = (length - totalLength) / segLen
          const compIndex = it.getComponentIndex()
          const segIndex = it.getVertexIndex()
          return new LinearLocation(compIndex, segIndex, frac)
        }
        totalLength += segLen
      }
      it.next()
    }
    return LinearLocation.getEndLocation(this._linearGeom)
  }
}
