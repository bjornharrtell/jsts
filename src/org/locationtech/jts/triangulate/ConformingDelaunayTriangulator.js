import Debug from '../util/Debug';
import GeometryFactory from '../geom/GeometryFactory';
import NonEncroachingSplitPointFinder from './NonEncroachingSplitPointFinder';
import ConstraintVertex from './ConstraintVertex';
import Coordinate from '../geom/Coordinate';
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator';
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision';
import Double from '../../../../java/lang/Double';
import LastFoundQuadEdgeLocator from './quadedge/LastFoundQuadEdgeLocator';
import Segment from './Segment';
import ConvexHull from '../algorithm/ConvexHull';
import KdTree from '../index/kdtree/KdTree';
import ArrayList from '../../../../java/util/ArrayList';
import ConstraintEnforcementException from './ConstraintEnforcementException';
import Envelope from '../geom/Envelope';
export default class ConformingDelaunayTriangulator {
	constructor(...args) {
		(() => {
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
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [initialVertices, tolerance] = args;
						this.initialVertices = new ArrayList(initialVertices);
						this.tolerance = tolerance;
						this.kdt = new KdTree(tolerance);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static computeVertexEnvelope(vertices) {
		var env = new Envelope();
		for (var i = vertices.iterator(); i.hasNext(); ) {
			var v = i.next();
			env.expandToInclude(v.getCoordinate());
		}
		return env;
	}
	getInitialVertices() {
		return this.initialVertices;
	}
	getKDT() {
		return this.kdt;
	}
	enforceConstraints() {
		this.addConstraintVertices();
		var count = 0;
		var splits = 0;
		do {
			splits = this.enforceGabriel(this.segments);
			count++;
			Debug.println("Iter: " + count + "   Splits: " + splits + "   Current # segments = " + this.segments.size());
		} while (splits > 0 && count < ConformingDelaunayTriangulator.MAX_SPLIT_ITER);
		if (count === ConformingDelaunayTriangulator.MAX_SPLIT_ITER) {
			Debug.println("ABORTED! Too many iterations while enforcing constraints");
			if (!Debug.isDebugging()) throw new ConstraintEnforcementException("Too many splitting iterations while enforcing constraints.  Last split point was at: ", this.splitPt);
		}
	}
	insertSites(vertices) {
		Debug.println("Adding sites: " + vertices.size());
		for (var i = vertices.iterator(); i.hasNext(); ) {
			var v = i.next();
			this.insertSite(v);
		}
	}
	getVertexFactory() {
		return this.vertexFactory;
	}
	getPointArray() {
		var pts = new Array(this.initialVertices.size() + this.segVertices.size());
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
	}
	setConstraints(segments, segVertices) {
		this.segments = segments;
		this.segVertices = segVertices;
	}
	computeConvexHull() {
		var fact = new GeometryFactory();
		var coords = this.getPointArray();
		var hull = new ConvexHull(coords, fact);
		this.convexHull = hull.getConvexHull();
	}
	addConstraintVertices() {
		this.computeConvexHull();
		this.insertSites(this.segVertices);
	}
	findNonGabrielPoint(seg) {
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
	}
	getConstraintSegments() {
		return this.segments;
	}
	setSplitPointFinder(splitFinder) {
		this.splitFinder = splitFinder;
	}
	getConvexHull() {
		return this.convexHull;
	}
	getTolerance() {
		return this.tolerance;
	}
	enforceGabriel(segsToInsert) {
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
			if (!insertedVertex.getCoordinate().equals2D(this.splitPt)) {
				Debug.println("Split pt snapped to: " + insertedVertex);
			}
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
	}
	createVertex(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [p] = args;
						var v = null;
						if (this.vertexFactory !== null) v = this.vertexFactory.createVertex(p, null); else v = new ConstraintVertex(p);
						return v;
					})(...args);
				case 2:
					return ((...args) => {
						let [p, seg] = args;
						var v = null;
						if (this.vertexFactory !== null) v = this.vertexFactory.createVertex(p, seg); else v = new ConstraintVertex(p);
						v.setOnConstraint(true);
						return v;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getSubdivision() {
		return this.subdiv;
	}
	computeBoundingBox() {
		var vertexEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this.initialVertices);
		var segEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this.segVertices);
		var allPointsEnv = new Envelope(vertexEnv);
		allPointsEnv.expandToInclude(segEnv);
		var deltaX = allPointsEnv.getWidth() * 0.2;
		var deltaY = allPointsEnv.getHeight() * 0.2;
		var delta = Math.max(deltaX, deltaY);
		this.computeAreaEnv = new Envelope(allPointsEnv);
		this.computeAreaEnv.expandBy(delta);
	}
	setVertexFactory(vertexFactory) {
		this.vertexFactory = vertexFactory;
	}
	formInitialDelaunay() {
		this.computeBoundingBox();
		this.subdiv = new QuadEdgeSubdivision(this.computeAreaEnv, this.tolerance);
		this.subdiv.setLocator(new LastFoundQuadEdgeLocator(this.subdiv));
		this.incDel = new IncrementalDelaunayTriangulator(this.subdiv);
		this.insertSites(this.initialVertices);
	}
	insertSite(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof ConstraintVertex) {
						return ((...args) => {
							let [v] = args;
							var kdnode = this.kdt.insert(v.getCoordinate(), v);
							if (!kdnode.isRepeated()) {
								this.incDel.insertSite(v);
							} else {
								var snappedV = kdnode.getData();
								snappedV.merge(v);
								return snappedV;
							}
							return v;
						})(...args);
					} else if (args[0] instanceof Coordinate) {
						return ((...args) => {
							let [p] = args;
							this.insertSite(this.createVertex(p));
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return ConformingDelaunayTriangulator;
	}
}
ConformingDelaunayTriangulator.MAX_SPLIT_ITER = 99;

