import NodingValidator from '../NodingValidator'
import hasInterface from '../../../../../hasInterface'
import Collection from '../../../../../java/util/Collection'
import Noder from '../Noder'
import MCIndexNoder from '../MCIndexNoder'
import NodedSegmentString from '../NodedSegmentString'
import HotPixel from './HotPixel'
import Exception from '../../../../../java/lang/Exception'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector'
import InteriorIntersectionFinderAdder from '../InteriorIntersectionFinderAdder'
export default class SimpleSnapRounder {
  constructor() {
    SimpleSnapRounder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pm = null
    this._li = null
    this._scaleFactor = null
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
    this.computeSnaps(segStrings, intersections)
    this.computeVertexSnaps(segStrings)
  }
  findInteriorIntersections(segStrings, li) {
    const intFinderAdder = new InteriorIntersectionFinderAdder(li)
    const noder = new MCIndexNoder()
    noder.setSegmentIntersector(intFinderAdder)
    noder.computeNodes(segStrings)
    return intFinderAdder.getInteriorIntersections()
  }
  computeVertexSnaps() {
    if (arguments.length === 1) {
      const edges = arguments[0]
      for (let i0 = edges.iterator(); i0.hasNext(); ) {
        const edge0 = i0.next()
        for (let i1 = edges.iterator(); i1.hasNext(); ) {
          const edge1 = i1.next()
          this.computeVertexSnaps(edge0, edge1)
        }
      }
    } else if (arguments.length === 2) {
      const e0 = arguments[0], e1 = arguments[1]
      const pts0 = e0.getCoordinates()
      const pts1 = e1.getCoordinates()
      for (let i0 = 0; i0 < pts0.length - 1; i0++) {
        const hotPixel = new HotPixel(pts0[i0], this._scaleFactor, this._li)
        for (let i1 = 0; i1 < pts1.length - 1; i1++) {
          if (e0 === e1) 
            if (i0 === i1) continue
          
          const isNodeAdded = hotPixel.addSnappedNode(e1, i1)
          if (isNodeAdded) 
            e0.addIntersection(pts0[i0], i0)
          
        }
      }
    }
  }
  computeNodes(inputSegmentStrings) {
    this._nodedSegStrings = inputSegmentStrings
    this.snapRound(inputSegmentStrings, this._li)
  }
  computeSnaps() {
    if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection)) {
      const segStrings = arguments[0], snapPts = arguments[1]
      for (let i0 = segStrings.iterator(); i0.hasNext(); ) {
        const ss = i0.next()
        this.computeSnaps(ss, snapPts)
      }
    } else if (arguments[0] instanceof NodedSegmentString && hasInterface(arguments[1], Collection)) {
      const ss = arguments[0], snapPts = arguments[1]
      for (let it = snapPts.iterator(); it.hasNext(); ) {
        const snapPt = it.next()
        const hotPixel = new HotPixel(snapPt, this._scaleFactor, this._li)
        for (let i = 0; i < ss.size() - 1; i++) 
          hotPixel.addSnappedNode(ss, i)
        
      }
    }
  }
  get interfaces_() {
    return [Noder]
  }
}
