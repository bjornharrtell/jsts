import WKTReader from 'org/locationtech/jts/io/WKTReader'
import WKTWriter from 'org/locationtech/jts/io/WKTWriter'
import BufferOp from 'org/locationtech/jts/operation/buffer/BufferOp'
import OverlayOp from 'org/locationtech/jts/operation/overlay/OverlayOp'
import RelateOp from 'org/locationtech/jts/operation/relate/RelateOp'
import DiscreteHausdorffDistance from 'org/locationtech/jts/algorithm/distance/DiscreteHausdorffDistance'

/**
 * A {@link ResultMatcher} which compares the results of buffer operations for
 * equality, up to the given tolerance. All other operations are delagated to
 * the standard {@link EqualityResultMatcher} algorithm.
 */
export default class BufferResultMatcher {
  static get MAX_RELATIVE_AREA_DIFFERENCE() { return 1.0E-3; }
  static get MAX_HAUSDORFF_DISTANCE_FACTOR() { return 100; }
  /**
   * The minimum distance tolerance which will be used. This is required because
   * densified vertices do no lie precisely on their parent segment.
   */
  static get MIN_DISTANCE_TOLERANCE() { return 1.0e-8; }

  /**
   * Tests whether the two results are equal within the given tolerance. The input
   * parameters are not considered.
   *
   * @return true if the actual and expected results are considered equal
   */
  isMatch(geom, distance, actualResult,
      expectedResult, tolerance) {
    return this.isBufferResultMatch(actualResult, expectedResult, distance);
  }

  isBufferResultMatch(actualBuffer,
      expectedBuffer, distance) {
    if (actualBuffer.isEmpty() && expectedBuffer.isEmpty())
      return true;

    /**
     * MD - need some more checks here - symDiffArea won't catch very small holes
     * ("tears") near the edge of computed buffers (which can happen in current
     * version of JTS (1.8)). This can probably be handled by testing that every
     * point of the actual buffer is at least a certain distance away from the
     * geometry boundary.
     */
    if (!this.isSymDiffAreaInTolerance(actualBuffer, expectedBuffer))
      return false;

    if (!this.isBoundaryHausdorffDistanceInTolerance(actualBuffer,
        expectedBuffer, distance))
      return false;

    return true;
  }

  isSymDiffAreaInTolerance(actualBuffer,
      expectedBuffer) {
    var area = expectedBuffer.getArea();
    var diff = actualBuffer.symDifference(expectedBuffer);
    var areaDiff = diff.getArea();

    // can't get closer than difference area = 0 ! This also handles case when
    // symDiff is empty
    if (areaDiff <= 0.0)
      return true;

    var frac = Number.POSITIVE_INFINITY;
    if (area > 0.0)
      frac = areaDiff / area;

    return frac < BufferResultMatcher.MAX_RELATIVE_AREA_DIFFERENCE;
  }

  isBoundaryHausdorffDistanceInTolerance(
      actualBuffer, expectedBuffer, distance) {
    var actualBdy = actualBuffer.getBoundary();
    var expectedBdy = expectedBuffer.getBoundary();

    var haus = new DiscreteHausdorffDistance(actualBdy, expectedBdy);
    haus.setDensifyFraction(0.25);
    var maxDistanceFound = haus.orientedDistance();
    var expectedDistanceTol = Math.abs(distance) /
        BufferResultMatcher.MAX_HAUSDORFF_DISTANCE_FACTOR;
    if (expectedDistanceTol < BufferResultMatcher.MIN_DISTANCE_TOLERANCE)
      expectedDistanceTol = BufferResultMatcher.MIN_DISTANCE_TOLERANCE;
    if (maxDistanceFound > expectedDistanceTol)
      return false;
    return true;
  }
}
