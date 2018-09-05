import CoordinateList from '../geom/CoordinateList';
import Geometry from '../geom/Geometry';
import Arrays from '../../../../java/util/Arrays';
import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator';
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision';
import Vertex from './quadedge/Vertex';
import CoordinateArrays from '../geom/CoordinateArrays';
import ArrayList from '../../../../java/util/ArrayList';
import Envelope from '../geom/Envelope';
export default class DelaunayTriangulationBuilder {
	constructor() {
		DelaunayTriangulationBuilder.constructor_.apply(this, arguments);
	}
	static extractUniqueCoordinates(geom) {
		if (geom === null) return new CoordinateList();
		var coords = geom.getCoordinates();
		return DelaunayTriangulationBuilder.unique(coords);
	}
	static envelope(coords) {
		var env = new Envelope();
		for (var i = coords.iterator(); i.hasNext(); ) {
			var coord = i.next();
			env.expandToInclude(coord);
		}
		return env;
	}
	static unique(coords) {
		var coordsCopy = CoordinateArrays.copyDeep(coords);
		Arrays.sort(coordsCopy);
		var coordList = new CoordinateList(coordsCopy, false);
		return coordList;
	}
	static toVertices(coords) {
		var verts = new ArrayList();
		for (var i = coords.iterator(); i.hasNext(); ) {
			var coord = i.next();
			verts.add(new Vertex(coord));
		}
		return verts;
	}
	create() {
		if (this._subdiv !== null) return null;
		var siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords);
		var vertices = DelaunayTriangulationBuilder.toVertices(this._siteCoords);
		this._subdiv = new QuadEdgeSubdivision(siteEnv, this._tolerance);
		var triangulator = new IncrementalDelaunayTriangulator(this._subdiv);
		triangulator.insertSites(vertices);
	}
	setTolerance(tolerance) {
		this._tolerance = tolerance;
	}
	setSites() {
		if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			this._siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
		} else if (hasInterface(arguments[0], Collection)) {
			let coords = arguments[0];
			this._siteCoords = DelaunayTriangulationBuilder.unique(CoordinateArrays.toCoordinateArray(coords));
		}
	}
	getEdges(geomFact) {
		this.create();
		return this._subdiv.getEdges(geomFact);
	}
	getSubdivision() {
		this.create();
		return this._subdiv;
	}
	getTriangles(geomFact) {
		this.create();
		return this._subdiv.getTriangles(geomFact);
	}
	getClass() {
		return DelaunayTriangulationBuilder;
	}
	get interfaces_() {
		return [];
	}
}
DelaunayTriangulationBuilder.constructor_ = function () {
	this._siteCoords = null;
	this._tolerance = 0.0;
	this._subdiv = null;
};
