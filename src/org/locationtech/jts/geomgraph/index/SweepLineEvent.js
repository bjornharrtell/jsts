import Comparable from '../../../../../java/lang/Comparable';
export default class SweepLineEvent {
	constructor() {
		SweepLineEvent.constructor_.apply(this, arguments);
	}
	isDelete() {
		return this._eventType === SweepLineEvent.DELETE;
	}
	setDeleteEventIndex(deleteEventIndex) {
		this._deleteEventIndex = deleteEventIndex;
	}
	getObject() {
		return this._obj;
	}
	compareTo(o) {
		var pe = o;
		if (this._xValue < pe._xValue) return -1;
		if (this._xValue > pe._xValue) return 1;
		if (this._eventType < pe._eventType) return -1;
		if (this._eventType > pe._eventType) return 1;
		return 0;
	}
	getInsertEvent() {
		return this._insertEvent;
	}
	isInsert() {
		return this._eventType === SweepLineEvent.INSERT;
	}
	isSameLabel(ev) {
		if (this._label === null) return false;
		return this._label === ev._label;
	}
	getDeleteEventIndex() {
		return this._deleteEventIndex;
	}
	getClass() {
		return SweepLineEvent;
	}
	get interfaces_() {
		return [Comparable];
	}
}
SweepLineEvent.constructor_ = function () {
	this._label = null;
	this._xValue = null;
	this._eventType = null;
	this._insertEvent = null;
	this._deleteEventIndex = null;
	this._obj = null;
	if (arguments.length === 2) {
		let x = arguments[0], insertEvent = arguments[1];
		this._eventType = SweepLineEvent.DELETE;
		this._xValue = x;
		this._insertEvent = insertEvent;
	} else if (arguments.length === 3) {
		let label = arguments[0], x = arguments[1], obj = arguments[2];
		this._eventType = SweepLineEvent.INSERT;
		this._label = label;
		this._xValue = x;
		this._obj = obj;
	}
};
SweepLineEvent.INSERT = 1;
SweepLineEvent.DELETE = 2;
