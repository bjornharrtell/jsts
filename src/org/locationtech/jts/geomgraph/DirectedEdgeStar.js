import Location from '../geom/Location';
import Position from './Position';
import TopologyException from '../geom/TopologyException';
import EdgeEndStar from './EdgeEndStar';
import System from '../../../../java/lang/System';
import Label from './Label';
import ArrayList from '../../../../java/util/ArrayList';
import Quadrant from './Quadrant';
import Assert from '../util/Assert';
export default class DirectedEdgeStar extends EdgeEndStar {
	constructor(...args) {
		super();
		this.resultAreaEdgeList = null;
		this.label = null;
		this.SCANNING_FOR_INCOMING = 1;
		this.LINKING_TO_OUTGOING = 2;
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
	linkResultDirectedEdges() {
		this.getResultAreaEdges();
		var firstOut = null;
		var incoming = null;
		var state = this.SCANNING_FOR_INCOMING;
		for (var i = 0; i < this.resultAreaEdgeList.size(); i++) {
			var nextOut = this.resultAreaEdgeList.get(i);
			var nextIn = nextOut.getSym();
			if (!nextOut.getLabel().isArea()) continue;
			if (firstOut === null && nextOut.isInResult()) firstOut = nextOut;
			switch (state) {
				case this.SCANNING_FOR_INCOMING:
					if (!nextIn.isInResult()) continue;
					incoming = nextIn;
					state = this.LINKING_TO_OUTGOING;
					break;
				case this.LINKING_TO_OUTGOING:
					if (!nextOut.isInResult()) continue;
					incoming.setNext(nextOut);
					state = this.SCANNING_FOR_INCOMING;
					break;
			}
		}
		if (state === this.LINKING_TO_OUTGOING) {
			if (firstOut === null) throw new TopologyException("no outgoing dirEdge found", this.getCoordinate());
			Assert.isTrue(firstOut.isInResult(), "unable to link last incoming dirEdge");
			incoming.setNext(firstOut);
		}
	}
	insert(ee) {
		var de = ee;
		this.insertEdgeEnd(de, de);
	}
	getRightmostEdge() {
		var edges = this.getEdges();
		var size = edges.size();
		if (size < 1) return null;
		var de0 = edges.get(0);
		if (size === 1) return de0;
		var deLast = edges.get(size - 1);
		var quad0 = de0.getQuadrant();
		var quad1 = deLast.getQuadrant();
		if (Quadrant.isNorthern(quad0) && Quadrant.isNorthern(quad1)) return de0; else if (!Quadrant.isNorthern(quad0) && !Quadrant.isNorthern(quad1)) return deLast; else {
			var nonHorizontalEdge = null;
			if (de0.getDy() !== 0) return de0; else if (deLast.getDy() !== 0) return deLast;
		}
		Assert.shouldNeverReachHere("found two horizontal edges incident on node");
		return null;
	}
	print(out) {
		System.out.println("DirectedEdgeStar: " + this.getCoordinate());
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			out.print("out ");
			de.print(out);
			out.println();
			out.print("in ");
			de.getSym().print(out);
			out.println();
		}
	}
	getResultAreaEdges() {
		if (this.resultAreaEdgeList !== null) return this.resultAreaEdgeList;
		this.resultAreaEdgeList = new ArrayList();
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.isInResult() || de.getSym().isInResult()) this.resultAreaEdgeList.add(de);
		}
		return this.resultAreaEdgeList;
	}
	updateLabelling(nodeLabel) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			var label = de.getLabel();
			label.setAllLocationsIfNull(0, nodeLabel.getLocation(0));
			label.setAllLocationsIfNull(1, nodeLabel.getLocation(1));
		}
	}
	linkAllDirectedEdges() {
		this.getEdges();
		var prevOut = null;
		var firstIn = null;
		for (var i = this.edgeList.size() - 1; i >= 0; i--) {
			var nextOut = this.edgeList.get(i);
			var nextIn = nextOut.getSym();
			if (firstIn === null) firstIn = nextIn;
			if (prevOut !== null) nextIn.setNext(prevOut);
			prevOut = nextOut;
		}
		firstIn.setNext(prevOut);
	}
	computeDepths(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [de] = args;
						var edgeIndex = this.findIndex(de);
						var label = de.getLabel();
						var startDepth = de.getDepth(Position.LEFT);
						var targetLastDepth = de.getDepth(Position.RIGHT);
						var nextDepth = this.computeDepths(edgeIndex + 1, this.edgeList.size(), startDepth);
						var lastDepth = this.computeDepths(0, edgeIndex, nextDepth);
						if (lastDepth !== targetLastDepth) throw new TopologyException("depth mismatch at " + de.getCoordinate());
					})(...args);
				case 3:
					return ((...args) => {
						let [startIndex, endIndex, startDepth] = args;
						var currDepth = startDepth;
						for (var i = startIndex; i < endIndex; i++) {
							var nextDe = this.edgeList.get(i);
							var label = nextDe.getLabel();
							nextDe.setEdgeDepths(Position.RIGHT, currDepth);
							currDepth = nextDe.getDepth(Position.LEFT);
						}
						return currDepth;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	mergeSymLabels() {
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			var label = de.getLabel();
			label.merge(de.getSym().getLabel());
		}
	}
	linkMinimalDirectedEdges(er) {
		var firstOut = null;
		var incoming = null;
		var state = this.SCANNING_FOR_INCOMING;
		for (var i = this.resultAreaEdgeList.size() - 1; i >= 0; i--) {
			var nextOut = this.resultAreaEdgeList.get(i);
			var nextIn = nextOut.getSym();
			if (firstOut === null && nextOut.getEdgeRing() === er) firstOut = nextOut;
			switch (state) {
				case this.SCANNING_FOR_INCOMING:
					if (nextIn.getEdgeRing() !== er) continue;
					incoming = nextIn;
					state = this.LINKING_TO_OUTGOING;
					break;
				case this.LINKING_TO_OUTGOING:
					if (nextOut.getEdgeRing() !== er) continue;
					incoming.setNextMin(nextOut);
					state = this.SCANNING_FOR_INCOMING;
					break;
			}
		}
		if (state === this.LINKING_TO_OUTGOING) {
			Assert.isTrue(firstOut !== null, "found null for first outgoing dirEdge");
			Assert.isTrue(firstOut.getEdgeRing() === er, "unable to link last incoming dirEdge");
			incoming.setNextMin(firstOut);
		}
	}
	getOutgoingDegree(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						var degree = 0;
						for (var it = this.iterator(); it.hasNext(); ) {
							var de = it.next();
							if (de.isInResult()) degree++;
						}
						return degree;
					})(...args);
				case 1:
					return ((...args) => {
						let [er] = args;
						var degree = 0;
						for (var it = this.iterator(); it.hasNext(); ) {
							var de = it.next();
							if (de.getEdgeRing() === er) degree++;
						}
						return degree;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getLabel() {
		return this.label;
	}
	findCoveredLineEdges() {
		var startLoc = Location.NONE;
		for (var it = this.iterator(); it.hasNext(); ) {
			var nextOut = it.next();
			var nextIn = nextOut.getSym();
			if (!nextOut.isLineEdge()) {
				if (nextOut.isInResult()) {
					startLoc = Location.INTERIOR;
					break;
				}
				if (nextIn.isInResult()) {
					startLoc = Location.EXTERIOR;
					break;
				}
			}
		}
		if (startLoc === Location.NONE) return null;
		var currLoc = startLoc;
		for (var it = this.iterator(); it.hasNext(); ) {
			var nextOut = it.next();
			var nextIn = nextOut.getSym();
			if (nextOut.isLineEdge()) {
				nextOut.getEdge().setCovered(currLoc === Location.INTERIOR);
			} else {
				if (nextOut.isInResult()) currLoc = Location.EXTERIOR;
				if (nextIn.isInResult()) currLoc = Location.INTERIOR;
			}
		}
	}
	computeLabelling(geom) {
		super.computeLabelling(geom);
		this.label = new Label(Location.NONE);
		for (var it = this.iterator(); it.hasNext(); ) {
			var ee = it.next();
			var e = ee.getEdge();
			var eLabel = e.getLabel();
			for (var i = 0; i < 2; i++) {
				var eLoc = eLabel.getLocation(i);
				if (eLoc === Location.INTERIOR || eLoc === Location.BOUNDARY) this.label.setLocation(i, Location.INTERIOR);
			}
		}
	}
	getClass() {
		return DirectedEdgeStar;
	}
}

