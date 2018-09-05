import PointLocation from '../../algorithm/PointLocation';
import TopologyException from '../../geom/TopologyException';
import MaximalEdgeRing from './MaximalEdgeRing';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import PlanarGraph from '../../geomgraph/PlanarGraph';
export default class PolygonBuilder {
	constructor() {
		PolygonBuilder.constructor_.apply(this, arguments);
	}
	sortShellsAndHoles(edgeRings, shellList, freeHoleList) {
		for (var it = edgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.isHole()) {
				freeHoleList.add(er);
			} else {
				shellList.add(er);
			}
		}
	}
	computePolygons(shellList) {
		var resultPolyList = new ArrayList();
		for (var it = shellList.iterator(); it.hasNext(); ) {
			var er = it.next();
			var poly = er.toPolygon(this._geometryFactory);
			resultPolyList.add(poly);
		}
		return resultPolyList;
	}
	placeFreeHoles(shellList, freeHoleList) {
		for (var it = freeHoleList.iterator(); it.hasNext(); ) {
			var hole = it.next();
			if (hole.getShell() === null) {
				var shell = this.findEdgeRingContaining(hole, shellList);
				if (shell === null) throw new TopologyException("unable to assign hole to a shell", hole.getCoordinate(0));
				hole.setShell(shell);
			}
		}
	}
	buildMinimalEdgeRings(maxEdgeRings, shellList, freeHoleList) {
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
	}
	containsPoint(p) {
		for (var it = this._shellList.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.containsPoint(p)) return true;
		}
		return false;
	}
	buildMaximalEdgeRings(dirEdges) {
		var maxEdgeRings = new ArrayList();
		for (var it = dirEdges.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.isInResult() && de.getLabel().isArea()) {
				if (de.getEdgeRing() === null) {
					var er = new MaximalEdgeRing(de, this._geometryFactory);
					maxEdgeRings.add(er);
					er.setInResult();
				}
			}
		}
		return maxEdgeRings;
	}
	placePolygonHoles(shell, minEdgeRings) {
		for (var it = minEdgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.isHole()) {
				er.setShell(shell);
			}
		}
	}
	getPolygons() {
		var resultPolyList = this.computePolygons(this._shellList);
		return resultPolyList;
	}
	findEdgeRingContaining(testEr, shellList) {
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
			if (tryEnv.contains(testEnv) && PointLocation.isInRing(testPt, tryRing.getCoordinates())) isContained = true;
			if (isContained) {
				if (minShell === null || minEnv.contains(tryEnv)) {
					minShell = tryShell;
				}
			}
		}
		return minShell;
	}
	findShell(minEdgeRings) {
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
	}
	add() {
		if (arguments.length === 1) {
			let graph = arguments[0];
			this.add(graph.getEdgeEnds(), graph.getNodes());
		} else if (arguments.length === 2) {
			let dirEdges = arguments[0], nodes = arguments[1];
			PlanarGraph.linkResultDirectedEdges(nodes);
			var maxEdgeRings = this.buildMaximalEdgeRings(dirEdges);
			var freeHoleList = new ArrayList();
			var edgeRings = this.buildMinimalEdgeRings(maxEdgeRings, this._shellList, freeHoleList);
			this.sortShellsAndHoles(edgeRings, this._shellList, freeHoleList);
			this.placeFreeHoles(this._shellList, freeHoleList);
		}
	}
	getClass() {
		return PolygonBuilder;
	}
	get interfaces_() {
		return [];
	}
}
PolygonBuilder.constructor_ = function () {
	this._geometryFactory = null;
	this._shellList = new ArrayList();
	let geometryFactory = arguments[0];
	this._geometryFactory = geometryFactory;
};
