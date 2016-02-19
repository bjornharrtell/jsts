export default function (c, p) {
  c.prototype = Object.create(p.prototype)
  c.prototype.constructor = c
}
