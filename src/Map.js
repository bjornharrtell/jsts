// shared pointer
var i
// shortcuts
var defineProperty = Object.defineProperty
function is (a, b) { return (a === b) || (a !== a && b !== b) } // eslint-disable-line

export default createCollection({
  // WeakMap#delete(key:void*):boolean
  'delete': sharedDelete,
  // :was Map#get(key:void*[, d3fault:void*]):void*
  // Map#has(key:void*):boolean
  has: mapHas,
  // Map#get(key:void*):boolean
  get: sharedGet,
  // Map#set(key:void*, value:void*):void
  set: sharedSet,
  // Map#keys(void):Iterator
  keys: sharedKeys,
  // Map#values(void):Iterator
  values: sharedValues,
  // Map#entries(void):Iterator
  entries: mapEntries,
  // Map#forEach(callback:Function, context:void*):void ==> callback.call(context, key, value, mapObject) === not in specs`
  forEach: sharedForEach,
  // Map#clear():
  clear: sharedClear
})

/**
 * ES6 collection constructor
 * @return {Function} a collection class
 */
function createCollection (proto, objectOnly) {
  function Collection (a) {
    if (!this || this.constructor !== Collection) return new Collection(a)
    this._keys = []
    this._values = []
    this._itp = [] // iteration pointers
    this.objectOnly = objectOnly

    // parse initial iterable argument passed
    if (a) init.call(this, a)
  }

  // define size for non object-only collections
  if (!objectOnly) {
    defineProperty(proto, 'size', {
      get: sharedSize
    })
  }

  // set prototype
  proto.constructor = Collection
  Collection.prototype = proto

  return Collection
}

/** parse initial iterable argument passed */
function init (a) {
  // init Set argument, like `[1,2,3,{}]`
  if (this.add) a.forEach(this.add, this)
  // init Map argument like `[[1,2], [{}, 4]]`
  else a.forEach(function (a) { this.set(a[0], a[1]) }, this)
}

/** delete */
function sharedDelete (key) {
  if (this.has(key)) {
    this._keys.splice(i, 1)
    this._values.splice(i, 1)
    // update iteration pointers
    this._itp.forEach(function (p) { if (i < p[0]) p[0]-- })
  }
  // Aurora here does it while Canary doesn't
  return i > -1
}

function sharedGet (key) {
  return this.has(key) ? this._values[i] : undefined
}

function has (list, key) {
  if (this.objectOnly && key !== Object(key)) throw new TypeError('Invalid value used as weak collection key')
  // NaN or 0 passed
  if (key !== key || key === 0) for (i = list.length; i-- && !is(list[i], key);) {} // eslint-disable-line
  else i = list.indexOf(key)
  return i > -1
}

function mapHas (value) {
  return has.call(this, this._keys, value)
}

/** @chainable */
function sharedSet (key, value) {
  this.has(key) ? this._values[i] = value : this._values[this._keys.push(key) - 1] = value
  return this
}

function sharedClear () {
  (this._keys || 0).length =
    this._values.length = 0
}

/** keys, values, and iterate related methods */
function sharedKeys () {
  return sharedIterator(this._itp, this._keys)
}

function sharedValues () {
  return sharedIterator(this._itp, this._values)
}

function mapEntries () {
  return sharedIterator(this._itp, this._keys, this._values)
}

function sharedIterator (itp, array, array2) {
  var p = [0]
  var done = false
  itp.push(p)
  return {
    next: function () {
      var v
      var k = p[0]
      if (!done && k < array.length) {
        v = array2 ? [array[k], array2[k]] : array[k]
        p[0]++
      } else {
        done = true
        itp.splice(itp.indexOf(p), 1)
      }
      return { done: done, value: v }
    }
  }
}

function sharedSize () {
  return this._values.length
}

function sharedForEach (callback, context) {
  var it = this.entries()
  for (;;) {
    var r = it.next()
    if (r.done) break
    callback.call(context, r.value[1], r.value[0], this)
  }
}
