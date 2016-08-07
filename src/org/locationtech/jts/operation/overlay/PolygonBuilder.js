import CGAlgorithms from '../../algorithm/CGAlgorithms';
import TopologyException from '../../geom/TopologyException';
import extend from '../../../../../extend';
import MaximalEdgeRing from './MaximalEdgeRing';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import PlanarGraph from '../../geomgraph/PlanarGraph';
export default function PolygonBuilder() {
	this.geometryFactory = null;
	this.shellList = new ArrayList();
	let geometryFactory = arguments[0];
	this.geometryFactory = geometryFactory;
}
extend(PolygonBuilder.prototype, {
	sortShellsAndHoles: function (edgeRings, shellList, freeHoleList) {
		for (var it = edgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.isHole()) {
				freeHoleList.add(er);
			} else {
				shellList.add(er);
			}
		}
	},
	computePolygons: function (shellList) {
		var resultPolyList = new ArrayList();
		for (var it = shellList.iterator(); it.hasNext(); ) {
			var er = it.next();
			var poly = er.toPolygon(this.geometryFactory);
			resultPolyList.add(poly);
		}
		return resultPolyList;
	},
	placeFreeHoles: function (shellList, freeHoleList) {
		for (var it = freeHoleList.iterator(); it.hasNext(); ) {
			var hole = it.next();
			if (hole.getShell() === null) {
				var shell = this.findEdgeRingContaining(hole, shellList);
				if (shell === null) throw new TopologyException("unable to assign hole to a shell", hole.getCoordinate(0));
				hole.setShell(shell);
			}
		}
	},
	buildMinimalEdgeRings: function (maxEdgeRings, shellList, freeHoleList) {
		var edgeRings = new ArrayList();
		for (var it = maxEdgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.getMaxNodeDegree() > 2) {
				er.linkDirectedEdgesForMinimalEdgeRings();
				var minEdgeRings = er.buildMinimalRings();
				var shell = this.findShell(minEdgeRings);
				if (shell !== null) {
					this.placePolygonHoles(shell, minEdgeRings);
					shellList.add(shell);
				} else {
					freeHoleList.addAll(minEdgeRings);
				}
			} else {
				edgeRings.add(er);
			}
		}
		return edgeRings;
	},
	containsPoint: function (p) {
		for (var it = this.shellList.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.containsPoint(p)) return true;
		}
		return false;
	},
	buildMaximalEdgeRings: function (dirEdges) {
		var maxEdgeRings = new ArrayList();
		for (var it = dirEdges.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.isInResult() && de.getLabel().isArea()) {
				if (de.getEdgeRing() === null) {
					var er = new MaximalEdgeRing(de, this.geometryFactory);
					maxEdgeRings.add(er);
					er.setInResult();
				}
			}
		}
		return maxEdgeRings;
	},
	placePolygonHoles: function (shell, minEdgeRings) {
		for (var it = minEdgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.isHole()) {
				er.setShell(shell);
			}
		}
	},
	getPolygons: function () {
		var resultPolyList = this.computePolygons(this.shellList);
		return resultPolyList;
	},
	findEdgeRingContaining: function (testEr, shellList) {
		var testRing = testEr.getLinearRing();
		var testEnv = testRing.getEnvelopeInternal();
		var testPt = testRing.getCoordinateN(0);
		var minShell = null;
		var minEnv = null;
		for (var it = shellList.iterator(); it.hasNext(); ) {
			var tryShell = it.next();
			var tryRing = tryShell.getLinearRing();
			var tryEnv = tryRing.getEnvelopeInternal();
			if (minShell !== null) minEnv = minShell.getLinearRing().getEnvelopeInternal();
			var isContained = false;
			if (tryEnv.contains(testEnv) && CGAlgorithms.isPointInRing(testPt, tryRing.getCoordinates())) isContained = true;
			if (isContained) {
				if (minShell === null || minEnv.contains(tryEnv)) {
					minShell = tryShell;
				}
			}
		}
		return minShell;
	},
	findShell: function (minEdgeRings) {
		var shellCount = 0;
		var shell = null;
		for (var it = minEdgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (!er.isHole()) {
				shell = er;
				shellCount++;
			}
		}
		Assert.isTrue(shellCount <= 1, "found two shells in MinimalEdgeRing list");
		return shell;
	},
	add: function () {
		if (arguments.length === 1) {
			let graph = arguments[0];
			this.add(graph.getEdgeEnds(), graph.getNodes());
		} else if (arguments.length === 2) {
			let dirEdges = arguments[0], nodes = arguments[1];
			PlanarGraph.linkResultDirectedEdges(nodes);
			var maxEdgeRings = this.buildMaximalEdgeRings(dirEdges);
			var freeHoleList = new ArrayList();
			var edgeRings = this.buildMinimalEdgeRings(maxEdgeRings, this.shellList, freeHoleList);
			this.sortShellsAndHoles(edgeRings, this.shellList, freeHoleList);
			this.placeFreeHoles(this.shellList, freeHoleList);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PolygonBuilder;
	}
});
