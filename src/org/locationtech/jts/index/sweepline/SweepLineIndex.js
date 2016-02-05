import SweepLineEvent from './SweepLineEvent';
import Collections from '../../../../../java/util/Collections';
import ArrayList from '../../../../../java/util/ArrayList';
export default class SweepLineIndex {
	constructor(...args) {
		(() => {
			this.events = new ArrayList();
			this.indexBuilt = null;
			this.nOverlaps = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	computeOverlaps(action) {
		this.nOverlaps = 0;
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
				this.nOverlaps++;
			}
		}
	}
	buildIndex() {
		if (this.indexBuilt) return null;
		Collections.sort(this.events);
		for (var i = 0; i < this.events.size(); i++) {
			var ev = this.events.get(i);
			if (ev.isDelete()) {
				ev.getInsertEvent().setDeleteEventIndex(i);
			}
		}
		this.indexBuilt = true;
	}
	add(sweepInt) {
		var insertEvent = new SweepLineEvent(sweepInt.getMin(), null, sweepInt);
		this.events.add(insertEvent);
		this.events.add(new SweepLineEvent(sweepInt.getMax(), insertEvent, sweepInt));
	}
	getClass() {
		return SweepLineIndex;
	}
}

