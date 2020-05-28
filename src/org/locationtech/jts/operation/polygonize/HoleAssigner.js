import STRtree from '../../index/strtree/STRtree'
import EdgeRing from './EdgeRing'
export default class HoleAssigner {
  constructor() {
    HoleAssigner.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._shells = null
    this._shellIndex = null
    const shells = arguments[0]
    this._shells = shells
    this.buildIndex()
  }
  static assignHolesToShells(holes, shells) {
    const assigner = new HoleAssigner(shells)
    assigner.assignHolesToShells(holes)
  }
  assignHolesToShells(holeList) {
    for (let i = holeList.iterator(); i.hasNext(); ) {
      const holeER = i.next()
      this.assignHoleToShell(holeER)
    }
  }
  buildIndex() {
    this._shellIndex = new STRtree()
    for (const shell of this._shells) 
      this._shellIndex.insert(shell.getRing().getEnvelopeInternal(), shell)
    
  }
  queryOverlappingShells(ringEnv) {
    return this._shellIndex.query(ringEnv)
  }
  findShellContaining(testEr) {
    const testEnv = testEr.getRing().getEnvelopeInternal()
    const candidateShells = this.queryOverlappingShells(testEnv)
    return EdgeRing.findEdgeRingContaining(testEr, candidateShells)
  }
  assignHoleToShell(holeER) {
    const shell = this.findShellContaining(holeER)
    if (shell !== null) 
      shell.addHole(holeER)
    
  }
}
