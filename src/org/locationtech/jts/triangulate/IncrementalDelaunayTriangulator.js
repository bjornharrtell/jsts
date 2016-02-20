import QuadEdge from './quadedge/QuadEdge';
import extend from '../../../../extend';
export default function IncrementalDelaunayTriangulator() {
	this.subdiv = null;
	this.isUsingTolerance = false;
	let subdiv = arguments[0];
	this.subdiv = subdiv;
	this.isUsingTolerance = subdiv.getTolerance() > 0.0;
}
extend(IncrementalDelaunayTriangulator.prototype, {
	insertSite: function (v) {
		var e = this.subdiv.locate(v);
		if (this.subdiv.isVertexOfEdge(e, v)) {
			return e;
		} else if (this.subdiv.isOnEdge(e, v.getCoordinate())) {
			e = e.oPrev();
			this.subdiv.delete(e.oNext());
		}
		var base = this.subdiv.makeEdge(e.orig(), v);
		QuadEdge.splice(base, e);
		var startEdge = base;
		do {
			base = this.subdiv.connect(e, base.sym());
			e = base.oPrev();
		} while (e.lNext() !== startEdge);
		do {
			var t = e.oPrev();
			if (t.dest().rightOf(e) && v.isInCircle(e.orig(), t.dest(), e.dest())) {
				QuadEdge.swap(e);
				e = e.oPrev();
			} else if (e.oNext() === startEdge) {
				return base;
			} else {
				e = e.oNext().lPrev();
			}
		} while (true);
	},
	insertSites: function (vertices) {
		for (var i = vertices.iterator(); i.hasNext(); ) {
			var v = i.next();
			this.insertSite(v);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IncrementalDelaunayTriangulator;
	}
});

