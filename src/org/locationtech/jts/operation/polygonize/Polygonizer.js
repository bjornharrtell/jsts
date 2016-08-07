import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import PolygonizeGraph from './PolygonizeGraph';
import hasInterface from '../../../../../hasInterface';
import GeometryFactory from '../../geom/GeometryFactory';
import Collection from '../../../../../java/util/Collection';
import extend from '../../../../../extend';
import Collections from '../../../../../java/util/Collections';
import EdgeRing from './EdgeRing';
import GeometryComponentFilter from '../../geom/GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default function Polygonizer() {
	this.lineStringAdder = new LineStringAdder(this);
	this.graph = null;
	this.dangles = new ArrayList();
	this.cutEdges = new ArrayList();
	this.invalidRingLines = new ArrayList();
	this.holeList = null;
	this.shellList = null;
	this.polyList = null;
	this.isCheckingRingsValid = true;
	this.extractOnlyPolygonal = null;
	this.geomFactory = null;
	if (arguments.length === 0) {
		Polygonizer.call(this, false);
	} else if (arguments.length === 1) {
		let extractOnlyPolygonal = arguments[0];
		this.extractOnlyPolygonal = extractOnlyPolygonal;
	}
}
extend(Polygonizer.prototype, {
	getGeometry: function () {
		if (this.geomFactory === null) this.geomFactory = new GeometryFactory();
		this.polygonize();
		if (this.extractOnlyPolygonal) {
			return this.geomFactory.buildGeometry(this.polyList);
		}
		return this.geomFactory.createGeometryCollection(GeometryFactory.toGeometryArray(this.polyList));
	},
	getInvalidRingLines: function () {
		this.polygonize();
		return this.invalidRingLines;
	},
	findValidRings: function (edgeRingList, validEdgeRingList, invalidRingList) {
		for (var i = edgeRingList.iterator(); i.hasNext(); ) {
			var er = i.next();
			if (er.isValid()) validEdgeRingList.add(er); else invalidRingList.add(er.getLineString());
		}
	},
	polygonize: function () {
		if (this.polyList !== null) return null;
		this.polyList = new ArrayList();
		if (this.graph === null) return null;
		this.dangles = this.graph.deleteDangles();
		this.cutEdges = this.graph.deleteCutEdges();
		var edgeRingList = this.graph.getEdgeRings();
		var validEdgeRingList = new ArrayList();
		this.invalidRingLines = new ArrayList();
		if (this.isCheckingRingsValid) {
			this.findValidRings(edgeRingList, validEdgeRingList, this.invalidRingLines);
		} else {
			validEdgeRingList = edgeRingList;
		}
		this.findShellsAndHoles(validEdgeRingList);
		Polygonizer.assignHolesToShells(this.holeList, this.shellList);
		Collections.sort(this.shellList, new EdgeRing.EnvelopeComparator());
		var includeAll = true;
		if (this.extractOnlyPolygonal) {
			Polygonizer.findDisjointShells(this.shellList);
			includeAll = false;
		}
		this.polyList = Polygonizer.extractPolygons(this.shellList, includeAll);
	},
	getDangles: function () {
		this.polygonize();
		return this.dangles;
	},
	getCutEdges: function () {
		this.polygonize();
		return this.cutEdges;
	},
	getPolygons: function () {
		this.polygonize();
		return this.polyList;
	},
	add: function () {
		if (hasInterface(arguments[0], Collection)) {
			let geomList = arguments[0];
			for (var i = geomList.iterator(); i.hasNext(); ) {
				var geometry = i.next();
				this.add(geometry);
			}
		} else if (arguments[0] instanceof LineString) {
			let line = arguments[0];
			this.geomFactory = line.getFactory();
			if (this.graph === null) this.graph = new PolygonizeGraph(this.geomFactory);
			this.graph.addEdge(line);
		} else if (arguments[0] instanceof Geometry) {
			let g = arguments[0];
			g.apply(this.lineStringAdder);
		}
	},
	setCheckRingsValid: function (isCheckingRingsValid) {
		this.isCheckingRingsValid = isCheckingRingsValid;
	},
	findShellsAndHoles: function (edgeRingList) {
		this.holeList = new ArrayList();
		this.shellList = new ArrayList();
		for (var i = edgeRingList.iterator(); i.hasNext(); ) {
			var er = i.next();
			er.computeHole();
			if (er.isHole()) this.holeList.add(er); else this.shellList.add(er);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Polygonizer;
	}
});
Polygonizer.findOuterShells = function (shellList) {
	for (var i = shellList.iterator(); i.hasNext(); ) {
		var er = i.next();
		var outerHoleER = er.getOuterHole();
		if (outerHoleER !== null && !outerHoleER.isProcessed()) {
			er.setIncluded(true);
			outerHoleER.setProcessed(true);
		}
	}
};
Polygonizer.extractPolygons = function (shellList, includeAll) {
	var polyList = new ArrayList();
	for (var i = shellList.iterator(); i.hasNext(); ) {
		var er = i.next();
		if (includeAll || er.isIncluded()) {
			polyList.add(er.getPolygon());
		}
	}
	return polyList;
};
Polygonizer.assignHolesToShells = function (holeList, shellList) {
	for (var i = holeList.iterator(); i.hasNext(); ) {
		var holeER = i.next();
		Polygonizer.assignHoleToShell(holeER, shellList);
	}
};
Polygonizer.assignHoleToShell = function (holeER, shellList) {
	var shell = EdgeRing.findEdgeRingContaining(holeER, shellList);
	if (shell !== null) {
		shell.addHole(holeER);
	}
};
Polygonizer.findDisjointShells = function (shellList) {
	Polygonizer.findOuterShells(shellList);
	var isMoreToScan = null;
	do {
		isMoreToScan = false;
		for (var i = shellList.iterator(); i.hasNext(); ) {
			var er = i.next();
			if (er.isIncludedSet()) continue;
			er.updateIncluded();
			if (!er.isIncludedSet()) {
				isMoreToScan = true;
			}
		}
	} while (isMoreToScan);
};
function LineStringAdder() {
	this.p = null;
	let p = arguments[0];
	this.p = p;
}
extend(LineStringAdder.prototype, {
	filter: function (g) {
		if (g instanceof LineString) this.p.add(g);
	},
	interfaces_: function () {
		return [GeometryComponentFilter];
	},
	getClass: function () {
		return LineStringAdder;
	}
});
Polygonizer.LineStringAdder = LineStringAdder;
