Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x)
}

Math.log2 = Math.log2 || function(x) {
  return Math.log(x) * Math.LOG2E
}
