import QuadEdge from './QuadEdge';
import CGAlgorithms from '../../algorithm/CGAlgorithms';
import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import Vertex from './Vertex';
import ArrayList from '../../../../../java/util/ArrayList';
import TriangleVisitor from './TriangleVisitor';
export default function QuadEdgeTriangle() {
	this.edge = null;
	this.data = null;
	let edge = arguments[0];
	this.edge = edge.clone();
	for (var i = 0; i < 3; i++) {
		edge[i].setData(this);
	}
}
extend(QuadEdgeTriangle.prototype, {
	getCoordinates: function () {
		var pts = new Array(4).fill(null);
		for (var i = 0; i < 3; i++) {
			pts[i] = this.edge[i].orig().getCoordinate();
		}
		pts[3] = new Coordinate(pts[0]);
		return pts;
	},
	getVertex: function (i) {
		return this.edge[i].orig();
	},
	isBorder: function () {
		if (arguments.length === 0) {
			for (var i = 0; i < 3; i++) {
				if (this.getAdjacentTriangleAcrossEdge(i) === null) return true;
			}
			return false;
		} else if (arguments.length === 1) {
			let i = arguments[0];
			return this.getAdjacentTriangleAcrossEdge(i) === null;
		}
	},
	getEdgeIndex: function () {
		if (arguments[0] instanceof QuadEdge) {
			let e = arguments[0];
			for (var i = 0; i < 3; i++) {
				if (this.edge[i] === e) return i;
			}
			return -1;
		} else if (arguments[0] instanceof Vertex) {
			let v = arguments[0];
			for (var i = 0; i < 3; i++) {
				if (this.edge[i].orig() === v) return i;
			}
			return -1;
		}
	},
	getGeometry: function (fact) {
		var ring = fact.createLinearRing(this.getCoordinates());
		var tri = fact.createPolygon(ring, null);
		return tri;
	},
	getCoordinate: function (i) {
		return this.edge[i].orig().getCoordinate();
	},
	getTrianglesAdjacentToVertex: function (vertexIndex) {
		var adjTris = new ArrayList();
		var start = this.getEdge(vertexIndex);
		var qe = start;
		do {
			var adjTri = qe.getData();
			if (adjTri !== null) {
				adjTris.add(adjTri);
			}
			qe = qe.oNext();
		} while (qe !== start);
		return adjTris;
	},
	getNeighbours: function () {
		var neigh = new Array(3).fill(null);
		for (var i = 0; i < 3; i++) {
			neigh[i] = this.getEdge(i).sym().getData();
		}
		return neigh;
	},
	getAdjacentTriangleAcrossEdge: function (edgeIndex) {
		return this.getEdge(edgeIndex).sym().getData();
	},
	setData: function (data) {
		this.data = data;
	},
	getData: function () {
		return this.data;
	},
	getAdjacentTriangleEdgeIndex: function (i) {
		return this.getAdjacentTriangleAcrossEdge(i).getEdgeIndex(this.getEdge(i).sym());
	},
	getVertices: function () {
		var vert = new Array(3).fill(null);
		for (var i = 0; i < 3; i++) {
			vert[i] = this.getVertex(i);
		}
		return vert;
	},
	getEdges: function () {
		return this.edge;
	},
	getEdge: function (i) {
		return this.edge[i];
	},
	toString: function () {
		return this.getGeometry(new GeometryFactory()).toString();
	},
	isLive: function () {
		return this.edge !== null;
	},
	kill: function () {
		this.edge = null;
	},
	contains: function (pt) {
		var ring = this.getCoordinates();
		return CGAlgorithms.isPointInRing(pt, ring);
	},
	getEdgeSegment: function (i, seg) {
		seg.p0 = this.edge[i].orig().getCoordinate();
		var nexti = (i + 1) % 3;
		seg.p1 = this.edge[nexti].orig().getCoordinate();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return QuadEdgeTriangle;
	}
});
QuadEdgeTriangle.toPolygon = function () {
	if (arguments[0] instanceof Array) {
		let v = arguments[0];
		var ringPts = [v[0].getCoordinate(), v[1].getCoordinate(), v[2].getCoordinate(), v[0].getCoordinate()];
		var fact = new GeometryFactory();
		var ring = fact.createLinearRing(ringPts);
		var tri = fact.createPolygon(ring, null);
		return tri;
	} else if (arguments[0] instanceof Array) {
		let e = arguments[0];
		var ringPts = [e[0].orig().getCoordinate(), e[1].orig().getCoordinate(), e[2].orig().getCoordinate(), e[0].orig().getCoordinate()];
		var fact = new GeometryFactory();
		var ring = fact.createLinearRing(ringPts);
		var tri = fact.createPolygon(ring, null);
		return tri;
	}
};
QuadEdgeTriangle.nextIndex = function (index) {
	return index = (index + 1) % 3;
};
QuadEdgeTriangle.contains = function () {
	if (arguments[0] instanceof Array && arguments[1] instanceof Coordinate) {
		let tri = arguments[0], pt = arguments[1];
		var ring = [tri[0].getCoordinate(), tri[1].getCoordinate(), tri[2].getCoordinate(), tri[0].getCoordinate()];
		return CGAlgorithms.isPointInRing(pt, ring);
	} else if (arguments[0] instanceof Array && arguments[1] instanceof Coordinate) {
		let tri = arguments[0], pt = arguments[1];
		var ring = [tri[0].orig().getCoordinate(), tri[1].orig().getCoordinate(), tri[2].orig().getCoordinate(), tri[0].orig().getCoordinate()];
		return CGAlgorithms.isPointInRing(pt, ring);
	}
};
QuadEdgeTriangle.createOn = function (subdiv) {
	var visitor = new QuadEdgeTriangleBuilderVisitor();
	subdiv.visitTriangles(visitor, false);
	return visitor.getTriangles();
};
function QuadEdgeTriangleBuilderVisitor() {
	this.triangles = new ArrayList();
}
extend(QuadEdgeTriangleBuilderVisitor.prototype, {
	visit: function (edges) {
		this.triangles.add(new QuadEdgeTriangle(edges));
	},
	getTriangles: function () {
		return this.triangles;
	},
	interfaces_: function () {
		return [TriangleVisitor];
	},
	getClass: function () {
		return QuadEdgeTriangleBuilderVisitor;
	}
});
QuadEdgeTriangle.QuadEdgeTriangleBuilderVisitor = QuadEdgeTriangleBuilderVisitor;

