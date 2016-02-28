;(function () {
  if (!Number.isInteger) {
    Number.isInteger = function (val) {
      return typeof val === 'number' &&
      isFinite(val) &&
      Math.floor(val) === val
    }
  }
})()
