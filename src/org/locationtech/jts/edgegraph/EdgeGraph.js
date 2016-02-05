import HashMap from '../../../../java/util/HashMap';
import HalfEdge from './HalfEdge';
export default class EdgeGraph {
	constructor(...args) {
		(() => {
			this.vertexMap = new HashMap();
		})();
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
	static isValidEdge(orig, dest) {
		var cmp = dest.compareTo(orig);
		return cmp !== 0;
	}
	insert(orig, dest, eAdj) {
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
	}
	getVertexEdges() {
		return this.vertexMap.values();
	}
	findEdge(orig, dest) {
		var e = this.vertexMap.get(orig);
		if (e === null) return null;
		return e.find(dest);
	}
	getClass() {
		return EdgeGraph;
	}
}

