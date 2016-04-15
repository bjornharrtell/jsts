if (!Array.prototype.fill) {
  Array.prototype.fill = function (value) { // eslint-disable-line
    var O = Object(this)
    var len = parseInt(O.length, 10)
    var start = arguments[1]
    var relativeStart = parseInt(start, 10) || 0
    var k = relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len)
    var end = arguments[2]
    var relativeEnd = end === undefined
      ? len
      : (parseInt(end, 10) || 0)
    var final = relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len)
    for (; k < final; k++) {
      O[k] = value
    }
    return O
  }
}
