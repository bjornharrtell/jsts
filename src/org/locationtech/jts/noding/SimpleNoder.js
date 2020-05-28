import NodedSegmentString from './NodedSegmentString'
import SinglePassNoder from './SinglePassNoder'
export default class SimpleNoder extends SinglePassNoder {
  constructor() {
    super()
    SimpleNoder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._nodedSegStrings = null
  }
  computeNodes(inputSegStrings) {
    this._nodedSegStrings = inputSegStrings
    for (let i0 = inputSegStrings.iterator(); i0.hasNext(); ) {
      const edge0 = i0.next()
      for (let i1 = inputSegStrings.iterator(); i1.hasNext(); ) {
        const edge1 = i1.next()
        this.computeIntersects(edge0, edge1)
      }
    }
  }
  computeIntersects(e0, e1) {
    const pts0 = e0.getCoordinates()
    const pts1 = e1.getCoordinates()
    for (let i0 = 0; i0 < pts0.length - 1; i0++) 
      for (let i1 = 0; i1 < pts1.length - 1; i1++) 
        this._segInt.processIntersections(e0, i0, e1, i1)
      
    
  }
  getNodedSubstrings() {
    return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings)
  }
}
