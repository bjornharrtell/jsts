import LineString from '../geom/LineString';
import CoordinateList from '../geom/CoordinateList';
import GeometryTransformer from '../geom/util/GeometryTransformer';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import MultiPolygon from '../geom/MultiPolygon';
import LineSegment from '../geom/LineSegment';
export default class Densifier {
	constructor(...args) {
		(() => {
			this.inputGeom = null;
			this.distanceTolerance = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [inputGeom] = args;
						this.inputGeom = inputGeom;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get DensifyTransformer() {
		return DensifyTransformer;
	}
	static densifyPoints(pts, distanceTolerance, precModel) {
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
	}
	static densify(geom, distanceTolerance) {
		var densifier = new Densifier(geom);
		densifier.setDistanceTolerance(distanceTolerance);
		return densifier.getResultGeometry();
	}
	getResultGeometry() {
		return new DensifyTransformer(this.distanceTolerance).transform(this.inputGeom);
	}
	setDistanceTolerance(distanceTolerance) {
		if (distanceTolerance <= 0.0) throw new IllegalArgumentException("Tolerance must be positive");
		this.distanceTolerance = distanceTolerance;
	}
	getClass() {
		return Densifier;
	}
}
class DensifyTransformer extends GeometryTransformer {
	constructor(...args) {
		super();
		(() => {
			this.distanceTolerance = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [distanceTolerance] = args;
						this.distanceTolerance = distanceTolerance;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	transformMultiPolygon(geom, parent) {
		var roughGeom = super.transformMultiPolygon(geom, parent);
		return this.createValidArea(roughGeom);
	}
	transformPolygon(geom, parent) {
		var roughGeom = super.transformPolygon(geom, parent);
		if (parent instanceof MultiPolygon) {
			return roughGeom;
		}
		return this.createValidArea(roughGeom);
	}
	transformCoordinates(coords, parent) {
		var inputPts = coords.toCoordinateArray();
		var newPts = Densifier.densifyPoints(inputPts, this.distanceTolerance, parent.getPrecisionModel());
		if (parent instanceof LineString && newPts.length === 1) {
			newPts = new Array(0);
		}
		return this.factory.getCoordinateSequenceFactory().create(newPts);
	}
	createValidArea(roughAreaGeom) {
		return roughAreaGeom.buffer(0.0);
	}
	getClass() {
		return DensifyTransformer;
	}
}

