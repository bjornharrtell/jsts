import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import Collection from '../../../../../java/util/Collection';
import EdgeString from './EdgeString';
import LineMergeGraph from './LineMergeGraph';
import GeometryComponentFilter from '../../geom/GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import GraphComponent from '../../planargraph/GraphComponent';
export default class LineMerger {
	constructor(...args) {
		this.graph = new LineMergeGraph();
		this.mergedLineStrings = null;
		this.factory = null;
		this.edgeStrings = null;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	buildEdgeStringsForUnprocessedNodes() {
		for (var i = this.graph.getNodes().iterator(); i.hasNext(); ) {
			var node = i.next();
			if (!node.isMarked()) {
				Assert.isTrue(node.getDegree() === 2);
				this.buildEdgeStringsStartingAt(node);
				node.setMarked(true);
			}
		}
	}
	buildEdgeStringsForNonDegree2Nodes() {
		for (var i = this.graph.getNodes().iterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getDegree() !== 2) {
				this.buildEdgeStringsStartingAt(node);
				node.setMarked(true);
			}
		}
	}
	buildEdgeStringsForObviousStartNodes() {
		this.buildEdgeStringsForNonDegree2Nodes();
	}
	getMergedLineStrings() {
		this.merge();
		return this.mergedLineStrings;
	}
	buildEdgeStringsStartingAt(node) {
		for (var i = node.getOutEdges().iterator(); i.hasNext(); ) {
			var directedEdge = i.next();
			if (directedEdge.getEdge().isMarked()) {
				continue;
			}
			this.edgeStrings.add(this.buildEdgeStringStartingWith(directedEdge));
		}
	}
	merge() {
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
	}
	buildEdgeStringStartingWith(start) {
		var edgeString = new EdgeString(this.factory);
		var current = start;
		do {
			edgeString.add(current);
			current.getEdge().setMarked(true);
			current = current.getNext();
		} while (current !== null && current !== start);
		return edgeString;
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [geometry] = args;
				geometry.apply(new (class {
					filter(component) {
						if (component instanceof LineString) {
							this.add(component);
						}
					}
					get interfaces_() {
						return [GeometryComponentFilter];
					}
				})());
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [geometries] = args;
				this.mergedLineStrings = null;
				for (var i = geometries.iterator(); i.hasNext(); ) {
					var geometry = i.next();
					this.add(geometry);
				}
			} else if (args[0] instanceof LineString) {
				let [lineString] = args;
				if (this.factory === null) {
					this.factory = lineString.getFactory();
				}
				this.graph.addEdge(lineString);
			}
		}
	}
	buildEdgeStringsForIsolatedLoops() {
		this.buildEdgeStringsForUnprocessedNodes();
	}
	getClass() {
		return LineMerger;
	}
}

