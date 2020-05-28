import NodingValidator from '../NodingValidator'
import NodedSegmentString from '../NodedSegmentString'
import ArrayList from '../../../../../java/util/ArrayList'
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter'
import MCIndexSnapRounder from './MCIndexSnapRounder'
export default class GeometryNoder {
  constructor() {
    GeometryNoder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geomFact = null
    this._pm = null
    this._isValidityChecked = false
    const pm = arguments[0]
    this._pm = pm
  }
  extractLines(geoms) {
    const lines = new ArrayList()
    const lce = new LinearComponentExtracter(lines)
    for (let it = geoms.iterator(); it.hasNext(); ) {
      const geom = it.next()
      geom.apply(lce)
    }
    return lines
  }
  setValidate(isValidityChecked) {
    this._isValidityChecked = isValidityChecked
  }
  node(geoms) {
    const geom0 = geoms.iterator().next()
    this._geomFact = geom0.getFactory()
    const segStrings = this.toSegmentStrings(this.extractLines(geoms))
    const sr = new MCIndexSnapRounder(this._pm)
    sr.computeNodes(segStrings)
    const nodedLines = sr.getNodedSubstrings()
    if (this._isValidityChecked) {
      const nv = new NodingValidator(nodedLines)
      nv.checkValid()
    }
    return this.toLineStrings(nodedLines)
  }
  toSegmentStrings(lines) {
    const segStrings = new ArrayList()
    for (let it = lines.iterator(); it.hasNext(); ) {
      const line = it.next()
      segStrings.add(new NodedSegmentString(line.getCoordinates(), null))
    }
    return segStrings
  }
  toLineStrings(segStrings) {
    const lines = new ArrayList()
    for (let it = segStrings.iterator(); it.hasNext(); ) {
      const ss = it.next()
      if (ss.size() < 2) continue
      lines.add(this._geomFact.createLineString(ss.getCoordinates()))
    }
    return lines
  }
}
