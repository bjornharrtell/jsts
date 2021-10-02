import StringBuffer from '../../../../java/lang/StringBuffer.js'
import hasInterface from '../../../../hasInterface.js'
import NodedSegmentString from './NodedSegmentString.js'
import ArrayList from '../../../../java/util/ArrayList.js'
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter.js'
import List from '../../../../java/util/List.js'
export default class SegmentStringUtil {
  static toGeometry(segStrings, geomFact) {
    const lines = new Array(segStrings.size()).fill(null)
    let index = 0
    for (let i = segStrings.iterator(); i.hasNext(); ) {
      const ss = i.next()
      const line = geomFact.createLineString(ss.getCoordinates())
      lines[index++] = line
    }
    if (lines.length === 1) return lines[0]
    return geomFact.createMultiLineString(lines)
  }
  static extractNodedSegmentStrings(geom) {
    const segStr = new ArrayList()
    const lines = LinearComponentExtracter.getLines(geom)
    for (let i = lines.iterator(); i.hasNext(); ) {
      const line = i.next()
      const pts = line.getCoordinates()
      segStr.add(new NodedSegmentString(pts, geom))
    }
    return segStr
  }
  static extractSegmentStrings(geom) {
    return SegmentStringUtil.extractNodedSegmentStrings(geom)
  }
  static toString() {
    if (arguments.length === 1 && hasInterface(arguments[0], List)) {
      const segStrings = arguments[0]
      const buf = new StringBuffer()
      for (let i = segStrings.iterator(); i.hasNext(); ) {
        const segStr = i.next()
        buf.append(segStr.toString())
        buf.append('\n')
      }
      return buf.toString()
    }
  }
}
