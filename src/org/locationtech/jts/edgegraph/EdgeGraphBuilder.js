import LineString from '../geom/LineString';
import Geometry from '../geom/Geometry';
import Collection from '../../../../java/util/Collection';
import EdgeGraph from './EdgeGraph';
import GeometryComponentFilter from '../geom/GeometryComponentFilter';
export default class EdgeGraphBuilder {
	constructor(...args) {
		this.graph = new EdgeGraph();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
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
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Geometry) {
						return ((...args) => {
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
						})(...args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
						return ((...args) => {
							let [geometries] = args;
							for (var i = geometries.iterator(); i.hasNext(); ) {
								var geometry = i.next();
								this.add(geometry);
							}
						})(...args);
					} else if (args[0] instanceof LineString) {
						return ((...args) => {
							let [lineString] = args;
							var seq = lineString.getCoordinateSequence();
							for (var i = 1; i < seq.size(); i++) {
								this.graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i));
							}
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getGraph() {
		return this.graph;
	}
	getClass() {
		return EdgeGraphBuilder;
	}
}

