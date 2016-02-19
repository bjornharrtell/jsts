import extend from '../../../../../extend';
import Comparable from '../../../../../java/lang/Comparable';
export default function SweepLineEvent() {
	this.label = null;
	this.xValue = null;
	this.eventType = null;
	this.insertEvent = null;
	this.deleteEventIndex = null;
	this.obj = null;
	if (arguments.length === 2) {
		let x = arguments[0], insertEvent = arguments[1];
		this.eventType = SweepLineEvent.DELETE;
		this.xValue = x;
		this.insertEvent = insertEvent;
	} else if (arguments.length === 3) {
		let label = arguments[0], x = arguments[1], obj = arguments[2];
		this.eventType = SweepLineEvent.INSERT;
		this.label = label;
		this.xValue = x;
		this.obj = obj;
	}
}
extend(SweepLineEvent.prototype, {
	isDelete: function () {
		return this.eventType === SweepLineEvent.DELETE;
	},
	setDeleteEventIndex: function (deleteEventIndex) {
		this.deleteEventIndex = deleteEventIndex;
	},
	getObject: function () {
		return this.obj;
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
		return this.eventType === SweepLineEvent.INSERT;
	},
	isSameLabel: function (ev) {
		if (this.label === null) return false;
		return this.label === ev.label;
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

