import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException.js'
import OverlayNG from './OverlayNG.js'
import TopologyException from '../../geom/TopologyException.js'
export default class PrecisionReducer {
  static reducePrecision(geom, pm) {
    const ov = new OverlayNG(geom, pm)
    if (geom.getDimension() === 2) 
      ov.setAreaResultOnly(true)
    
    try {
      const reduced = ov.getResult()
      return reduced
    } catch (ex) {
      if (ex instanceof TopologyException) 
        throw new IllegalArgumentException('Reduction failed, possible invalid input')
      else throw ex
    } finally {}
  }
}
