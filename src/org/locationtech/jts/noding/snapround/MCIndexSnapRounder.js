import NodingValidator from '../NodingValidator'
import hasInterface from '../../../../../hasInterface'
import Collection from '../../../../../java/util/Collection'
import Noder from '../Noder'
import MCIndexNoder from '../MCIndexNoder'
import NodedSegmentString from '../NodedSegmentString'
import HotPixel from './HotPixel'
import Exception from '../../../../../java/lang/Exception'
import MCIndexPointSnapper from './MCIndexPointSnapper'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector'
import InteriorIntersectionFinderAdder from '../InteriorIntersectionFinderAdder'
export default class MCIndexSnapRounder {
  constructor() {
    MCIndexSnapRounder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pm = null
    this._li = null
    this._scaleFactor = null
    this._noder = null
    this._pointSnapper = null
    this._nodedSegStrings = null
    const pm = arguments[0]
    this._pm = pm
    this._li = new RobustLineIntersector()
    this._li.setPrecisionModel(pm)
    this._scaleFactor = pm.getScale()
  }
  checkCorrectness(inputSegmentStrings) {
    const resultSegStrings = NodedSegmentString.getNodedSubstrings(inputSegmentStrings)
    const nv = new NodingValidator(resultSegStrings)
    try {
      nv.checkValid()
    } catch (ex) {
      if (ex instanceof Exception) 
        ex.printStackTrace()
      else throw ex
    } finally {}
  }
  getNodedSubstrings() {
    return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings)
  }
  snapRound(segStrings, li) {
    const intersections = this.findInteriorIntersections(segStrings, li)
    this.computeIntersectionSnaps(intersections)
    this.computeVertexSnaps(segStrings)
  }
  findInteriorIntersections(segStrings, li) {
    const intFinderAdder = new InteriorIntersectionFinderAdder(li)
    this._noder.setSegmentIntersector(intFinderAdder)
    this._noder.computeNodes(segStrings)
    return intFinderAdder.getInteriorIntersections()
  }
  computeVertexSnaps() {
    if (hasInterface(arguments[0], Collection)) {
      const edges = arguments[0]
      for (let i0 = edges.iterator(); i0.hasNext(); ) {
        const edge0 = i0.next()
        this.computeVertexSnaps(edge0)
      }
    } else if (arguments[0] instanceof NodedSegmentString) {
      const e = arguments[0]
      const pts0 = e.getCoordinates()
      for (let i = 0; i < pts0.length; i++) {
        const hotPixel = new HotPixel(pts0[i], this._scaleFactor, this._li)
        const isNodeAdded = this._pointSnapper.snap(hotPixel, e, i)
        if (isNodeAdded) 
          e.addIntersection(pts0[i], i)
        
      }
    }
  }
  computeNodes(inputSegmentStrings) {
    this._nodedSegStrings = inputSegmentStrings
    this._noder = new MCIndexNoder()
    this._pointSnapper = new MCIndexPointSnapper(this._noder.getIndex())
    this.snapRound(inputSegmentStrings, this._li)
  }
  computeIntersectionSnaps(snapPts) {
    for (let it = snapPts.iterator(); it.hasNext(); ) {
      const snapPt = it.next()
      const hotPixel = new HotPixel(snapPt, this._scaleFactor, this._li)
      this._pointSnapper.snap(hotPixel)
    }
  }
  get interfaces_() {
    return [Noder]
  }
}
