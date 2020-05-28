import Position from '../../geomgraph/Position'
import Orientation from '../../algorithm/Orientation'
import Assert from '../../util/Assert'
export default class RightmostEdgeFinder {
  constructor() {
    RightmostEdgeFinder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._minIndex = -1
    this._minCoord = null
    this._minDe = null
    this._orientedDe = null
  }
  getCoordinate() {
    return this._minCoord
  }
  getRightmostSide(de, index) {
    let side = this.getRightmostSideOfSegment(de, index)
    if (side < 0) side = this.getRightmostSideOfSegment(de, index - 1)
    if (side < 0) {
      this._minCoord = null
      this.checkForRightmostCoordinate(de)
    }
    return side
  }
  findRightmostEdgeAtVertex() {
    const pts = this._minDe.getEdge().getCoordinates()
    Assert.isTrue(this._minIndex > 0 && this._minIndex < pts.length, 'rightmost point expected to be interior vertex of edge')
    const pPrev = pts[this._minIndex - 1]
    const pNext = pts[this._minIndex + 1]
    const orientation = Orientation.index(this._minCoord, pNext, pPrev)
    let usePrev = false
    if (pPrev.y < this._minCoord.y && pNext.y < this._minCoord.y && orientation === Orientation.COUNTERCLOCKWISE) 
      usePrev = true
    else if (pPrev.y > this._minCoord.y && pNext.y > this._minCoord.y && orientation === Orientation.CLOCKWISE) 
      usePrev = true
    
    if (usePrev) 
      this._minIndex = this._minIndex - 1
    
  }
  getRightmostSideOfSegment(de, i) {
    const e = de.getEdge()
    const coord = e.getCoordinates()
    if (i < 0 || i + 1 >= coord.length) return -1
    if (coord[i].y === coord[i + 1].y) return -1
    let pos = Position.LEFT
    if (coord[i].y < coord[i + 1].y) pos = Position.RIGHT
    return pos
  }
  getEdge() {
    return this._orientedDe
  }
  checkForRightmostCoordinate(de) {
    const coord = de.getEdge().getCoordinates()
    for (let i = 0; i < coord.length - 1; i++) 
      if (this._minCoord === null || coord[i].x > this._minCoord.x) {
        this._minDe = de
        this._minIndex = i
        this._minCoord = coord[i]
      }
    
  }
  findRightmostEdgeAtNode() {
    const node = this._minDe.getNode()
    const star = node.getEdges()
    this._minDe = star.getRightmostEdge()
    if (!this._minDe.isForward()) {
      this._minDe = this._minDe.getSym()
      this._minIndex = this._minDe.getEdge().getCoordinates().length - 1
    }
  }
  findEdge(dirEdgeList) {
    for (let i = dirEdgeList.iterator(); i.hasNext(); ) {
      const de = i.next()
      if (!de.isForward()) continue
      this.checkForRightmostCoordinate(de)
    }
    Assert.isTrue(this._minIndex !== 0 || this._minCoord.equals(this._minDe.getCoordinate()), 'inconsistency in rightmost processing')
    if (this._minIndex === 0) 
      this.findRightmostEdgeAtNode()
    else 
      this.findRightmostEdgeAtVertex()
    
    this._orientedDe = this._minDe
    const rightmostSide = this.getRightmostSide(this._minDe, this._minIndex)
    if (rightmostSide === Position.LEFT) 
      this._orientedDe = this._minDe.getSym()
    
  }
}
