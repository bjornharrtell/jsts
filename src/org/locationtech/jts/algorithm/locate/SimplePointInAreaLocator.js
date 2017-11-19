import Location from '../../geom/Location';
import Polygon from '../../geom/Polygon';
import PointLocation from '../PointLocation';
import PointOnGeometryLocator from './PointOnGeometryLocator';
import extend from '../../../../../extend';
import GeometryCollectionIterator from '../../geom/GeometryCollectionIterator';
import GeometryCollection from '../../geom/GeometryCollection';
export default function SimplePointInAreaLocator() {
	this._geom = null;
	let geom = arguments[0];
	this._geom = geom;
}
extend(SimplePointInAreaLocator.prototype, {
	locate: function (p) {
		return SimplePointInAreaLocator.locate(p, this._geom);
	},
	interfaces_: function () {
		return [PointOnGeometryLocator];
	},
	getClass: function () {
		return SimplePointInAreaLocator;
	}
});
SimplePointInAreaLocator.locatePointInPolygon = function (p, poly) {
	if (poly.isEmpty()) return Location.EXTERIOR;
	var shell = poly.getExteriorRing();
	var shellLoc = SimplePointInAreaLocator.locatePointInRing(p, shell);
	if (shellLoc !== Location.INTERIOR) return shellLoc;
	for (var i = 0; i < poly.getNumInteriorRing(); i++) {
		var hole = poly.getInteriorRingN(i);
		var holeLoc = SimplePointInAreaLocator.locatePointInRing(p, hole);
		if (holeLoc === Location.BOUNDARY) return Location.BOUNDARY;
		if (holeLoc === Location.INTERIOR) return Location.EXTERIOR;
	}
	return Location.INTERIOR;
};
SimplePointInAreaLocator.locatePointInRing = function (p, ring) {
	if (!ring.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
	return PointLocation.locateInRing(p, ring.getCoordinates());
};
SimplePointInAreaLocator.containsPointInPolygon = function (p, poly) {
	return Location.EXTERIOR !== SimplePointInAreaLocator.locatePointInPolygon(p, poly);
};
SimplePointInAreaLocator.locateInGeometry = function (p, geom) {
	if (geom instanceof Polygon) {
		return SimplePointInAreaLocator.locatePointInPolygon(p, geom);
	} else if (geom instanceof GeometryCollection) {
		var geomi = new GeometryCollectionIterator(geom);
		while (geomi.hasNext()) {
			var g2 = geomi.next();
			if (g2 !== geom) {
				var loc = SimplePointInAreaLocator.locateInGeometry(p, g2);
				if (loc !== Location.EXTERIOR) return loc;
			}
		}
	}
	return Location.EXTERIOR;
};
SimplePointInAreaLocator.locate = function (p, geom) {
	if (geom.isEmpty()) return Location.EXTERIOR;
	return SimplePointInAreaLocator.locateInGeometry(p, geom);
};
