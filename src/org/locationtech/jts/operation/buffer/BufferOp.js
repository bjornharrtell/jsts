import BufferParameters from './BufferParameters';
import Geometry from '../../geom/Geometry';
import BufferBuilder from './BufferBuilder';
import ScaledNoder from '../../noding/ScaledNoder';
import TopologyException from '../../geom/TopologyException';
import extend from '../../../../../extend';
import MathUtil from '../../math/MathUtil';
import PrecisionModel from '../../geom/PrecisionModel';
import RuntimeException from '../../../../../java/lang/RuntimeException';
import MCIndexSnapRounder from '../../noding/snapround/MCIndexSnapRounder';
export default function BufferOp() {
	this.argGeom = null;
	this.distance = null;
	this.bufParams = new BufferParameters();
	this.resultGeometry = null;
	this.saveException = null;
	if (arguments.length === 1) {
		let g = arguments[0];
		this.argGeom = g;
	} else if (arguments.length === 2) {
		let g = arguments[0], bufParams = arguments[1];
		this.argGeom = g;
		this.bufParams = bufParams;
	}
}
extend(BufferOp.prototype, {
	bufferFixedPrecision: function (fixedPM) {
		var noder = new ScaledNoder(new MCIndexSnapRounder(new PrecisionModel(1.0)), fixedPM.getScale());
		var bufBuilder = new BufferBuilder(this.bufParams);
		bufBuilder.setWorkingPrecisionModel(fixedPM);
		bufBuilder.setNoder(noder);
		this.resultGeometry = bufBuilder.buffer(this.argGeom, this.distance);
	},
	bufferReducedPrecision: function () {
		if (arguments.length === 0) {
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
		} else if (arguments.length === 1) {
			let precisionDigits = arguments[0];
			var sizeBasedScaleFactor = BufferOp.precisionScaleFactor(this.argGeom, this.distance, precisionDigits);
			var fixedPM = new PrecisionModel(sizeBasedScaleFactor);
			this.bufferFixedPrecision(fixedPM);
		}
	},
	computeGeometry: function () {
		this.bufferOriginalPrecision();
		if (this.resultGeometry !== null) return null;
		var argPM = this.argGeom.getFactory().getPrecisionModel();
		if (argPM.getType() === PrecisionModel.FIXED) this.bufferFixedPrecision(argPM); else this.bufferReducedPrecision();
	},
	setQuadrantSegments: function (quadrantSegments) {
		this.bufParams.setQuadrantSegments(quadrantSegments);
	},
	bufferOriginalPrecision: function () {
		try {
			var bufBuilder = new BufferBuilder(this.bufParams);
			this.resultGeometry = bufBuilder.buffer(this.argGeom, this.distance);
		} catch (ex) {
			if (ex instanceof RuntimeException) {
				this.saveException = ex;
			} else throw ex;
		} finally {}
	},
	getResultGeometry: function (distance) {
		this.distance = distance;
		this.computeGeometry();
		return this.resultGeometry;
	},
	setEndCapStyle: function (endCapStyle) {
		this.bufParams.setEndCapStyle(endCapStyle);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BufferOp;
	}
});
BufferOp.bufferOp = function () {
	if (arguments.length === 2) {
		let g = arguments[0], distance = arguments[1];
		var gBuf = new BufferOp(g);
		var geomBuf = gBuf.getResultGeometry(distance);
		return geomBuf;
	} else if (arguments.length === 3) {
		if (Number.isInteger(arguments[2]) && (arguments[0] instanceof Geometry && typeof arguments[1] === "number")) {
			let g = arguments[0], distance = arguments[1], quadrantSegments = arguments[2];
			var bufOp = new BufferOp(g);
			bufOp.setQuadrantSegments(quadrantSegments);
			var geomBuf = bufOp.getResultGeometry(distance);
			return geomBuf;
		} else if (arguments[2] instanceof BufferParameters && (arguments[0] instanceof Geometry && typeof arguments[1] === "number")) {
			let g = arguments[0], distance = arguments[1], params = arguments[2];
			var bufOp = new BufferOp(g, params);
			var geomBuf = bufOp.getResultGeometry(distance);
			return geomBuf;
		}
	} else if (arguments.length === 4) {
		let g = arguments[0], distance = arguments[1], quadrantSegments = arguments[2], endCapStyle = arguments[3];
		var bufOp = new BufferOp(g);
		bufOp.setQuadrantSegments(quadrantSegments);
		bufOp.setEndCapStyle(endCapStyle);
		var geomBuf = bufOp.getResultGeometry(distance);
		return geomBuf;
	}
};
BufferOp.precisionScaleFactor = function (g, distance, maxPrecisionDigits) {
	var env = g.getEnvelopeInternal();
	var envMax = MathUtil.max(Math.abs(env.getMaxX()), Math.abs(env.getMaxY()), Math.abs(env.getMinX()), Math.abs(env.getMinY()));
	var expandByDistance = distance > 0.0 ? distance : 0.0;
	var bufEnvMax = envMax + 2 * expandByDistance;
	var bufEnvPrecisionDigits = Math.trunc(Math.log(bufEnvMax) / Math.log(10) + 1.0);
	var minUnitLog10 = maxPrecisionDigits - bufEnvPrecisionDigits;
	var scaleFactor = Math.pow(10.0, minUnitLog10);
	return scaleFactor;
};
BufferOp.CAP_ROUND = BufferParameters.CAP_ROUND;
BufferOp.CAP_BUTT = BufferParameters.CAP_FLAT;
BufferOp.CAP_FLAT = BufferParameters.CAP_FLAT;
BufferOp.CAP_SQUARE = BufferParameters.CAP_SQUARE;
BufferOp.MAX_PRECISION_DIGITS = 12;

