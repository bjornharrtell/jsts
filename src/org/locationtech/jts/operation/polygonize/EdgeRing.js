import CoordinateList from '../../geom/CoordinateList';
import WKTWriter from '../../io/WKTWriter';
import CoordinateArraySequence from '../../geom/impl/CoordinateArraySequence';
import PointLocation from '../../algorithm/PointLocation';
import LinearRing from '../../geom/LinearRing';
import Exception from '../../../../../java/lang/Exception';
import Orientation from '../../algorithm/Orientation';
import System from '../../../../../java/lang/System';
import CoordinateArrays from '../../geom/CoordinateArrays';
import ArrayList from '../../../../../java/util/ArrayList';
import Comparator from '../../../../../java/util/Comparator';
import Assert from '../../util/Assert';
export default class EdgeRing {
	constructor() {
		EdgeRing.constructor_.apply(this, arguments);
	}
	static findDirEdgesInRing(startDE) {
		var de = startDE;
		var edges = new ArrayList();
		do {
			edges.add(de);
			de = de.getNext();
			Assert.isTrue(de !== null, "found null DE in ring");
			Assert.isTrue(de === startDE || !de.isInRing(), "found DE already in ring");
		} while (de !== startDE);
		return edges;
	}
	static addEdge(coords, isForward, coordList) {
		if (isForward) {
			for (var i = 0; i < coords.length; i++) {
				coordList.add(coords[i], false);
			}
		} else {
			for (var i = coords.length - 1; i >= 0; i--) {
				coordList.add(coords[i], false);
			}
		}
	}
	static findEdgeRingContaining(testEr, shellList) {
		var testRing = testEr.getRing();
		var testEnv = testRing.getEnvelopeInternal();
		var testPt = testRing.getCoordinateN(0);
		var minShell = null;
		var minShellEnv = null;
		for (var it = shellList.iterator(); it.hasNext(); ) {
			var tryShell = it.next();
			var tryShellRing = tryShell.getRing();
			var tryShellEnv = tryShellRing.getEnvelopeInternal();
			if (tryShellEnv.equals(testEnv)) continue;
			if (!tryShellEnv.contains(testEnv)) continue;
			testPt = CoordinateArrays.ptNotInList(testRing.getCoordinates(), tryShellRing.getCoordinates());
			var isContained = false;
			if (PointLocation.isInRing(testPt, tryShellRing.getCoordinates())) isContained = true;
			if (isContained) {
				if (minShell === null || minShellEnv.contains(tryShellEnv)) {
					minShell = tryShell;
					minShellEnv = minShell.getRing().getEnvelopeInternal();
				}
			}
		}
		return minShell;
	}
	isIncluded() {
		return this._isIncluded;
	}
	getCoordinates() {
		if (this._ringPts === null) {
			var coordList = new CoordinateList();
			for (var i = this._deList.iterator(); i.hasNext(); ) {
				var de = i.next();
				var edge = de.getEdge();
				EdgeRing.addEdge(edge.getLine().getCoordinates(), de.getEdgeDirection(), coordList);
			}
			this._ringPts = coordList.toCoordinateArray();
		}
		return this._ringPts;
	}
	isIncludedSet() {
		return this._isIncludedSet;
	}
	isValid() {
		this.getCoordinates();
		if (this._ringPts.length <= 3) return false;
		this.getRing();
		return this._ring.isValid();
	}
	build(startDE) {
		var de = startDE;
		do {
			this.add(de);
			de.setRing(this);
			de = de.getNext();
			Assert.isTrue(de !== null, "found null DE in ring");
			Assert.isTrue(de === startDE || !de.isInRing(), "found DE already in ring");
		} while (de !== startDE);
	}
	isOuterHole() {
		if (!this._isHole) return false;
		return !this.hasShell();
	}
	getPolygon() {
		var holeLR = null;
		if (this._holes !== null) {
			holeLR = new Array(this._holes.size()).fill(null);
			for (var i = 0; i < this._holes.size(); i++) {
				holeLR[i] = this._holes.get(i);
			}
		}
		var poly = this._factory.createPolygon(this._ring, holeLR);
		return poly;
	}
	isHole() {
		return this._isHole;
	}
	isProcessed() {
		return this._isProcessed;
	}
	addHole() {
		if (arguments[0] instanceof LinearRing) {
			let hole = arguments[0];
			if (this._holes === null) this._holes = new ArrayList();
			this._holes.add(hole);
		} else if (arguments[0] instanceof EdgeRing) {
			let holeER = arguments[0];
			holeER.setShell(this);
			var hole = holeER.getRing();
			if (this._holes === null) this._holes = new ArrayList();
			this._holes.add(hole);
		}
	}
	setIncluded(isIncluded) {
		this._isIncluded = isIncluded;
		this._isIncludedSet = true;
	}
	getOuterHole() {
		if (this.isHole()) return null;
		for (var i = 0; i < this._deList.size(); i++) {
			var de = this._deList.get(i);
			var adjRing = de.getSym().getRing();
			if (adjRing.isOuterHole()) return adjRing;
		}
		return null;
	}
	computeHole() {
		var ring = this.getRing();
		this._isHole = Orientation.isCCW(ring.getCoordinates());
	}
	hasShell() {
		return this._shell !== null;
	}
	isOuterShell() {
		return this.getOuterHole() !== null;
	}
	getLineString() {
		this.getCoordinates();
		return this._factory.createLineString(this._ringPts);
	}
	toString() {
		return WKTWriter.toLineString(new CoordinateArraySequence(this.getCoordinates()));
	}
	getShell() {
		if (this.isHole()) return this._shell;
		return this;
	}
	add(de) {
		this._deList.add(de);
	}
	getRing() {
		if (this._ring !== null) return this._ring;
		this.getCoordinates();
		if (this._ringPts.length < 3) System.out.println(this._ringPts);
		try {
			this._ring = this._factory.createLinearRing(this._ringPts);
		} catch (ex) {
			if (ex instanceof Exception) {
				System.out.println(this._ringPts);
			} else throw ex;
		} finally {}
		return this._ring;
	}
	updateIncluded() {
		if (this.isHole()) return null;
		for (var i = 0; i < this._deList.size(); i++) {
			var de = this._deList.get(i);
			var adjShell = de.getSym().getRing().getShell();
			if (adjShell !== null && adjShell.isIncludedSet()) {
				this.setIncluded(!adjShell.isIncluded());
				return null;
			}
		}
	}
	setShell(shell) {
		this._shell = shell;
	}
	setProcessed(isProcessed) {
		this._isProcessed = isProcessed;
	}
	getClass() {
		return EdgeRing;
	}
	get interfaces_() {
		return [];
	}
}
class EnvelopeComparator {
	constructor() {
		EnvelopeComparator.constructor_.apply(this, arguments);
	}
	compare(obj0, obj1) {
		var r0 = obj0;
		var r1 = obj1;
		return r0.getRing().getEnvelope().compareTo(r1.getRing().getEnvelope());
	}
	getClass() {
		return EnvelopeComparator;
	}
	get interfaces_() {
		return [Comparator];
	}
}
EnvelopeComparator.constructor_ = function () {};
EdgeRing.EnvelopeComparator = EnvelopeComparator;
EdgeRing.constructor_ = function () {
	this._factory = null;
	this._deList = new ArrayList();
	this._lowestEdge = null;
	this._ring = null;
	this._ringPts = null;
	this._holes = null;
	this._shell = null;
	this._isHole = null;
	this._isProcessed = false;
	this._isIncludedSet = false;
	this._isIncluded = false;
	let factory = arguments[0];
	this._factory = factory;
};
