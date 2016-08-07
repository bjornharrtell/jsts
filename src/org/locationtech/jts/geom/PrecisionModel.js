import HashMap from '../../../../java/util/HashMap';
import Coordinate from './Coordinate';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import Integer from '../../../../java/lang/Integer';
import Comparable from '../../../../java/lang/Comparable';
import Serializable from '../../../../java/io/Serializable';
export default function PrecisionModel() {
	this.modelType = null;
	this.scale = null;
	if (arguments.length === 0) {
		this.modelType = PrecisionModel.FLOATING;
	} else if (arguments.length === 1) {
		if (arguments[0] instanceof Type) {
			let modelType = arguments[0];
			this.modelType = modelType;
			if (modelType === PrecisionModel.FIXED) {
				this.setScale(1.0);
			}
		} else if (typeof arguments[0] === "number") {
			let scale = arguments[0];
			this.modelType = PrecisionModel.FIXED;
			this.setScale(scale);
		} else if (arguments[0] instanceof PrecisionModel) {
			let pm = arguments[0];
			this.modelType = pm.modelType;
			this.scale = pm.scale;
		}
	}
}
extend(PrecisionModel.prototype, {
	equals: function (other) {
		if (!(other instanceof PrecisionModel)) {
			return false;
		}
		var otherPrecisionModel = other;
		return this.modelType === otherPrecisionModel.modelType && this.scale === otherPrecisionModel.scale;
	},
	compareTo: function (o) {
		var other = o;
		var sigDigits = this.getMaximumSignificantDigits();
		var otherSigDigits = other.getMaximumSignificantDigits();
		return new Integer(sigDigits).compareTo(new Integer(otherSigDigits));
	},
	getScale: function () {
		return this.scale;
	},
	isFloating: function () {
		return this.modelType === PrecisionModel.FLOATING || this.modelType === PrecisionModel.FLOATING_SINGLE;
	},
	getType: function () {
		return this.modelType;
	},
	toString: function () {
		var description = "UNKNOWN";
		if (this.modelType === PrecisionModel.FLOATING) {
			description = "Floating";
		} else if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
			description = "Floating-Single";
		} else if (this.modelType === PrecisionModel.FIXED) {
			description = "Fixed (Scale=" + this.getScale() + ")";
		}
		return description;
	},
	makePrecise: function () {
		if (typeof arguments[0] === "number") {
			let val = arguments[0];
			if (Double.isNaN(val)) return val;
			if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
				var floatSingleVal = val;
				return floatSingleVal;
			}
			if (this.modelType === PrecisionModel.FIXED) {
				return Math.round(val * this.scale) / this.scale;
			}
			return val;
		} else if (arguments[0] instanceof Coordinate) {
			let coord = arguments[0];
			if (this.modelType === PrecisionModel.FLOATING) return null;
			coord.x = this.makePrecise(coord.x);
			coord.y = this.makePrecise(coord.y);
		}
	},
	getMaximumSignificantDigits: function () {
		var maxSigDigits = 16;
		if (this.modelType === PrecisionModel.FLOATING) {
			maxSigDigits = 16;
		} else if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
			maxSigDigits = 6;
		} else if (this.modelType === PrecisionModel.FIXED) {
			maxSigDigits = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)));
		}
		return maxSigDigits;
	},
	setScale: function (scale) {
		this.scale = Math.abs(scale);
	},
	interfaces_: function () {
		return [Serializable, Comparable];
	},
	getClass: function () {
		return PrecisionModel;
	}
});
PrecisionModel.mostPrecise = function (pm1, pm2) {
	if (pm1.compareTo(pm2) >= 0) return pm1;
	return pm2;
};
function Type() {
	this.name = null;
	let name = arguments[0];
	this.name = name;
	Type.nameToTypeMap.put(name, this);
}
extend(Type.prototype, {
	readResolve: function () {
		return Type.nameToTypeMap.get(this.name);
	},
	toString: function () {
		return this.name;
	},
	interfaces_: function () {
		return [Serializable];
	},
	getClass: function () {
		return Type;
	}
});
Type.serialVersionUID = -5528602631731589822;
Type.nameToTypeMap = new HashMap();
PrecisionModel.Type = Type;
PrecisionModel.serialVersionUID = 7777263578777803835;
PrecisionModel.FIXED = new Type("FIXED");
PrecisionModel.FLOATING = new Type("FLOATING");
PrecisionModel.FLOATING_SINGLE = new Type("FLOATING SINGLE");
PrecisionModel.maximumPreciseValue = 9007199254740992.0;
