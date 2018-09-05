import Collections from '../../../../java/util/Collections';
import DirectedEdge from './DirectedEdge';
import ArrayList from '../../../../java/util/ArrayList';
import Edge from './Edge';
export default class DirectedEdgeStar {
	constructor() {
		DirectedEdgeStar.constructor_.apply(this, arguments);
	}
	getNextEdge(dirEdge) {
		var i = this.getIndex(dirEdge);
		return this._outEdges.get(this.getIndex(i + 1));
	}
	getCoordinate() {
		var it = this.iterator();
		if (!it.hasNext()) return null;
		var e = it.next();
		return e.getCoordinate();
	}
	iterator() {
		this.sortEdges();
		return this._outEdges.iterator();
	}
	sortEdges() {
		if (!this._sorted) {
			Collections.sort(this._outEdges);
			this._sorted = true;
		}
	}
	remove(de) {
		this._outEdges.remove(de);
	}
	getEdges() {
		this.sortEdges();
		return this._outEdges;
	}
	getNextCWEdge(dirEdge) {
		var i = this.getIndex(dirEdge);
		return this._outEdges.get(this.getIndex(i - 1));
	}
	getIndex() {
		if (arguments[0] instanceof Edge) {
			let edge = arguments[0];
			this.sortEdges();
			for (var i = 0; i < this._outEdges.size(); i++) {
				var de = this._outEdges.get(i);
				if (de.getEdge() === edge) return i;
			}
			return -1;
		} else if (arguments[0] instanceof DirectedEdge) {
			let dirEdge = arguments[0];
			this.sortEdges();
			for (var i = 0; i < this._outEdges.size(); i++) {
				var de = this._outEdges.get(i);
				if (de === dirEdge) return i;
			}
			return -1;
		} else if (Number.isInteger(arguments[0])) {
			let i = arguments[0];
			var modi = i % this._outEdges.size();
			if (modi < 0) modi += this._outEdges.size();
			return modi;
		}
	}
	add(de) {
		this._outEdges.add(de);
		this._sorted = false;
	}
	getDegree() {
		return this._outEdges.size();
	}
	getClass() {
		return DirectedEdgeStar;
	}
	get interfaces_() {
		return [];
	}
}
DirectedEdgeStar.constructor_ = function () {
	this._outEdges = new ArrayList();
	this._sorted = false;
};
