import HashMap from '../../../../java/util/HashMap';
import extend from '../../../../extend';
import HalfEdge from './HalfEdge';
export default function EdgeGraph() {
	this.vertexMap = new HashMap();
}
extend(EdgeGraph.prototype, {
	insert: function (orig, dest, eAdj) {
		var e = this.create(orig, dest);
		if (eAdj !== null) {
			eAdj.insert(e);
		} else {
			this.vertexMap.put(orig, e);
		}
		var eAdjDest = this.vertexMap.get(dest);
		if (eAdjDest !== null) {
			eAdjDest.insert(e.sym());
		} else {
			this.vertexMap.put(dest, e.sym());
		}
		return e;
	},
	create: function (p0, p1) {
		var e0 = this.createEdge(p0);
		var e1 = this.createEdge(p1);
		HalfEdge.init(e0, e1);
		return e0;
	},
	createEdge: function (orig) {
		return new HalfEdge(orig);
	},
	addEdge: function (orig, dest) {
		if (!EdgeGraph.isValidEdge(orig, dest)) return null;
		var eAdj = this.vertexMap.get(orig);
		var eSame = null;
		if (eAdj !== null) {
			eSame = eAdj.find(dest);
		}
		if (eSame !== null) {
			return eSame;
		}
		var e = this.insert(orig, dest, eAdj);
		return e;
	},
	getVertexEdges: function () {
		return this.vertexMap.values();
	},
	findEdge: function (orig, dest) {
		var e = this.vertexMap.get(orig);
		if (e === null) return null;
		return e.find(dest);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeGraph;
	}
});
EdgeGraph.isValidEdge = function (orig, dest) {
	var cmp = dest.compareTo(orig);
	return cmp !== 0;
};

