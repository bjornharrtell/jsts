import Geometry from '../geom/Geometry';
import GeometryFactory from '../geom/GeometryFactory';
import Collection from '../../../../java/util/Collection';
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator';
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision';
import DelaunayTriangulationBuilder from './DelaunayTriangulationBuilder';
import CoordinateArrays from '../geom/CoordinateArrays';
import ArrayList from '../../../../java/util/ArrayList';
export default class VoronoiDiagramBuilder {
	constructor(...args) {
		this.siteCoords = null;
		this.tolerance = 0.0;
		this.subdiv = null;
		this.clipEnv = null;
		this.diagramEnv = null;
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static clipGeometryCollection(geom, clipEnv) {
		var clipPoly = geom.getFactory().toGeometry(clipEnv);
		var clipped = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var g = geom.getGeometryN(i);
			var result = null;
			if (clipEnv.contains(g.getEnvelopeInternal())) result = g; else if (clipEnv.intersects(g.getEnvelopeInternal())) {
				result = clipPoly.intersection(g);
				result.setUserData(g.getUserData());
			}
			if (result !== null && !result.isEmpty()) {
				clipped.add(result);
			}
		}
		return geom.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(clipped));
	}
	create() {
		if (this.subdiv !== null) return null;
		var siteEnv = DelaunayTriangulationBuilder.envelope(this.siteCoords);
		this.diagramEnv = siteEnv;
		var expandBy = Math.max(this.diagramEnv.getWidth(), this.diagramEnv.getHeight());
		this.diagramEnv.expandBy(expandBy);
		if (this.clipEnv !== null) this.diagramEnv.expandToInclude(this.clipEnv);
		var vertices = DelaunayTriangulationBuilder.toVertices(this.siteCoords);
		this.subdiv = new QuadEdgeSubdivision(siteEnv, this.tolerance);
		var triangulator = new IncrementalDelaunayTriangulator(this.subdiv);
		triangulator.insertSites(vertices);
	}
	getDiagram(geomFact) {
		this.create();
		var polys = this.subdiv.getVoronoiDiagram(geomFact);
		return VoronoiDiagramBuilder.clipGeometryCollection(polys, this.diagramEnv);
	}
	setTolerance(tolerance) {
		this.tolerance = tolerance;
	}
	setSites(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Geometry) {
					return ((...args) => {
						let [geom] = args;
						this.siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
					})(...args);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
					return ((...args) => {
						let [coords] = args;
						this.siteCoords = DelaunayTriangulationBuilder.unique(CoordinateArrays.toCoordinateArray(coords));
					})(...args);
				}
		}
	}
	setClipEnvelope(clipEnv) {
		this.clipEnv = clipEnv;
	}
	getSubdivision() {
		this.create();
		return this.subdiv;
	}
	getClass() {
		return VoronoiDiagramBuilder;
	}
}

