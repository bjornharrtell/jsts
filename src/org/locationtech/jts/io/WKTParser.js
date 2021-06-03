import Coordinate from '../geom/Coordinate'
import GeometryFactory from '../geom/GeometryFactory'

/**
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available. Supported values are `'XY'`,
 * `'XYZ'`, `'XYM'`, `'XYZM'`.
 * @enum {string}
 */
const GeometryLayout = {
  XY: 'XY',
  XYZ: 'XYZ',
  XYM: 'XYM',
  XYZM: 'XYZM',
}

/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 */
const GeometryType = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  LINEAR_RING: 'LinearRing',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle',
}

/**
 * @typedef {Object} Options
 * @property {boolean} [splitCollection=false] Whether to split GeometryCollections into
 * multiple features on reading.
 */

/**
 * @typedef {Object} Token
 * @property {number} type
 * @property {number|string} [value]
 * @property {number} position
 */

/**
 * @const
 * @type {string}
 */
const EMPTY = 'EMPTY'

/**
 * @const
 * @type {string}
 */
const Z = 'Z'

/**
 * @const
 * @type {string}
 */
const M = 'M'

/**
 * @const
 * @type {string}
 */
const ZM = 'ZM'

/**
 * @const
 * @enum {number}
 */
const TokenType = {
  TEXT: 1,
  LEFT_PAREN: 2,
  RIGHT_PAREN: 3,
  NUMBER: 4,
  COMMA: 5,
  EOF: 6,
}

/**
 * @const
 * @type {Object<string, string>}
 */
const WKTGeometryType = {}
for (const type in GeometryType)
  WKTGeometryType[type] = GeometryType[type].toUpperCase()


/**
 * Class to tokenize a WKT string.
 */
class Lexer {
  /**
   * @param {string} wkt WKT string.
   */
  constructor(wkt) {
    /**
     * @type {string}
     */
    this.wkt = wkt

    /**
     * @type {number}
     * @private
     */
    this.index_ = -1
  }

  /**
   * @param {string} c Character.
   * @return {boolean} Whether the character is alphabetic.
   * @private
   */
  isAlpha_(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')
  }

  /**
   * @param {string} c Character.
   * @param {boolean=} opt_decimal Whether the string number
   *     contains a dot, i.e. is a decimal number.
   * @return {boolean} Whether the character is numeric.
   * @private
   */
  isNumeric_(c, opt_decimal) {
    const decimal = opt_decimal !== undefined ? opt_decimal : false
    return (c >= '0' && c <= '9') || (c == '.' && !decimal)
  }

  /**
   * @param {string} c Character.
   * @return {boolean} Whether the character is whitespace.
   * @private
   */
  isWhiteSpace_(c) {
    return c == ' ' || c == '\t' || c == '\r' || c == '\n'
  }

  /**
   * @return {string} Next string character.
   * @private
   */
  nextChar_() {
    return this.wkt.charAt(++this.index_)
  }

  /**
   * Fetch and return the next token.
   * @return {!Token} Next string token.
   */
  nextToken() {
    const c = this.nextChar_()
    const position = this.index_
    /** @type {number|string} */
    let value = c
    let type

    if (c == '(') {
      type = TokenType.LEFT_PAREN
    } else if (c == ',') {
      type = TokenType.COMMA
    } else if (c == ')') {
      type = TokenType.RIGHT_PAREN
    } else if (this.isNumeric_(c) || c == '-') {
      type = TokenType.NUMBER
      value = this.readNumber_()
    } else if (this.isAlpha_(c)) {
      type = TokenType.TEXT
      value = this.readText_()
    } else if (this.isWhiteSpace_(c)) {
      return this.nextToken()
    } else if (c === '') {
      type = TokenType.EOF
    } else {
      throw new Error('Unexpected character: ' + c)
    }

    return { position: position, value: value, type: type }
  }

  /**
   * @return {number} Numeric token value.
   * @private
   */
  readNumber_() {
    let c
    const index = this.index_
    let decimal = false
    let scientificNotation = false
    do {
      if (c == '.')
        decimal = true
      else if (c == 'e' || c == 'E')
        scientificNotation = true
      c = this.nextChar_()
    } while (
      this.isNumeric_(c, decimal) ||
      // if we haven't detected a scientific number before, 'e' or 'E'
      // hint that we should continue to read
      (!scientificNotation && (c == 'e' || c == 'E')) ||
      // once we know that we have a scientific number, both '-' and '+'
      // are allowed
      (scientificNotation && (c == '-' || c == '+'))
    )
    return parseFloat(this.wkt.substring(index, this.index_--))
  }

