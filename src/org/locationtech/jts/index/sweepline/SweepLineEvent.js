import extend from '../../../../../extend';
import Comparable from '../../../../../java/lang/Comparable';
export default function SweepLineEvent() {
	this._xValue = null;
	this._eventType = null;
	this._insertEvent = null;
	this._deleteEventIndex = null;
	this.sweepInt = null;
	let x = arguments[0], insertEvent = arguments[1], sweepInt = arguments[2];
	this._xValue = x;
	this._insertEvent = insertEvent;
	this._eventType = SweepLineEvent.INSERT;
	if (insertEvent !== null) this._eventType = SweepLineEvent.DELETE;
	this.sweepInt = sweepInt;
}
extend(SweepLineEvent.prototype, {
	getInterval: function () {
		return this.sweepInt;
	},
	isDelete: function () {
		return this._insertEvent !== null;
	},
	setDeleteEventIndex: function (deleteEventIndex) {
		this._deleteEventIndex = deleteEventIndex;
	},
	compareTo: function (o) {
		var pe = o;
		if (this._xValue < pe._xValue) return -1;
		if (this._xValue > pe._xValue) return 1;
		if (this._eventType < pe._eventType) return -1;
		if (this._eventType > pe._eventType) return 1;
		return 0;
	},
	getInsertEvent: function () {
		return this._insertEvent;
	},
	isInsert: function () {
		return this._insertEvent === null;
	},
	getDeleteEventIndex: function () {
		return this._deleteEventIndex;
	},
	interfaces_: function () {
		return [Comparable];
	},
	getClass: function () {
		return SweepLineEvent;
	}
});
SweepLineEvent.INSERT = 1;
SweepLineEvent.DELETE = 2;
