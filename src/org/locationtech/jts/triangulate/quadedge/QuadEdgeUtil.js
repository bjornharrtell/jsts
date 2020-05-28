import ArrayList from '../../../../../java/util/ArrayList'
export default class QuadEdgeUtil {
  static findEdgesIncidentOnOrigin(start) {
    const incEdge = new ArrayList()
    let qe = start
    do {
      incEdge.add(qe)
      qe = qe.oNext()
    } while (qe !== start)
    return incEdge
  }
}