  /**
   * @return {string} String token value.
   * @private
   */
  readText_() {
    let c
    const index = this.index_
    do
      c = this.nextChar_()
    while (this.isAlpha_(c))
    return this.wkt.substring(index, this.index_--).toUpperCase()
  }
}

/**
 * Class to parse the tokens from the WKT string.
 */
class Parser {
  /**
   * @param {Lexer} lexer The lexer.
   */
  constructor(lexer, factory) {
    /**
     * @type {Lexer}
     * @private
     */
    this.lexer_ = lexer

    /**
     * @type {Token}
     * @private
     */
    this.token_

    /**
     * @type {import("../geom/GeometryLayout.js").default}
     * @private
     */
    this.layout_ = GeometryLayout.XY

    this.factory = factory
  }

  /**
   * Fetch the next token form the lexer and replace the active token.
   * @private
   */
  consume_() {
    this.token_ = this.lexer_.nextToken()
  }

  /**
   * Tests if the given type matches the type of the current token.
   * @param {TokenType} type Token type.
   * @return {boolean} Whether the token matches the given type.
   */
  isTokenType(type) {
    const isMatch = this.token_.type == type
    return isMatch
  }

  /**
   * If the given type matches the current token, consume it.
   * @param {TokenType} type Token type.
   * @return {boolean} Whether the token matches the given type.
   */
  match(type) {
    const isMatch = this.isTokenType(type)
    if (isMatch) 
      this.consume_()
    return isMatch
  }

  /**
   * Try to parse the tokens provided by the lexer.
   * @return {import("../geom/Geometry.js").default} The geometry.
   */
  parse() {
    this.consume_()
    const geometry = this.parseGeometry_()
    return geometry
  }

  /**
   * Try to parse the dimensional info.
   * @return {import("../geom/GeometryLayout.js").default} The layout.
   * @private
   */
  parseGeometryLayout_() {
    let layout = GeometryLayout.XY
    const dimToken = this.token_
    if (this.isTokenType(TokenType.TEXT)) {
      const dimInfo = dimToken.value
      if (dimInfo === Z)
        layout = GeometryLayout.XYZ
      else if (dimInfo === M)
        layout = GeometryLayout.XYM
      else if (dimInfo === ZM)
        layout = GeometryLayout.XYZM
      if (layout !== GeometryLayout.XY)
        this.consume_()
    }
    return layout
  }

  /**
   * @return {!Array<import("../geom/Geometry.js").default>} A collection of geometries.
   * @private
   */
  parseGeometryCollectionText_() {
    if (this.match(TokenType.LEFT_PAREN)) {
      const geometries = []
      do
        geometries.push(this.parseGeometry_())
      while (this.match(TokenType.COMMA))
      if (this.match(TokenType.RIGHT_PAREN)) 
        return geometries
    } else if (this.isEmptyGeometry_()) {
      return []
    }
    throw new Error(this.formatErrorMessage_())
  }

  /**
   * @return {Array<number>} All values in a point.
   * @private
   */
  parsePointText_() {
    if (this.match(TokenType.LEFT_PAREN)) {
      const coordinates = this.parsePoint_()
      if (this.match(TokenType.RIGHT_PAREN)) 
        return coordinates
    } else if (this.isEmptyGeometry_()) {
      return null
    }
    throw new Error(this.formatErrorMessage_())
  }

  /**
   * @return {!Array<!Array<number>>} All points in a linestring.
   * @private
   */
  parseLineStringText_() {
    if (this.match(TokenType.LEFT_PAREN)) {
      const coordinates = this.parsePointList_()
      if (this.match(TokenType.RIGHT_PAREN)) 
        return coordinates
    } else if (this.isEmptyGeometry_()) {
      return []
    }
    throw new Error(this.formatErrorMessage_())
  }

