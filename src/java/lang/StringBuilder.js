export default function StringBuilder (str) {
    this.str = str
  }
  
  StringBuilder.prototype.append = function (e) {
    this.str += e
  }
  
  StringBuilder.prototype.setCharAt = function (i, c) {
    this.str = this.str.substr(0, i) + c + this.str.substr(i + 1)
  }
  
  StringBuilder.prototype.toString = function (e) {
    return this.str
  }
  