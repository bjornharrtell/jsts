import Coordinate from '../geom/Coordinate.js'
import LineSegment from '../geom/LineSegment.js'
import Envelope from '../geom/Envelope.js'
import Angle from '../algorithm/Angle.js'
import GeometryMapper from '../geom/util/GeometryMapper.js'
import LineString from '../geom/LineString.js'
import Polygon from '../geom/Polygon.js'
import CoordinateList from '../geom/CoordinateList.js'
import Geometry from '../geom/Geometry.js'
import LinearRing from '../geom/LinearRing.js'

/**
 * JTS Cubic Bezier Class:
 * https://github.com/locationtech/jts/blob/master/modules/core/src/main/java/org/locationtech/jts/shape/CubicBezierCurve.java
 */
export default class CubicBezierCurve {

  minSegmentLength = 0.0;
  numVerticesPerSegment = 16;
  
  inputGeom;
  alpha =-1;
  skew = 0;
  controlPointsG = null;
  geomFactory;
  
  bezierCurvePts;
  interpolationParam;
  controlPointIndex = 0;

  static bezierCurve() {
    const curve = new CubicBezierCurve(...arguments)
    return curve.getResult();
  }

  bezierCurveNotStatic() {
    if (Array.isArray(arguments[0]) && typeof arguments[1] === 'boolean') {
      const coords = arguments[0];
      const isRing = arguments[1];
      const control = this.controlPoints(coords, isRing);
      const curvePts = new CoordinateList();

      for (let i = 0; i < coords.length - 1; i++) {
        const ctrlIndex = 2 * i;
        this.addCurve(coords[i], coords[i + 1], control[ctrlIndex], control[ctrlIndex + 1], curvePts);
      }

      return curvePts;
    } else {
      throw "not static bazier curve func"
    }
  }


  constructor() {
    CubicBezierCurve.constructor_.apply(this, arguments)
  }

  /**
   * Creates a new instance producing a Bezier curve defined by a geometry
   * and an alpha curvedness value.
   * 1
   * @param geom geometry defining curve
   * @param alpha curvedness parameter (0 is linear, 1 is round, >1 is increasingly curved)
   * @param skew the skew parameter (0 is none, positive skews towards longer side, negative towards shorter
   * 2
   * @param geom geometry defining curve
   * @param alpha curvedness parameter (0 = linear, 1 = round, 2 = distorted)
   * 3
   * @param geom geometry defining curve
   * @param controlPoints the geometry containing the control points
   */

  static constructor_() {

    if (arguments[0] instanceof Geometry && typeof(arguments[1]) === 'number' && typeof(arguments[2]) === 'number') {
      const geom = arguments[0]
      const alpha = arguments[1]
      const skew = arguments[2]
      this.inputGeom = geom;
      this.geomFactory = geom.getFactory();
      if ( alpha < 0.0 ) alpha = 0;
      this.alpha = alpha;
      this.skew  = skew;

    } else if (arguments[0] instanceof Geometry && typeof(arguments[1]) === 'number') {
      const geom = arguments[0]
      const alpha = arguments[1]
      this.inputGeom = geom;
      this.geomFactory = geom.getFactory();
      if ( alpha < 0.0 ) alpha = 0;
      this.alpha = alpha;

    } else if (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry) {
      const geom = arguments[0]
      const controlPoints = arguments[1]
      this.inputGeom = geom;
      this.geomFactory = geom.getFactory();
      this.controlPointsG = controlPoints;
    } else if (typeof(arguments[0]) == 'object' && typeof(arguments[1]) == 'object') {
      // TODO: when we compile ES, we can remove this check. for cjs the instance could be not geometry.
      const geom = arguments[0]
      const controlPoints = arguments[1]
      this.inputGeom = geom;
      this.geomFactory = geom.getFactory();
      this.controlPointsG = controlPoints;
    } else {
      throw "Bezier Curve Class init with unknown arguments"
    }
  }

  /**
     * Gets the computed linearized Bezier curve geometry.
     * 
     * @return a linearized curved geometry
     */
  getResult = () => {
    this.bezierCurvePts = []
    for (let i = 0; i < this.numVerticesPerSegment; i++) {
      this.bezierCurvePts.push(new Coordinate())
    }

    this.interpolationParam = CubicBezierCurve.computeIterpolationParameters(this.numVerticesPerSegment);

    const strongThis = this;
    const geoMapOp = {
      get interfaces_() {
        return [GeometryMapper.MapOp]
      },
      map(geom) {
        if (geom instanceof LineString) {
          return strongThis.bezierLine(geom);
        }
        if (geom instanceof Polygon ) {
          return strongThis.bezierPolygon(geom);
        } 
        //-- Points
        return geom.copy();
      }
    }
    return GeometryMapper.flatMap(this.inputGeom, 1, geoMapOp);
  }

