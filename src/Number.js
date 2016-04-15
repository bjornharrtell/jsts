Number.isFinite = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value)
}

Number.isInteger = Number.isInteger || function (val) {
  return typeof val === 'number' &&
  isFinite(val) &&
  Math.floor(val) === val
}

Number.parseFloat = Number.parseFloat || parseFloat

Number.isNaN = Number.isNaN || function (value) {
  return value !== value // eslint-disable-line
}
