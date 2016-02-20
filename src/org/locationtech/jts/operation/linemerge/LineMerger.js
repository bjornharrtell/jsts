import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import hasInterface from '../../../../../hasInterface';
import Collection from '../../../../../java/util/Collection';
import EdgeString from './EdgeString';
import extend from '../../../../../extend';
import LineMergeGraph from './LineMergeGraph';
import GeometryComponentFilter from '../../geom/GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import GraphComponent from '../../planargraph/GraphComponent';
export default function LineMerger() {
	this.graph = new LineMergeGraph();
	this.mergedLineStrings = null;
	this.factory = null;
	this.edgeStrings = null;
}
extend(LineMerger.prototype, {
	buildEdgeStringsForUnprocessedNodes: function () {
		for (var i = this.graph.getNodes().iterator(); i.hasNext(); ) {
			var node = i.next();
			if (!node.isMarked()) {
				Assert.isTrue(node.getDegree() === 2);
				this.buildEdgeStringsStartingAt(node);
				node.setMarked(true);
			}
		}
	},
	buildEdgeStringsForNonDegree2Nodes: function () {
		for (var i = this.graph.getNodes().iterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getDegree() !== 2) {
				this.buildEdgeStringsStartingAt(node);
				node.setMarked(true);
			}
		}
	},
	buildEdgeStringsForObviousStartNodes: function () {
		this.buildEdgeStringsForNonDegree2Nodes();
	},
	getMergedLineStrings: function () {
		this.merge();
		return this.mergedLineStrings;
	},
	buildEdgeStringsStartingAt: function (node) {
		for (var i = node.getOutEdges().iterator(); i.hasNext(); ) {
			var directedEdge = i.next();
			if (directedEdge.getEdge().isMarked()) {
				continue;
			}
			this.edgeStrings.add(this.buildEdgeStringStartingWith(directedEdge));
		}
	},
	merge: function () {
		if (this.mergedLineStrings !== null) {
			return null;
		}
		GraphComponent.setMarked(this.graph.nodeIterator(), false);
		GraphComponent.setMarked(this.graph.edgeIterator(), false);
		this.edgeStrings = new ArrayList();
		this.buildEdgeStringsForObviousStartNodes();
		this.buildEdgeStringsForIsolatedLoops();
		this.mergedLineStrings = new ArrayList();
		for (var i = this.edgeStrings.iterator(); i.hasNext(); ) {
			var edgeString = i.next();
			this.mergedLineStrings.add(edgeString.toLineString());
		}
	},
	buildEdgeStringStartingWith: function (start) {
		var edgeString = new EdgeString(this.factory);
		var current = start;
		do {
			edgeString.add(current);
			current.getEdge().setMarked(true);
			current = current.getNext();
		} while (current !== null && current !== start);
		return edgeString;
	},
	add: function () {
		if (arguments[0] instanceof Geometry) {
			let geometry = arguments[0];
			geometry.apply({
				interfaces_: function () {
					return [GeometryComponentFilter];
				},
				filter: function (component) {
					if (component instanceof LineString) {
						this.add(component);
					}
				}
			});
		} else if (hasInterface(arguments[0], Collection)) {
			let geometries = arguments[0];
			this.mergedLineStrings = null;
			for (var i = geometries.iterator(); i.hasNext(); ) {
				var geometry = i.next();
				this.add(geometry);
			}
		} else if (arguments[0] instanceof LineString) {
			let lineString = arguments[0];
			if (this.factory === null) {
				this.factory = lineString.getFactory();
			}
			this.graph.addEdge(lineString);
		}
	},
	buildEdgeStringsForIsolatedLoops: function () {
		this.buildEdgeStringsForUnprocessedNodes();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineMerger;
	}
});

