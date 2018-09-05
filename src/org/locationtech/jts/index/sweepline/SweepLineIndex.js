import SweepLineEvent from './SweepLineEvent';
import Collections from '../../../../../java/util/Collections';
import ArrayList from '../../../../../java/util/ArrayList';
export default class SweepLineIndex {
	constructor() {
		SweepLineIndex.constructor_.apply(this, arguments);
	}
	computeOverlaps(action) {
		this._nOverlaps = 0;
		this.buildIndex();
		for (var i = 0; i < this.events.size(); i++) {
			var ev = this.events.get(i);
			if (ev.isInsert()) {
				this.processOverlaps(i, ev.getDeleteEventIndex(), ev.getInterval(), action);
			}
		}
	}
	processOverlaps(start, end, s0, action) {
		for (var i = start; i < end; i++) {
			var ev = this.events.get(i);
			if (ev.isInsert()) {
				var s1 = ev.getInterval();
				action.overlap(s0, s1);
				this._nOverlaps++;
			}
		}
	}
	buildIndex() {
		if (this._indexBuilt) return null;
		Collections.sort(this.events);
		for (var i = 0; i < this.events.size(); i++) {
			var ev = this.events.get(i);
			if (ev.isDelete()) {
				ev.getInsertEvent().setDeleteEventIndex(i);
			}
		}
		this._indexBuilt = true;
	}
	add(sweepInt) {
		var insertEvent = new SweepLineEvent(sweepInt.getMin(), null, sweepInt);
		this.events.add(insertEvent);
		this.events.add(new SweepLineEvent(sweepInt.getMax(), insertEvent, sweepInt));
	}
	getClass() {
		return SweepLineIndex;
	}
	get interfaces_() {
		return [];
	}
}
SweepLineIndex.constructor_ = function () {
	this.events = new ArrayList();
	this._indexBuilt = null;
	this._nOverlaps = null;
};
