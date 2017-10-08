import OrientedCoordinateArray from '../noding/OrientedCoordinateArray';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
export default function EdgeList() {
	this._edges = new ArrayList();
	this._ocaMap = new TreeMap();
}
extend(EdgeList.prototype, {
	print: function (out) {
		out.print("MULTILINESTRING ( ");
		for (var j = 0; j < this._edges.size(); j++) {
			var e = this._edges.get(j);
			if (j > 0) out.print(",");
			out.print("(");
			var pts = e.getCoordinates();
			for (var i = 0; i < pts.length; i++) {
				if (i > 0) out.print(",");
				out.print(pts[i].x + " " + pts[i].y);
			}
			out.println(")");
		}
		out.print(")  ");
	},
	addAll: function (edgeColl) {
		for (var i = edgeColl.iterator(); i.hasNext(); ) {
			this.add(i.next());
		}
	},
	findEdgeIndex: function (e) {
		for (var i = 0; i < this._edges.size(); i++) {
			if (this._edges.get(i).equals(e)) return i;
		}
		return -1;
	},
	iterator: function () {
		return this._edges.iterator();
	},
	getEdges: function () {
		return this._edges;
	},
	get: function (i) {
		return this._edges.get(i);
	},
	findEqualEdge: function (e) {
		var oca = new OrientedCoordinateArray(e.getCoordinates());
		var matchEdge = this._ocaMap.get(oca);
		return matchEdge;
	},
	add: function (e) {
		this._edges.add(e);
		var oca = new OrientedCoordinateArray(e.getCoordinates());
		this._ocaMap.put(oca, e);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeList;
	}
});
