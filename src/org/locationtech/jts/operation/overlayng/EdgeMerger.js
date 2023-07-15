import HashMap from '../../../../../java/util/HashMap.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import Assert from '../../util/Assert.js'
import EdgeKey from './EdgeKey.js'
export default class EdgeMerger {
  static merge(edges) {
    const mergedEdges = new ArrayList()
    const edgeMap = new HashMap()
    for (const edge of edges) {
      const edgeKey = EdgeKey.create(edge)
      const baseEdge = edgeMap.get(edgeKey)
      if (baseEdge === null) {
        edgeMap.put(edgeKey, edge)
        mergedEdges.add(edge)
      } else {
        Assert.isTrue(baseEdge.size() === edge.size(), 'Merge of edges of different sizes - probable noding error.')
        baseEdge.merge(edge)
      }
    }
    return mergedEdges
  }
}
