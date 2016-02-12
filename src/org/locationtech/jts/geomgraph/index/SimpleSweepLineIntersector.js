import SweepLineSegment from './SweepLineSegment';
import SweepLineEvent from './SweepLineEvent';
import EdgeSetIntersector from './EdgeSetIntersector';
import Collections from '../../../../../java/util/Collections';
import SegmentIntersector from './SegmentIntersector';
import ArrayList from '../../../../../java/util/ArrayList';
import Edge from '../Edge';
import List from '../../../../../java/util/List';
export default class SimpleSweepLineIntersector extends EdgeSetIntersector {
	constructor(...args) {
		super();
		this.events = new ArrayList();
		this.nOverlaps = null;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	processOverlaps(start, end, ev0, si) {
		var ss0 = ev0.getObject();
		for (var i = start; i < end; i++) {
			var ev1 = this.events.get(i);
			if (ev1.isInsert()) {
				var ss1 = ev1.getObject();
				if (!ev0.isSameLabel(ev1)) {
					ss0.computeIntersections(ss1, si);
					this.nOverlaps++;
				}
			}
		}
	}
	prepareEvents() {
		Collections.sort(this.events);
		for (var i = 0; i < this.events.size(); i++) {
			var ev = this.events.get(i);
			if (ev.isDelete()) {
				ev.getInsertEvent().setDeleteEventIndex(i);
			}
		}
	}
	computeIntersections(...args) {
		if (args.length === 1) {
			let [si] = args;
			this.nOverlaps = 0;
			this.prepareEvents();
			for (var i = 0; i < this.events.size(); i++) {
				var ev = this.events.get(i);
				if (ev.isInsert()) {
					this.processOverlaps(i, ev.getDeleteEventIndex(), ev, si);
				}
			}
		} else if (args.length === 3) {
			if (args[2] instanceof SegmentIntersector && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(List) > -1))) {
				let [edges0, edges1, si] = args;
				this.add(edges0, edges0);
				this.add(edges1, edges1);
				this.computeIntersections(si);
			} else if (typeof args[2] === "boolean" && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && args[1] instanceof SegmentIntersector)) {
				let [edges, si, testAllSegments] = args;
				if (testAllSegments) this.add(edges, null); else this.add(edges);
				this.computeIntersections(si);
			}
		}
	}
	add(...args) {
		if (args.length === 1) {
			let [edges] = args;
			for (var i = edges.iterator(); i.hasNext(); ) {
				var edge = i.next();
				this.add(edge, edge);
			}
		} else if (args.length === 2) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && args[1] instanceof Object) {
				let [edges, edgeSet] = args;
				for (var i = edges.iterator(); i.hasNext(); ) {
					var edge = i.next();
					this.add(edge, edgeSet);
				}
			} else if (args[0] instanceof Edge && args[1] instanceof Object) {
				let [edge, edgeSet] = args;
				var pts = edge.getCoordinates();
				for (var i = 0; i < pts.length - 1; i++) {
					var ss = new SweepLineSegment(edge, i);
					var insertEvent = new SweepLineEvent(edgeSet, ss.getMinX(), null);
					this.events.add(insertEvent);
					this.events.add(new SweepLineEvent(ss.getMaxX(), insertEvent));
				}
			}
		}
	}
	getClass() {
		return SimpleSweepLineIntersector;
	}
}

