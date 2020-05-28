export default class EnvelopeDistance {
  static maxDistance(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
    let dist = EnvelopeDistance.distance(ax1, ay1, bx1, by1)
    dist = Math.max(dist, EnvelopeDistance.distance(ax1, ay1, bx2, by2))
    dist = Math.max(dist, EnvelopeDistance.distance(ax2, ay2, bx1, by1))
    dist = Math.max(dist, EnvelopeDistance.distance(ax2, ay2, bx2, by2))
    return dist
  }
  static distance(x1, y1, x2, y2) {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
  }
  static maximumDistance(env1, env2) {
    const minx = Math.min(env1.getMinX(), env2.getMinX())
    const miny = Math.min(env1.getMinY(), env2.getMinY())
    const maxx = Math.max(env1.getMaxX(), env2.getMaxX())
    const maxy = Math.max(env1.getMaxY(), env2.getMaxY())
    return EnvelopeDistance.distance(minx, miny, maxx, maxy)
  }
  static minMaxDistance(a, b) {
    const aminx = a.getMinX()
    const aminy = a.getMinY()
    const amaxx = a.getMaxX()
    const amaxy = a.getMaxY()
    const bminx = b.getMinX()
    const bminy = b.getMinY()
    const bmaxx = b.getMaxX()
    const bmaxy = b.getMaxY()
    let dist = EnvelopeDistance.maxDistance(aminx, aminy, aminx, amaxy, bminx, bminy, bminx, bmaxy)
    dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, aminx, amaxy, bminx, bminy, bmaxx, bminy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, aminx, amaxy, bmaxx, bmaxy, bminx, bmaxy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, aminx, amaxy, bmaxx, bmaxy, bmaxx, bminy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, amaxx, aminy, bminx, bminy, bminx, bmaxy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, amaxx, aminy, bminx, bminy, bmaxx, bminy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, amaxx, aminy, bmaxx, bmaxy, bminx, bmaxy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, amaxx, aminy, bmaxx, bmaxy, bmaxx, bminy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, aminx, amaxy, bminx, bminy, bminx, bmaxy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, aminx, amaxy, bminx, bminy, bmaxx, bminy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, aminx, amaxy, bmaxx, bmaxy, bminx, bmaxy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, aminx, amaxy, bmaxx, bmaxy, bmaxx, bminy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, amaxx, aminy, bminx, bminy, bminx, bmaxy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, amaxx, aminy, bminx, bminy, bmaxx, bminy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, amaxx, aminy, bmaxx, bmaxy, bminx, bmaxy))
    dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, amaxx, aminy, bmaxx, bmaxy, bmaxx, bminy))
    return dist
  }
}
