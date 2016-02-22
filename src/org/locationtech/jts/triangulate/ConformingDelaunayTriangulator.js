import GeometryFactory from '../geom/GeometryFactory';
import NonEncroachingSplitPointFinder from './NonEncroachingSplitPointFinder';
import ConstraintVertex from './ConstraintVertex';
import Coordinate from '../geom/Coordinate';
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator';
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import LastFoundQuadEdgeLocator from './quadedge/LastFoundQuadEdgeLocator';
import Segment from './Segment';
import ConvexHull from '../algorithm/ConvexHull';
import KdTree from '../index/kdtree/KdTree';
import ArrayList from '../../../../java/util/ArrayList';
import Envelope from '../geom/Envelope';
export default function ConformingDelaunayTriangulator() {
	this.initialVertices = null;
	this.segVertices = null;
	this.segments = new ArrayList();
	this.subdiv = null;
	this.incDel = null;
	this.convexHull = null;
	this.splitFinder = new NonEncroachingSplitPointFinder();
	this.kdt = null;
	this.vertexFactory = null;
	this.computeAreaEnv = null;
	this.splitPt = null;
	this.tolerance = null;
	let initialVertices = arguments[0], tolerance = arguments[1];
	this.initialVertices = new ArrayList(initialVertices);
	this.tolerance = tolerance;
	this.kdt = new KdTree(tolerance);
}
extend(ConformingDelaunayTriangulator.prototype, {
	getInitialVertices: function () {
		return this.initialVertices;
	},
	getKDT: function () {
		return this.kdt;
	},
	enforceConstraints: function () {
		this.addConstraintVertices();
		var count = 0;
		var splits = 0;
		do {
			splits = this.enforceGabriel(this.segments);
			count++;
		} while (splits > 0 && count < ConformingDelaunayTriangulator.MAX_SPLIT_ITER);
	},
	insertSites: function (vertices) {
		for (var i = vertices.iterator(); i.hasNext(); ) {
			var v = i.next();
			this.insertSite(v);
		}
	},
	getVertexFactory: function () {
		return this.vertexFactory;
	},
	getPointArray: function () {
		var pts = new Array(this.initialVertices.size() + this.segVertices.size()).fill(null);
		var index = 0;
		for (var i = this.initialVertices.iterator(); i.hasNext(); ) {
			var v = i.next();
			pts[index++] = v.getCoordinate();
		}
		for (var i2 = this.segVertices.iterator(); i2.hasNext(); ) {
			var v = i2.next();
			pts[index++] = v.getCoordinate();
		}
		return pts;
	},
	setConstraints: function (segments, segVertices) {
		this.segments = segments;
		this.segVertices = segVertices;
	},
	computeConvexHull: function () {
		var fact = new GeometryFactory();
		var coords = this.getPointArray();
		var hull = new ConvexHull(coords, fact);
		this.convexHull = hull.getConvexHull();
	},
	addConstraintVertices: function () {
		this.computeConvexHull();
		this.insertSites(this.segVertices);
	},
	findNonGabrielPoint: function (seg) {
		var p = seg.getStart();
		var q = seg.getEnd();
		var midPt = new Coordinate((p.x + q.x) / 2.0, (p.y + q.y) / 2.0);
		var segRadius = p.distance(midPt);
		var env = new Envelope(midPt);
		env.expandBy(segRadius);
		var result = this.kdt.query(env);
		var closestNonGabriel = null;
		var minDist = Double.MAX_VALUE;
		for (var i = result.iterator(); i.hasNext(); ) {
			var nextNode = i.next();
			var testPt = nextNode.getCoordinate();
			if (testPt.equals2D(p) || testPt.equals2D(q)) continue;
			var testRadius = midPt.distance(testPt);
			if (testRadius < segRadius) {
				var testDist = testRadius;
				if (closestNonGabriel === null || testDist < minDist) {
					closestNonGabriel = testPt;
					minDist = testDist;
				}
			}
		}
		return closestNonGabriel;
	},
	getConstraintSegments: function () {
		return this.segments;
	},
	setSplitPointFinder: function (splitFinder) {
		this.splitFinder = splitFinder;
	},
	getConvexHull: function () {
		return this.convexHull;
	},
	getTolerance: function () {
		return this.tolerance;
	},
	enforceGabriel: function (segsToInsert) {
		var newSegments = new ArrayList();
		var splits = 0;
		var segsToRemove = new ArrayList();
		for (var i = segsToInsert.iterator(); i.hasNext(); ) {
			var seg = i.next();
			var encroachPt = this.findNonGabrielPoint(seg);
			if (encroachPt === null) continue;
			this.splitPt = this.splitFinder.findSplitPoint(seg, encroachPt);
			var splitVertex = this.createVertex(this.splitPt, seg);
			var insertedVertex = this.insertSite(splitVertex);
			var s1 = new Segment(seg.getStartX(), seg.getStartY(), seg.getStartZ(), splitVertex.getX(), splitVertex.getY(), splitVertex.getZ(), seg.getData());
			var s2 = new Segment(splitVertex.getX(), splitVertex.getY(), splitVertex.getZ(), seg.getEndX(), seg.getEndY(), seg.getEndZ(), seg.getData());
			newSegments.add(s1);
			newSegments.add(s2);
			segsToRemove.add(seg);
			splits = splits + 1;
		}
		segsToInsert.removeAll(segsToRemove);
		segsToInsert.addAll(newSegments);
		return splits;
	},
	createVertex: function () {
		if (arguments.length === 1) {
			let p = arguments[0];
			var v = null;
			if (this.vertexFactory !== null) v = this.vertexFactory.createVertex(p, null); else v = new ConstraintVertex(p);
			return v;
		} else if (arguments.length === 2) {
			let p = arguments[0], seg = arguments[1];
			var v = null;
			if (this.vertexFactory !== null) v = this.vertexFactory.createVertex(p, seg); else v = new ConstraintVertex(p);
			v.setOnConstraint(true);
			return v;
		}
	},
	getSubdivision: function () {
		return this.subdiv;
	},
	computeBoundingBox: function () {
		var vertexEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this.initialVertices);
		var segEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this.segVertices);
		var allPointsEnv = new Envelope(vertexEnv);
		allPointsEnv.expandToInclude(segEnv);
		var deltaX = allPointsEnv.getWidth() * 0.2;
		var deltaY = allPointsEnv.getHeight() * 0.2;
		var delta = Math.max(deltaX, deltaY);
		this.computeAreaEnv = new Envelope(allPointsEnv);
		this.computeAreaEnv.expandBy(delta);
	},
	setVertexFactory: function (vertexFactory) {
		this.vertexFactory = vertexFactory;
	},
	formInitialDelaunay: function () {
		this.computeBoundingBox();
		this.subdiv = new QuadEdgeSubdivision(this.computeAreaEnv, this.tolerance);
		this.subdiv.setLocator(new LastFoundQuadEdgeLocator(this.subdiv));
		this.incDel = new IncrementalDelaunayTriangulator(this.subdiv);
		this.insertSites(this.initialVertices);
	},
	insertSite: function () {
		if (arguments[0] instanceof ConstraintVertex) {
			let v = arguments[0];
			var kdnode = this.kdt.insert(v.getCoordinate(), v);
			if (!kdnode.isRepeated()) {
				this.incDel.insertSite(v);
			} else {
				var snappedV = kdnode.getData();
				snappedV.merge(v);
				return snappedV;
			}
			return v;
		} else if (arguments[0] instanceof Coordinate) {
			let p = arguments[0];
			this.insertSite(this.createVertex(p));
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConformingDelaunayTriangulator;
	}
});
ConformingDelaunayTriangulator.computeVertexEnvelope = function (vertices) {
	var env = new Envelope();
	for (var i = vertices.iterator(); i.hasNext(); ) {
		var v = i.next();
		env.expandToInclude(v.getCoordinate());
	}
	return env;
};
ConformingDelaunayTriangulator.MAX_SPLIT_ITER = 99;

