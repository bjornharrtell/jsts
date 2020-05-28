import IntArrayList from '../../util/IntArrayList'
import ArrayList from '../../../../../java/util/ArrayList'
import Quadrant from '../Quadrant'
export default class MonotoneChainIndexer {
  static toIntArray(list) {
    const array = new Array(list.size()).fill(null)
    for (let i = 0; i < array.length; i++) 
      array[i] = list.get(i).intValue()
    
    return array
  }
  getChainStartIndices(pts) {
    let start = 0
    const startIndexList = new IntArrayList(Math.trunc(pts.length / 2))
    startIndexList.add(start)
    do {
      const last = this.findChainEnd(pts, start)
      startIndexList.add(last)
      start = last
    } while (start < pts.length - 1)
    return startIndexList.toArray()
  }
  findChainEnd(pts, start) {
    const chainQuad = Quadrant.quadrant(pts[start], pts[start + 1])
    let last = start + 1
    while (last < pts.length) {
      const quad = Quadrant.quadrant(pts[last - 1], pts[last])
      if (quad !== chainQuad) break
      last++
    }
    return last - 1
  }
  OLDgetChainStartIndices(pts) {
    let start = 0
    const startIndexList = new ArrayList()
    startIndexList.add(start)
    do {
      const last = this.findChainEnd(pts, start)
      startIndexList.add(last)
      start = last
    } while (start < pts.length - 1)
    const startIndex = MonotoneChainIndexer.toIntArray(startIndexList)
    return startIndex
  }
}
