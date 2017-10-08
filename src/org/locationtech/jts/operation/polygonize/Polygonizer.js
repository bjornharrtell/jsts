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
	this._lineStringAdder = new LineStringAdder(this);
	this._graph = null;
	this._dangles = new ArrayList();
	this._cutEdges = new ArrayList();
	this._invalidRingLines = new ArrayList();
	this._holeList = null;
	this._shellList = null;
	this._polyList = null;
	this._isCheckingRingsValid = true;
	this._extractOnlyPolygonal = null;
	this._geomFactory = null;
	if (arguments.length === 0) {
		Polygonizer.call(this, false);
	} else if (arguments.length === 1) {
		let extractOnlyPolygonal = arguments[0];
		this._extractOnlyPolygonal = extractOnlyPolygonal;
	}
}
extend(Polygonizer.prototype, {
	getGeometry: function () {
		if (this._geomFactory === null) this._geomFactory = new GeometryFactory();
		this.polygonize();
		if (this._extractOnlyPolygonal) {
			return this._geomFactory.buildGeometry(this._polyList);
		}
		return this._geomFactory.createGeometryCollection(GeometryFactory.toGeometryArray(this._polyList));
	},
	getInvalidRingLines: function () {
		this.polygonize();
		return this._invalidRingLines;
	},
	findValidRings: function (edgeRingList, validEdgeRingList, invalidRingList) {
		for (var i = edgeRingList.iterator(); i.hasNext(); ) {
			var er = i.next();
			if (er.isValid()) validEdgeRingList.add(er); else invalidRingList.add(er.getLineString());
		}
	},
	polygonize: function () {
		if (this._polyList !== null) return null;
		this._polyList = new ArrayList();
		if (this._graph === null) return null;
		this._dangles = this._graph.deleteDangles();
		this._cutEdges = this._graph.deleteCutEdges();
		var edgeRingList = this._graph.getEdgeRings();
		var validEdgeRingList = new ArrayList();
		this._invalidRingLines = new ArrayList();
		if (this._isCheckingRingsValid) {
			this.findValidRings(edgeRingList, validEdgeRingList, this._invalidRingLines);
		} else {
			validEdgeRingList = edgeRingList;
		}
		this.findShellsAndHoles(validEdgeRingList);
		Polygonizer.assignHolesToShells(this._holeList, this._shellList);
		Collections.sort(this._shellList, new EdgeRing.EnvelopeComparator());
		var includeAll = true;
		if (this._extractOnlyPolygonal) {
			Polygonizer.findDisjointShells(this._shellList);
			includeAll = false;
		}
		this._polyList = Polygonizer.extractPolygons(this._shellList, includeAll);
	},
	getDangles: function () {
		this.polygonize();
		return this._dangles;
	},
	getCutEdges: function () {
		this.polygonize();
		return this._cutEdges;
	},
	getPolygons: function () {
		this.polygonize();
		return this._polyList;
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
			this._geomFactory = line.getFactory();
			if (this._graph === null) this._graph = new PolygonizeGraph(this._geomFactory);
			this._graph.addEdge(line);
		} else if (arguments[0] instanceof Geometry) {
			let g = arguments[0];
			g.apply(this._lineStringAdder);
		}
	},
	setCheckRingsValid: function (isCheckingRingsValid) {
		this._isCheckingRingsValid = isCheckingRingsValid;
	},
	findShellsAndHoles: function (edgeRingList) {
		this._holeList = new ArrayList();
		this._shellList = new ArrayList();
		for (var i = edgeRingList.iterator(); i.hasNext(); ) {
			var er = i.next();
			er.computeHole();
			if (er.isHole()) this._holeList.add(er); else this._shellList.add(er);
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
