import extend from '../../../../extend';
import CommonBitsOp from './CommonBitsOp';
import RuntimeException from '../../../../java/lang/RuntimeException';
export default function EnhancedPrecisionOp() {}
extend(EnhancedPrecisionOp.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EnhancedPrecisionOp;
	}
});
EnhancedPrecisionOp.union = function (geom0, geom1) {
	var originalEx = null;
	try {
		var result = geom0.union(geom1);
		return result;
	} catch (ex) {
		if (ex instanceof RuntimeException) {
			originalEx = ex;
		} else throw ex;
	} finally {}
	try {
		var cbo = new CommonBitsOp(true);
		var resultEP = cbo.union(geom0, geom1);
		if (!resultEP.isValid()) throw originalEx;
		return resultEP;
	} catch (ex2) {
		if (ex2 instanceof RuntimeException) {
			throw originalEx;
		} else throw ex2;
	} finally {}
};
EnhancedPrecisionOp.intersection = function (geom0, geom1) {
	var originalEx = null;
	try {
		var result = geom0.intersection(geom1);
		return result;
	} catch (ex) {
		if (ex instanceof RuntimeException) {
			originalEx = ex;
		} else throw ex;
	} finally {}
	try {
		var cbo = new CommonBitsOp(true);
		var resultEP = cbo.intersection(geom0, geom1);
		if (!resultEP.isValid()) throw originalEx;
		return resultEP;
	} catch (ex2) {
		if (ex2 instanceof RuntimeException) {
			throw originalEx;
		} else throw ex2;
	} finally {}
};
EnhancedPrecisionOp.buffer = function (geom, distance) {
	var originalEx = null;
	try {
		var result = geom.buffer(distance);
		return result;
	} catch (ex) {
		if (ex instanceof RuntimeException) {
			originalEx = ex;
		} else throw ex;
	} finally {}
	try {
		var cbo = new CommonBitsOp(true);
		var resultEP = cbo.buffer(geom, distance);
		if (!resultEP.isValid()) throw originalEx;
		return resultEP;
	} catch (ex2) {
		if (ex2 instanceof RuntimeException) {
			throw originalEx;
		} else throw ex2;
	} finally {}
};
EnhancedPrecisionOp.symDifference = function (geom0, geom1) {
	var originalEx = null;
	try {
		var result = geom0.symDifference(geom1);
		return result;
	} catch (ex) {
		if (ex instanceof RuntimeException) {
			originalEx = ex;
		} else throw ex;
	} finally {}
	try {
		var cbo = new CommonBitsOp(true);
		var resultEP = cbo.symDifference(geom0, geom1);
		if (!resultEP.isValid()) throw originalEx;
		return resultEP;
	} catch (ex2) {
		if (ex2 instanceof RuntimeException) {
			throw originalEx;
		} else throw ex2;
	} finally {}
};
EnhancedPrecisionOp.difference = function (geom0, geom1) {
	var originalEx = null;
	try {
		var result = geom0.difference(geom1);
		return result;
	} catch (ex) {
		if (ex instanceof RuntimeException) {
			originalEx = ex;
		} else throw ex;
	} finally {}
	try {
		var cbo = new CommonBitsOp(true);
		var resultEP = cbo.difference(geom0, geom1);
		if (!resultEP.isValid()) throw originalEx;
		return resultEP;
	} catch (ex2) {
		if (ex2 instanceof RuntimeException) {
			throw originalEx;
		} else throw ex2;
	} finally {}
};

