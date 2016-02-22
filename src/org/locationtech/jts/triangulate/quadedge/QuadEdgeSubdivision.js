import QuadEdge from './QuadEdge';
import CoordinateList from '../../geom/CoordinateList';
import HashSet from '../../../../../java/util/HashSet';
import WKTWriter from '../../io/WKTWriter';
import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Stack from '../../../../../java/util/Stack';
import extend from '../../../../../extend';
import LastFoundQuadEdgeLocator from './LastFoundQuadEdgeLocator';
import LocateFailureException from './LocateFailureException';
import Vertex from './Vertex';
import System from '../../../../../java/lang/System';
import LineSegment from '../../geom/LineSegment';
import ArrayList from '../../../../../java/util/ArrayList';
import Envelope from '../../geom/Envelope';
import Triangle from '../../geom/Triangle';
import TriangleVisitor from './TriangleVisitor';
export default function QuadEdgeSubdivision() {
	this.visitedKey = 0;
	this.quadEdges = new ArrayList();
	this.startingEdge = null;
	this.tolerance = null;
	this.edgeCoincidenceTolerance = null;
	this.frameVertex = new Array(3).fill(null);
	this.frameEnv = null;
	this.locator = null;
	this.seg = new LineSegment();
	this.triEdges = new Array(3).fill(null);
	let env = arguments[0], tolerance = arguments[1];
	this.tolerance = tolerance;
	this.edgeCoincidenceTolerance = tolerance / QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR;
	this.createFrame(env);
	this.startingEdge = this.initSubdiv();
	this.locator = new LastFoundQuadEdgeLocator(this);
}
extend(QuadEdgeSubdivision.prototype, {
	getTriangleVertices: function (includeFrame) {
		var visitor = new TriangleVertexListVisitor();
		this.visitTriangles(visitor, includeFrame);
		return visitor.getTriangleVertices();
	},
	isFrameVertex: function (v) {
		if (v.equals(this.frameVertex[0])) return true;
		if (v.equals(this.frameVertex[1])) return true;
		if (v.equals(this.frameVertex[2])) return true;
		return false;
	},
	isVertexOfEdge: function (e, v) {
		if (v.equals(e.orig(), this.tolerance) || v.equals(e.dest(), this.tolerance)) {
			return true;
		}
		return false;
	},
	connect: function (a, b) {
		var q = QuadEdge.connect(a, b);
		this.quadEdges.add(q);
		return q;
	},
	getVoronoiCellPolygon: function (qe, geomFact) {
		var cellPts = new ArrayList();
		var startQE = qe;
		do {
			var cc = qe.rot().orig().getCoordinate();
			cellPts.add(cc);
			qe = qe.oPrev();
		} while (qe !== startQE);
		var coordList = new CoordinateList();
		coordList.addAll(cellPts, false);
		coordList.closeRing();
		if (coordList.size() < 4) {
			System.out.println(coordList);
			coordList.add(coordList.get(coordList.size() - 1), true);
		}
		var pts = coordList.toCoordinateArray();
		var cellPoly = geomFact.createPolygon(geomFact.createLinearRing(pts), null);
		var v = startQE.orig();
		cellPoly.setUserData(v.getCoordinate());
		return cellPoly;
	},
	setLocator: function (locator) {
		this.locator = locator;
	},
	initSubdiv: function () {
		var ea = this.makeEdge(this.frameVertex[0], this.frameVertex[1]);
		var eb = this.makeEdge(this.frameVertex[1], this.frameVertex[2]);
		QuadEdge.splice(ea.sym(), eb);
		var ec = this.makeEdge(this.frameVertex[2], this.frameVertex[0]);
		QuadEdge.splice(eb.sym(), ec);
		QuadEdge.splice(ec.sym(), ea);
		return ea;
	},
	isFrameBorderEdge: function (e) {
		var leftTri = new Array(3).fill(null);
		QuadEdgeSubdivision.getTriangleEdges(e, leftTri);
		var rightTri = new Array(3).fill(null);
		QuadEdgeSubdivision.getTriangleEdges(e.sym(), rightTri);
		var vLeftTriOther = e.lNext().dest();
		if (this.isFrameVertex(vLeftTriOther)) return true;
		var vRightTriOther = e.sym().lNext().dest();
		if (this.isFrameVertex(vRightTriOther)) return true;
		return false;
	},
	makeEdge: function (o, d) {
		var q = QuadEdge.makeEdge(o, d);
		this.quadEdges.add(q);
		return q;
	},
	visitTriangles: function (triVisitor, includeFrame) {
		this.visitedKey++;
		var edgeStack = new Stack();
		edgeStack.push(this.startingEdge);
		var visitedEdges = new HashSet();
		while (!edgeStack.empty()) {
			var edge = edgeStack.pop();
			if (!visitedEdges.contains(edge)) {
				var triEdges = this.fetchTriangleToVisit(edge, edgeStack, includeFrame, visitedEdges);
				if (triEdges !== null) triVisitor.visit(triEdges);
			}
		}
	},
	isFrameEdge: function (e) {
		if (this.isFrameVertex(e.orig()) || this.isFrameVertex(e.dest())) return true;
		return false;
	},
	isOnEdge: function (e, p) {
		this.seg.setCoordinates(e.orig().getCoordinate(), e.dest().getCoordinate());
		var dist = this.seg.distance(p);
		return dist < this.edgeCoincidenceTolerance;
	},
	getEnvelope: function () {
		return new Envelope(this.frameEnv);
	},
	createFrame: function (env) {
		var deltaX = env.getWidth();
		var deltaY = env.getHeight();
		var offset = 0.0;
		if (deltaX > deltaY) {
			offset = deltaX * 10.0;
		} else {
			offset = deltaY * 10.0;
		}
		this.frameVertex[0] = new Vertex((env.getMaxX() + env.getMinX()) / 2.0, env.getMaxY() + offset);
		this.frameVertex[1] = new Vertex(env.getMinX() - offset, env.getMinY() - offset);
		this.frameVertex[2] = new Vertex(env.getMaxX() + offset, env.getMinY() - offset);
		this.frameEnv = new Envelope(this.frameVertex[0].getCoordinate(), this.frameVertex[1].getCoordinate());
		this.frameEnv.expandToInclude(this.frameVertex[2].getCoordinate());
	},
	getTriangleCoordinates: function (includeFrame) {
		var visitor = new TriangleCoordinatesVisitor();
		this.visitTriangles(visitor, includeFrame);
		return visitor.getTriangles();
	},
	getVertices: function (includeFrame) {
		var vertices = new HashSet();
		for (var i = this.quadEdges.iterator(); i.hasNext(); ) {
			var qe = i.next();
			var v = qe.orig();
			if (includeFrame || !this.isFrameVertex(v)) vertices.add(v);
			var vd = qe.dest();
			if (includeFrame || !this.isFrameVertex(vd)) vertices.add(vd);
		}
		return vertices;
	},
	fetchTriangleToVisit: function (edge, edgeStack, includeFrame, visitedEdges) {
		var curr = edge;
		var edgeCount = 0;
		var isFrame = false;
		do {
			this.triEdges[edgeCount] = curr;
			if (this.isFrameEdge(curr)) isFrame = true;
			var sym = curr.sym();
			if (!visitedEdges.contains(sym)) edgeStack.push(sym);
			visitedEdges.add(curr);
			edgeCount++;
			curr = curr.lNext();
		} while (curr !== edge);
		if (isFrame && !includeFrame) return null;
		return this.triEdges;
	},
	getEdges: function () {
		if (arguments.length === 0) {
			return this.quadEdges;
		} else if (arguments.length === 1) {
			let geomFact = arguments[0];
			var quadEdges = this.getPrimaryEdges(false);
			var edges = new Array(quadEdges.size()).fill(null);
			var i = 0;
			for (var it = quadEdges.iterator(); it.hasNext(); ) {
				var qe = it.next();
				edges[i++] = geomFact.createLineString([qe.orig().getCoordinate(), qe.dest().getCoordinate()]);
			}
			return geomFact.createMultiLineString(edges);
		}
	},
	getVertexUniqueEdges: function (includeFrame) {
		var edges = new ArrayList();
		var visitedVertices = new HashSet();
		for (var i = this.quadEdges.iterator(); i.hasNext(); ) {
			var qe = i.next();
			var v = qe.orig();
			if (!visitedVertices.contains(v)) {
				visitedVertices.add(v);
				if (includeFrame || !this.isFrameVertex(v)) {
					edges.add(qe);
				}
			}
			var qd = qe.sym();
			var vd = qd.orig();
			if (!visitedVertices.contains(vd)) {
				visitedVertices.add(vd);
				if (includeFrame || !this.isFrameVertex(vd)) {
					edges.add(qd);
				}
			}
		}
		return edges;
	},
	getTriangleEdges: function (includeFrame) {
		var visitor = new TriangleEdgesListVisitor();
		this.visitTriangles(visitor, includeFrame);
		return visitor.getTriangleEdges();
	},
	getPrimaryEdges: function (includeFrame) {
		this.visitedKey++;
		var edges = new ArrayList();
		var edgeStack = new Stack();
		edgeStack.push(this.startingEdge);
		var visitedEdges = new HashSet();
		while (!edgeStack.empty()) {
			var edge = edgeStack.pop();
			if (!visitedEdges.contains(edge)) {
				var priQE = edge.getPrimary();
				if (includeFrame || !this.isFrameEdge(priQE)) edges.add(priQE);
				edgeStack.push(edge.oNext());
				edgeStack.push(edge.sym().oNext());
				visitedEdges.add(edge);
				visitedEdges.add(edge.sym());
			}
		}
		return edges;
	},
	delete: function (e) {
		QuadEdge.splice(e, e.oPrev());
		QuadEdge.splice(e.sym(), e.sym().oPrev());
		var eSym = e.sym();
		var eRot = e.rot();
		var eRotSym = e.rot().sym();
		this.quadEdges.remove(e);
		this.quadEdges.remove(eSym);
		this.quadEdges.remove(eRot);
		this.quadEdges.remove(eRotSym);
		e.delete();
		eSym.delete();
		eRot.delete();
		eRotSym.delete();
	},
	locateFromEdge: function (v, startEdge) {
		var iter = 0;
		var maxIter = this.quadEdges.size();
		var e = startEdge;
		while (true) {
			iter++;
			if (iter > maxIter) {
				throw new LocateFailureException(e.toLineSegment());
			}
			if (v.equals(e.orig()) || v.equals(e.dest())) {
				break;
			} else if (v.rightOf(e)) {
				e = e.sym();
			} else if (!v.rightOf(e.oNext())) {
				e = e.oNext();
			} else if (!v.rightOf(e.dPrev())) {
				e = e.dPrev();
			} else {
				break;
			}
		}
		return e;
	},
	getTolerance: function () {
		return this.tolerance;
	},
	getVoronoiCellPolygons: function (geomFact) {
		this.visitTriangles(new TriangleCircumcentreVisitor(), true);
		var cells = new ArrayList();
		var edges = this.getVertexUniqueEdges(false);
		for (var i = edges.iterator(); i.hasNext(); ) {
			var qe = i.next();
			cells.add(this.getVoronoiCellPolygon(qe, geomFact));
		}
		return cells;
	},
	getVoronoiDiagram: function (geomFact) {
		var vorCells = this.getVoronoiCellPolygons(geomFact);
		return geomFact.createGeometryCollection(GeometryFactory.toGeometryArray(vorCells));
	},
	getTriangles: function (geomFact) {
		var triPtsList = this.getTriangleCoordinates(false);
		var tris = new Array(triPtsList.size()).fill(null);
		var i = 0;
		for (var it = triPtsList.iterator(); it.hasNext(); ) {
			var triPt = it.next();
			tris[i++] = geomFact.createPolygon(geomFact.createLinearRing(triPt), null);
		}
		return geomFact.createGeometryCollection(tris);
	},
	insertSite: function (v) {
		var e = this.locate(v);
		if (v.equals(e.orig(), this.tolerance) || v.equals(e.dest(), this.tolerance)) {
			return e;
		}
		var base = this.makeEdge(e.orig(), v);
		QuadEdge.splice(base, e);
		var startEdge = base;
		do {
			base = this.connect(e, base.sym());
			e = base.oPrev();
		} while (e.lNext() !== startEdge);
		return startEdge;
	},
	locate: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof Vertex) {
				let v = arguments[0];
				return this.locator.locate(v);
			} else if (arguments[0] instanceof Coordinate) {
				let p = arguments[0];
				return this.locator.locate(new Vertex(p));
			}
		} else if (arguments.length === 2) {
			let p0 = arguments[0], p1 = arguments[1];
			var e = this.locator.locate(new Vertex(p0));
			if (e === null) return null;
			var base = e;
			if (e.dest().getCoordinate().equals2D(p0)) base = e.sym();
			var locEdge = base;
			do {
				if (locEdge.dest().getCoordinate().equals2D(p1)) return locEdge;
				locEdge = locEdge.oNext();
			} while (locEdge !== base);
			return null;
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return QuadEdgeSubdivision;
	}
});
QuadEdgeSubdivision.getTriangleEdges = function (startQE, triEdge) {
	triEdge[0] = startQE;
	triEdge[1] = triEdge[0].lNext();
	triEdge[2] = triEdge[1].lNext();
	if (triEdge[2].lNext() !== triEdge[0]) throw new IllegalArgumentException("Edges do not form a triangle");
};
function TriangleCircumcentreVisitor() {}
extend(TriangleCircumcentreVisitor.prototype, {
	visit: function (triEdges) {
		var a = triEdges[0].orig().getCoordinate();
		var b = triEdges[1].orig().getCoordinate();
		var c = triEdges[2].orig().getCoordinate();
		var cc = Triangle.circumcentre(a, b, c);
		var ccVertex = new Vertex(cc);
		for (var i = 0; i < 3; i++) {
			triEdges[i].rot().setOrig(ccVertex);
		}
	},
	interfaces_: function () {
		return [TriangleVisitor];
	},
	getClass: function () {
		return TriangleCircumcentreVisitor;
	}
});
function TriangleEdgesListVisitor() {
	this.triList = new ArrayList();
}
extend(TriangleEdgesListVisitor.prototype, {
	getTriangleEdges: function () {
		return this.triList;
	},
	visit: function (triEdges) {
		this.triList.add(triEdges.clone());
	},
	interfaces_: function () {
		return [TriangleVisitor];
	},
	getClass: function () {
		return TriangleEdgesListVisitor;
	}
});
function TriangleVertexListVisitor() {
	this.triList = new ArrayList();
}
extend(TriangleVertexListVisitor.prototype, {
	visit: function (triEdges) {
		this.triList.add([triEdges[0].orig(), triEdges[1].orig(), triEdges[2].orig()]);
	},
	getTriangleVertices: function () {
		return this.triList;
	},
	interfaces_: function () {
		return [TriangleVisitor];
	},
	getClass: function () {
		return TriangleVertexListVisitor;
	}
});
function TriangleCoordinatesVisitor() {
	this.coordList = new CoordinateList();
	this.triCoords = new ArrayList();
}
extend(TriangleCoordinatesVisitor.prototype, {
	checkTriangleSize: function (pts) {
		var loc = "";
		if (pts.length >= 2) loc = WKTWriter.toLineString(pts[0], pts[1]); else {
			if (pts.length >= 1) loc = WKTWriter.toPoint(pts[0]);
		}
	},
	visit: function (triEdges) {
		this.coordList.clear();
		for (var i = 0; i < 3; i++) {
			var v = triEdges[i].orig();
			this.coordList.add(v.getCoordinate());
		}
		if (this.coordList.size() > 0) {
			this.coordList.closeRing();
			var pts = this.coordList.toCoordinateArray();
			if (pts.length !== 4) {
				return null;
			}
			this.triCoords.add(pts);
		}
	},
	getTriangles: function () {
		return this.triCoords;
	},
	interfaces_: function () {
		return [TriangleVisitor];
	},
	getClass: function () {
		return TriangleCoordinatesVisitor;
	}
});
QuadEdgeSubdivision.TriangleCircumcentreVisitor = TriangleCircumcentreVisitor;
QuadEdgeSubdivision.TriangleEdgesListVisitor = TriangleEdgesListVisitor;
QuadEdgeSubdivision.TriangleVertexListVisitor = TriangleVertexListVisitor;
QuadEdgeSubdivision.TriangleCoordinatesVisitor = TriangleCoordinatesVisitor;
QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR = 1000;

