import HashMap from '../../../../java/util/HashMap';
import Coordinate from './Coordinate';
import Double from '../../../../java/lang/Double';
import Integer from '../../../../java/lang/Integer';
import Comparable from '../../../../java/lang/Comparable';
import Serializable from '../../../../java/io/Serializable';
export default class PrecisionModel {
	constructor(...args) {
		this.modelType = null;
		this.scale = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
					this.modelType = PrecisionModel.FLOATING;
				})(...args);
			} else if (args.length === 1) {
				if (args[0] instanceof Type) {
					return ((...args) => {
						let [modelType] = args;
						this.modelType = modelType;
						if (modelType === PrecisionModel.FIXED) {
							this.setScale(1.0);
						}
					})(...args);
				} else if (typeof args[0] === "number") {
					return ((...args) => {
						let [scale] = args;
						this.modelType = PrecisionModel.FIXED;
						this.setScale(scale);
					})(...args);
				} else if (args[0] instanceof PrecisionModel) {
					return ((...args) => {
						let [pm] = args;
						this.modelType = pm.modelType;
						this.scale = pm.scale;
					})(...args);
				}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Serializable, Comparable];
	}
	static get Type() {
		return Type;
	}
	static mostPrecise(pm1, pm2) {
		if (pm1.compareTo(pm2) >= 0) return pm1;
		return pm2;
	}
	equals(other) {
		if (!(other instanceof PrecisionModel)) {
			return false;
		}
		var otherPrecisionModel = other;
		return this.modelType === otherPrecisionModel.modelType && this.scale === otherPrecisionModel.scale;
	}
	compareTo(o) {
		var other = o;
		var sigDigits = this.getMaximumSignificantDigits();
		var otherSigDigits = other.getMaximumSignificantDigits();
		return new Integer(sigDigits).compareTo(new Integer(otherSigDigits));
	}
	getScale() {
		return this.scale;
	}
	isFloating() {
		return this.modelType === PrecisionModel.FLOATING || this.modelType === PrecisionModel.FLOATING_SINGLE;
	}
	getType() {
		return this.modelType;
	}
	toString() {
		var description = "UNKNOWN";
		if (this.modelType === PrecisionModel.FLOATING) {
			description = "Floating";
		} else if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
			description = "Floating-Single";
		} else if (this.modelType === PrecisionModel.FIXED) {
			description = "Fixed (Scale=" + this.getScale() + ")";
		}
		return description;
	}
	makePrecise(...args) {
		if (args.length === 1) {
			if (typeof args[0] === "number") {
				let [val] = args;
				if (Double.isNaN(val)) return val;
				if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
					var floatSingleVal = val;
					return floatSingleVal;
				}
				if (this.modelType === PrecisionModel.FIXED) {
					return Math.round(val * this.scale) / this.scale;
				}
				return val;
			} else if (args[0] instanceof Coordinate) {
				let [coord] = args;
				if (this.modelType === PrecisionModel.FLOATING) return null;
				coord.x = this.makePrecise(coord.x);
				coord.y = this.makePrecise(coord.y);
			}
		}
	}
	getMaximumSignificantDigits() {
		var maxSigDigits = 16;
		if (this.modelType === PrecisionModel.FLOATING) {
			maxSigDigits = 16;
		} else if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
			maxSigDigits = 6;
		} else if (this.modelType === PrecisionModel.FIXED) {
			maxSigDigits = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)));
		}
		return maxSigDigits;
	}
	setScale(scale) {
		this.scale = Math.abs(scale);
	}
	getClass() {
		return PrecisionModel;
	}
}
class Type {
	constructor(...args) {
		this.name = null;
		if (args.length === 1) {
			let [name] = args;
			this.name = name;
			Type.nameToTypeMap.put(name, this);
		}
	}
	get interfaces_() {
		return [Serializable];
	}
	readResolve() {
		return Type.nameToTypeMap.get(this.name);
	}
	toString() {
		return this.name;
	}
	getClass() {
		return Type;
	}
}
Type.serialVersionUID = -5528602631731589822;
Type.nameToTypeMap = new HashMap();
PrecisionModel.serialVersionUID = 7777263578777803835;
PrecisionModel.FIXED = new Type("FIXED");
PrecisionModel.FLOATING = new Type("FLOATING");
PrecisionModel.FLOATING_SINGLE = new Type("FLOATING SINGLE");
PrecisionModel.maximumPreciseValue = 9007199254740992.0;

