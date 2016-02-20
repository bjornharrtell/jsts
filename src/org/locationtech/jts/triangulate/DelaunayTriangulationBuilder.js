import CoordinateList from '../geom/CoordinateList';
import Geometry from '../geom/Geometry';
import Arrays from '../../../../java/util/Arrays';
import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator';
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision';
import extend from '../../../../extend';
import Vertex from './quadedge/Vertex';
import CoordinateArrays from '../geom/CoordinateArrays';
import ArrayList from '../../../../java/util/ArrayList';
import Envelope from '../geom/Envelope';
export default function DelaunayTriangulationBuilder() {
	this.siteCoords = null;
	this.tolerance = 0.0;
	this.subdiv = null;
}
extend(DelaunayTriangulationBuilder.prototype, {
	create: function () {
		if (this.subdiv !== null) return null;
		var siteEnv = DelaunayTriangulationBuilder.envelope(this.siteCoords);
		var vertices = DelaunayTriangulationBuilder.toVertices(this.siteCoords);
		this.subdiv = new QuadEdgeSubdivision(siteEnv, this.tolerance);
		var triangulator = new IncrementalDelaunayTriangulator(this.subdiv);
		triangulator.insertSites(vertices);
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
	getEdges: function (geomFact) {
		this.create();
		return this.subdiv.getEdges(geomFact);
	},
	getSubdivision: function () {
		this.create();
		return this.subdiv;
	},
	getTriangles: function (geomFact) {
		this.create();
		return this.subdiv.getTriangles(geomFact);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DelaunayTriangulationBuilder;
	}
});
DelaunayTriangulationBuilder.extractUniqueCoordinates = function (geom) {
	if (geom === null) return new CoordinateList();
	var coords = geom.getCoordinates();
	return DelaunayTriangulationBuilder.unique(coords);
};
DelaunayTriangulationBuilder.envelope = function (coords) {
	var env = new Envelope();
	for (var i = coords.iterator(); i.hasNext(); ) {
		var coord = i.next();
		env.expandToInclude(coord);
	}
	return env;
};
DelaunayTriangulationBuilder.unique = function (coords) {
	var coordsCopy = CoordinateArrays.copyDeep(coords);
	Arrays.sort(coordsCopy);
	var coordList = new CoordinateList(coordsCopy, false);
	return coordList;
};
DelaunayTriangulationBuilder.toVertices = function (coords) {
	var verts = new ArrayList();
	for (var i = coords.iterator(); i.hasNext(); ) {
		var coord = i.next();
		verts.add(new Vertex(coord));
	}
	return verts;
};

