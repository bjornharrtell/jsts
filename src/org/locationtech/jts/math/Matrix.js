import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
export default class Matrix {
  static solve(a, b) {
    const n = b.length
    if (a.length !== n || a[0].length !== n) throw new IllegalArgumentException('Matrix A is incorrectly sized')
    for (let i = 0; i < n; i++) {
      let maxElementRow = i
      for (let j = i + 1; j < n; j++) if (Math.abs(a[j][i]) > Math.abs(a[maxElementRow][i])) maxElementRow = j
      if (a[maxElementRow][i] === 0.0) return null
      Matrix.swapRows(a, i, maxElementRow)
      Matrix.swapRows(b, i, maxElementRow)
      for (let j = i + 1; j < n; j++) {
        const rowFactor = a[j][i] / a[i][i]
        for (let k = n - 1; k >= i; k--) a[j][k] -= a[i][k] * rowFactor
        b[j] -= b[i] * rowFactor
      }
    }
    const solution = new Array(n).fill(null)
    for (let j = n - 1; j >= 0; j--) {
      let t = 0.0
      for (let k = j + 1; k < n; k++) t += a[j][k] * solution[k]
      solution[j] = (b[j] - t) / a[j][j]
    }
    return solution
  }
  static swapRows() {
    if (Number.isInteger(arguments[2]) && (arguments[0] instanceof Array && Number.isInteger(arguments[1]))) {
      const m = arguments[0], i = arguments[1], j = arguments[2]
      if (i === j) return null
      for (let col = 0; col < m[0].length; col++) {
        const temp = m[i][col]
        m[i][col] = m[j][col]
        m[j][col] = temp
      }
    } else if (Number.isInteger(arguments[2]) && (arguments[0] instanceof Array && Number.isInteger(arguments[1]))) {
      const m = arguments[0], i = arguments[1], j = arguments[2]
      if (i === j) return null
      const temp = m[i]
      m[i] = m[j]
      m[j] = temp
    }
  }
}
