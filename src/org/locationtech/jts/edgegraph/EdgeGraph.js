import HashMap from '../../../../java/util/HashMap';
import HalfEdge from './HalfEdge';
export default class EdgeGraph {
	constructor() {
		EdgeGraph.constructor_.apply(this, arguments);
	}
	static isValidEdge(orig, dest) {
		var cmp = dest.compareTo(orig);
		return cmp !== 0;
	}
	insert(orig, dest, eAdj) {
		var e = this.create(orig, dest);
		if (eAdj !== null) {
			eAdj.insert(e);
		} else {
			this._vertexMap.put(orig, e);
		}
		var eAdjDest = this._vertexMap.get(dest);
		if (eAdjDest !== null) {
			eAdjDest.insert(e.sym());
		} else {
			this._vertexMap.put(dest, e.sym());
		}
		return e;
	}
	create(p0, p1) {
		var e0 = this.createEdge(p0);
		var e1 = this.createEdge(p1);
		HalfEdge.init(e0, e1);
		return e0;
	}
	createEdge(orig) {
		return new HalfEdge(orig);
	}
	addEdge(orig, dest) {
		if (!EdgeGraph.isValidEdge(orig, dest)) return null;
		var eAdj = this._vertexMap.get(orig);
		var eSame = null;
		if (eAdj !== null) {
			eSame = eAdj.find(dest);
		}
		if (eSame !== null) {
			return eSame;
		}
		var e = this.insert(orig, dest, eAdj);
		return e;
	}
	getVertexEdges() {
		return this._vertexMap.values();
	}
	findEdge(orig, dest) {
		var e = this._vertexMap.get(orig);
		if (e === null) return null;
		return e.find(dest);
	}
	getClass() {
		return EdgeGraph;
	}
	get interfaces_() {
		return [];
	}
}
EdgeGraph.constructor_ = function () {
	this._vertexMap = new HashMap();
};
