import Geometry from '../geom/Geometry';
import hasInterface from '../../../../hasInterface';
import GeometryFactory from '../geom/GeometryFactory';
import Collection from '../../../../java/util/Collection';
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator';
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision';
import extend from '../../../../extend';
import DelaunayTriangulationBuilder from './DelaunayTriangulationBuilder';
import CoordinateArrays from '../geom/CoordinateArrays';
import ArrayList from '../../../../java/util/ArrayList';
export default function VoronoiDiagramBuilder() {
	this.siteCoords = null;
	this.tolerance = 0.0;
	this.subdiv = null;
	this.clipEnv = null;
	this.diagramEnv = null;
}
extend(VoronoiDiagramBuilder.prototype, {
	create: function () {
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
	},
	getDiagram: function (geomFact) {
		this.create();
		var polys = this.subdiv.getVoronoiDiagram(geomFact);
		return VoronoiDiagramBuilder.clipGeometryCollection(polys, this.diagramEnv);
	},
	setTolerance: function (tolerance) {
		this.tolerance = tolerance;
	},
	setSites: function () {
		if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			this.siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
		} else if (hasInterface(arguments[0], Collection)) {
			let coords = arguments[0];
			this.siteCoords = DelaunayTriangulationBuilder.unique(CoordinateArrays.toCoordinateArray(coords));
		}
	},
	setClipEnvelope: function (clipEnv) {
		this.clipEnv = clipEnv;
	},
	getSubdivision: function () {
		this.create();
		return this.subdiv;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return VoronoiDiagramBuilder;
	}
});
VoronoiDiagramBuilder.clipGeometryCollection = function (geom, clipEnv) {
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
};

