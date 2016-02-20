import SweepLineEvent from './SweepLineEvent';
import extend from '../../../../../extend';
import Collections from '../../../../../java/util/Collections';
import ArrayList from '../../../../../java/util/ArrayList';
export default function SweepLineIndex() {
	this.events = new ArrayList();
	this.indexBuilt = null;
	this.nOverlaps = null;
}
extend(SweepLineIndex.prototype, {
	computeOverlaps: function (action) {
		this.nOverlaps = 0;
		this.buildIndex();
		for (var i = 0; i < this.events.size(); i++) {
			var ev = this.events.get(i);
			if (ev.isInsert()) {
				this.processOverlaps(i, ev.getDeleteEventIndex(), ev.getInterval(), action);
			}
		}
	},
	processOverlaps: function (start, end, s0, action) {
		for (var i = start; i < end; i++) {
			var ev = this.events.get(i);
			if (ev.isInsert()) {
				var s1 = ev.getInterval();
				action.overlap(s0, s1);
				this.nOverlaps++;
			}
		}
	},
	buildIndex: function () {
		if (this.indexBuilt) return null;
		Collections.sort(this.events);
		for (var i = 0; i < this.events.size(); i++) {
			var ev = this.events.get(i);
			if (ev.isDelete()) {
				ev.getInsertEvent().setDeleteEventIndex(i);
			}
		}
		this.indexBuilt = true;
	},
	add: function (sweepInt) {
		var insertEvent = new SweepLineEvent(sweepInt.getMin(), null, sweepInt);
		this.events.add(insertEvent);
		this.events.add(new SweepLineEvent(sweepInt.getMax(), insertEvent, sweepInt));
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SweepLineIndex;
	}
});

