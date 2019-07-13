import EdgeEndStar from '../../geomgraph/EdgeEndStar'
import EdgeEndBundle from './EdgeEndBundle'
export default class EdgeEndBundleStar extends EdgeEndStar {
  constructor () {
    super()
    EdgeEndBundleStar.constructor_.apply(this, arguments)
  }

  updateIM (im) {
    for (let it = this.iterator(); it.hasNext();) {
      const esb = it.next()
      esb.updateIM(im)
    }
  }

  insert (e) {
    let eb = this._edgeMap.get(e)
    if (eb === null) {
      eb = new EdgeEndBundle(e)
      this.insertEdgeEnd(e, eb)
    } else {
      eb.insert(e)
    }
  }

  getClass () {
    return EdgeEndBundleStar
  }

  get interfaces_ () {
    return []
  }
}
EdgeEndBundleStar.constructor_ = function () {}
