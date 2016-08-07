import LineString from '../geom/LineString';
import Geometry from '../geom/Geometry';
import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import EdgeGraph from './EdgeGraph';
import extend from '../../../../extend';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
export default function EdgeGraphBuilder() {
	this.graph = new EdgeGraph();
}
extend(EdgeGraphBuilder.prototype, {
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
			for (var i = geometries.iterator(); i.hasNext(); ) {
				var geometry = i.next();
				this.add(geometry);
			}
		} else if (arguments[0] instanceof LineString) {
			let lineString = arguments[0];
			var seq = lineString.getCoordinateSequence();
			for (var i = 1; i < seq.size(); i++) {
				this.graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i));
			}
		}
	},
	getGraph: function () {
		return this.graph;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeGraphBuilder;
	}
});
EdgeGraphBuilder.build = function (geoms) {
	var builder = new EdgeGraphBuilder();
	builder.add(geoms);
	return builder.getGraph();
};
