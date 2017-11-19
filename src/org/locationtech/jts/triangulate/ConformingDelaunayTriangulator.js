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
	this._initialVertices = null;
	this._segVertices = null;
	this._segments = new ArrayList();
	this._subdiv = null;
	this._incDel = null;
	this._convexHull = null;
	this._splitFinder = new NonEncroachingSplitPointFinder();
	this._kdt = null;
	this._vertexFactory = null;
	this._computeAreaEnv = null;
	this._splitPt = null;
	this._tolerance = null;
	let initialVertices = arguments[0], tolerance = arguments[1];
	this._initialVertices = new ArrayList(initialVertices);
	this._tolerance = tolerance;
	this._kdt = new KdTree(tolerance);
}
extend(ConformingDelaunayTriangulator.prototype, {
	getInitialVertices: function () {
		return this._initialVertices;
	},
	getKDT: function () {
		return this._kdt;
	},
	enforceConstraints: function () {
		this.addConstraintVertices();
		var count = 0;
		var splits = 0;
		do {
			splits = this.enforceGabriel(this._segments);
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
		return this._vertexFactory;
	},
	getPointArray: function () {
		var pts = new Array(this._initialVertices.size() + this._segVertices.size()).fill(null);
		var index = 0;
		for (var i = this._initialVertices.iterator(); i.hasNext(); ) {
			var v = i.next();
			pts[index++] = v.getCoordinate();
		}
		for (var i2 = this._segVertices.iterator(); i2.hasNext(); ) {
			var v = i2.next();
			pts[index++] = v.getCoordinate();
		}
		return pts;
	},
	setConstraints: function (segments, segVertices) {
		this._segments = segments;
		this._segVertices = segVertices;
	},
	computeConvexHull: function () {
		var fact = new GeometryFactory();
		var coords = this.getPointArray();
		var hull = new ConvexHull(coords, fact);
		this._convexHull = hull.getConvexHull();
	},
	addConstraintVertices: function () {
		this.computeConvexHull();
		this.insertSites(this._segVertices);
	},
	findNonGabrielPoint: function (seg) {
		var p = seg.getStart();
		var q = seg.getEnd();
		var midPt = new Coordinate((p.x + q.x) / 2.0, (p.y + q.y) / 2.0);
		var segRadius = p.distance(midPt);
		var env = new Envelope(midPt);
		env.expandBy(segRadius);
		var result = this._kdt.query(env);
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
		return this._segments;
	},
	setSplitPointFinder: function (splitFinder) {
		this._splitFinder = splitFinder;
	},
	getConvexHull: function () {
		return this._convexHull;
	},
	getTolerance: function () {
		return this._tolerance;
	},
	enforceGabriel: function (segsToInsert) {
		var newSegments = new ArrayList();
		var splits = 0;
		var segsToRemove = new ArrayList();
		for (var i = segsToInsert.iterator(); i.hasNext(); ) {
			var seg = i.next();
			var encroachPt = this.findNonGabrielPoint(seg);
			if (encroachPt === null) continue;
			this._splitPt = this._splitFinder.findSplitPoint(seg, encroachPt);
			var splitVertex = this.createVertex(this._splitPt, seg);
			var insertedVertex = this.insertSite(splitVertex);
			if (!insertedVertex.getCoordinate().equals2D(this._splitPt)) {}
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
			if (this._vertexFactory !== null) v = this._vertexFactory.createVertex(p, null); else v = new ConstraintVertex(p);
			return v;
		} else if (arguments.length === 2) {
			let p = arguments[0], seg = arguments[1];
			var v = null;
			if (this._vertexFactory !== null) v = this._vertexFactory.createVertex(p, seg); else v = new ConstraintVertex(p);
			v.setOnConstraint(true);
			return v;
		}
	},
	getSubdivision: function () {
		return this._subdiv;
	},
	computeBoundingBox: function () {
		var vertexEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this._initialVertices);
		var segEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this._segVertices);
		var allPointsEnv = new Envelope(vertexEnv);
		allPointsEnv.expandToInclude(segEnv);
		var deltaX = allPointsEnv.getWidth() * 0.2;
		var deltaY = allPointsEnv.getHeight() * 0.2;
		var delta = Math.max(deltaX, deltaY);
		this._computeAreaEnv = new Envelope(allPointsEnv);
		this._computeAreaEnv.expandBy(delta);
	},
	setVertexFactory: function (vertexFactory) {
		this._vertexFactory = vertexFactory;
	},
	formInitialDelaunay: function () {
		this.computeBoundingBox();
		this._subdiv = new QuadEdgeSubdivision(this._computeAreaEnv, this._tolerance);
		this._subdiv.setLocator(new LastFoundQuadEdgeLocator(this._subdiv));
		this._incDel = new IncrementalDelaunayTriangulator(this._subdiv);
		this.insertSites(this._initialVertices);
	},
	insertSite: function () {
		if (arguments[0] instanceof ConstraintVertex) {
			let v = arguments[0];
			var kdnode = this._kdt.insert(v.getCoordinate(), v);
			if (!kdnode.isRepeated()) {
				this._incDel.insertSite(v);
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
