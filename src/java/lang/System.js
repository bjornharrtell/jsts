export default class System {
  static arraycopy(src, srcPos, dest, destPos, len) {
    let c = 0
    for (let i = srcPos; i < srcPos + len; i++) {
      dest[destPos + c] = src[i]
      c++
    }
  }

  static getProperty(name) {
    return {
      'line.separator': '\n'
    }[name]
  }
}
