import PointLocator from '../../algorithm/PointLocator';
import Location from '../../geom/Location';
import EdgeNodingValidator from '../../geomgraph/EdgeNodingValidator';
import GeometryCollectionMapper from '../../geom/util/GeometryCollectionMapper';
import PolygonBuilder from './PolygonBuilder';
import Position from '../../geomgraph/Position';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
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
	this._ptLocator = new PointLocator();
	this._geomFact = null;
	this._resultGeom = null;
	this._graph = null;
	this._edgeList = new EdgeList();
	this._resultPolyList = new ArrayList();
	this._resultLineList = new ArrayList();
	this._resultPointList = new ArrayList();
	let g0 = arguments[0], g1 = arguments[1];
	GeometryGraphOperation.call(this, g0, g1);
	this._graph = new PlanarGraph(new OverlayNodeFactory());
	this._geomFact = g0.getFactory();
}
inherits(OverlayOp, GeometryGraphOperation);
extend(OverlayOp.prototype, {
	insertUniqueEdge: function (e) {
		var existingEdge = this._edgeList.findEqualEdge(e);
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
			this._edgeList.add(e);
		}
	},
	getGraph: function () {
		return this._graph;
	},
	cancelDuplicateResultEdges: function () {
		for (var it = this._graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			var sym = de.getSym();
			if (de.isInResult() && sym.isInResult()) {
				de.setInResult(false);
				sym.setInResult(false);
			}
		}
	},
	isCoveredByLA: function (coord) {
		if (this.isCovered(coord, this._resultLineList)) return true;
		if (this.isCovered(coord, this._resultPolyList)) return true;
		return false;
	},
	computeGeometry: function (resultPointList, resultLineList, resultPolyList, opcode) {
		var geomList = new ArrayList();
		geomList.addAll(resultPointList);
		geomList.addAll(resultLineList);
		geomList.addAll(resultPolyList);
		if (geomList.isEmpty()) return OverlayOp.createEmptyResult(opcode, this._arg[0].getGeometry(), this._arg[1].getGeometry(), this._geomFact);
		return this._geomFact.buildGeometry(geomList);
	},
	mergeSymLabels: function () {
		for (var nodeit = this._graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().mergeSymLabels();
		}
	},
	isCovered: function (coord, geomList) {
		for (var it = geomList.iterator(); it.hasNext(); ) {
			var geom = it.next();
			var loc = this._ptLocator.locate(coord, geom);
			if (loc !== Location.EXTERIOR) return true;
		}
		return false;
	},
	replaceCollapsedEdges: function () {
		var newEdges = new ArrayList();
		for (var it = this._edgeList.iterator(); it.hasNext(); ) {
			var e = it.next();
			if (e.isCollapsed()) {
				it.remove();
				newEdges.add(e.getCollapsedEdge());
			}
		}
		this._edgeList.addAll(newEdges);
	},
	updateNodeLabelling: function () {
		for (var nodeit = this._graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			var lbl = node.getEdges().getLabel();
			node.getLabel().merge(lbl);
		}
	},
	getResultGeometry: function (overlayOpCode) {
		this.computeOverlay(overlayOpCode);
		return this._resultGeom;
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
		this._arg[0].computeSelfNodes(this._li, false);
		this._arg[1].computeSelfNodes(this._li, false);
		this._arg[0].computeEdgeIntersections(this._arg[1], this._li, true);
		var baseSplitEdges = new ArrayList();
		this._arg[0].computeSplitEdges(baseSplitEdges);
		this._arg[1].computeSplitEdges(baseSplitEdges);
		var splitEdges = baseSplitEdges;
		this.insertUniqueEdges(baseSplitEdges);
		this.computeLabelsFromDepths();
		this.replaceCollapsedEdges();
		EdgeNodingValidator.checkValid(this._edgeList.getEdges());
		this._graph.addEdges(this._edgeList.getEdges());
		this.computeLabelling();
		this.labelIncompleteNodes();
		this.findResultAreaEdges(opCode);
		this.cancelDuplicateResultEdges();
		var polyBuilder = new PolygonBuilder(this._geomFact);
		polyBuilder.add(this._graph);
		this._resultPolyList = polyBuilder.getPolygons();
		var lineBuilder = new LineBuilder(this, this._geomFact, this._ptLocator);
		this._resultLineList = lineBuilder.build(opCode);
		var pointBuilder = new PointBuilder(this, this._geomFact, this._ptLocator);
		this._resultPointList = pointBuilder.build(opCode);
		this._resultGeom = this.computeGeometry(this._resultPointList, this._resultLineList, this._resultPolyList, opCode);
	},
	labelIncompleteNode: function (n, targetIndex) {
		var loc = this._ptLocator.locate(n.getCoordinate(), this._arg[targetIndex].getGeometry());
		n.getLabel().setLocation(targetIndex, loc);
	},
	copyPoints: function (argIndex) {
		for (var i = this._arg[argIndex].getNodeIterator(); i.hasNext(); ) {
			var graphNode = i.next();
			var newNode = this._graph.addNode(graphNode.getCoordinate());
			newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
		}
	},
	findResultAreaEdges: function (opCode) {
		for (var it = this._graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			var label = de.getLabel();
			if (label.isArea() && !de.isInteriorAreaEdge() && OverlayOp.isResultOfOp(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), opCode)) {
				de.setInResult(true);
			}
		}
	},
	computeLabelsFromDepths: function () {
		for (var it = this._edgeList.iterator(); it.hasNext(); ) {
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
		for (var nodeit = this._graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().computeLabelling(this._arg);
		}
		this.mergeSymLabels();
		this.updateNodeLabelling();
	},
	labelIncompleteNodes: function () {
		var nodeCount = 0;
		for (var ni = this._graph.getNodes().iterator(); ni.hasNext(); ) {
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
		if (this.isCovered(coord, this._resultPolyList)) return true;
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
OverlayOp.union = function (geom, other) {
	if (geom.isEmpty() || other.isEmpty()) {
		if (geom.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, geom, other, geom.getFactory());
		if (geom.isEmpty()) return other.copy();
		if (other.isEmpty()) return geom.copy();
	}
	if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
	return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.UNION);
};
OverlayOp.intersection = function (geom, other) {
	if (geom.isEmpty() || other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, geom, other, geom.getFactory());
	if (geom.isGeometryCollection()) {
		var g2 = other;
		return GeometryCollectionMapper.map(geom, {
			interfaces_: function () {
				return [MapOp];
			},
			map: function (g) {
				return g.intersection(g2);
			}
		});
	}
	if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
	return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.INTERSECTION);
};
OverlayOp.symDifference = function (geom, other) {
	if (geom.isEmpty() || other.isEmpty()) {
		if (geom.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, geom, other, geom.getFactory());
		if (geom.isEmpty()) return other.copy();
		if (other.isEmpty()) return geom.copy();
	}
	if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
	return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.SYMDIFFERENCE);
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
			result = geomFact.createGeometryCollection();
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
OverlayOp.difference = function (geom, other) {
	if (geom.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, geom, other, geom.getFactory());
	if (other.isEmpty()) return geom.copy();
	if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
	return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.DIFFERENCE);
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
