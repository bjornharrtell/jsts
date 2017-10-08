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
	this._siteCoords = null;
	this._tolerance = 0.0;
	this._subdiv = null;
	this._clipEnv = null;
	this._diagramEnv = null;
}
extend(VoronoiDiagramBuilder.prototype, {
	create: function () {
		if (this._subdiv !== null) return null;
		var siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords);
		this._diagramEnv = siteEnv;
		var expandBy = Math.max(this._diagramEnv.getWidth(), this._diagramEnv.getHeight());
		this._diagramEnv.expandBy(expandBy);
		if (this._clipEnv !== null) this._diagramEnv.expandToInclude(this._clipEnv);
		var vertices = DelaunayTriangulationBuilder.toVertices(this._siteCoords);
		this._subdiv = new QuadEdgeSubdivision(siteEnv, this._tolerance);
		var triangulator = new IncrementalDelaunayTriangulator(this._subdiv);
		triangulator.insertSites(vertices);
	},
	getDiagram: function (geomFact) {
		this.create();
		var polys = this._subdiv.getVoronoiDiagram(geomFact);
		return VoronoiDiagramBuilder.clipGeometryCollection(polys, this._diagramEnv);
	},
	setTolerance: function (tolerance) {
		this._tolerance = tolerance;
	},
	setSites: function () {
		if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			this._siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
		} else if (hasInterface(arguments[0], Collection)) {
			let coords = arguments[0];
			this._siteCoords = DelaunayTriangulationBuilder.unique(CoordinateArrays.toCoordinateArray(coords));
		}
	},
	setClipEnvelope: function (clipEnv) {
		this._clipEnv = clipEnv;
	},
	getSubdivision: function () {
		this.create();
		return this._subdiv;
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
