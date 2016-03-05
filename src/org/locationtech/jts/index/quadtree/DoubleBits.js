import exponent from 'math-float64-exponent'

export default function DoubleBits () { }
DoubleBits.exponent = function (d) {
  return exponent(d)
}
DoubleBits.powerOf2 = function (exp) {
  return Math.pow(2, exp)
}
