import Location from '../geom/Location';
import CGAlgorithms from '../algorithm/CGAlgorithms';
import Position from './Position';
import TopologyException from '../geom/TopologyException';
import Label from './Label';
import ArrayList from '../../../../java/util/ArrayList';
import Assert from '../util/Assert';
export default class EdgeRing {
	constructor(...args) {
		(() => {
			this.startDe = null;
			this.maxNodeDegree = -1;
			this.edges = new ArrayList();
			this.pts = new ArrayList();
			this.label = new Label(Location.NONE);
			this.ring = null;
			this._isHole = null;
			this.shell = null;
			this.holes = new ArrayList();
			this.geometryFactory = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [start, geometryFactory] = args;
						this.geometryFactory = geometryFactory;
						this.computePoints(start);
						this.computeRing();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	computeRing() {
		if (this.ring !== null) return null;
		var coord = new Array(this.pts.size());
		for (var i = 0; i < this.pts.size(); i++) {
			coord[i] = this.pts.get(i);
		}
		this.ring = this.geometryFactory.createLinearRing(coord);
		this._isHole = CGAlgorithms.isCCW(this.ring.getCoordinates());
	}
	isIsolated() {
		return this.label.getGeometryCount() === 1;
	}
	computePoints(start) {
		this.startDe = start;
		var de = start;
		var isFirstEdge = true;
		do {
			if (de === null) throw new TopologyException("Found null DirectedEdge");
			if (de.getEdgeRing() === this) throw new TopologyException("Directed Edge visited twice during ring-building at " + de.getCoordinate());
			this.edges.add(de);
			var label = de.getLabel();
			Assert.isTrue(label.isArea());
			this.mergeLabel(label);
			this.addPoints(de.getEdge(), de.isForward(), isFirstEdge);
			isFirstEdge = false;
			this.setEdgeRing(de, this);
			de = this.getNext(de);
		} while (de !== this.startDe);
	}
	getLinearRing() {
		return this.ring;
	}
	getCoordinate(i) {
		return this.pts.get(i);
	}
	computeMaxNodeDegree() {
		this.maxNodeDegree = 0;
		var de = this.startDe;
		do {
			var node = de.getNode();
			var degree = node.getEdges().getOutgoingDegree(this);
			if (degree > this.maxNodeDegree) this.maxNodeDegree = degree;
			de = this.getNext(de);
		} while (de !== this.startDe);
		this.maxNodeDegree *= 2;
	}
	addPoints(edge, isForward, isFirstEdge) {
		var edgePts = edge.getCoordinates();
		if (isForward) {
			var startIndex = 1;
			if (isFirstEdge) startIndex = 0;
			for (var i = startIndex; i < edgePts.length; i++) {
				this.pts.add(edgePts[i]);
			}
		} else {
			var startIndex = edgePts.length - 2;
			if (isFirstEdge) startIndex = edgePts.length - 1;
			for (var i = startIndex; i >= 0; i--) {
				this.pts.add(edgePts[i]);
			}
		}
	}
	isHole() {
		return this._isHole;
	}
	setInResult() {
		var de = this.startDe;
		do {
			de.getEdge().setInResult(true);
			de = de.getNext();
		} while (de !== this.startDe);
	}
	containsPoint(p) {
		var shell = this.getLinearRing();
		var env = shell.getEnvelopeInternal();
		if (!env.contains(p)) return false;
		if (!CGAlgorithms.isPointInRing(p, shell.getCoordinates())) return false;
		for (var i = this.holes.iterator(); i.hasNext(); ) {
			var hole = i.next();
			if (hole.containsPoint(p)) return false;
		}
		return true;
	}
	addHole(ring) {
		this.holes.add(ring);
	}
	isShell() {
		return this.shell === null;
	}
	getLabel() {
		return this.label;
	}
	getEdges() {
		return this.edges;
	}
	getMaxNodeDegree() {
		if (this.maxNodeDegree < 0) this.computeMaxNodeDegree();
		return this.maxNodeDegree;
	}
	getShell() {
		return this.shell;
	}
	mergeLabel(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [deLabel] = args;
						this.mergeLabel(deLabel, 0);
						this.mergeLabel(deLabel, 1);
					})(...args);
				case 2:
					return ((...args) => {
						let [deLabel, geomIndex] = args;
						var loc = deLabel.getLocation(geomIndex, Position.RIGHT);
						if (loc === Location.NONE) return null;
						if (this.label.getLocation(geomIndex) === Location.NONE) {
							this.label.setLocation(geomIndex, loc);
							return null;
						}
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	setShell(shell) {
		this.shell = shell;
		if (shell !== null) shell.addHole(this);
	}
	toPolygon(geometryFactory) {
		var holeLR = new Array(this.holes.size());
		for (var i = 0; i < this.holes.size(); i++) {
			holeLR[i] = this.holes.get(i).getLinearRing();
		}
		var poly = geometryFactory.createPolygon(this.getLinearRing(), holeLR);
		return poly;
	}
	getClass() {
		return EdgeRing;
	}
}

