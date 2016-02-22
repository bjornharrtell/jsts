import LineString from '../geom/LineString';
import CoordinateList from '../geom/CoordinateList';
import GeometryTransformer from '../geom/util/GeometryTransformer';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import MultiPolygon from '../geom/MultiPolygon';
import LineSegment from '../geom/LineSegment';
import inherits from '../../../../inherits';
export default function Densifier() {
	this.inputGeom = null;
	this.distanceTolerance = null;
	let inputGeom = arguments[0];
	this.inputGeom = inputGeom;
}
extend(Densifier.prototype, {
	getResultGeometry: function () {
		return new DensifyTransformer(this.distanceTolerance).transform(this.inputGeom);
	},
	setDistanceTolerance: function (distanceTolerance) {
		if (distanceTolerance <= 0.0) throw new IllegalArgumentException("Tolerance must be positive");
		this.distanceTolerance = distanceTolerance;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Densifier;
	}
});
Densifier.densifyPoints = function (pts, distanceTolerance, precModel) {
	var seg = new LineSegment();
	var coordList = new CoordinateList();
	for (var i = 0; i < pts.length - 1; i++) {
		seg.p0 = pts[i];
		seg.p1 = pts[i + 1];
		coordList.add(seg.p0, false);
		var len = seg.getLength();
		var densifiedSegCount = Math.trunc(len / distanceTolerance) + 1;
		if (densifiedSegCount > 1) {
			var densifiedSegLen = len / densifiedSegCount;
			for (var j = 1; j < densifiedSegCount; j++) {
				var segFract = j * densifiedSegLen / len;
				var p = seg.pointAlong(segFract);
				precModel.makePrecise(p);
				coordList.add(p, false);
			}
		}
	}
	coordList.add(pts[pts.length - 1], false);
	return coordList.toCoordinateArray();
};
Densifier.densify = function (geom, distanceTolerance) {
	var densifier = new Densifier(geom);
	densifier.setDistanceTolerance(distanceTolerance);
	return densifier.getResultGeometry();
};
function DensifyTransformer() {
	GeometryTransformer.apply(this);
	this.distanceTolerance = null;
	let distanceTolerance = arguments[0];
	this.distanceTolerance = distanceTolerance;
}
inherits(DensifyTransformer, GeometryTransformer);
extend(DensifyTransformer.prototype, {
	transformMultiPolygon: function (geom, parent) {
		var roughGeom = GeometryTransformer.prototype.transformMultiPolygon.call(this, geom, parent);
		return this.createValidArea(roughGeom);
	},
	transformPolygon: function (geom, parent) {
		var roughGeom = GeometryTransformer.prototype.transformPolygon.call(this, geom, parent);
		if (parent instanceof MultiPolygon) {
			return roughGeom;
		}
		return this.createValidArea(roughGeom);
	},
	transformCoordinates: function (coords, parent) {
		var inputPts = coords.toCoordinateArray();
		var newPts = Densifier.densifyPoints(inputPts, this.distanceTolerance, parent.getPrecisionModel());
		if (parent instanceof LineString && newPts.length === 1) {
			newPts = new Array(0).fill(null);
		}
		return this.factory.getCoordinateSequenceFactory().create(newPts);
	},
	createValidArea: function (roughAreaGeom) {
		return roughAreaGeom.buffer(0.0);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DensifyTransformer;
	}
});
Densifier.DensifyTransformer = DensifyTransformer;

