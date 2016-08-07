import OrientedCoordinateArray from '../noding/OrientedCoordinateArray';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
export default function EdgeList() {
	this.edges = new ArrayList();
	this.ocaMap = new TreeMap();
}
extend(EdgeList.prototype, {
	print: function (out) {
		out.print("MULTILINESTRING ( ");
		for (var j = 0; j < this.edges.size(); j++) {
			var e = this.edges.get(j);
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
		for (var i = 0; i < this.edges.size(); i++) {
			if (this.edges.get(i).equals(e)) return i;
		}
		return -1;
	},
	iterator: function () {
		return this.edges.iterator();
	},
	getEdges: function () {
		return this.edges;
	},
	get: function (i) {
		return this.edges.get(i);
	},
	findEqualEdge: function (e) {
		var oca = new OrientedCoordinateArray(e.getCoordinates());
		var matchEdge = this.ocaMap.get(oca);
		return matchEdge;
	},
	add: function (e) {
		this.edges.add(e);
		var oca = new OrientedCoordinateArray(e.getCoordinates());
		this.ocaMap.put(oca, e);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeList;
	}
});
