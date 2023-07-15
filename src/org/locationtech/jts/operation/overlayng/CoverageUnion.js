import OverlayNG from './OverlayNG.js'
import SegmentExtractingNoder from '../../noding/SegmentExtractingNoder.js'
import BoundaryChainNoder from '../../noding/BoundaryChainNoder.js'
export default class CoverageUnion {
  static union(coverage) {
    let noder = new BoundaryChainNoder()
    if (coverage.getDimension() < 2) 
      noder = new SegmentExtractingNoder()
    
    return OverlayNG.union(coverage, null, noder)
  }
}
