import PointLocator from '../../algorithm/PointLocator';
import Location from '../../geom/Location';
import EdgeNodingValidator from '../../geomgraph/EdgeNodingValidator';
import GeometryCollectionMapper from '../../geom/util/GeometryCollectionMapper';
import PolygonBuilder from './PolygonBuilder';
import Position from '../../geomgraph/Position';
import LineBuilder from './LineBuilder';
import PointBuilder from './PointBuilder';
import SnapIfNeededOverlayOp from './snap/SnapIfNeededOverlayOp';
import extend from '../../../../../extend';
import Label from '../../geomgraph/Label';
import OverlayNodeFactory from './OverlayNodeFactory';
import GeometryGraphOperation from '../GeometryGraphOperation';
import EdgeList from '../../geomgraph/EdgeList';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import inherits from '../../../../../inherits';
import PlanarGraph from '../../geomgraph/PlanarGraph';
export default function OverlayOp() {
	this.ptLocator = new PointLocator();
	this.geomFact = null;
	this.resultGeom = null;
	this.graph = null;
	this.edgeList = new EdgeList();
	this.resultPolyList = new ArrayList();
	this.resultLineList = new ArrayList();
	this.resultPointList = new ArrayList();
	let g0 = arguments[0], g1 = arguments[1];
	GeometryGraphOperation.call(this, g0, g1);
	this.graph = new PlanarGraph(new OverlayNodeFactory());
	this.geomFact = g0.getFactory();
}
inherits(OverlayOp, GeometryGraphOperation);
extend(OverlayOp.prototype, {
	insertUniqueEdge: function (e) {
		var existingEdge = this.edgeList.findEqualEdge(e);
		if (existingEdge !== null) {
			var existingLabel = existingEdge.getLabel();
			var labelToMerge = e.getLabel();
			if (!existingEdge.isPointwiseEqual(e)) {
				labelToMerge = new Label(e.getLabel());
				labelToMerge.flip();
			}
			var depth = existingEdge.getDepth();
			if (depth.isNull()) {
				depth.add(existingLabel);
			}
			depth.add(labelToMerge);
			existingLabel.merge(labelToMerge);
		} else {
			this.edgeList.add(e);
		}
	},
	getGraph: function () {
		return this.graph;
	},
	cancelDuplicateResultEdges: function () {
		for (var it = this.graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			var sym = de.getSym();
			if (de.isInResult() && sym.isInResult()) {
				de.setInResult(false);
				sym.setInResult(false);
			}
		}
	},
	isCoveredByLA: function (coord) {
		if (this.isCovered(coord, this.resultLineList)) return true;
		if (this.isCovered(coord, this.resultPolyList)) return true;
		return false;
	},
	computeGeometry: function (resultPointList, resultLineList, resultPolyList, opcode) {
		var geomList = new ArrayList();
		geomList.addAll(resultPointList);
		geomList.addAll(resultLineList);
		geomList.addAll(resultPolyList);
		if (geomList.isEmpty()) return OverlayOp.createEmptyResult(opcode, this.arg[0].getGeometry(), this.arg[1].getGeometry(), this.geomFact);
		return this.geomFact.buildGeometry(geomList);
	},
	mergeSymLabels: function () {
		for (var nodeit = this.graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().mergeSymLabels();
		}
	},
	isCovered: function (coord, geomList) {
		for (var it = geomList.iterator(); it.hasNext(); ) {
			var geom = it.next();
			var loc = this.ptLocator.locate(coord, geom);
			if (loc !== Location.EXTERIOR) return true;
		}
		return false;
	},
	replaceCollapsedEdges: function () {
		var newEdges = new ArrayList();
		for (var it = this.edgeList.iterator(); it.hasNext(); ) {
			var e = it.next();
			if (e.isCollapsed()) {
				it.remove();
				newEdges.add(e.getCollapsedEdge());
			}
		}
		this.edgeList.addAll(newEdges);
	},
	updateNodeLabelling: function () {
		for (var nodeit = this.graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			var lbl = node.getEdges().getLabel();
			node.getLabel().merge(lbl);
		}
	},
	getResultGeometry: function (overlayOpCode) {
		this.computeOverlay(overlayOpCode);
		return this.resultGeom;
	},
	insertUniqueEdges: function (edges) {
		for (var i = edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			this.insertUniqueEdge(e);
		}
	},
	computeOverlay: function (opCode) {
		this.copyPoints(0);
		this.copyPoints(1);
		this.arg[0].computeSelfNodes(this.li, false);
		this.arg[1].computeSelfNodes(this.li, false);
		this.arg[0].computeEdgeIntersections(this.arg[1], this.li, true);
		var baseSplitEdges = new ArrayList();
		this.arg[0].computeSplitEdges(baseSplitEdges);
		this.arg[1].computeSplitEdges(baseSplitEdges);
		var splitEdges = baseSplitEdges;
		this.insertUniqueEdges(baseSplitEdges);
		this.computeLabelsFromDepths();
		this.replaceCollapsedEdges();
		EdgeNodingValidator.checkValid(this.edgeList.getEdges());
		this.graph.addEdges(this.edgeList.getEdges());
		this.computeLabelling();
		this.labelIncompleteNodes();
		this.findResultAreaEdges(opCode);
		this.cancelDuplicateResultEdges();
		var polyBuilder = new PolygonBuilder(this.geomFact);
		polyBuilder.add(this.graph);
		this.resultPolyList = polyBuilder.getPolygons();
		var lineBuilder = new LineBuilder(this, this.geomFact, this.ptLocator);
		this.resultLineList = lineBuilder.build(opCode);
		var pointBuilder = new PointBuilder(this, this.geomFact, this.ptLocator);
		this.resultPointList = pointBuilder.build(opCode);
		this.resultGeom = this.computeGeometry(this.resultPointList, this.resultLineList, this.resultPolyList, opCode);
	},
	labelIncompleteNode: function (n, targetIndex) {
		var loc = this.ptLocator.locate(n.getCoordinate(), this.arg[targetIndex].getGeometry());
		n.getLabel().setLocation(targetIndex, loc);
	},
	copyPoints: function (argIndex) {
		for (var i = this.arg[argIndex].getNodeIterator(); i.hasNext(); ) {
			var graphNode = i.next();
			var newNode = this.graph.addNode(graphNode.getCoordinate());
			newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
		}
	},
	findResultAreaEdges: function (opCode) {
		for (var it = this.graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			var label = de.getLabel();
			if (label.isArea() && !de.isInteriorAreaEdge() && OverlayOp.isResultOfOp(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), opCode)) {
				de.setInResult(true);
			}
		}
	},
	computeLabelsFromDepths: function () {
		for (var it = this.edgeList.iterator(); it.hasNext(); ) {
			var e = it.next();
			var lbl = e.getLabel();
			var depth = e.getDepth();
			if (!depth.isNull()) {
				depth.normalize();
				for (var i = 0; i < 2; i++) {
					if (!lbl.isNull(i) && lbl.isArea() && !depth.isNull(i)) {
						if (depth.getDelta(i) === 0) {
							lbl.toLine(i);
						} else {
							Assert.isTrue(!depth.isNull(i, Position.LEFT), "depth of LEFT side has not been initialized");
							lbl.setLocation(i, Position.LEFT, depth.getLocation(i, Position.LEFT));
							Assert.isTrue(!depth.isNull(i, Position.RIGHT), "depth of RIGHT side has not been initialized");
							lbl.setLocation(i, Position.RIGHT, depth.getLocation(i, Position.RIGHT));
						}
					}
				}
			}
		}
	},
	computeLabelling: function () {
		for (var nodeit = this.graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().computeLabelling(this.arg);
		}
		this.mergeSymLabels();
		this.updateNodeLabelling();
	},
	labelIncompleteNodes: function () {
		var nodeCount = 0;
		for (var ni = this.graph.getNodes().iterator(); ni.hasNext(); ) {
			var n = ni.next();
			var label = n.getLabel();
			if (n.isIsolated()) {
				nodeCount++;
				if (label.isNull(0)) this.labelIncompleteNode(n, 0); else this.labelIncompleteNode(n, 1);
			}
			n.getEdges().updateLabelling(label);
		}
	},
	isCoveredByA: function (coord) {
		if (this.isCovered(coord, this.resultPolyList)) return true;
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OverlayOp;
	}
});
OverlayOp.overlayOp = function (geom0, geom1, opCode) {
	var gov = new OverlayOp(geom0, geom1);
	var geomOv = gov.getResultGeometry(opCode);
	return geomOv;
};
OverlayOp.intersection = function (g, other) {
	if (g.isEmpty() || other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, g, other, g.getFactory());
	if (g.isGeometryCollection()) {
		var g2 = other;
		return GeometryCollectionMapper.map(g, {
			interfaces_: function () {
				return [MapOp];
			},
			map: function (g) {
				return g.intersection(g2);
			}
		});
	}
	g.checkNotGeometryCollection(g);
	g.checkNotGeometryCollection(other);
	return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.INTERSECTION);
};
OverlayOp.symDifference = function (g, other) {
	if (g.isEmpty() || other.isEmpty()) {
		if (g.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, g, other, g.getFactory());
		if (g.isEmpty()) return other.copy();
		if (other.isEmpty()) return g.copy();
	}
	g.checkNotGeometryCollection(g);
	g.checkNotGeometryCollection(other);
	return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.SYMDIFFERENCE);
};
OverlayOp.resultDimension = function (opCode, g0, g1) {
	var dim0 = g0.getDimension();
	var dim1 = g1.getDimension();
	var resultDimension = -1;
	switch (opCode) {
		case OverlayOp.INTERSECTION:
			resultDimension = Math.min(dim0, dim1);
			break;
		case OverlayOp.UNION:
			resultDimension = Math.max(dim0, dim1);
			break;
		case OverlayOp.DIFFERENCE:
			resultDimension = dim0;
			break;
		case OverlayOp.SYMDIFFERENCE:
			resultDimension = Math.max(dim0, dim1);
			break;
	}
	return resultDimension;
};
OverlayOp.createEmptyResult = function (overlayOpCode, a, b, geomFact) {
	var result = null;
	switch (OverlayOp.resultDimension(overlayOpCode, a, b)) {
		case -1:
			result = geomFact.createGeometryCollection(new Array(0).fill(null));
			break;
		case 0:
			result = geomFact.createPoint();
			break;
		case 1:
			result = geomFact.createLineString();
			break;
		case 2:
			result = geomFact.createPolygon();
			break;
	}
	return result;
};
OverlayOp.difference = function (g, other) {
	if (g.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, g, other, g.getFactory());
	if (other.isEmpty()) return g.copy();
	g.checkNotGeometryCollection(g);
	g.checkNotGeometryCollection(other);
	return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.DIFFERENCE);
};
OverlayOp.isResultOfOp = function () {
	if (arguments.length === 2) {
		let label = arguments[0], opCode = arguments[1];
		var loc0 = label.getLocation(0);
		var loc1 = label.getLocation(1);
		return OverlayOp.isResultOfOp(loc0, loc1, opCode);
	} else if (arguments.length === 3) {
		let loc0 = arguments[0], loc1 = arguments[1], overlayOpCode = arguments[2];
		if (loc0 === Location.BOUNDARY) loc0 = Location.INTERIOR;
		if (loc1 === Location.BOUNDARY) loc1 = Location.INTERIOR;
		switch (overlayOpCode) {
			case OverlayOp.INTERSECTION:
				return loc0 === Location.INTERIOR && loc1 === Location.INTERIOR;
			case OverlayOp.UNION:
				return loc0 === Location.INTERIOR || loc1 === Location.INTERIOR;
			case OverlayOp.DIFFERENCE:
				return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR;
			case OverlayOp.SYMDIFFERENCE:
				return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR || loc0 !== Location.INTERIOR && loc1 === Location.INTERIOR;
		}
		return false;
	}
};
OverlayOp.INTERSECTION = 1;
OverlayOp.UNION = 2;
OverlayOp.DIFFERENCE = 3;
OverlayOp.SYMDIFFERENCE = 4;
