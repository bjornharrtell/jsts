export default class BufferParameters {
  constructor() {
    BufferParameters.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS
    this._endCapStyle = BufferParameters.CAP_ROUND
    this._joinStyle = BufferParameters.JOIN_ROUND
    this._mitreLimit = BufferParameters.DEFAULT_MITRE_LIMIT
    this._isSingleSided = false
    this._simplifyFactor = BufferParameters.DEFAULT_SIMPLIFY_FACTOR
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      const quadrantSegments = arguments[0]
      this.setQuadrantSegments(quadrantSegments)
    } else if (arguments.length === 2) {
      const quadrantSegments = arguments[0], endCapStyle = arguments[1]
      this.setQuadrantSegments(quadrantSegments)
      this.setEndCapStyle(endCapStyle)
    } else if (arguments.length === 4) {
      const quadrantSegments = arguments[0], endCapStyle = arguments[1], joinStyle = arguments[2], mitreLimit = arguments[3]
      this.setQuadrantSegments(quadrantSegments)
      this.setEndCapStyle(endCapStyle)
      this.setJoinStyle(joinStyle)
      this.setMitreLimit(mitreLimit)
    }
  }
  static bufferDistanceError(quadSegs) {
    const alpha = Math.PI / 2.0 / quadSegs
    return 1 - Math.cos(alpha / 2.0)
  }
  getEndCapStyle() {
    return this._endCapStyle
  }
  isSingleSided() {
    return this._isSingleSided
  }
  setQuadrantSegments(quadSegs) {
    this._quadrantSegments = quadSegs
    if (this._quadrantSegments === 0) this._joinStyle = BufferParameters.JOIN_BEVEL
    if (this._quadrantSegments < 0) {
      this._joinStyle = BufferParameters.JOIN_MITRE
      this._mitreLimit = Math.abs(this._quadrantSegments)
    }
    if (quadSegs <= 0) 
      this._quadrantSegments = 1
    
    if (this._joinStyle !== BufferParameters.JOIN_ROUND) 
      this._quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS
    
  }
  getJoinStyle() {
    return this._joinStyle
  }
  setJoinStyle(joinStyle) {
    this._joinStyle = joinStyle
  }
  setSimplifyFactor(simplifyFactor) {
    this._simplifyFactor = simplifyFactor < 0 ? 0 : simplifyFactor
  }
  getSimplifyFactor() {
    return this._simplifyFactor
  }
  getQuadrantSegments() {
    return this._quadrantSegments
  }
  setEndCapStyle(endCapStyle) {
    this._endCapStyle = endCapStyle
  }
  getMitreLimit() {
    return this._mitreLimit
  }
  setMitreLimit(mitreLimit) {
    this._mitreLimit = mitreLimit
  }
  setSingleSided(isSingleSided) {
    this._isSingleSided = isSingleSided
  }
}
BufferParameters.CAP_ROUND = 1
BufferParameters.CAP_FLAT = 2
BufferParameters.CAP_SQUARE = 3
BufferParameters.JOIN_ROUND = 1
BufferParameters.JOIN_MITRE = 2
BufferParameters.JOIN_BEVEL = 3
BufferParameters.DEFAULT_QUADRANT_SEGMENTS = 8
BufferParameters.DEFAULT_MITRE_LIMIT = 5.0
BufferParameters.DEFAULT_SIMPLIFY_FACTOR = 0.01
