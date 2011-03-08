/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */



/**
 * Converts a geometry in Well-Known Text format to a {@link Geometry}.
 * <p>
 * <code>WKTReader</code> supports extracting <code>Geometry</code> objects
 * from either {@link Reader}s or {@link String}s. This allows it to function
 * as a parser to read <code>Geometry</code> objects from text blocks embedded
 * in other data formats (e.g. XML).
 * <P>
 * <p>
 * A <code>WKTReader</code> is parameterized by a <code>GeometryFactory</code>,
 * to allow it to create <code>Geometry</code> objects of the appropriate
 * implementation. In particular, the <code>GeometryFactory</code> determines
 * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
 * <P>
 *
 * The <code>WKTReader</code> converts all input numbers to the precise
 * internal representation.
 *
 * <h3>Notes:</h3>
 * <ul>
 * <li>The reader supports non-standard "LINEARRING" tags.
 * <li>The reader uses Double.parseDouble to perform the conversion of ASCII
 * numbers to floating point. This means it supports the Java syntax for
 * floating point literals (including scientific notation).
 * </ul>
 *
 * <h3>Syntax</h3>
 * The following syntax specification describes the version of Well-Known Text
 * supported by JTS. (The specification uses a syntax language similar to that
 * used in the C and Java language specifications.)
 * <p>
 *
 * <blockquote>
 *
 * <pre>
 * &lt;i&gt;WKTGeometry:&lt;/i&gt; one of&lt;i&gt;
 *       WKTPoint  WKTLineString  WKTLinearRing  WKTPolygon
 *       WKTMultiPoint  WKTMultiLineString  WKTMultiPolygon
 *       WKTGeometryCollection&lt;/i&gt;
 * &lt;i&gt;WKTPoint:&lt;/i&gt; &lt;b&gt;POINT ( &lt;/b&gt;&lt;i&gt;Coordinate&lt;/i&gt; &lt;b&gt;)&lt;/b&gt;
 * &lt;i&gt;WKTLineString:&lt;/i&gt; &lt;b&gt;LINESTRING&lt;/b&gt; &lt;i&gt;CoordinateSequence&lt;/i&gt;
 * &lt;i&gt;WKTLinearRing:&lt;/i&gt; &lt;b&gt;LINEARRING&lt;/b&gt; &lt;i&gt;CoordinateSequence&lt;/i&gt;
 * &lt;i&gt;WKTPolygon:&lt;/i&gt; &lt;b&gt;POLYGON&lt;/b&gt; &lt;i&gt;CoordinateSequenceList&lt;/i&gt;
 * &lt;i&gt;WKTMultiPoint:&lt;/i&gt; &lt;b&gt;MULTIPOINT&lt;/b&gt; &lt;i&gt;CoordinateSingletonList&lt;/i&gt;
 * &lt;i&gt;WKTMultiLineString:&lt;/i&gt; &lt;b&gt;MULTILINESTRING&lt;/b&gt; &lt;i&gt;CoordinateSequenceList&lt;/i&gt;
 * &lt;i&gt;WKTMultiPolygon:&lt;/i&gt;
 *         &lt;b&gt;MULTIPOLYGON (&lt;/b&gt; &lt;i&gt;CoordinateSequenceList {&lt;/i&gt; , &lt;i&gt;CoordinateSequenceList }&lt;/i&gt; &lt;b&gt;)&lt;/b&gt;
 * &lt;i&gt;WKTGeometryCollection: &lt;/i&gt;
 *         &lt;b&gt;GEOMETRYCOLLECTION (&lt;/b&gt; &lt;i&gt;WKTGeometry {&lt;/i&gt; , &lt;i&gt;WKTGeometry }&lt;/i&gt; &lt;b&gt;)&lt;/b&gt;
 * &lt;i&gt;CoordinateSingletonList:&lt;/i&gt;
 *         &lt;b&gt;(&lt;/b&gt; &lt;i&gt;CoordinateSingleton {&lt;/i&gt; &lt;b&gt;,&lt;/b&gt; &lt;i&gt;CoordinateSingleton }&lt;/i&gt; &lt;b&gt;)&lt;/b&gt;
 *         | &lt;b&gt;EMPTY&lt;/b&gt;
 * &lt;i&gt;CoordinateSingleton:&lt;/i&gt;
 *         &lt;b&gt;(&lt;/b&gt; &lt;i&gt;Coordinate &lt;b&gt;)&lt;/b&gt;
 *         | &lt;b&gt;EMPTY&lt;/b&gt;
 * &lt;i&gt;CoordinateSequenceList:&lt;/i&gt;
 *         &lt;b&gt;(&lt;/b&gt; &lt;i&gt;CoordinateSequence {&lt;/i&gt; &lt;b&gt;,&lt;/b&gt; &lt;i&gt;CoordinateSequence }&lt;/i&gt; &lt;b&gt;)&lt;/b&gt;
 *         | &lt;b&gt;EMPTY&lt;/b&gt;
 * &lt;i&gt;CoordinateSequence:&lt;/i&gt;
 *         &lt;b&gt;(&lt;/b&gt; &lt;i&gt;Coordinate {&lt;/i&gt; , &lt;i&gt;Coordinate }&lt;/i&gt; &lt;b&gt;)&lt;/b&gt;
 *         | &lt;b&gt;EMPTY&lt;/b&gt;
 * &lt;i&gt;Coordinate:
 *         Number Number Number&lt;sub&gt;opt&lt;/sub&gt;&lt;/i&gt;
 * &lt;i&gt;Number:&lt;/i&gt; A Java-style floating-point number (including
 * <tt>
 * NaN
 * </tt>
 * , with arbitrary case)
 * </pre>
 *
 * </blockquote>
 *
 * @constructor
 */
jsts.io.WKTReader = function() {
};


/**
 * Reads a Well-Known Text representation of a {@link Geometry}
 *
 * @param wkt
 *          a <Geometry Tagged Text> string (see the OpenGIS Simple Features
 *          Specification).
 * @return a <code>Geometry</code> read from <code>string.</code>
 */
jsts.io.WKTReader.prototype.read = function(wkt) {
  var geometry = OpenLayers.Geometry.fromWKT(wkt);

  return geometry;
};
