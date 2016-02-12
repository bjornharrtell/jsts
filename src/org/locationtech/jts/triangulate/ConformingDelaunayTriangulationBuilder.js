import ConformingDelaunayTriangulator from './ConformingDelaunayTriangulator';
import ConstraintVertex from './ConstraintVertex';
import DelaunayTriangulationBuilder from './DelaunayTriangulationBuilder';
import Segment from './Segment';
import ArrayList from '../../../../java/util/ArrayList';
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter';
import TreeMap from '../../../../java/util/TreeMap';
export default class ConformingDelaunayTriangulationBuilder {
	constructor(...args) {
		this.siteCoords = null;
		this.constraintLines = null;
		this.tolerance = 0.0;
		this.subdiv = null;
		this.constraintVertexMap = new TreeMap();
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
	static createConstraintSegments(...args) {
		switch (args.length) {
			case 1:
				{
					let [geom] = args;
					var lines = LinearComponentExtracter.getLines(geom);
					var constraintSegs = new ArrayList();
					for (var i = lines.iterator(); i.hasNext(); ) {
						var line = i.next();
						ConformingDelaunayTriangulationBuilder.createConstraintSegments(line, constraintSegs);
					}
					return constraintSegs;
					break;
				}
			case 2:
				{
					let [line, constraintSegs] = args;
					var coords = line.getCoordinates();
					for (var i = 1; i < coords.length; i++) {
						constraintSegs.add(new Segment(coords[i - 1], coords[i]));
					}
					break;
				}
		}
	}
	createSiteVertices(coords) {
		var verts = new ArrayList();
		for (var i = coords.iterator(); i.hasNext(); ) {
			var coord = i.next();
			if (this.constraintVertexMap.containsKey(coord)) continue;
			verts.add(new ConstraintVertex(coord));
		}
		return verts;
	}
	create() {
		if (this.subdiv !== null) return null;
		var siteEnv = DelaunayTriangulationBuilder.envelope(this.siteCoords);
		var segments = new ArrayList();
		if (this.constraintLines !== null) {
			siteEnv.expandToInclude(this.constraintLines.getEnvelopeInternal());
			this.createVertices(this.constraintLines);
			segments = ConformingDelaunayTriangulationBuilder.createConstraintSegments(this.constraintLines);
		}
		var sites = this.createSiteVertices(this.siteCoords);
		var cdt = new ConformingDelaunayTriangulator(sites, this.tolerance);
		cdt.setConstraints(segments, new ArrayList(this.constraintVertexMap.values()));
		cdt.formInitialDelaunay();
		cdt.enforceConstraints();
		this.subdiv = cdt.getSubdivision();
	}
	setTolerance(tolerance) {
		this.tolerance = tolerance;
	}
	setConstraints(constraintLines) {
		this.constraintLines = constraintLines;
	}
	setSites(geom) {
		this.siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
	}
	getEdges(geomFact) {
		this.create();
		return this.subdiv.getEdges(geomFact);
	}
	getSubdivision() {
		this.create();
		return this.subdiv;
	}
	getTriangles(geomFact) {
		this.create();
		return this.subdiv.getTriangles(geomFact);
	}
	createVertices(geom) {
		var coords = geom.getCoordinates();
		for (var i = 0; i < coords.length; i++) {
			var v = new ConstraintVertex(coords[i]);
			this.constraintVertexMap.put(coords[i], v);
		}
	}
	getClass() {
		return ConformingDelaunayTriangulationBuilder;
	}
}

