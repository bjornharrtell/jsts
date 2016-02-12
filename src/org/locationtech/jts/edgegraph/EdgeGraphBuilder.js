import LineString from '../geom/LineString';
import Geometry from '../geom/Geometry';
import Collection from '../../../../java/util/Collection';
import EdgeGraph from './EdgeGraph';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
export default class EdgeGraphBuilder {
	constructor(...args) {
		this.graph = new EdgeGraph();
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	static build(geoms) {
		var builder = new EdgeGraphBuilder();
		builder.add(geoms);
		return builder.getGraph();
	}
	add(...args) {
		switch (args.length) {
			case 1:
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
					for (var i = geometries.iterator(); i.hasNext(); ) {
						var geometry = i.next();
						this.add(geometry);
					}
				} else if (args[0] instanceof LineString) {
					let [lineString] = args;
					var seq = lineString.getCoordinateSequence();
					for (var i = 1; i < seq.size(); i++) {
						this.graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i));
					}
				}
				break;
		}
	}
	getGraph() {
		return this.graph;
	}
	getClass() {
		return EdgeGraphBuilder;
	}
}

