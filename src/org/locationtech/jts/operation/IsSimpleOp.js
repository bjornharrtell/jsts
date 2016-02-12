import TreeSet from '../../../../java/util/TreeSet';
import LineString from '../geom/LineString';
import MultiPoint from '../geom/MultiPoint';
import GeometryGraph from '../geomgraph/GeometryGraph';
import GeometryCollection from '../geom/GeometryCollection';
import Polygonal from '../geom/Polygonal';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter';
import TreeMap from '../../../../java/util/TreeMap';
import MultiLineString from '../geom/MultiLineString';
export default class IsSimpleOp {
	constructor(...args) {
		this.inputGeom = null;
		this.isClosedEndpointsInInterior = true;
		this.nonSimpleLocation = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geom] = args;
						this.inputGeom = geom;
					})(...args);
				case 2:
					return ((...args) => {
						let [geom, boundaryNodeRule] = args;
						this.inputGeom = geom;
						this.isClosedEndpointsInInterior = !boundaryNodeRule.isInBoundary(2);
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get EndpointInfo() {
		return EndpointInfo;
	}
	isSimpleMultiPoint(mp) {
		if (mp.isEmpty()) return true;
		var points = new TreeSet();
		for (var i = 0; i < mp.getNumGeometries(); i++) {
			var pt = mp.getGeometryN(i);
			var p = pt.getCoordinate();
			if (points.contains(p)) {
				this.nonSimpleLocation = p;
				return false;
			}
			points.add(p);
		}
		return true;
	}
	isSimplePolygonal(geom) {
		var rings = LinearComponentExtracter.getLines(geom);
		for (var i = rings.iterator(); i.hasNext(); ) {
			var ring = i.next();
			if (!this.isSimpleLinearGeometry(ring)) return false;
		}
		return true;
	}
	hasClosedEndpointIntersection(graph) {
		var endPoints = new TreeMap();
		for (var i = graph.getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var maxSegmentIndex = e.getMaximumSegmentIndex();
			var isClosed = e.isClosed();
			var p0 = e.getCoordinate(0);
			this.addEndpoint(endPoints, p0, isClosed);
			var p1 = e.getCoordinate(e.getNumPoints() - 1);
			this.addEndpoint(endPoints, p1, isClosed);
		}
		for (var i = endPoints.values().iterator(); i.hasNext(); ) {
			var eiInfo = i.next();
			if (eiInfo.isClosed && eiInfo.degree !== 2) {
				this.nonSimpleLocation = eiInfo.getCoordinate();
				return true;
			}
		}
		return false;
	}
	getNonSimpleLocation() {
		return this.nonSimpleLocation;
	}
	isSimpleLinearGeometry(geom) {
		if (geom.isEmpty()) return true;
		var graph = new GeometryGraph(0, geom);
		var li = new RobustLineIntersector();
		var si = graph.computeSelfNodes(li, true);
		if (!si.hasIntersection()) return true;
		if (si.hasProperIntersection()) {
			this.nonSimpleLocation = si.getProperIntersectionPoint();
			return false;
		}
		if (this.hasNonEndpointIntersection(graph)) return false;
		if (this.isClosedEndpointsInInterior) {
			if (this.hasClosedEndpointIntersection(graph)) return false;
		}
		return true;
	}
	hasNonEndpointIntersection(graph) {
		for (var i = graph.getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var maxSegmentIndex = e.getMaximumSegmentIndex();
			for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				if (!ei.isEndPoint(maxSegmentIndex)) {
					this.nonSimpleLocation = ei.getCoordinate();
					return true;
				}
			}
		}
		return false;
	}
	addEndpoint(endPoints, p, isClosed) {
		var eiInfo = endPoints.get(p);
		if (eiInfo === null) {
			eiInfo = new EndpointInfo(p);
			endPoints.put(p, eiInfo);
		}
		eiInfo.addEndpoint(isClosed);
	}
	computeSimple(geom) {
		this.nonSimpleLocation = null;
		if (geom.isEmpty()) return true;
		if (geom instanceof LineString) return this.isSimpleLinearGeometry(geom);
		if (geom instanceof MultiLineString) return this.isSimpleLinearGeometry(geom);
		if (geom instanceof MultiPoint) return this.isSimpleMultiPoint(geom);
		if (geom.interfaces_ && geom.interfaces_.indexOf(Polygonal) > -1) return this.isSimplePolygonal(geom);
		if (geom instanceof GeometryCollection) return this.isSimpleGeometryCollection(geom);
		return true;
	}
	isSimple() {
		this.nonSimpleLocation = null;
		return this.computeSimple(this.inputGeom);
	}
	isSimpleGeometryCollection(geom) {
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var comp = geom.getGeometryN(i);
			if (!this.computeSimple(comp)) return false;
		}
		return true;
	}
	getClass() {
		return IsSimpleOp;
	}
}
class EndpointInfo {
	constructor(...args) {
		this.pt = null;
		this.isClosed = null;
		this.degree = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [pt] = args;
					this.pt = pt;
					this.isClosed = false;
					this.degree = 0;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	addEndpoint(isClosed) {
		this.degree++;
		this.isClosed |= isClosed;
	}
	getCoordinate() {
		return this.pt;
	}
	getClass() {
		return EndpointInfo;
	}
}

