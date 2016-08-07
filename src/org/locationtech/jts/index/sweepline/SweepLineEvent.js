import extend from '../../../../../extend';
import Comparable from '../../../../../java/lang/Comparable';
export default function SweepLineEvent() {
	this.xValue = null;
	this.eventType = null;
	this.insertEvent = null;
	this.deleteEventIndex = null;
	this.sweepInt = null;
	let x = arguments[0], insertEvent = arguments[1], sweepInt = arguments[2];
	this.xValue = x;
	this.insertEvent = insertEvent;
	this.eventType = SweepLineEvent.INSERT;
	if (insertEvent !== null) this.eventType = SweepLineEvent.DELETE;
	this.sweepInt = sweepInt;
}
extend(SweepLineEvent.prototype, {
	getInterval: function () {
		return this.sweepInt;
	},
	isDelete: function () {
		return this.insertEvent !== null;
	},
	setDeleteEventIndex: function (deleteEventIndex) {
		this.deleteEventIndex = deleteEventIndex;
	},
	compareTo: function (o) {
		var pe = o;
		if (this.xValue < pe.xValue) return -1;
		if (this.xValue > pe.xValue) return 1;
		if (this.eventType < pe.eventType) return -1;
		if (this.eventType > pe.eventType) return 1;
		return 0;
	},
	getInsertEvent: function () {
		return this.insertEvent;
	},
	isInsert: function () {
		return this.insertEvent === null;
	},
	getDeleteEventIndex: function () {
		return this.deleteEventIndex;
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
