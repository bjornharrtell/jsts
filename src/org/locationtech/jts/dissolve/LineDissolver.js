import LineString from '../geom/LineString';
import CoordinateList from '../geom/CoordinateList';
import Geometry from '../geom/Geometry';
import Collection from '../../../../java/util/Collection';
import Stack from '../../../../java/util/Stack';
import MarkHalfEdge from '../edgegraph/MarkHalfEdge';
import DissolveEdgeGraph from './DissolveEdgeGraph';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
import ArrayList from '../../../../java/util/ArrayList';
export default class LineDissolver {
	constructor(...args) {
		this.result = null;
		this.factory = null;
		this.graph = null;
		this.lines = new ArrayList();
		this.nodeEdgeStack = new Stack();
		this.ringStartEdge = null;
		switch (args.length) {
			case 0:
				{
					let [] = args;
					this.graph = new DissolveEdgeGraph();
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	static dissolve(g) {
		var d = new LineDissolver();
		d.add(g);
		return d.getResult();
	}
	addLine(line) {
		this.lines.add(this.factory.createLineString(line.toCoordinateArray()));
	}
	updateRingStartEdge(e) {
		if (!e.isStart()) {
			e = e.sym();
			if (!e.isStart()) return null;
		}
		if (this.ringStartEdge === null) {
			this.ringStartEdge = e;
			return null;
		}
		if (e.orig().compareTo(this.ringStartEdge.orig()) < 0) {
			this.ringStartEdge = e;
		}
	}
	getResult() {
		if (this.result === null) this.computeResult();
		return this.result;
	}
	process(e) {
		var eNode = e.prevNode();
		if (eNode === null) eNode = e;
		this.stackEdges(eNode);
		this.buildLines();
	}
	buildRing(eStartRing) {
		var line = new CoordinateList();
		var e = eStartRing;
		line.add(e.orig().copy(), false);
		while (e.sym().degree() === 2) {
			var eNext = e.next();
			if (eNext === eStartRing) break;
			line.add(eNext.orig().copy(), false);
			e = eNext;
		}
		line.add(e.dest().copy(), false);
		this.addLine(line);
	}
	buildLine(eStart) {
		var line = new CoordinateList();
		var e = eStart;
		this.ringStartEdge = null;
		MarkHalfEdge.markBoth(e);
		line.add(e.orig().copy(), false);
		while (e.sym().degree() === 2) {
			this.updateRingStartEdge(e);
			var eNext = e.next();
			if (eNext === eStart) {
				this.buildRing(this.ringStartEdge);
				return null;
			}
			line.add(eNext.orig().copy(), false);
			e = eNext;
			MarkHalfEdge.markBoth(e);
		}
		line.add(e.dest().copy(), false);
		this.stackEdges(e.sym());
		this.addLine(line);
	}
	stackEdges(node) {
		var e = node;
		do {
			if (!MarkHalfEdge.isMarked(e)) this.nodeEdgeStack.add(e);
			e = e.oNext();
		} while (e !== node);
	}
	computeResult() {
		var edges = this.graph.getVertexEdges();
		for (var i = edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			if (MarkHalfEdge.isMarked(e)) continue;
			this.process(e);
		}
		this.result = this.factory.buildGeometry(this.lines);
	}
	buildLines() {
		while (!this.nodeEdgeStack.empty()) {
			var e = this.nodeEdgeStack.pop();
			if (MarkHalfEdge.isMarked(e)) continue;
			this.buildLine(e);
		}
	}
	add(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Geometry) {
					let [geometry] = args;
					geometry.apply(new (class {
						filter(component) {
							if (component instanceof LineString) {
								this.add(component);
							}
						}
						get interfaces_() {
							return [GeometryComponentFilter];
						}
					})());
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
					let [geometries] = args;
					for (var i = geometries.iterator(); i.hasNext(); ) {
						var geometry = i.next();
						this.add(geometry);
					}
				} else if (args[0] instanceof LineString) {
					let [lineString] = args;
					if (this.factory === null) {
						this.factory = lineString.getFactory();
					}
					var seq = lineString.getCoordinateSequence();
					var doneStart = false;
					for (var i = 1; i < seq.size(); i++) {
						var e = this.graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i));
						if (e === null) continue;
						if (!doneStart) {
							e.setStart();
							doneStart = true;
						}
					}
				}
				break;
		}
	}
	getClass() {
		return LineDissolver;
	}
}

