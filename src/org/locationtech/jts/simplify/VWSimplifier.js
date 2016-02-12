import GeometryTransformer from '../geom/util/GeometryTransformer';
import VWLineSimplifier from './VWLineSimplifier';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Polygon from '../geom/Polygon';
import LinearRing from '../geom/LinearRing';
import MultiPolygon from '../geom/MultiPolygon';
export default class VWSimplifier {
	constructor(...args) {
		this.inputGeom = null;
		this.distanceTolerance = null;
		this.isEnsureValidTopology = true;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [inputGeom] = args;
					this.inputGeom = inputGeom;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static get VWTransformer() {
		return VWTransformer;
	}
	static simplify(geom, distanceTolerance) {
		var simp = new VWSimplifier(geom);
		simp.setDistanceTolerance(distanceTolerance);
		return simp.getResultGeometry();
	}
	setEnsureValid(isEnsureValidTopology) {
		this.isEnsureValidTopology = isEnsureValidTopology;
	}
	getResultGeometry() {
		if (this.inputGeom.isEmpty()) return this.inputGeom.copy();
		return new VWTransformer(this.isEnsureValidTopology, this.distanceTolerance).transform(this.inputGeom);
	}
	setDistanceTolerance(distanceTolerance) {
		if (distanceTolerance < 0.0) throw new IllegalArgumentException("Tolerance must be non-negative");
		this.distanceTolerance = distanceTolerance;
	}
	getClass() {
		return VWSimplifier;
	}
}
class VWTransformer extends GeometryTransformer {
	constructor(...args) {
		super();
		this.isEnsureValidTopology = true;
		this.distanceTolerance = null;
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [isEnsureValidTopology, distanceTolerance] = args;
					this.isEnsureValidTopology = isEnsureValidTopology;
					this.distanceTolerance = distanceTolerance;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	transformPolygon(geom, parent) {
		if (geom.isEmpty()) return null;
		var rawGeom = super.transformPolygon(geom, parent);
		if (parent instanceof MultiPolygon) {
			return rawGeom;
		}
		return this.createValidArea(rawGeom);
	}
	createValidArea(rawAreaGeom) {
		if (this.isEnsureValidTopology) return rawAreaGeom.buffer(0.0);
		return rawAreaGeom;
	}
	transformCoordinates(coords, parent) {
		var inputPts = coords.toCoordinateArray();
		var newPts = null;
		if (inputPts.length === 0) {
			newPts = new Array(0);
		} else {
			newPts = VWLineSimplifier.simplify(inputPts, this.distanceTolerance);
		}
		return this.factory.getCoordinateSequenceFactory().create(newPts);
	}
	transformMultiPolygon(geom, parent) {
		var rawGeom = super.transformMultiPolygon(geom, parent);
		return this.createValidArea(rawGeom);
	}
	transformLinearRing(geom, parent) {
		var removeDegenerateRings = parent instanceof Polygon;
		var simpResult = super.transformLinearRing(geom, parent);
		if (removeDegenerateRings && !(simpResult instanceof LinearRing)) return null;
		;
		return simpResult;
	}
	getClass() {
		return VWTransformer;
	}
}