  /**
   * @return {!Array<!Array<!Array<number>>>} All points in a polygon.
   * @private
   */
  parsePolygonText_() {
    if (this.match(TokenType.LEFT_PAREN)) {
      const coordinates = this.parseLineStringTextList_()
      if (this.match(TokenType.RIGHT_PAREN)) 
        return coordinates
    } else if (this.isEmptyGeometry_()) {
      return []
    }
    throw new Error(this.formatErrorMessage_())
  }

  /**
   * @return {!Array<!Array<number>>} All points in a multipoint.
   * @private
   */
  parseMultiPointText_() {
    if (this.match(TokenType.LEFT_PAREN)) {
      let coordinates
      if (this.token_.type == TokenType.LEFT_PAREN) 
        coordinates = this.parsePointTextList_()
      else
        coordinates = this.parsePointList_()
      if (this.match(TokenType.RIGHT_PAREN)) 
        return coordinates
    } else if (this.isEmptyGeometry_()) {
      return []
    }
    throw new Error(this.formatErrorMessage_())
  }

  /**
   * @return {!Array<!Array<!Array<number>>>} All linestring points
   *                                          in a multilinestring.
   * @private
   */
  parseMultiLineStringText_() {
    if (this.match(TokenType.LEFT_PAREN)) {
      const coordinates = this.parseLineStringTextList_()
      if (this.match(TokenType.RIGHT_PAREN)) 
        return coordinates
    } else if (this.isEmptyGeometry_()) {
      return []
    }
    throw new Error(this.formatErrorMessage_())
  }

  /**
   * @return {!Array<!Array<!Array<!Array<number>>>>} All polygon points in a multipolygon.
   * @private
   */
  parseMultiPolygonText_() {
    if (this.match(TokenType.LEFT_PAREN)) {
      const coordinates = this.parsePolygonTextList_()
      if (this.match(TokenType.RIGHT_PAREN)) 
        return coordinates
    } else if (this.isEmptyGeometry_()) {
      return []
    }
    throw new Error(this.formatErrorMessage_())
  }

  /**
   * @return {!Array<number>} A point.
   * @private
   */
  parsePoint_() {
    const coordinates = []
    const dimensions = this.layout_.length
    for (let i = 0; i < dimensions; ++i) {
      const token = this.token_
      if (this.match(TokenType.NUMBER)) 
        coordinates.push(/** @type {number} */(token.value))
      else
        break
    }
    if (coordinates.length == dimensions) 
      return coordinates
    throw new Error(this.formatErrorMessage_())
  }

  /**
   * @return {!Array<!Array<number>>} An array of points.
   * @private
   */
  parsePointList_() {
    const coordinates = [this.parsePoint_()]
    while (this.match(TokenType.COMMA))
      coordinates.push(this.parsePoint_())
    return coordinates
  }

  /**
   * @return {!Array<!Array<number>>} An array of points.
   * @private
   */
  parsePointTextList_() {
    const coordinates = [this.parsePointText_()]
    while (this.match(TokenType.COMMA))
      coordinates.push(this.parsePointText_())
    return coordinates
  }

  /**
   * @return {!Array<!Array<!Array<number>>>} An array of points.
   * @private
   */
  parseLineStringTextList_() {
    const coordinates = [this.parseLineStringText_()]
    while (this.match(TokenType.COMMA))
      coordinates.push(this.parseLineStringText_())
    return coordinates
  }

  /**
   * @return {!Array<!Array<!Array<!Array<number>>>>} An array of points.
   * @private
   */
  parsePolygonTextList_() {
    const coordinates = [this.parsePolygonText_()]
    while (this.match(TokenType.COMMA))
      coordinates.push(this.parsePolygonText_())
    return coordinates
  }

  /**
   * @return {boolean} Whether the token implies an empty geometry.
   * @private
   */
  isEmptyGeometry_() {
    const isEmpty =
      this.isTokenType(TokenType.TEXT) && this.token_.value == EMPTY
    if (isEmpty)
      this.consume_()
    return isEmpty
  }

  /**
   * Create an error message for an unexpected token error.
   * @return {string} Error message.
   * @private
   */
  formatErrorMessage_() {
    return (
      'Unexpected `' +
      this.token_.value +
      '` at position ' +
      this.token_.position +
      ' in `' +
      this.lexer_.wkt +
      '`'
    )
  }

