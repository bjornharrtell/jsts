import ArrayDeque from '../../../../../java/util/ArrayDeque.js'
import HashMap from '../../../../../java/util/HashMap.js'
import PolygonNodeTopology from '../../algorithm/PolygonNodeTopology.js'
import Orientation from '../../algorithm/Orientation.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
export default class PolygonRing {
  constructor() {
    PolygonRing.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._id = null
    this._shell = null
    this._ring = null
    this._touchSetRoot = null
    this._touches = null
    this._selfNodes = null
    if (arguments.length === 1) {
      const ring = arguments[0]
      this._ring = ring
      this._id = -1
      this._shell = this
    } else if (arguments.length === 3) {
      const ring = arguments[0], index = arguments[1], shell = arguments[2]
      this._ring = ring
      this._id = index
      this._shell = shell
    }
  }
  static findInteriorSelfNode(polyRings) {
    for (const polyRing of polyRings) {
      const interiorSelfNode = polyRing.findInteriorSelfNode()
      if (interiorSelfNode !== null) 
        return interiorSelfNode
      
    }
    return null
  }
  static addTouch(ring0, ring1, pt) {
    if (ring0 === null || ring1 === null) return false
    if (!ring0.isSamePolygon(ring1)) return false
    if (!ring0.isOnlyTouch(ring1, pt)) return true
    if (!ring1.isOnlyTouch(ring0, pt)) return true
    ring0.addTouch(ring1, pt)
    ring1.addTouch(ring0, pt)
    return false
  }
  static isShell(polyRing) {
    if (polyRing === null) return true
    return polyRing.isShell()
  }
  static findHoleCycleLocation(polyRings) {
    for (const polyRing of polyRings) 
      if (!polyRing.isInTouchSet()) {
        const holeCycleLoc = polyRing.findHoleCycleLocation()
        if (holeCycleLoc !== null) return holeCycleLoc
      }
    
    return null
  }
  static init(root, touchStack) {
    for (const touch of root.getTouches()) {
      touch.getRing().setTouchSetRoot(root)
      touchStack.push(touch)
    }
  }
  scanForHoleCycle(currentTouch, root, touchStack) {
    const ring = currentTouch.getRing()
    const currentPt = currentTouch.getCoordinate()
    for (const touch of ring.getTouches()) {
      if (currentPt.equals2D(touch.getCoordinate())) continue
      const touchRing = touch.getRing()
      if (touchRing.getTouchSetRoot() === root) return touch.getCoordinate()
      touchRing.setTouchSetRoot(root)
      touchStack.push(touch)
    }
    return null
  }
  findInteriorSelfNode() {
    if (this._selfNodes === null) return null
    const isCCW = Orientation.isCCW(this._ring.getCoordinates())
    const isInteriorOnRight = this.isShell() ^ isCCW
    for (const selfNode of this._selfNodes) 
      if (!selfNode.isExterior(isInteriorOnRight)) 
        return selfNode.getCoordinate()
      
    
    return null
  }
  addTouch(ring, pt) {
    if (this._touches === null) 
      this._touches = new HashMap()
    
    const touch = this._touches.get(ring._id)
    if (touch === null) 
      this._touches.put(ring._id, new PolygonRingTouch(ring, pt))
    
    
  }
  addSelfTouch(origin, e00, e01, e10, e11) {
    if (this._selfNodes === null) 
      this._selfNodes = new ArrayList()
    
    this._selfNodes.add(new PolygonRingSelfNode(origin, e00, e01, e10, e11))
  }
  isOnlyTouch(ring, pt) {
    if (this._touches === null) return true
    const touch = this._touches.get(ring._id)
    if (touch === null) return true
    return touch.isAtLocation(pt)
  }
  getTouches() {
    return this._touches.values()
  }
  isShell() {
    return this._shell === this
  }
  hasTouches() {
    return this._touches !== null && !this._touches.isEmpty()
  }
  setTouchSetRoot(ring) {
    this._touchSetRoot = ring
  }
  findHoleCycleLocation() {
    if (this.isInTouchSet()) return null
    const root = this
    root.setTouchSetRoot(root)
    if (!this.hasTouches()) return null
    const touchStack = new ArrayDeque()
    PolygonRing.init(root, touchStack)
    while (!touchStack.isEmpty()) {
      const touch = touchStack.pop()
      const holeCyclePt = this.scanForHoleCycle(touch, root, touchStack)
      if (holeCyclePt !== null) 
        return holeCyclePt
      
    }
    return null
  }
  toString() {
    return this._ring.toString()
  }
  isInTouchSet() {
    return this._touchSetRoot !== null
  }
  isSamePolygon(ring) {
    return this._shell === ring._shell
  }
  getTouchSetRoot() {
    return this._touchSetRoot
  }
}
class PolygonRingTouch {
  constructor() {
    PolygonRingTouch.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._ring = null
    this._touchPt = null
    const ring = arguments[0], pt = arguments[1]
    this._ring = ring
    this._touchPt = pt
  }
  getCoordinate() {
    return this._touchPt
  }
  getRing() {
    return this._ring
  }
  isAtLocation(pt) {
    return this._touchPt.equals2D(pt)
  }
}
class PolygonRingSelfNode {
  constructor() {
    PolygonRingSelfNode.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._nodePt = null
    this._e00 = null
    this._e01 = null
    this._e10 = null
    const nodePt = arguments[0], e00 = arguments[1], e01 = arguments[2], e10 = arguments[3], e11 = arguments[4]
    this._nodePt = nodePt
    this._e00 = e00
    this._e01 = e01
    this._e10 = e10
  }
  getCoordinate() {
    return this._nodePt
  }
  isExterior(isInteriorOnRight) {
    const isInteriorSeg = PolygonNodeTopology.isInteriorSegment(this._nodePt, this._e00, this._e01, this._e10)
    const isExterior = isInteriorOnRight ? !isInteriorSeg : isInteriorSeg
    return isExterior
  }
}
