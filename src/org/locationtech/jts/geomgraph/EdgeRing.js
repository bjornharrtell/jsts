import Location from '../geom/Location';
import Position from './Position';
import PointLocation from '../algorithm/PointLocation';
import TopologyException from '../geom/TopologyException';
import extend from '../../../../extend';
import Orientation from '../algorithm/Orientation';
import Label from './Label';
import ArrayList from '../../../../java/util/ArrayList';
import Assert from '../util/Assert';
export default function EdgeRing() {
	this._startDe = null;
	this._maxNodeDegree = -1;
	this._edges = new ArrayList();
	this._pts = new ArrayList();
	this._label = new Label(Location.NONE);
	this._ring = null;
	this._isHole = null;
	this._shell = null;
	this._holes = new ArrayList();
	this._geometryFactory = null;
	let start = arguments[0], geometryFactory = arguments[1];
	this._geometryFactory = geometryFactory;
	this.computePoints(start);
	this.computeRing();
}
extend(EdgeRing.prototype, {
	computeRing: function () {
		if (this._ring !== null) return null;
		var coord = new Array(this._pts.size()).fill(null);
		for (var i = 0; i < this._pts.size(); i++) {
			coord[i] = this._pts.get(i);
		}
		this._ring = this._geometryFactory.createLinearRing(coord);
		this._isHole = Orientation.isCCW(this._ring.getCoordinates());
	},
	isIsolated: function () {
		return this._label.getGeometryCount() === 1;
	},
	computePoints: function (start) {
		this._startDe = start;
		var de = start;
		var isFirstEdge = true;
		do {
			if (de === null) throw new TopologyException("Found null DirectedEdge");
			if (de.getEdgeRing() === this) throw new TopologyException("Directed Edge visited twice during ring-building at " + de.getCoordinate());
			this._edges.add(de);
			var label = de.getLabel();
			Assert.isTrue(label.isArea());
			this.mergeLabel(label);
			this.addPoints(de.getEdge(), de.isForward(), isFirstEdge);
			isFirstEdge = false;
			this.setEdgeRing(de, this);
			de = this.getNext(de);
		} while (de !== this._startDe);
	},
	getLinearRing: function () {
		return this._ring;
	},
	getCoordinate: function (i) {
		return this._pts.get(i);
	},
	computeMaxNodeDegree: function () {
		this._maxNodeDegree = 0;
		var de = this._startDe;
		do {
			var node = de.getNode();
			var degree = node.getEdges().getOutgoingDegree(this);
			if (degree > this._maxNodeDegree) this._maxNodeDegree = degree;
			de = this.getNext(de);
		} while (de !== this._startDe);
		this._maxNodeDegree *= 2;
	},
	addPoints: function (edge, isForward, isFirstEdge) {
		var edgePts = edge.getCoordinates();
		if (isForward) {
			var startIndex = 1;
			if (isFirstEdge) startIndex = 0;
			for (var i = startIndex; i < edgePts.length; i++) {
				this._pts.add(edgePts[i]);
			}
		} else {
			var startIndex = edgePts.length - 2;
			if (isFirstEdge) startIndex = edgePts.length - 1;
			for (var i = startIndex; i >= 0; i--) {
				this._pts.add(edgePts[i]);
			}
		}
	},
	isHole: function () {
		return this._isHole;
	},
	setInResult: function () {
		var de = this._startDe;
		do {
			de.getEdge().setInResult(true);
			de = de.getNext();
		} while (de !== this._startDe);
	},
	containsPoint: function (p) {
		var shell = this.getLinearRing();
		var env = shell.getEnvelopeInternal();
		if (!env.contains(p)) return false;
		if (!PointLocation.isInRing(p, shell.getCoordinates())) return false;
		for (var i = this._holes.iterator(); i.hasNext(); ) {
			var hole = i.next();
			if (hole.containsPoint(p)) return false;
		}
		return true;
	},
	addHole: function (ring) {
		this._holes.add(ring);
	},
	isShell: function () {
		return this._shell === null;
	},
	getLabel: function () {
		return this._label;
	},
	getEdges: function () {
		return this._edges;
	},
	getMaxNodeDegree: function () {
		if (this._maxNodeDegree < 0) this.computeMaxNodeDegree();
		return this._maxNodeDegree;
	},
	getShell: function () {
		return this._shell;
	},
	mergeLabel: function () {
		if (arguments.length === 1) {
			let deLabel = arguments[0];
			this.mergeLabel(deLabel, 0);
			this.mergeLabel(deLabel, 1);
		} else if (arguments.length === 2) {
			let deLabel = arguments[0], geomIndex = arguments[1];
			var loc = deLabel.getLocation(geomIndex, Position.RIGHT);
			if (loc === Location.NONE) return null;
			if (this._label.getLocation(geomIndex) === Location.NONE) {
				this._label.setLocation(geomIndex, loc);
				return null;
			}
		}
	},
	setShell: function (shell) {
		this._shell = shell;
		if (shell !== null) shell.addHole(this);
	},
	toPolygon: function (geometryFactory) {
		var holeLR = new Array(this._holes.size()).fill(null);
		for (var i = 0; i < this._holes.size(); i++) {
			holeLR[i] = this._holes.get(i).getLinearRing();
		}
		var poly = geometryFactory.createPolygon(this.getLinearRing(), holeLR);
		return poly;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeRing;
	}
});
