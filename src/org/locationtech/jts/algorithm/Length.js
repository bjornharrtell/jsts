import Coordinate from '../geom/Coordinate'
export default class Length {
  static ofLine(pts) {
    const n = pts.size()
    if (n <= 1) return 0.0
    let len = 0.0
    const p = new Coordinate()
    pts.getCoordinate(0, p)
    let x0 = p.x
    let y0 = p.y
    for (let i = 1; i < n; i++) {
      pts.getCoordinate(i, p)
      const x1 = p.x
      const y1 = p.y
      const dx = x1 - x0
      const dy = y1 - y0
      len += Math.sqrt(dx * dx + dy * dy)
      x0 = x1
      y0 = y1
    }
    return len
  }
}
