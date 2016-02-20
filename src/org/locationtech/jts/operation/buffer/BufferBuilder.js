import Location from '../../geom/Location';
import BufferSubgraph from './BufferSubgraph';
import PolygonBuilder from '../overlay/PolygonBuilder';
import GeometryFactory from '../../geom/GeometryFactory';
import Position from '../../geomgraph/Position';
import MCIndexNoder from '../../noding/MCIndexNoder';
import OffsetCurveBuilder from './OffsetCurveBuilder';
import extend from '../../../../../extend';
import Collections from '../../../../../java/util/Collections';
import SubgraphDepthLocater from './SubgraphDepthLocater';
import OffsetCurveSetBuilder from './OffsetCurveSetBuilder';
import Label from '../../geomgraph/Label';
import OverlayNodeFactory from '../overlay/OverlayNodeFactory';
import EdgeList from '../../geomgraph/EdgeList';
import ArrayList from '../../../../../java/util/ArrayList';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
import IntersectionAdder from '../../noding/IntersectionAdder';
import Edge from '../../geomgraph/Edge';
import PlanarGraph from '../../geomgraph/PlanarGraph';
export default function BufferBuilder() {
	this.bufParams = null;
	this.workingPrecisionModel = null;
	this.workingNoder = null;
	this.geomFact = null;
	this.graph = null;
	this.edgeList = new EdgeList();
	let bufParams = arguments[0];
	this.bufParams = bufParams;
}
extend(BufferBuilder.prototype, {
	setWorkingPrecisionModel: function (pm) {
		this.workingPrecisionModel = pm;
	},
	insertUniqueEdge: function (e) {
		var existingEdge = this.edgeList.findEqualEdge(e);
		if (existingEdge !== null) {
			var existingLabel = existingEdge.getLabel();
			var labelToMerge = e.getLabel();
			if (!existingEdge.isPointwiseEqual(e)) {
				labelToMerge = new Label(e.getLabel());
				labelToMerge.flip();
			}
			existingLabel.merge(labelToMerge);
			var mergeDelta = BufferBuilder.depthDelta(labelToMerge);
			var existingDelta = existingEdge.getDepthDelta();
			var newDelta = existingDelta + mergeDelta;
			existingEdge.setDepthDelta(newDelta);
		} else {
			this.edgeList.add(e);
			e.setDepthDelta(BufferBuilder.depthDelta(e.getLabel()));
		}
	},
	buildSubgraphs: function (subgraphList, polyBuilder) {
		var processedGraphs = new ArrayList();
		for (var i = subgraphList.iterator(); i.hasNext(); ) {
			var subgraph = i.next();
			var p = subgraph.getRightmostCoordinate();
			var locater = new SubgraphDepthLocater(processedGraphs);
			var outsideDepth = locater.getDepth(p);
			subgraph.computeDepth(outsideDepth);
			subgraph.findResultEdges();
			processedGraphs.add(subgraph);
			polyBuilder.add(subgraph.getDirectedEdges(), subgraph.getNodes());
		}
	},
	createSubgraphs: function (graph) {
		var subgraphList = new ArrayList();
		for (var i = graph.getNodes().iterator(); i.hasNext(); ) {
			var node = i.next();
			if (!node.isVisited()) {
				var subgraph = new BufferSubgraph();
				subgraph.create(node);
				subgraphList.add(subgraph);
			}
		}
		Collections.sort(subgraphList, Collections.reverseOrder());
		return subgraphList;
	},
	createEmptyResultGeometry: function () {
		var emptyGeom = this.geomFact.createPolygon();
		return emptyGeom;
	},
	getNoder: function (precisionModel) {
		if (this.workingNoder !== null) return this.workingNoder;
		var noder = new MCIndexNoder();
		var li = new RobustLineIntersector();
		li.setPrecisionModel(precisionModel);
		noder.setSegmentIntersector(new IntersectionAdder(li));
		return noder;
	},
	buffer: function (g, distance) {
		var precisionModel = this.workingPrecisionModel;
		if (precisionModel === null) precisionModel = g.getPrecisionModel();
		this.geomFact = g.getFactory();
		var curveBuilder = new OffsetCurveBuilder(precisionModel, this.bufParams);
		var curveSetBuilder = new OffsetCurveSetBuilder(g, distance, curveBuilder);
		var bufferSegStrList = curveSetBuilder.getCurves();
		if (bufferSegStrList.size() <= 0) {
			return this.createEmptyResultGeometry();
		}
		this.computeNodedEdges(bufferSegStrList, precisionModel);
		this.graph = new PlanarGraph(new OverlayNodeFactory());
		this.graph.addEdges(this.edgeList.getEdges());
		var subgraphList = this.createSubgraphs(this.graph);
		var polyBuilder = new PolygonBuilder(this.geomFact);
		this.buildSubgraphs(subgraphList, polyBuilder);
		var resultPolyList = polyBuilder.getPolygons();
		if (resultPolyList.size() <= 0) {
			return this.createEmptyResultGeometry();
		}
		var resultGeom = this.geomFact.buildGeometry(resultPolyList);
		return resultGeom;
	},
	computeNodedEdges: function (bufferSegStrList, precisionModel) {
		var noder = this.getNoder(precisionModel);
		noder.computeNodes(bufferSegStrList);
		var nodedSegStrings = noder.getNodedSubstrings();
		for (var i = nodedSegStrings.iterator(); i.hasNext(); ) {
			var segStr = i.next();
			var pts = segStr.getCoordinates();
			if (pts.length === 2 && pts[0].equals2D(pts[1])) continue;
			var oldLabel = segStr.getData();
			var edge = new Edge(segStr.getCoordinates(), new Label(oldLabel));
			this.insertUniqueEdge(edge);
		}
	},
	setNoder: function (noder) {
		this.workingNoder = noder;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BufferBuilder;
	}
});
BufferBuilder.depthDelta = function (label) {
	var lLoc = label.getLocation(0, Position.LEFT);
	var rLoc = label.getLocation(0, Position.RIGHT);
	if (lLoc === Location.INTERIOR && rLoc === Location.EXTERIOR) return 1; else if (lLoc === Location.EXTERIOR && rLoc === Location.INTERIOR) return -1;
	return 0;
};
BufferBuilder.convertSegStrings = function (it) {
	var fact = new GeometryFactory();
	var lines = new ArrayList();
	while (it.hasNext()) {
		var ss = it.next();
		var line = fact.createLineString(ss.getCoordinates());
		lines.add(line);
	}
	return fact.buildGeometry(lines);
};

