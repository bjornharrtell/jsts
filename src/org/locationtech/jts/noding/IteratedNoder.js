import Noder from './Noder.js'
import MCIndexNoder from './MCIndexNoder.js'
import TopologyException from '../geom/TopologyException.js'
import RobustLineIntersector from '../algorithm/RobustLineIntersector.js'
import IntersectionAdder from './IntersectionAdder.js'
export default class IteratedNoder {
  constructor() {
    IteratedNoder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pm = null
    this._li = null
    this._nodedSegStrings = null
    this._maxIter = IteratedNoder.MAX_ITER
    const pm = arguments[0]
    this._li = new RobustLineIntersector()
    this._pm = pm
    this._li.setPrecisionModel(pm)
  }
  getNodedSubstrings() {
    return this._nodedSegStrings
  }
  node(segStrings, numInteriorIntersections) {
    const si = new IntersectionAdder(this._li)
    const noder = new MCIndexNoder()
    noder.setSegmentIntersector(si)
    noder.computeNodes(segStrings)
    this._nodedSegStrings = noder.getNodedSubstrings()
    numInteriorIntersections[0] = si.numInteriorIntersections
  }
  computeNodes(segStrings) {
    const numInteriorIntersections = new Array(1).fill(null)
    this._nodedSegStrings = segStrings
    let nodingIterationCount = 0
    let lastNodesCreated = -1
    do {
      this.node(this._nodedSegStrings, numInteriorIntersections)
      nodingIterationCount++
      const nodesCreated = numInteriorIntersections[0]
      if (lastNodesCreated > 0 && nodesCreated >= lastNodesCreated && nodingIterationCount > this._maxIter) 
        throw new TopologyException('Iterated noding failed to converge after ' + nodingIterationCount + ' iterations')
      
      lastNodesCreated = nodesCreated
    } while (lastNodesCreated > 0)
  }
  setMaximumIterations(maxIter) {
    this._maxIter = maxIter
  }
  get interfaces_() {
    return [Noder]
  }
}
IteratedNoder.MAX_ITER = 5
