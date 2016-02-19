export default function LinkedList () {
  this.array_ = []
}
LinkedList.prototype.addLast = function (e) {
  this.array_.push(e)
}
LinkedList.prototype.removeFirst = function () {
  return this.array_.shift()
}
LinkedList.prototype.isEmpty = function () {
  return this.array_.length === 0
}
