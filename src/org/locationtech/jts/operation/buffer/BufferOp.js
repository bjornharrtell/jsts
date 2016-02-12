import BufferParameters from './BufferParameters';
import Geometry from '../../geom/Geometry';
import BufferBuilder from './BufferBuilder';
import ScaledNoder from '../../noding/ScaledNoder';
import TopologyException from '../../geom/TopologyException';
import MathUtil from '../../math/MathUtil';
import PrecisionModel from '../../geom/PrecisionModel';
import RuntimeException from '../../../../../java/lang/RuntimeException';
import MCIndexSnapRounder from '../../noding/snapround/MCIndexSnapRounder';
export default class BufferOp {
	constructor(...args) {
		this.argGeom = null;
		this.distance = null;
		this.bufParams = new BufferParameters();
		this.resultGeometry = null;
		this.saveException = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [g] = args;
						this.argGeom = g;
					})(...args);
				case 2:
					return ((...args) => {
						let [g, bufParams] = args;
						this.argGeom = g;
						this.bufParams = bufParams;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static bufferOp(...args) {
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [g, distance] = args;
					var gBuf = new BufferOp(g);
					var geomBuf = gBuf.getResultGeometry(distance);
					return geomBuf;
				})(...args);
			case 3:
				if (Number.isInteger(args[2]) && (args[0] instanceof Geometry && typeof args[1] === "number")) {
					return ((...args) => {
						let [g, distance, quadrantSegments] = args;
						var bufOp = new BufferOp(g);
						bufOp.setQuadrantSegments(quadrantSegments);
						var geomBuf = bufOp.getResultGeometry(distance);
						return geomBuf;
					})(...args);
				} else if (args[2] instanceof BufferParameters && (args[0] instanceof Geometry && typeof args[1] === "number")) {
					return ((...args) => {
						let [g, distance, params] = args;
						var bufOp = new BufferOp(g, params);
						var geomBuf = bufOp.getResultGeometry(distance);
						return geomBuf;
					})(...args);
				}
			case 4:
				return ((...args) => {
					let [g, distance, quadrantSegments, endCapStyle] = args;
					var bufOp = new BufferOp(g);
					bufOp.setQuadrantSegments(quadrantSegments);
					bufOp.setEndCapStyle(endCapStyle);
					var geomBuf = bufOp.getResultGeometry(distance);
					return geomBuf;
				})(...args);
		}
	}
	static precisionScaleFactor(g, distance, maxPrecisionDigits) {
		var env = g.getEnvelopeInternal();
		var envMax = MathUtil.max(Math.abs(env.getMaxX()), Math.abs(env.getMaxY()), Math.abs(env.getMinX()), Math.abs(env.getMinY()));
		var expandByDistance = distance > 0.0 ? distance : 0.0;
		var bufEnvMax = envMax + 2 * expandByDistance;
		var bufEnvPrecisionDigits = Math.trunc(Math.log(bufEnvMax) / Math.log(10) + 1.0);
		var minUnitLog10 = maxPrecisionDigits - bufEnvPrecisionDigits;
		var scaleFactor = Math.pow(10.0, minUnitLog10);
		return scaleFactor;
	}
	bufferFixedPrecision(fixedPM) {
		var noder = new ScaledNoder(new MCIndexSnapRounder(new PrecisionModel(1.0)), fixedPM.getScale());
		var bufBuilder = new BufferBuilder(this.bufParams);
		bufBuilder.setWorkingPrecisionModel(fixedPM);
		bufBuilder.setNoder(noder);
		this.resultGeometry = bufBuilder.buffer(this.argGeom, this.distance);
	}
	bufferReducedPrecision(...args) {
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
					for (var precDigits = BufferOp.MAX_PRECISION_DIGITS; precDigits >= 0; precDigits--) {
						try {
							this.bufferReducedPrecision(precDigits);
						} catch (ex) {
							if (ex instanceof TopologyException) {
								this.saveException = ex;
							} else throw ex;
						} finally {}
						if (this.resultGeometry !== null) return null;
					}
					throw this.saveException;
				})(...args);
			case 1:
				return ((...args) => {
					let [precisionDigits] = args;
					var sizeBasedScaleFactor = BufferOp.precisionScaleFactor(this.argGeom, this.distance, precisionDigits);
					var fixedPM = new PrecisionModel(sizeBasedScaleFactor);
					this.bufferFixedPrecision(fixedPM);
				})(...args);
		}
	}
	computeGeometry() {
		this.bufferOriginalPrecision();
		if (this.resultGeometry !== null) return null;
		var argPM = this.argGeom.getFactory().getPrecisionModel();
		if (argPM.getType() === PrecisionModel.FIXED) this.bufferFixedPrecision(argPM); else this.bufferReducedPrecision();
	}
	setQuadrantSegments(quadrantSegments) {
		this.bufParams.setQuadrantSegments(quadrantSegments);
	}
	bufferOriginalPrecision() {
		try {
			var bufBuilder = new BufferBuilder(this.bufParams);
			this.resultGeometry = bufBuilder.buffer(this.argGeom, this.distance);
		} catch (ex) {
			if (ex instanceof RuntimeException) {
				this.saveException = ex;
			} else throw ex;
		} finally {}
	}
	getResultGeometry(distance) {
		this.distance = distance;
		this.computeGeometry();
		return this.resultGeometry;
	}
	setEndCapStyle(endCapStyle) {
		this.bufParams.setEndCapStyle(endCapStyle);
	}
	getClass() {
		return BufferOp;
	}
}
BufferOp.CAP_ROUND = BufferParameters.CAP_ROUND;
BufferOp.CAP_BUTT = BufferParameters.CAP_FLAT;
BufferOp.CAP_FLAT = BufferParameters.CAP_FLAT;
BufferOp.CAP_SQUARE = BufferParameters.CAP_SQUARE;
BufferOp.MAX_PRECISION_DIGITS = 12;

