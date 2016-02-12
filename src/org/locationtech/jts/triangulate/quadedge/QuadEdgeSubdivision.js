import QuadEdge from './QuadEdge';
import CoordinateList from '../../geom/CoordinateList';
import HashSet from '../../../../../java/util/HashSet';
import WKTWriter from '../../io/WKTWriter';
import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Stack from '../../../../../java/util/Stack';
import LastFoundQuadEdgeLocator from './LastFoundQuadEdgeLocator';
import LocateFailureException from './LocateFailureException';
import Vertex from './Vertex';
import System from '../../../../../java/lang/System';
import LineSegment from '../../geom/LineSegment';
import ArrayList from '../../../../../java/util/ArrayList';
import Envelope from '../../geom/Envelope';
import Triangle from '../../geom/Triangle';
import TriangleVisitor from './TriangleVisitor';
export default class QuadEdgeSubdivision {
	constructor(...args) {
		this.visitedKey = 0;
		this.quadEdges = new ArrayList();
		this.startingEdge = null;
		this.tolerance = null;
		this.edgeCoincidenceTolerance = null;
		this.frameVertex = new Array(3);
		this.frameEnv = null;
		this.locator = null;
		this.seg = new LineSegment();
		this.triEdges = new Array(3);
		switch (args.length) {
			case 2:
				{
					let [env, tolerance] = args;
					this.tolerance = tolerance;
					this.edgeCoincidenceTolerance = tolerance / QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR;
					this.createFrame(env);
					this.startingEdge = this.initSubdiv();
					this.locator = new LastFoundQuadEdgeLocator(this);
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	static get TriangleCircumcentreVisitor() {
		return TriangleCircumcentreVisitor;
	}
	static get TriangleEdgesListVisitor() {
		return TriangleEdgesListVisitor;
	}
	static get TriangleVertexListVisitor() {
		return TriangleVertexListVisitor;
	}
	static get TriangleCoordinatesVisitor() {
		return TriangleCoordinatesVisitor;
	}
	static getTriangleEdges(startQE, triEdge) {
		triEdge[0] = startQE;
		triEdge[1] = triEdge[0].lNext();
		triEdge[2] = triEdge[1].lNext();
		if (triEdge[2].lNext() !== triEdge[0]) throw new IllegalArgumentException("Edges do not form a triangle");
	}
	getTriangleVertices(includeFrame) {
		var visitor = new TriangleVertexListVisitor();
		this.visitTriangles(visitor, includeFrame);
		return visitor.getTriangleVertices();
	}
	isFrameVertex(v) {
		if (v.equals(this.frameVertex[0])) return true;
		if (v.equals(this.frameVertex[1])) return true;
		if (v.equals(this.frameVertex[2])) return true;
		return false;
	}
	isVertexOfEdge(e, v) {
		if (v.equals(e.orig(), this.tolerance) || v.equals(e.dest(), this.tolerance)) {
			return true;
		}
		return false;
	}
	connect(a, b) {
		var q = QuadEdge.connect(a, b);
		this.quadEdges.add(q);
		return q;
	}
	getVoronoiCellPolygon(qe, geomFact) {
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
	}
	setLocator(locator) {
		this.locator = locator;
	}
	initSubdiv() {
		var ea = this.makeEdge(this.frameVertex[0], this.frameVertex[1]);
		var eb = this.makeEdge(this.frameVertex[1], this.frameVertex[2]);
		QuadEdge.splice(ea.sym(), eb);
		var ec = this.makeEdge(this.frameVertex[2], this.frameVertex[0]);
		QuadEdge.splice(eb.sym(), ec);
		QuadEdge.splice(ec.sym(), ea);
		return ea;
	}
	isFrameBorderEdge(e) {
		var leftTri = new Array(3);
		QuadEdgeSubdivision.getTriangleEdges(e, leftTri);
		var rightTri = new Array(3);
		QuadEdgeSubdivision.getTriangleEdges(e.sym(), rightTri);
		var vLeftTriOther = e.lNext().dest();
		if (this.isFrameVertex(vLeftTriOther)) return true;
		var vRightTriOther = e.sym().lNext().dest();
		if (this.isFrameVertex(vRightTriOther)) return true;
		return false;
	}
	makeEdge(o, d) {
		var q = QuadEdge.makeEdge(o, d);
		this.quadEdges.add(q);
		return q;
	}
	visitTriangles(triVisitor, includeFrame) {
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
	}
	isFrameEdge(e) {
		if (this.isFrameVertex(e.orig()) || this.isFrameVertex(e.dest())) return true;
		return false;
	}
	isOnEdge(e, p) {
		this.seg.setCoordinates(e.orig().getCoordinate(), e.dest().getCoordinate());
		var dist = this.seg.distance(p);
		return dist < this.edgeCoincidenceTolerance;
	}
	getEnvelope() {
		return new Envelope(this.frameEnv);
	}
	createFrame(env) {
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
	}
	getTriangleCoordinates(includeFrame) {
		var visitor = new TriangleCoordinatesVisitor();
		this.visitTriangles(visitor, includeFrame);
		return visitor.getTriangles();
	}
	getVertices(includeFrame) {
		var vertices = new HashSet();
		for (var i = this.quadEdges.iterator(); i.hasNext(); ) {
			var qe = i.next();
			var v = qe.orig();
			if (includeFrame || !this.isFrameVertex(v)) vertices.add(v);
			var vd = qe.dest();
			if (includeFrame || !this.isFrameVertex(vd)) vertices.add(vd);
		}
		return vertices;
	}
	fetchTriangleToVisit(edge, edgeStack, includeFrame, visitedEdges) {
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
	}
	getEdges(...args) {
		switch (args.length) {
			case 0:
				{
					let [] = args;
					return this.quadEdges;
					break;
				}
			case 1:
				{
					let [geomFact] = args;
					var quadEdges = this.getPrimaryEdges(false);
					var edges = new Array(quadEdges.size());
					var i = 0;
					for (var it = quadEdges.iterator(); it.hasNext(); ) {
						var qe = it.next();
						edges[i++] = geomFact.createLineString([qe.orig().getCoordinate(), qe.dest().getCoordinate()]);
					}
					return geomFact.createMultiLineString(edges);
					break;
				}
		}
	}
	getVertexUniqueEdges(includeFrame) {
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
	}
	getTriangleEdges(includeFrame) {
		var visitor = new TriangleEdgesListVisitor();
		this.visitTriangles(visitor, includeFrame);
		return visitor.getTriangleEdges();
	}
	getPrimaryEdges(includeFrame) {
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
	}
	delete(e) {
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
	}
	locateFromEdge(v, startEdge) {
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
	}
	getTolerance() {
		return this.tolerance;
	}
	getVoronoiCellPolygons(geomFact) {
		this.visitTriangles(new TriangleCircumcentreVisitor(), true);
		var cells = new ArrayList();
		var edges = this.getVertexUniqueEdges(false);
		for (var i = edges.iterator(); i.hasNext(); ) {
			var qe = i.next();
			cells.add(this.getVoronoiCellPolygon(qe, geomFact));
		}
		return cells;
	}
	getVoronoiDiagram(geomFact) {
		var vorCells = this.getVoronoiCellPolygons(geomFact);
		return geomFact.createGeometryCollection(GeometryFactory.toGeometryArray(vorCells));
	}
	getTriangles(geomFact) {
		var triPtsList = this.getTriangleCoordinates(false);
		var tris = new Array(triPtsList.size());
		var i = 0;
		for (var it = triPtsList.iterator(); it.hasNext(); ) {
			var triPt = it.next();
			tris[i++] = geomFact.createPolygon(geomFact.createLinearRing(triPt), null);
		}
		return geomFact.createGeometryCollection(tris);
	}
	insertSite(v) {
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
	}
	locate(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Vertex) {
					let [v] = args;
					return this.locator.locate(v);
				} else if (args[0] instanceof Coordinate) {
					let [p] = args;
					return this.locator.locate(new Vertex(p));
				}
				break;
			case 2:
				{
					let [p0, p1] = args;
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
					break;
				}
		}
	}
	getClass() {
		return QuadEdgeSubdivision;
	}
}
class TriangleCircumcentreVisitor {
	constructor(...args) {
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [TriangleVisitor];
	}
	visit(triEdges) {
		var a = triEdges[0].orig().getCoordinate();
		var b = triEdges[1].orig().getCoordinate();
		var c = triEdges[2].orig().getCoordinate();
		var cc = Triangle.circumcentre(a, b, c);
		var ccVertex = new Vertex(cc);
		for (var i = 0; i < 3; i++) {
			triEdges[i].rot().setOrig(ccVertex);
		}
	}
	getClass() {
		return TriangleCircumcentreVisitor;
	}
}
class TriangleEdgesListVisitor {
	constructor(...args) {
		this.triList = new ArrayList();
	}
	get interfaces_() {
		return [TriangleVisitor];
	}
	getTriangleEdges() {
		return this.triList;
	}
	visit(triEdges) {
		this.triList.add(triEdges.clone());
	}
	getClass() {
		return TriangleEdgesListVisitor;
	}
}
class TriangleVertexListVisitor {
	constructor(...args) {
		this.triList = new ArrayList();
	}
	get interfaces_() {
		return [TriangleVisitor];
	}
	visit(triEdges) {
		this.triList.add([triEdges[0].orig(), triEdges[1].orig(), triEdges[2].orig()]);
	}
	getTriangleVertices() {
		return this.triList;
	}
	getClass() {
		return TriangleVertexListVisitor;
	}
}
class TriangleCoordinatesVisitor {
	constructor(...args) {
		this.coordList = new CoordinateList();
		this.triCoords = new ArrayList();
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [TriangleVisitor];
	}
	checkTriangleSize(pts) {
		var loc = "";
		if (pts.length >= 2) loc = WKTWriter.toLineString(pts[0], pts[1]); else {
			if (pts.length >= 1) loc = WKTWriter.toPoint(pts[0]);
		}
	}
	visit(triEdges) {
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
	}
	getTriangles() {
		return this.triCoords;
	}
	getClass() {
		return TriangleCoordinatesVisitor;
	}
}
QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR = 1000;

