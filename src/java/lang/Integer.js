export default function Integer (value) {
  this.value = value
}

Integer.prototype.intValue = function () {
  return this.value
}
Integer.prototype.compareTo = function (o) {
  if (this.value < o) return -1
  if (this.value > o) return 1
  return 0
}

Integer.isNaN = n => Number.isNaN(n)
