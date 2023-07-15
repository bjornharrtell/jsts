import Location from '../../geom/Location.js'
import OverlayLabel from './OverlayLabel.js'
import WKTWriter from '../../io/WKTWriter.js'
import Integer from '../../../../../java/lang/Integer.js'
import Dimension from '../../geom/Dimension.js'
import IllegalStateException from '../../../../../java/lang/IllegalStateException.js'
export default class Edge {
  constructor() {
    Edge.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pts = null
    this._aDim = OverlayLabel.DIM_UNKNOWN
    this._aDepthDelta = 0
    this._aIsHole = false
    this._bDim = OverlayLabel.DIM_UNKNOWN
    this._bDepthDelta = 0
    this._bIsHole = false
    const pts = arguments[0], info = arguments[1]
    this._pts = pts
    this.copyInfo(info)
  }
  static isCollapsed(pts) {
    if (pts.length < 2) return true
    if (pts[0].equals2D(pts[1])) return true
    if (pts.length > 2) 
      if (pts[pts.length - 1].equals2D(pts[pts.length - 2])) return true
    
    return false
  }
  static hasAreaParent(dim) {
    return dim === OverlayLabel.DIM_BOUNDARY || dim === OverlayLabel.DIM_COLLAPSE
  }
  static labelDim(dim, depthDelta) {
    if (dim === Dimension.FALSE) return OverlayLabel.DIM_NOT_PART
    if (dim === Dimension.L) return OverlayLabel.DIM_LINE
    const isCollapse = depthDelta === 0
    if (isCollapse) return OverlayLabel.DIM_COLLAPSE
    return OverlayLabel.DIM_BOUNDARY
  }
  static infoString(index, dim, isHole, depthDelta) {
    return (index === 0 ? 'A:' : 'B:') + OverlayLabel.dimensionSymbol(dim) + Edge.ringRoleSymbol(dim, isHole) + Integer.toString(depthDelta)
  }
  static initLabel(lbl, geomIndex, dim, depthDelta, isHole) {
    const dimLabel = Edge.labelDim(dim, depthDelta)
    switch (dimLabel) {
    case OverlayLabel.DIM_NOT_PART:
      lbl.initNotPart(geomIndex)
      break
    case OverlayLabel.DIM_BOUNDARY:
      lbl.initBoundary(geomIndex, Edge.locationLeft(depthDelta), Edge.locationRight(depthDelta), isHole)
      break
    case OverlayLabel.DIM_COLLAPSE:
      lbl.initCollapse(geomIndex, isHole)
      break
    case OverlayLabel.DIM_LINE:
      lbl.initLine(geomIndex)
      break
    }
  }
  static locationRight(depthDelta) {
    const delSign = Edge.delSign(depthDelta)
    switch (delSign) {
    case 0:
      return OverlayLabel.LOC_UNKNOWN
    case 1:
      return Location.INTERIOR
    case -1:
      return Location.EXTERIOR
    }
    return OverlayLabel.LOC_UNKNOWN
  }
  static toStringPts(pts) {
    const orig = pts[0]
    const dest = pts[pts.length - 1]
    const dirPtStr = pts.length > 2 ? ', ' + WKTWriter.format(pts[1]) : ''
    const ptsStr = WKTWriter.format(orig) + dirPtStr + ' .. ' + WKTWriter.format(dest)
    return ptsStr
  }
  static delSign(depthDel) {
    if (depthDel > 0) return 1
    if (depthDel < 0) return -1
    return 0
  }
  static locationLeft(depthDelta) {
    const delSign = Edge.delSign(depthDelta)
    switch (delSign) {
    case 0:
      return OverlayLabel.LOC_UNKNOWN
    case 1:
      return Location.EXTERIOR
    case -1:
      return Location.INTERIOR
    }
    return OverlayLabel.LOC_UNKNOWN
  }
  static ringRoleSymbol(dim, isHole) {
    if (Edge.hasAreaParent(dim)) return '' + OverlayLabel.ringRoleSymbol(isHole)
    return ''
  }
  static isHoleMerged(geomIndex, edge1, edge2) {
    const isShell1 = edge1.isShell(geomIndex)
    const isShell2 = edge2.isShell(geomIndex)
    const isShellMerged = isShell1 || isShell2
    return !isShellMerged
  }
  getCoordinates() {
    return this._pts
  }
  size() {
    return this._pts.length
  }
  getCoordinate(index) {
    return this._pts[index]
  }
  direction() {
    const pts = this.getCoordinates()
    if (pts.length < 2) 
      throw new IllegalStateException('Edge must have >= 2 points')
    
    const p0 = pts[0]
    const p1 = pts[1]
    const pn0 = pts[pts.length - 1]
    const pn1 = pts[pts.length - 2]
    let cmp = 0
    const cmp0 = p0.compareTo(pn0)
    if (cmp0 !== 0) cmp = cmp0
    if (cmp === 0) {
      const cmp1 = p1.compareTo(pn1)
      if (cmp1 !== 0) cmp = cmp1
    }
    if (cmp === 0) 
      throw new IllegalStateException('Edge direction cannot be determined because endpoints are equal')
    
    return cmp === -1
  }
  createLabel() {
    const lbl = new OverlayLabel()
    Edge.initLabel(lbl, 0, this._aDim, this._aDepthDelta, this._aIsHole)
    Edge.initLabel(lbl, 1, this._bDim, this._bDepthDelta, this._bIsHole)
    return lbl
  }
  relativeDirection(edge2) {
    if (!this.getCoordinate(0).equals2D(edge2.getCoordinate(0))) return false
    if (!this.getCoordinate(1).equals2D(edge2.getCoordinate(1))) return false
    return true
  }
  copyInfo(info) {
    if (info.getIndex() === 0) {
      this._aDim = info.getDimension()
      this._aIsHole = info.isHole()
      this._aDepthDelta = info.getDepthDelta()
    } else {
      this._bDim = info.getDimension()
      this._bIsHole = info.isHole()
      this._bDepthDelta = info.getDepthDelta()
    }
  }
  isShell(geomIndex) {
    if (geomIndex === 0) 
      return this._aDim === OverlayLabel.DIM_BOUNDARY && !this._aIsHole
    
    return this._bDim === OverlayLabel.DIM_BOUNDARY && !this._bIsHole
  }
  merge(edge) {
    this._aIsHole = Edge.isHoleMerged(0, this, edge)
    this._bIsHole = Edge.isHoleMerged(1, this, edge)
    if (edge._aDim > this._aDim) this._aDim = edge._aDim
    if (edge._bDim > this._bDim) this._bDim = edge._bDim
    const relDir = this.relativeDirection(edge)
    const flipFactor = relDir ? 1 : -1
    this._aDepthDelta += flipFactor * edge._aDepthDelta
    this._bDepthDelta += flipFactor * edge._bDepthDelta
  }
  toLineString() {
    return WKTWriter.toLineString(this._pts)
  }
  toString() {
    const ptsStr = Edge.toStringPts(this._pts)
    const aInfo = Edge.infoString(0, this._aDim, this._aIsHole, this._aDepthDelta)
    const bInfo = Edge.infoString(1, this._bDim, this._bIsHole, this._bDepthDelta)
    return 'Edge( ' + ptsStr + ' ) ' + aInfo + '/' + bInfo
  }
}
