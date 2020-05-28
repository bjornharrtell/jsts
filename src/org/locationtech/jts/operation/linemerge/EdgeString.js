import CoordinateList from '../../geom/CoordinateList'
import CoordinateArrays from '../../geom/CoordinateArrays'
import ArrayList from '../../../../../java/util/ArrayList'
export default class EdgeString {
  constructor() {
    EdgeString.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._factory = null
    this._directedEdges = new ArrayList()
    this._coordinates = null
    const factory = arguments[0]
    this._factory = factory
  }
  getCoordinates() {
    if (this._coordinates === null) {
      let forwardDirectedEdges = 0
      let reverseDirectedEdges = 0
      const coordinateList = new CoordinateList()
      for (let i = this._directedEdges.iterator(); i.hasNext(); ) {
        const directedEdge = i.next()
        if (directedEdge.getEdgeDirection()) 
          forwardDirectedEdges++
        else 
          reverseDirectedEdges++
        
        coordinateList.add(directedEdge.getEdge().getLine().getCoordinates(), false, directedEdge.getEdgeDirection())
      }
      this._coordinates = coordinateList.toCoordinateArray()
      if (reverseDirectedEdges > forwardDirectedEdges) 
        CoordinateArrays.reverse(this._coordinates)
      
    }
    return this._coordinates
  }
  toLineString() {
    return this._factory.createLineString(this.getCoordinates())
  }
  add(directedEdge) {
    this._directedEdges.add(directedEdge)
  }
}