  bezierLine(ls) {
    const coords = ls.getCoordinates();
    const curvePts = this.bezierCurveNotStatic(coords, false);
    curvePts.add(coords[coords.length - 1].copy(), false);
    return this.geomFactory.createLineString(curvePts.toCoordinateArray());
  }

  bezierRing(ring) {
    const coords = ring.getCoordinates();
    const curvePts = this.bezierCurveNotStatic(coords, true);
    curvePts.closeRing();
    return this.geomFactory.createLinearRing(curvePts.toCoordinateArray());
  }

  bezierPolygon(poly) {
    const shell = this.bezierRing(poly.getExteriorRing());
    const holes = [];
    const num = poly.getNumInteriorRing();
    if (num > 0) {
      for (let i = 0; i < num; i++) {
        holes[i] = this.bezierRing(poly.getInteriorRingN(i));
      }
    }
    return this.geomFactory.createPolygon(shell, holes);
  }


  controlPoints(coords, isRing) {
    if (this.controlPointsG != null) {
      if (this.controlPointIndex >= this.controlPointsG.getNumGeometries()) {
        throw new Error("Too few control point elements");
      }
      const ctrlPtsGeom = this.controlPointsG.getGeometryN(this.controlPointIndex++);
      const ctrlPts = ctrlPtsGeom.getCoordinates();
      
      const expectedNum1 = 2 * coords.length - 2;
      const expectedNum2 = isRing ? coords.length - 1 : coords.length;
      if (expectedNum1 != ctrlPts.length && expectedNum2 != ctrlPts.length) {
        throw new Error("Wrong number of control points for element %d - expected %d or %d, found %d",
                this.controlPointIndex-1, expectedNum1, expectedNum2, ctrlPts.length
                  );
      }
      return ctrlPts;
    }
    return this.controlPointsP(coords, isRing, this.alpha, this.skew);
  }

  addCurve(p0, p1,
      ctrl0, crtl1,
     curvePts) {
    const len = p0.distance(p1);
    if ( len < this.minSegmentLength ) {
      // segment too short - copy input coordinate
      curvePts.add(new Coordinate(p0));

    } else {
      this.cubicBezier(p0, p1, ctrl0, crtl1,
          this.interpolationParam, this.bezierCurvePts);
      for (let i = 0; i < this.bezierCurvePts.length - 1; i++) {
        curvePts.add(this.bezierCurvePts[i], false);
      }
    }
  }

  //-- chosen to make curve at right-angle corners roughly circular
  static CIRCLE_LEN_FACTOR = 3.0 / 8.0;

  controlPointsP(coords, isRing, alpha, skew) {
    const N = coords.length;
    const start = 1; 
    const end = N - 1;
    if (isRing) {
      N = coords.length - 1;
      start = 0;
      end = N;
    }
    
    const nControl = 2 * coords.length - 2;
    const ctrl = []
    for (let i = start; i < end; i++) {
      const iprev = i == 0 ? N - 1 : i - 1;
      const v0 = coords[iprev];
      const v1 = coords[i];
      const v2 = coords[i + 1];

      const interiorAng = Angle.angleBetweenOriented(v0, v1, v2);
      const orient = Math.sign(interiorAng);
      const angBisect = Angle.bisector(v0, v1, v2);
      const ang0 = angBisect - orient * Angle.PI_OVER_2;
      const ang1 = angBisect + orient * Angle.PI_OVER_2;
      
      const dist0 = v1.distance(v0);
      const dist1 = v1.distance(v2);
      const lenBase = Math.min(dist0, dist1);
      
      const intAngAbs = Math.abs(interiorAng);
      
      //-- make acute corners sharper by shortening tangent vectors
      const sharpnessFactor = intAngAbs >= Angle.PI_OVER_2 ? 1 : intAngAbs / Angle.PI_OVER_2;
      
      const len = alpha * CubicBezierClass.CIRCLE_LEN_FACTOR * sharpnessFactor * lenBase;
      const stretch0 = 1;
      const stretch1 = 1;
      if (skew != 0) {
        const stretch = Math.abs(dist0 - dist1) / Math.max(dist0, dist1);
        const skewIndex = dist0 > dist1 ? 0 : 1;
        if (skew < 0) skewIndex = 1 - skewIndex;
        if (skewIndex == 0) {
          stretch0 += Math.abs(skew) * stretch; 
        }
        else {
          stretch1 += Math.abs(skew) * stretch; 
        }
      }
      const ctl0 = Angle.project(v1, ang0, stretch0 * len);
      const ctl1 = Angle.project(v1, ang1, stretch1 * len);

      const index = 2 * i - 1;
      // for a ring case the first control point is for last segment
      const i0 = index < 0 ? nControl - 1 : index;
      ctrl[i0] = ctl0;
      ctrl[index + 1] = ctl1;
    
      //System.out.println(WKTWriter.toLineString(v1, ctl0));
      //System.out.println(WKTWriter.toLineString(v1, ctl1));
    }
    if (! isRing) {
      this.setLineEndControlPoints(coords, ctrl);
    }
    return ctrl;
  }

