import Location from '../../geom/Location'
import CoordinateList from '../../geom/CoordinateList'
import WKTWriter from '../../io/WKTWriter'
import CoordinateArraySequence from '../../geom/impl/CoordinateArraySequence'
import IsValidOp from '../valid/IsValidOp'
import LinearRing from '../../geom/LinearRing'
import Exception from '../../../../../java/lang/Exception'
import Orientation from '../../algorithm/Orientation'
import System from '../../../../../java/lang/System'
import CoordinateArrays from '../../geom/CoordinateArrays'
import ArrayList from '../../../../../java/util/ArrayList'
import Comparator from '../../../../../java/util/Comparator'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator'
import Assert from '../../util/Assert'
export default class EdgeRing {
  constructor() {
    EdgeRing.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._factory = null
    this._deList = new ArrayList()
    this._lowestEdge = null
    this._ring = null
    this._locator = null
    this._ringPts = null
    this._holes = null
    this._shell = null
    this._isHole = null
    this._isProcessed = false
    this._isIncludedSet = false
    this._isIncluded = false
    const factory = arguments[0]
    this._factory = factory
  }
  static findDirEdgesInRing(startDE) {
    let de = startDE
    const edges = new ArrayList()
    do {
      edges.add(de)
      de = de.getNext()
      Assert.isTrue(de !== null, 'found null DE in ring')
      Assert.isTrue(de === startDE || !de.isInRing(), 'found DE already in ring')
    } while (de !== startDE)
    return edges
  }
  static addEdge(coords, isForward, coordList) {
    if (isForward) 
      for (let i = 0; i < coords.length; i++) 
        coordList.add(coords[i], false)
      
    else 
      for (let i = coords.length - 1; i >= 0; i--) 
        coordList.add(coords[i], false)
      
    
  }
  static findEdgeRingContaining(testEr, erList) {
    const testRing = testEr.getRing()
    const testEnv = testRing.getEnvelopeInternal()
    let testPt = testRing.getCoordinateN(0)
    let minRing = null
    let minRingEnv = null
    for (let it = erList.iterator(); it.hasNext(); ) {
      const tryEdgeRing = it.next()
      const tryRing = tryEdgeRing.getRing()
      const tryShellEnv = tryRing.getEnvelopeInternal()
      if (tryShellEnv.equals(testEnv)) continue
      if (!tryShellEnv.contains(testEnv)) continue
      testPt = CoordinateArrays.ptNotInList(testRing.getCoordinates(), tryEdgeRing.getCoordinates())
      const isContained = tryEdgeRing.isInRing(testPt)
      if (isContained) 
        if (minRing === null || minRingEnv.contains(tryShellEnv)) {
          minRing = tryEdgeRing
          minRingEnv = minRing.getRing().getEnvelopeInternal()
        }
      
    }
    return minRing
  }
  isIncluded() {
    return this._isIncluded
  }
  getCoordinates() {
    if (this._ringPts === null) {
      const coordList = new CoordinateList()
      for (let i = this._deList.iterator(); i.hasNext(); ) {
        const de = i.next()
        const edge = de.getEdge()
        EdgeRing.addEdge(edge.getLine().getCoordinates(), de.getEdgeDirection(), coordList)
      }
      this._ringPts = coordList.toCoordinateArray()
    }
    return this._ringPts
  }
  isIncludedSet() {
    return this._isIncludedSet
  }
  isValid() {
    this.getCoordinates()
    if (this._ringPts.length <= 3) return false
    this.getRing()
    return IsValidOp.isValid(this._ring)
  }
  build(startDE) {
    let de = startDE
    do {
      this.add(de)
      de.setRing(this)
      de = de.getNext()
      Assert.isTrue(de !== null, 'found null DE in ring')
      Assert.isTrue(de === startDE || !de.isInRing(), 'found DE already in ring')
    } while (de !== startDE)
  }
  isInRing(pt) {
    return Location.EXTERIOR !== this.getLocator().locate(pt)
  }
  isOuterHole() {
    if (!this._isHole) return false
    return !this.hasShell()
  }
  getPolygon() {
    let holeLR = null
    if (this._holes !== null) {
      holeLR = new Array(this._holes.size()).fill(null)
      for (let i = 0; i < this._holes.size(); i++) 
        holeLR[i] = this._holes.get(i)
      
    }
    const poly = this._factory.createPolygon(this._ring, holeLR)
    return poly
  }
  isHole() {
    return this._isHole
  }
  isProcessed() {
    return this._isProcessed
  }
  addHole() {
    if (arguments[0] instanceof LinearRing) {
      const hole = arguments[0]
      if (this._holes === null) this._holes = new ArrayList()
      this._holes.add(hole)
    } else if (arguments[0] instanceof EdgeRing) {
      const holeER = arguments[0]
      holeER.setShell(this)
      const hole = holeER.getRing()
      if (this._holes === null) this._holes = new ArrayList()
      this._holes.add(hole)
    }
  }
  setIncluded(isIncluded) {
    this._isIncluded = isIncluded
    this._isIncludedSet = true
  }
  getOuterHole() {
    if (this.isHole()) return null
    for (let i = 0; i < this._deList.size(); i++) {
      const de = this._deList.get(i)
      const adjRing = de.getSym().getRing()
      if (adjRing.isOuterHole()) return adjRing
    }
    return null
  }
  computeHole() {
    const ring = this.getRing()
    this._isHole = Orientation.isCCW(ring.getCoordinates())
  }
  hasShell() {
    return this._shell !== null
  }
  isOuterShell() {
    return this.getOuterHole() !== null
  }
  getLineString() {
    this.getCoordinates()
    return this._factory.createLineString(this._ringPts)
  }
  toString() {
    return WKTWriter.toLineString(new CoordinateArraySequence(this.getCoordinates()))
  }
  getLocator() {
    if (this._locator === null) 
      this._locator = new IndexedPointInAreaLocator(this.getRing())
    
    return this._locator
  }
  getShell() {
    if (this.isHole()) return this._shell
    return this
  }
  add(de) {
    this._deList.add(de)
  }
  getRing() {
    if (this._ring !== null) return this._ring
    this.getCoordinates()
    if (this._ringPts.length < 3) System.out.println(this._ringPts)
    try {
      this._ring = this._factory.createLinearRing(this._ringPts)
    } catch (ex) {
      if (ex instanceof Exception) 
        System.out.println(this._ringPts)
      else throw ex
    } finally {}
    return this._ring
  }
  updateIncluded() {
    if (this.isHole()) return null
    for (let i = 0; i < this._deList.size(); i++) {
      const de = this._deList.get(i)
      const adjShell = de.getSym().getRing().getShell()
      if (adjShell !== null && adjShell.isIncludedSet()) {
        this.setIncluded(!adjShell.isIncluded())
        return null
      }
    }
  }
  setShell(shell) {
    this._shell = shell
  }
  setProcessed(isProcessed) {
    this._isProcessed = isProcessed
  }
}
class EnvelopeComparator {
  compare(obj0, obj1) {
    const r0 = obj0
    const r1 = obj1
    return r0.getRing().getEnvelope().compareTo(r1.getRing().getEnvelope())
  }
  get interfaces_() {
    return [Comparator]
  }
}
EdgeRing.EnvelopeComparator = EnvelopeComparator
