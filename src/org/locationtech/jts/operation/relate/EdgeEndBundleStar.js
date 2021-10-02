import EdgeEndStar from '../../geomgraph/EdgeEndStar.js'
import EdgeEndBundle from './EdgeEndBundle.js'
export default class EdgeEndBundleStar extends EdgeEndStar {
  constructor() {
    super()
  }
  updateIM(im) {
    for (let it = this.iterator(); it.hasNext(); ) {
      const esb = it.next()
      esb.updateIM(im)
    }
  }
  insert(e) {
    let eb = this._edgeMap.get(e)
    if (eb === null) {
      eb = new EdgeEndBundle(e)
      this.insertEdgeEnd(e, eb)
    } else {
      eb.insert(e)
    }
  }
}
