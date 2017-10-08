import ConformingDelaunayTriangulator from './ConformingDelaunayTriangulator';
import ConstraintVertex from './ConstraintVertex';
import extend from '../../../../extend';
import DelaunayTriangulationBuilder from './DelaunayTriangulationBuilder';
import Segment from './Segment';
import ArrayList from '../../../../java/util/ArrayList';
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter';
import TreeMap from '../../../../java/util/TreeMap';
export default function ConformingDelaunayTriangulationBuilder() {
	this._siteCoords = null;
	this._constraintLines = null;
	this._tolerance = 0.0;
	this._subdiv = null;
	this._constraintVertexMap = new TreeMap();
}
extend(ConformingDelaunayTriangulationBuilder.prototype, {
	createSiteVertices: function (coords) {
		var verts = new ArrayList();
		for (var i = coords.iterator(); i.hasNext(); ) {
			var coord = i.next();
			if (this._constraintVertexMap.containsKey(coord)) continue;
			verts.add(new ConstraintVertex(coord));
		}
		return verts;
	},
	create: function () {
		if (this._subdiv !== null) return null;
		var siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords);
		var segments = new ArrayList();
		if (this._constraintLines !== null) {
			siteEnv.expandToInclude(this._constraintLines.getEnvelopeInternal());
			this.createVertices(this._constraintLines);
			segments = ConformingDelaunayTriangulationBuilder.createConstraintSegments(this._constraintLines);
		}
		var sites = this.createSiteVertices(this._siteCoords);
		var cdt = new ConformingDelaunayTriangulator(sites, this._tolerance);
		cdt.setConstraints(segments, new ArrayList(this._constraintVertexMap.values()));
		cdt.formInitialDelaunay();
		cdt.enforceConstraints();
		this._subdiv = cdt.getSubdivision();
	},
	setTolerance: function (tolerance) {
		this._tolerance = tolerance;
	},
	setConstraints: function (constraintLines) {
		this._constraintLines = constraintLines;
	},
	setSites: function (geom) {
		this._siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
	},
	getEdges: function (geomFact) {
		this.create();
		return this._subdiv.getEdges(geomFact);
	},
	getSubdivision: function () {
		this.create();
		return this._subdiv;
	},
	getTriangles: function (geomFact) {
		this.create();
		return this._subdiv.getTriangles(geomFact);
	},
	createVertices: function (geom) {
		var coords = geom.getCoordinates();
		for (var i = 0; i < coords.length; i++) {
			var v = new ConstraintVertex(coords[i]);
			this._constraintVertexMap.put(coords[i], v);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConformingDelaunayTriangulationBuilder;
	}
});
ConformingDelaunayTriangulationBuilder.createConstraintSegments = function () {
	if (arguments.length === 1) {
		let geom = arguments[0];
		var lines = LinearComponentExtracter.getLines(geom);
		var constraintSegs = new ArrayList();
		for (var i = lines.iterator(); i.hasNext(); ) {
			var line = i.next();
			ConformingDelaunayTriangulationBuilder.createConstraintSegments(line, constraintSegs);
		}
		return constraintSegs;
	} else if (arguments.length === 2) {
		let line = arguments[0], constraintSegs = arguments[1];
		var coords = line.getCoordinates();
		for (var i = 1; i < coords.length; i++) {
			constraintSegs.add(new Segment(coords[i - 1], coords[i]));
		}
	}
};
