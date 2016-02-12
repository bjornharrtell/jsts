import MonotoneChain from './MonotoneChain';
import SweepLineEvent from './SweepLineEvent';
import EdgeSetIntersector from './EdgeSetIntersector';
import Collections from '../../../../../java/util/Collections';
import SegmentIntersector from './SegmentIntersector';
import ArrayList from '../../../../../java/util/ArrayList';
import List from '../../../../../java/util/List';
export default class SimpleMCSweepLineIntersector extends EdgeSetIntersector {
	constructor(...args) {
		super();
		this.events = new ArrayList();
		this.nOverlaps = null;
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
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
		switch (args.length) {
			case 1:
				{
					let [si] = args;
					this.nOverlaps = 0;
					this.prepareEvents();
					for (var i = 0; i < this.events.size(); i++) {
						var ev = this.events.get(i);
						if (ev.isInsert()) {
							this.processOverlaps(i, ev.getDeleteEventIndex(), ev, si);
						}
						if (si.isDone()) {
							break;
						}
					}
					break;
				}
			case 3:
				if (args[2] instanceof SegmentIntersector && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(List) > -1))) {
					let [edges0, edges1, si] = args;
					this.addEdges(edges0, edges0);
					this.addEdges(edges1, edges1);
					this.computeIntersections(si);
				} else if (typeof args[2] === "boolean" && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && args[1] instanceof SegmentIntersector)) {
					let [edges, si, testAllSegments] = args;
					if (testAllSegments) this.addEdges(edges, null); else this.addEdges(edges);
					this.computeIntersections(si);
				}
				break;
		}
	}
	addEdge(edge, edgeSet) {
		var mce = edge.getMonotoneChainEdge();
		var startIndex = mce.getStartIndexes();
		for (var i = 0; i < startIndex.length - 1; i++) {
			var mc = new MonotoneChain(mce, i);
			var insertEvent = new SweepLineEvent(edgeSet, mce.getMinX(i), mc);
			this.events.add(insertEvent);
			this.events.add(new SweepLineEvent(mce.getMaxX(i), insertEvent));
		}
	}
	processOverlaps(start, end, ev0, si) {
		var mc0 = ev0.getObject();
		for (var i = start; i < end; i++) {
			var ev1 = this.events.get(i);
			if (ev1.isInsert()) {
				var mc1 = ev1.getObject();
				if (!ev0.isSameLabel(ev1)) {
					mc0.computeIntersections(mc1, si);
					this.nOverlaps++;
				}
			}
		}
	}
	addEdges(...args) {
		switch (args.length) {
			case 1:
				{
					let [edges] = args;
					for (var i = edges.iterator(); i.hasNext(); ) {
						var edge = i.next();
						this.addEdge(edge, edge);
					}
					break;
				}
			case 2:
				{
					let [edges, edgeSet] = args;
					for (var i = edges.iterator(); i.hasNext(); ) {
						var edge = i.next();
						this.addEdge(edge, edgeSet);
					}
					break;
				}
		}
	}
	getClass() {
		return SimpleMCSweepLineIntersector;
	}
}