  /**
   * @return {!import("../geom/Geometry.js").default} The geometry.
   * @private
   */
  parseGeometry_() {
    const factory = this.factory

    const o2c = ordinates => new Coordinate(...ordinates)
    const ca2p = coordinates => {
      const rings = coordinates.map(a => factory.createLinearRing(a.map(o2c)))
      if (rings.length > 1)
        return factory.createPolygon(rings[0], rings.slice(1))
      else
        return factory.createPolygon(rings[0])
    }

    const token = this.token_
    if (this.match(TokenType.TEXT)) {
      const geomType = token.value
      this.layout_ = this.parseGeometryLayout_()
      if (geomType == 'GEOMETRYCOLLECTION') {
        const geometries = this.parseGeometryCollectionText_()
        return factory.createGeometryCollection(geometries)
      } else {
        switch (geomType) {
        case 'POINT': {
          const ordinates = this.parsePointText_()
          if (!ordinates)
            return factory.createPoint()
          return factory.createPoint(new Coordinate(...ordinates))
        }
        case 'LINESTRING': {
          const coordinates = this.parseLineStringText_()
          const components = coordinates.map(o2c)
          return factory.createLineString(components)
        }
        case 'LINEARRING': {
          const coordinates = this.parseLineStringText_()
          const components = coordinates.map(o2c)
          return factory.createLinearRing(components)
        }
        case 'POLYGON': {
          const coordinates = this.parsePolygonText_()
          if (!coordinates || coordinates.length === 0)
            return factory.createPolygon()
          return ca2p(coordinates)
        }
        case 'MULTIPOINT': {
          const coordinates = this.parseMultiPointText_()
          if (!coordinates || coordinates.length === 0)
            return factory.createMultiPoint()
          const components = coordinates.map(o2c).map(c => factory.createPoint(c))
          return factory.createMultiPoint(components)
        }
        case 'MULTILINESTRING': {
          const coordinates = this.parseMultiLineStringText_()
          const components = coordinates.map(a => factory.createLineString(a.map(o2c)))
          return factory.createMultiLineString(components)
        }
        case 'MULTIPOLYGON': {
          const coordinates = this.parseMultiPolygonText_()
          if (!coordinates || coordinates.length === 0)
            return factory.createMultiPolygon()
          const polygons = coordinates.map(ca2p)
          return factory.createMultiPolygon(polygons)
        }
        default: {
          throw new Error('Invalid geometry type: ' + geomType)
        }
        }
      }
    }
    throw new Error(this.formatErrorMessage_())
  }
}

/**
 * @param {Point} geom Point geometry.
 * @return {string} Coordinates part of Point as WKT.
 */
function encodePointGeometry(geom) {
  if (geom.isEmpty())
    return ''
  const c = geom.getCoordinate()
  const cs = [c.x, c.y]
  if (c.z !== undefined && !Number.isNaN(c.z))
    cs.push(c.z)
  if (c.m !== undefined && !Number.isNaN(c.m))
    cs.push(c.m)
  return cs.join(' ')
}

/**
 * @param {MultiPoint} geom MultiPoint geometry.
 * @return {string} Coordinates part of MultiPoint as WKT.
 */
function encodeMultiPointGeometry(geom) {
  const array = []
  for (let i = 0, ii = geom.getNumGeometries(); i < ii; ++i) 
    array.push('(' + encodePointGeometry(geom.getGeometryN(i)) + ')')
  return array.join(', ')
}

/**
 * @param {GeometryCollection} geom GeometryCollection geometry.
 * @return {string} Coordinates part of GeometryCollection as WKT.
 */
function encodeGeometryCollectionGeometry(geom) {
  const array = []
  for (let i = 0, ii = geom.getNumGeometries(); i < ii; ++i) 
    array.push(encode(geom.getGeometryN(i)))
  return array.join(', ')
}

/**
 * @param {LineString|import("../geom/LinearRing.js").default} geom LineString geometry.
 * @return {string} Coordinates part of LineString as WKT.
 */
function encodeLineStringGeometry(geom) {
  const coordinates = geom.getCoordinates()
    .map(c => {
      const a = [c.x, c.y]
      if (c.z !== undefined && !Number.isNaN(c.z))
        a.push(c.z)
      if (c.m !== undefined && !Number.isNaN(c.m))
        a.push(c.m)
      return a
    })
  const array = []
  for (let i = 0, ii = coordinates.length; i < ii; ++i) 
    array.push(coordinates[i].join(' '))
  return array.join(', ')
}

