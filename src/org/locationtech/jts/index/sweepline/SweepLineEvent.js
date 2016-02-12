import Comparable from '../../../../../java/lang/Comparable';
export default class SweepLineEvent {
	constructor(...args) {
		this.xValue = null;
		this.eventType = null;
		this.insertEvent = null;
		this.deleteEventIndex = null;
		this.sweepInt = null;
		switch (args.length) {
			case 3:
				{
					let [x, insertEvent, sweepInt] = args;
					this.xValue = x;
					this.insertEvent = insertEvent;
					this.eventType = SweepLineEvent.INSERT;
					if (insertEvent !== null) this.eventType = SweepLineEvent.DELETE;
					this.sweepInt = sweepInt;
					break;
				}
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	getInterval() {
		return this.sweepInt;
	}
	isDelete() {
		return this.insertEvent !== null;
	}
	setDeleteEventIndex(deleteEventIndex) {
		this.deleteEventIndex = deleteEventIndex;
	}
	compareTo(o) {
		var pe = o;
		if (this.xValue < pe.xValue) return -1;
		if (this.xValue > pe.xValue) return 1;
		if (this.eventType < pe.eventType) return -1;
		if (this.eventType > pe.eventType) return 1;
		return 0;
	}
	getInsertEvent() {
		return this.insertEvent;
	}
	isInsert() {
		return this.insertEvent === null;
	}
	getDeleteEventIndex() {
		return this.deleteEventIndex;
	}
	getClass() {
		return SweepLineEvent;
	}
}
SweepLineEvent.INSERT = 1;
SweepLineEvent.DELETE = 2;

