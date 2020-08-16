import Coordinate from './Coordinate'
import RuntimeException from '../../../../java/lang/RuntimeException'

export default class TopologyException extends RuntimeException {
  constructor(msg, pt) {
    super(pt ? msg + ' [ ' + pt + ' ]' : msg)
    this.pt = pt ? new Coordinate(pt) : undefined
    this.name = Object.keys({ TopologyException })[0]
  }
  getCoordinate() {
    return this.pt
  }
}