/**
 * @param {MultiLineString} geom MultiLineString geometry.
 * @return {string} Coordinates part of MultiLineString as WKT.
 */
function encodeMultiLineStringGeometry(geom) {
  const array = []
  for (let i = 0, ii = geom.getNumGeometries(); i < ii; ++i) 
    array.push('(' + encodeLineStringGeometry(geom.getGeometryN(i)) + ')')
  return array.join(', ')
}

/**
 * @param {Polygon} geom Polygon geometry.
 * @return {string} Coordinates part of Polygon as WKT.
 */
function encodePolygonGeometry(geom) {
  const array = []
  array.push('(' + encodeLineStringGeometry(geom.getExteriorRing()) + ')')
  for (let i = 0, ii = geom.getNumInteriorRing(); i < ii; ++i) 
    array.push('(' + encodeLineStringGeometry(geom.getInteriorRingN(i)) + ')')
  return array.join(', ')
}

/**
 * @param {MultiPolygon} geom MultiPolygon geometry.
 * @return {string} Coordinates part of MultiPolygon as WKT.
 */
function encodeMultiPolygonGeometry(geom) {
  const array = []
  for (let i = 0, ii = geom.getNumGeometries(); i < ii; ++i) 
    array.push('(' + encodePolygonGeometry(geom.getGeometryN(i)) + ')')
  return array.join(', ')
}

/**
 * @param {Geometry} geom Geometry geometry.
 * @return {string} Potential dimensional information for WKT type.
 */
function encodeGeometryLayout(geom) {
  let dimInfo = ''
  if (geom.isEmpty())
    return dimInfo
  const c = geom.getCoordinate()
  if (c.z !== undefined && !Number.isNaN(c.z))
    dimInfo += Z
  if (c.m !== undefined && !Number.isNaN(c.m))
    dimInfo += M
  return dimInfo
}

/**
 * @const
 * @type {Object<string, function(import("../geom/Geometry.js").default): string>}
 */
const GeometryEncoder = {
  'Point': encodePointGeometry,
  'LineString': encodeLineStringGeometry,
  'LinearRing': encodeLineStringGeometry,
  'Polygon': encodePolygonGeometry,
  'MultiPoint': encodeMultiPointGeometry,
  'MultiLineString': encodeMultiLineStringGeometry,
  'MultiPolygon': encodeMultiPolygonGeometry,
  'GeometryCollection': encodeGeometryCollectionGeometry,
}

/**
 * Encode a geometry as WKT.
 * @param {!import("../geom/Geometry.js").default} geom The geometry to encode.
 * @return {string} WKT string for the geometry.
 */
function encode(geom) {
  let type = geom.getGeometryType()
  const geometryEncoder = GeometryEncoder[type]
  type = type.toUpperCase()
  const dimInfo = encodeGeometryLayout(geom)
  if (dimInfo.length > 0) 
    type += ' ' + dimInfo
  if (geom.isEmpty()) 
    return type + ' ' + EMPTY
  const enc = geometryEncoder(geom)
  return type + ' (' + enc + ')'
}

/**
 * Class for reading and writing Well-Known Text.
 *
 * NOTE: Adapted from OpenLayers.
 */

export default class WKTParser {
  /** Create a new parser for WKT
   *
   * @param {GeometryFactory} geometryFactory
   * @return An instance of WKTParser.
   * @private
   */
  constructor(geometryFactory) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
    this.precisionModel = this.geometryFactory.getPrecisionModel()
  }

  /**
   * Deserialize a WKT string and return a geometry. Supports WKT for POINT,
   * MULTIPOINT, LINESTRING, LINEARRING, MULTILINESTRING, POLYGON, MULTIPOLYGON,
   * and GEOMETRYCOLLECTION.
   *
   * @param {String} wkt A WKT string.
   * @return {Geometry} A geometry instance.
   * @private
   */
  read(wkt) {
    const lexer = new Lexer(wkt)
    const parser = new Parser(lexer, this.geometryFactory)
    const geometry = parser.parse()
    return geometry
  }

  /**
   * Serialize a geometry into a WKT string.
   *
   * @param {Geometry} geometry A feature or array of features.
   * @return {String} The WKT string representation of the input geometries.
   * @private
   */
  write(geometry) {
    return encode(geometry)
  }
}
