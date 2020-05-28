export default class Memory {
  static used() {
    const runtime = Runtime.getRuntime()
    return runtime.totalMemory() - runtime.freeMemory()
  }
  static format(mem) {
    if (mem < 2 * Memory.KB) return mem + ' bytes'
    if (mem < 2 * Memory.MB) return Memory.round(mem / Memory.KB) + ' KB'
    if (mem < 2 * Memory.GB) return Memory.round(mem / Memory.MB) + ' MB'
    return Memory.round(mem / Memory.GB) + ' GB'
  }
  static freeString() {
    return Memory.format(Memory.free())
  }
  static total() {
    const runtime = Runtime.getRuntime()
    return runtime.totalMemory()
  }
  static usedTotalString() {
    return 'Used: ' + Memory.usedString() + '   Total: ' + Memory.totalString()
  }
  static usedString() {
    return Memory.format(Memory.used())
  }
  static allString() {
    return 'Used: ' + Memory.usedString() + '   Free: ' + Memory.freeString() + '   Total: ' + Memory.totalString()
  }
  static round(d) {
    return Math.ceil(d * 100) / 100
  }
  static totalString() {
    return Memory.format(Memory.total())
  }
  static free() {
    const runtime = Runtime.getRuntime()
    return runtime.freeMemory()
  }
}
Memory.KB = 1024
Memory.MB = 1048576
Memory.GB = 1073741824
