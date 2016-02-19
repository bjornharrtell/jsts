export default function StringBuffer (str) {
  this.str = str
}

StringBuffer.prototype.append = function (e) {
  this.str += e
}

StringBuffer.prototype.setCharAt = function (i, c) {
  return this.str.substr(0, i) + c + this.str.substr(i + 1)
}

StringBuffer.prototype.toString = function (e) {
  return this.str
}