  /**
   * Sets the end control points for a line.
   * Produce a symmetric curve for the first and last segments
   * by using mirrored control points for start and end vertex.
   * 
   * @param coords
   * @param ctrl
   */
  setLineEndControlPoints = (coords, ctrl) => {
    const N = parseInt(ctrl.length);
    ctrl[0] = CubicBezierCurve.mirrorControlPoint(ctrl[1], coords[1], coords[0]);
    ctrl[N - 1] = CubicBezierCurve.mirrorControlPoint(ctrl[N - 2], 
        coords[coords.length - 1], coords[coords.length - 2]);
  }

  /**
   * Creates a control point aimed at the control point at the opposite end of the segment.
   * 
   * Produces overly flat results, so not used currently.
   * 
   * @param c
   * @param p1
   * @param p0
   * @return
   */
   static aimedControlPoint(c, p1, p0) {
    const len = p1.distance(c);
    const ang = Angle.angle(p0, p1);
    return Angle.project(p0, ang, len);
  }

  static mirrorControlPoint(c, p0, p1) {
    const vlinex = p1.x - p0.x;
    const vliney = p1.y - p0.y;
    // rotate line vector by 90
    const vrotx = -vliney;
    const vroty = vlinex;

    const midx = (p0.x + p1.x) / 2;
    const midy = (p0.y + p1.y) / 2;

    return CubicBezierCurve.reflectPointInLine(c, new Coordinate(midx, midy), new Coordinate(midx + vrotx, midy + vroty));
  }

  static reflectPointInLine( p,  p0,  p1) {
    const vx = p1.x - p0.x;
    const vy = p1.y - p0.y;
    const x = p0.x - p.x;
    const y = p0.y - p.y;
    const r = 1 / (vx * vx + vy * vy);
    const rx = p.x + 2 * (x - x * vx * vx * r - y * vx * vy * r);
    const ry = p.y + 2 * (y - y * vy * vy * r - x * vx * vy * r);
    return new Coordinate(rx, ry);
  }

  /**
     * Calculates vertices along a cubic Bezier curve.
     * 
     * @param p0 start point
     * @param p1   end point
     * @param ctrl1 first control point
     * @param ctrl2 second control point
     * @param param interpolation parameters
     * @param curve array to hold generated points
     */
    cubicBezier =(p0, p1, ctrl1, ctrl2, param, curve) => {

    const n = curve.length;
    curve[0] = new Coordinate(p0);
    curve[n - 1] = new Coordinate(p1);

    for (let i = 1; i < n - 1; i++) {
      const c = new Coordinate();
      const sum = param[i][0] + param[i][1] +param[i][2] +param[i][3];
      c.x = param[i][0] * p0.x + param[i][1] * ctrl1.x + param[i][2] * ctrl2.x + param[i][3] * p1.x;
      c.x /= sum;
      c.y = param[i][0] * p0.y + param[i][1] * ctrl1.y + param[i][2] * ctrl2.y + param[i][3] * p1.y;
      c.y /= sum;
      curve[i] = c;
    }
  }

  /**
   * Gets the interpolation parameters for a Bezier curve approximated by a
   * given number of vertices.
   *
   * @param n number of vertices
   * @return array of double[4] holding the parameter values
   */
  static computeIterpolationParameters = (n) => {
    let param = []
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const tc = 1.0 - t;
      param[i] = []
      param[i][0] = tc * tc * tc;
      param[i][1] = 3.0 * tc * tc * t;
      param[i][2] = 3.0 * tc * t * t;
      param[i][3] = t * t * t;
    }
    return param;
  }

}