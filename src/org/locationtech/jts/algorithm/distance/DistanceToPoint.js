import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import Coordinate from '../../geom/Coordinate';
import Polygon from '../../geom/Polygon';
import LineSegment from '../../geom/LineSegment';
import PointPairDistance from './PointPairDistance';
import GeometryCollection from '../../geom/GeometryCollection';
export default class DistanceToPoint {
	constructor(...args) {
		(() => {})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static computeDistance(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 3:
					if (args[2] instanceof PointPairDistance && (args[0] instanceof Polygon && args[1] instanceof Coordinate)) {
						return ((...args) => {
							let [poly, pt, ptDist] = args;
							DistanceToPoint.computeDistance(poly.getExteriorRing(), pt, ptDist);
							for (var i = 0; i < poly.getNumInteriorRing(); i++) {
								DistanceToPoint.computeDistance(poly.getInteriorRingN(i), pt, ptDist);
							}
						})(...args);
					} else if (args[2] instanceof PointPairDistance && (args[0] instanceof LineSegment && args[1] instanceof Coordinate)) {
						return ((...args) => {
							let [segment, pt, ptDist] = args;
							var closestPt = segment.closestPoint(pt);
							ptDist.setMinimum(closestPt, pt);
						})(...args);
					} else if (args[2] instanceof PointPairDistance && (args[0] instanceof LineString && args[1] instanceof Coordinate)) {
						return ((...args) => {
							let [line, pt, ptDist] = args;
							var tempSegment = new LineSegment();
							var coords = line.getCoordinates();
							for (var i = 0; i < coords.length - 1; i++) {
								tempSegment.setCoordinates(coords[i], coords[i + 1]);
								var closestPt = tempSegment.closestPoint(pt);
								ptDist.setMinimum(closestPt, pt);
							}
						})(...args);
					} else if (args[2] instanceof PointPairDistance && (args[0] instanceof Geometry && args[1] instanceof Coordinate)) {
						return ((...args) => {
							let [geom, pt, ptDist] = args;
							if (geom instanceof LineString) {
								DistanceToPoint.computeDistance(geom, pt, ptDist);
							} else if (geom instanceof Polygon) {
								DistanceToPoint.computeDistance(geom, pt, ptDist);
							} else if (geom instanceof GeometryCollection) {
								var gc = geom;
								for (var i = 0; i < gc.getNumGeometries(); i++) {
									var g = gc.getGeometryN(i);
									DistanceToPoint.computeDistance(g, pt, ptDist);
								}
							} else {
								ptDist.setMinimum(geom.getCoordinate(), pt);
							}
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return DistanceToPoint;
	}
}

