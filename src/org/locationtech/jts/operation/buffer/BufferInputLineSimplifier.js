import CoordinateList from '../../geom/CoordinateList'
import Orientation from '../../algorithm/Orientation'
import Distance from '../../algorithm/Distance'
export default class BufferInputLineSimplifier {
  constructor() {
    BufferInputLineSimplifier.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputLine = null
    this._distanceTol = null
    this._isDeleted = null
    this._angleOrientation = Orientation.COUNTERCLOCKWISE
    const inputLine = arguments[0]
    this._inputLine = inputLine
  }
  static simplify(inputLine, distanceTol) {
    const simp = new BufferInputLineSimplifier(inputLine)
    return simp.simplify(distanceTol)
  }
  isDeletable(i0, i1, i2, distanceTol) {
    const p0 = this._inputLine[i0]
    const p1 = this._inputLine[i1]
    const p2 = this._inputLine[i2]
    if (!this.isConcave(p0, p1, p2)) return false
    if (!this.isShallow(p0, p1, p2, distanceTol)) return false
    return this.isShallowSampled(p0, p1, i0, i2, distanceTol)
  }
  deleteShallowConcavities() {
    let index = 1
    let midIndex = this.findNextNonDeletedIndex(index)
    let lastIndex = this.findNextNonDeletedIndex(midIndex)
    let isChanged = false
    while (lastIndex < this._inputLine.length) {
      let isMiddleVertexDeleted = false
      if (this.isDeletable(index, midIndex, lastIndex, this._distanceTol)) {
        this._isDeleted[midIndex] = BufferInputLineSimplifier.DELETE
        isMiddleVertexDeleted = true
        isChanged = true
      }
      if (isMiddleVertexDeleted) index = lastIndex; else index = midIndex
      midIndex = this.findNextNonDeletedIndex(index)
      lastIndex = this.findNextNonDeletedIndex(midIndex)
    }
    return isChanged
  }
  isShallowConcavity(p0, p1, p2, distanceTol) {
    const orientation = Orientation.index(p0, p1, p2)
    const isAngleToSimplify = orientation === this._angleOrientation
    if (!isAngleToSimplify) return false
    const dist = Distance.pointToSegment(p1, p0, p2)
    return dist < distanceTol
  }
  isShallowSampled(p0, p2, i0, i2, distanceTol) {
    let inc = Math.trunc((i2 - i0) / BufferInputLineSimplifier.NUM_PTS_TO_CHECK)
    if (inc <= 0) inc = 1
    for (let i = i0; i < i2; i += inc) 
      if (!this.isShallow(p0, p2, this._inputLine[i], distanceTol)) return false
    
    return true
  }
  isConcave(p0, p1, p2) {
    const orientation = Orientation.index(p0, p1, p2)
    const isConcave = orientation === this._angleOrientation
    return isConcave
  }
  simplify(distanceTol) {
    this._distanceTol = Math.abs(distanceTol)
    if (distanceTol < 0) this._angleOrientation = Orientation.CLOCKWISE
    this._isDeleted = new Array(this._inputLine.length).fill(null)
    let isChanged = false
    do 
      isChanged = this.deleteShallowConcavities()
    while (isChanged)
    return this.collapseLine()
  }
  findNextNonDeletedIndex(index) {
    let next = index + 1
    while (next < this._inputLine.length && this._isDeleted[next] === BufferInputLineSimplifier.DELETE) next++
    return next
  }
  isShallow(p0, p1, p2, distanceTol) {
    const dist = Distance.pointToSegment(p1, p0, p2)
    return dist < distanceTol
  }
  collapseLine() {
    const coordList = new CoordinateList()
    for (let i = 0; i < this._inputLine.length; i++) 
      if (this._isDeleted[i] !== BufferInputLineSimplifier.DELETE) coordList.add(this._inputLine[i])
    
    return coordList.toCoordinateArray()
  }
}
BufferInputLineSimplifier.INIT = 0
BufferInputLineSimplifier.DELETE = 1
BufferInputLineSimplifier.KEEP = 1
BufferInputLineSimplifier.NUM_PTS_TO_CHECK = 10
