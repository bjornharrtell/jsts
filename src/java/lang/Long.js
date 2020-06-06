export default class Long {
  constructor(high, low) {
    this.low = low || 0
    this.high = high || 0
  }

  static toBinaryString(i) {
    let mask
    let result = ''
    for (mask = 0x80000000; mask > 0; mask >>>= 1)
      result += (i.high & mask) === mask ? '1' : '0'
    for (mask = 0x80000000; mask > 0; mask >>>= 1)
      result += (i.low & mask) === mask ? '1' : '0'
    return result
  }
}
