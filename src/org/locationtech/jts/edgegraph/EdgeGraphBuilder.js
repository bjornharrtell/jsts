import LineString from '../geom/LineString';
import Geometry from '../geom/Geometry';
import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import EdgeGraph from './EdgeGraph';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
export default class EdgeGraphBuilder {
	constructor() {
		EdgeGraphBuilder.constructor_.apply(this, arguments);
	}
	static build(geoms) {
		var builder = new EdgeGraphBuilder();
		builder.add(geoms);
		return builder.getGraph();
	}
	add() {
		if (arguments[0] instanceof Geometry) {
			let geometry = arguments[0];
			geometry.apply(new (class {
				get interfaces_() {
					return [GeometryComponentFilter];
				}
				filter(component) {
					if (component instanceof LineString) {
						this.add(component);
					}
				}
			})());
		} else if (hasInterface(arguments[0], Collection)) {
			let geometries = arguments[0];
			for (var i = geometries.iterator(); i.hasNext(); ) {
				var geometry = i.next();
				this.add(geometry);
			}
		} else if (arguments[0] instanceof LineString) {
			let lineString = arguments[0];
			var seq = lineString.getCoordinateSequence();
			for (var i = 1; i < seq.size(); i++) {
				this._graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i));
			}
		}
	}
	getGraph() {
		return this._graph;
	}
	getClass() {
		return EdgeGraphBuilder;
	}
	get interfaces_() {
		return [];
	}
}
EdgeGraphBuilder.constructor_ = function () {
	this._graph = new EdgeGraph();
};
