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
	constructor() {
		super();
		DirectedEdgeStar.constructor_.apply(this, arguments);
	}
	linkResultDirectedEdges() {
		this.getResultAreaEdges();
		var firstOut = null;
		var incoming = null;
		var state = this._SCANNING_FOR_INCOMING;
		for (var i = 0; i < this._resultAreaEdgeList.size(); i++) {
			var nextOut = this._resultAreaEdgeList.get(i);
			var nextIn = nextOut.getSym();
			if (!nextOut.getLabel().isArea()) continue;
			if (firstOut === null && nextOut.isInResult()) firstOut = nextOut;
			switch (state) {
				case this._SCANNING_FOR_INCOMING:
					if (!nextIn.isInResult()) continue;
					incoming = nextIn;
					state = this._LINKING_TO_OUTGOING;
					break;
				case this._LINKING_TO_OUTGOING:
					if (!nextOut.isInResult()) continue;
					incoming.setNext(nextOut);
					state = this._SCANNING_FOR_INCOMING;
					break;
			}
		}
		if (state === this._LINKING_TO_OUTGOING) {
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
		if (this._resultAreaEdgeList !== null) return this._resultAreaEdgeList;
		this._resultAreaEdgeList = new ArrayList();
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.isInResult() || de.getSym().isInResult()) this._resultAreaEdgeList.add(de);
		}
		return this._resultAreaEdgeList;
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
		for (var i = this._edgeList.size() - 1; i >= 0; i--) {
			var nextOut = this._edgeList.get(i);
			var nextIn = nextOut.getSym();
			if (firstIn === null) firstIn = nextIn;
			if (prevOut !== null) nextIn.setNext(prevOut);
			prevOut = nextOut;
		}
		firstIn.setNext(prevOut);
	}
	computeDepths() {
		if (arguments.length === 1) {
			let de = arguments[0];
			var edgeIndex = this.findIndex(de);
			var startDepth = de.getDepth(Position.LEFT);
			var targetLastDepth = de.getDepth(Position.RIGHT);
			var nextDepth = this.computeDepths(edgeIndex + 1, this._edgeList.size(), startDepth);
			var lastDepth = this.computeDepths(0, edgeIndex, nextDepth);
			if (lastDepth !== targetLastDepth) throw new TopologyException("depth mismatch at " + de.getCoordinate());
		} else if (arguments.length === 3) {
			let startIndex = arguments[0], endIndex = arguments[1], startDepth = arguments[2];
			var currDepth = startDepth;
			for (var i = startIndex; i < endIndex; i++) {
				var nextDe = this._edgeList.get(i);
				nextDe.setEdgeDepths(Position.RIGHT, currDepth);
				currDepth = nextDe.getDepth(Position.LEFT);
			}
			return currDepth;
		}
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
		var state = this._SCANNING_FOR_INCOMING;
		for (var i = this._resultAreaEdgeList.size() - 1; i >= 0; i--) {
			var nextOut = this._resultAreaEdgeList.get(i);
			var nextIn = nextOut.getSym();
			if (firstOut === null && nextOut.getEdgeRing() === er) firstOut = nextOut;
			switch (state) {
				case this._SCANNING_FOR_INCOMING:
					if (nextIn.getEdgeRing() !== er) continue;
					incoming = nextIn;
					state = this._LINKING_TO_OUTGOING;
					break;
				case this._LINKING_TO_OUTGOING:
					if (nextOut.getEdgeRing() !== er) continue;
					incoming.setNextMin(nextOut);
					state = this._SCANNING_FOR_INCOMING;
					break;
			}
		}
		if (state === this._LINKING_TO_OUTGOING) {
			Assert.isTrue(firstOut !== null, "found null for first outgoing dirEdge");
			Assert.isTrue(firstOut.getEdgeRing() === er, "unable to link last incoming dirEdge");
			incoming.setNextMin(firstOut);
		}
	}
	getOutgoingDegree() {
		if (arguments.length === 0) {
			var degree = 0;
			for (var it = this.iterator(); it.hasNext(); ) {
				var de = it.next();
				if (de.isInResult()) degree++;
			}
			return degree;
		} else if (arguments.length === 1) {
			let er = arguments[0];
			var degree = 0;
			for (var it = this.iterator(); it.hasNext(); ) {
				var de = it.next();
				if (de.getEdgeRing() === er) degree++;
			}
			return degree;
		}
	}
	getLabel() {
		return this._label;
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
		super.computeLabelling.call(this, geom);
		this._label = new Label(Location.NONE);
		for (var it = this.iterator(); it.hasNext(); ) {
			var ee = it.next();
			var e = ee.getEdge();
			var eLabel = e.getLabel();
			for (var i = 0; i < 2; i++) {
				var eLoc = eLabel.getLocation(i);
				if (eLoc === Location.INTERIOR || eLoc === Location.BOUNDARY) this._label.setLocation(i, Location.INTERIOR);
			}
		}
	}
	getClass() {
		return DirectedEdgeStar;
	}
	get interfaces_() {
		return [];
	}
}
DirectedEdgeStar.constructor_ = function () {
	this._resultAreaEdgeList = null;
	this._label = null;
	this._SCANNING_FOR_INCOMING = 1;
	this._LINKING_TO_OUTGOING = 2;
};
