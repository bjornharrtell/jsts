import Comparable from '../../../../../java/lang/Comparable'
export default class SweepLineEvent {
  constructor() {
    SweepLineEvent.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._xValue = null
    this._eventType = null
    this._insertEvent = null
    this._deleteEventIndex = null
    this.sweepInt = null
    const x = arguments[0], insertEvent = arguments[1], sweepInt = arguments[2]
    this._xValue = x
    this._insertEvent = insertEvent
    this._eventType = SweepLineEvent.INSERT
    if (insertEvent !== null) this._eventType = SweepLineEvent.DELETE
    this.sweepInt = sweepInt
  }
  getInterval() {
    return this.sweepInt
  }
  isDelete() {
    return this._insertEvent !== null
  }
  setDeleteEventIndex(deleteEventIndex) {
    this._deleteEventIndex = deleteEventIndex
  }
  compareTo(o) {
    const pe = o
    if (this._xValue < pe._xValue) return -1
    if (this._xValue > pe._xValue) return 1
    if (this._eventType < pe._eventType) return -1
    if (this._eventType > pe._eventType) return 1
    return 0
  }
  getInsertEvent() {
    return this._insertEvent
  }
  isInsert() {
    return this._insertEvent === null
  }
  getDeleteEventIndex() {
    return this._deleteEventIndex
  }
  get interfaces_() {
    return [Comparable]
  }
}
SweepLineEvent.INSERT = 1
SweepLineEvent.DELETE = 2
