import LineString from '../geom/LineString';
import CoordinateList from '../geom/CoordinateList';
import Geometry from '../geom/Geometry';
import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import Stack from '../../../../java/util/Stack';
import extend from '../../../../extend';
import MarkHalfEdge from '../edgegraph/MarkHalfEdge';
import DissolveEdgeGraph from './DissolveEdgeGraph';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
import ArrayList from '../../../../java/util/ArrayList';
export default function LineDissolver() {
	this._result = null;
	this._factory = null;
	this._graph = null;
	this._lines = new ArrayList();
	this._nodeEdgeStack = new Stack();
	this._ringStartEdge = null;
	this._graph = new DissolveEdgeGraph();
}
extend(LineDissolver.prototype, {
	addLine: function (line) {
		this._lines.add(this._factory.createLineString(line.toCoordinateArray()));
	},
	updateRingStartEdge: function (e) {
		if (!e.isStart()) {
			e = e.sym();
			if (!e.isStart()) return null;
		}
		if (this._ringStartEdge === null) {
			this._ringStartEdge = e;
			return null;
		}
		if (e.orig().compareTo(this._ringStartEdge.orig()) < 0) {
			this._ringStartEdge = e;
		}
	},
	getResult: function () {
		if (this._result === null) this.computeResult();
		return this._result;
	},
	process: function (e) {
		var eNode = e.prevNode();
		if (eNode === null) eNode = e;
		this.stackEdges(eNode);
		this.buildLines();
	},
	buildRing: function (eStartRing) {
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
	},
	buildLine: function (eStart) {
		var line = new CoordinateList();
		var e = eStart;
		this._ringStartEdge = null;
		MarkHalfEdge.markBoth(e);
		line.add(e.orig().copy(), false);
		while (e.sym().degree() === 2) {
			this.updateRingStartEdge(e);
			var eNext = e.next();
			if (eNext === eStart) {
				this.buildRing(this._ringStartEdge);
				return null;
			}
			line.add(eNext.orig().copy(), false);
			e = eNext;
			MarkHalfEdge.markBoth(e);
		}
		line.add(e.dest().clone(), false);
		this.stackEdges(e.sym());
		this.addLine(line);
	},
	stackEdges: function (node) {
		var e = node;
		do {
			if (!MarkHalfEdge.isMarked(e)) this._nodeEdgeStack.add(e);
			e = e.oNext();
		} while (e !== node);
	},
	computeResult: function () {
		var edges = this._graph.getVertexEdges();
		for (var i = edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			if (MarkHalfEdge.isMarked(e)) continue;
			this.process(e);
		}
		this._result = this._factory.buildGeometry(this._lines);
	},
	buildLines: function () {
		while (!this._nodeEdgeStack.empty()) {
			var e = this._nodeEdgeStack.pop();
			if (MarkHalfEdge.isMarked(e)) continue;
			this.buildLine(e);
		}
	},
	add: function () {
		if (arguments[0] instanceof Geometry) {
			let geometry = arguments[0];
			geometry.apply({
				interfaces_: function () {
					return [GeometryComponentFilter];
				},
				filter: function (component) {
					if (component instanceof LineString) {
						this.add(component);
					}
				}
			});
		} else if (hasInterface(arguments[0], Collection)) {
			let geometries = arguments[0];
			for (var i = geometries.iterator(); i.hasNext(); ) {
				var geometry = i.next();
				this.add(geometry);
			}
		} else if (arguments[0] instanceof LineString) {
			let lineString = arguments[0];
			if (this._factory === null) {
				this._factory = lineString.getFactory();
			}
			var seq = lineString.getCoordinateSequence();
			var doneStart = false;
			for (var i = 1; i < seq.size(); i++) {
				var e = this._graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i));
				if (e === null) continue;
				if (!doneStart) {
					e.setStart();
					doneStart = true;
				}
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineDissolver;
	}
});
LineDissolver.dissolve = function (g) {
	var d = new LineDissolver();
	d.add(g);
	return d.getResult();
};
