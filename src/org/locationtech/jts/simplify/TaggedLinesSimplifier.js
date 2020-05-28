import TaggedLineStringSimplifier from './TaggedLineStringSimplifier'
import LineSegmentIndex from './LineSegmentIndex'
export default class TaggedLinesSimplifier {
  constructor() {
    TaggedLinesSimplifier.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputIndex = new LineSegmentIndex()
    this._outputIndex = new LineSegmentIndex()
    this._distanceTolerance = 0.0
  }
  setDistanceTolerance(distanceTolerance) {
    this._distanceTolerance = distanceTolerance
  }
  simplify(taggedLines) {
    for (let i = taggedLines.iterator(); i.hasNext(); ) 
      this._inputIndex.add(i.next())
    
    for (let i = taggedLines.iterator(); i.hasNext(); ) {
      const tlss = new TaggedLineStringSimplifier(this._inputIndex, this._outputIndex)
      tlss.setDistanceTolerance(this._distanceTolerance)
      tlss.simplify(i.next())
    }
  }
}
