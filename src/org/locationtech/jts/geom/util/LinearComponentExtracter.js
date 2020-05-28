import LineString from '../LineString'
import Geometry from '../Geometry'
import hasInterface from '../../../../../hasInterface'
import Collection from '../../../../../java/util/Collection'
import LinearRing from '../LinearRing'
import GeometryComponentFilter from '../GeometryComponentFilter'
import ArrayList from '../../../../../java/util/ArrayList'
export default class LinearComponentExtracter {
  constructor() {
    LinearComponentExtracter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._lines = null
    this._isForcedToLineString = false
    if (arguments.length === 1) {
      const lines = arguments[0]
      this._lines = lines
    } else if (arguments.length === 2) {
      const lines = arguments[0], isForcedToLineString = arguments[1]
      this._lines = lines
      this._isForcedToLineString = isForcedToLineString
    }
  }
  static getGeometry() {
    if (arguments.length === 1) {
      const geom = arguments[0]
      return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom))
    } else if (arguments.length === 2) {
      const geom = arguments[0], forceToLineString = arguments[1]
      return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom, forceToLineString))
    }
  }
  static getLines() {
    if (arguments.length === 1) {
      const geom = arguments[0]
      return LinearComponentExtracter.getLines(geom, false)
    } else if (arguments.length === 2) {
      if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection)) {
        const geoms = arguments[0], lines = arguments[1]
        for (let i = geoms.iterator(); i.hasNext(); ) {
          const g = i.next()
          LinearComponentExtracter.getLines(g, lines)
        }
        return lines
      } else if (arguments[0] instanceof Geometry && typeof arguments[1] === 'boolean') {
        const geom = arguments[0], forceToLineString = arguments[1]
        const lines = new ArrayList()
        geom.apply(new LinearComponentExtracter(lines, forceToLineString))
        return lines
      } else if (arguments[0] instanceof Geometry && hasInterface(arguments[1], Collection)) {
        const geom = arguments[0], lines = arguments[1]
        if (geom instanceof LineString) 
          lines.add(geom)
        else 
          geom.apply(new LinearComponentExtracter(lines))
        
        return lines
      }
    } else if (arguments.length === 3) {
      if (typeof arguments[2] === 'boolean' && (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection))) {
        const geoms = arguments[0], lines = arguments[1], forceToLineString = arguments[2]
        for (let i = geoms.iterator(); i.hasNext(); ) {
          const g = i.next()
          LinearComponentExtracter.getLines(g, lines, forceToLineString)
        }
        return lines
      } else if (typeof arguments[2] === 'boolean' && (arguments[0] instanceof Geometry && hasInterface(arguments[1], Collection))) {
        const geom = arguments[0], lines = arguments[1], forceToLineString = arguments[2]
        geom.apply(new LinearComponentExtracter(lines, forceToLineString))
        return lines
      }
    }
  }
  filter(geom) {
    if (this._isForcedToLineString && geom instanceof LinearRing) {
      const line = geom.getFactory().createLineString(geom.getCoordinateSequence())
      this._lines.add(line)
      return null
    }
    if (geom instanceof LineString) this._lines.add(geom)
  }
  setForceToLineString(isForcedToLineString) {
    this._isForcedToLineString = isForcedToLineString
  }
  get interfaces_() {
    return [GeometryComponentFilter]
  }
}
