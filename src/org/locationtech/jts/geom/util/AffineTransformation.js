import NoninvertibleTransformationException from './NoninvertibleTransformationException';
import hasInterface from '../../../../../hasInterface';
import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import extend from '../../../../../extend';
import Exception from '../../../../../java/lang/Exception';
import CoordinateSequence from '../CoordinateSequence';
import Cloneable from '../../../../../java/lang/Cloneable';
import CoordinateSequenceFilter from '../CoordinateSequenceFilter';
import Assert from '../../util/Assert';
export default function AffineTransformation() {
	this.m00 = null;
	this.m01 = null;
	this.m02 = null;
	this.m10 = null;
	this.m11 = null;
	this.m12 = null;
	if (arguments.length === 0) {
		this.setToIdentity();
	} else if (arguments.length === 1) {
		if (arguments[0] instanceof Array) {
			let matrix = arguments[0];
			this.m00 = matrix[0];
			this.m01 = matrix[1];
			this.m02 = matrix[2];
			this.m10 = matrix[3];
			this.m11 = matrix[4];
			this.m12 = matrix[5];
		} else if (arguments[0] instanceof AffineTransformation) {
			let trans = arguments[0];
			this.setTransformation(trans);
		}
	} else if (arguments.length === 6) {
		if (typeof arguments[0] === "number") {
			let m00 = arguments[0], m01 = arguments[1], m02 = arguments[2], m10 = arguments[3], m11 = arguments[4], m12 = arguments[5];
			this.setTransformation(m00, m01, m02, m10, m11, m12);
		} else if (arguments[0] instanceof Coordinate) {
			let src0 = arguments[0], src1 = arguments[1], src2 = arguments[2], dest0 = arguments[3], dest1 = arguments[4], dest2 = arguments[5];
		}
	}
}
extend(AffineTransformation.prototype, {
	setToReflectionBasic: function (x0, y0, x1, y1) {
		if (x0 === x1 && y0 === y1) {
			throw new IllegalArgumentException("Reflection line points must be distinct");
		}
		var dx = x1 - x0;
		var dy = y1 - y0;
		var d = Math.sqrt(dx * dx + dy * dy);
		var sin = dy / d;
		var cos = dx / d;
		var cs2 = 2 * sin * cos;
		var c2s2 = cos * cos - sin * sin;
		this.m00 = c2s2;
		this.m01 = cs2;
		this.m02 = 0.0;
		this.m10 = cs2;
		this.m11 = -c2s2;
		this.m12 = 0.0;
		return this;
	},
	getInverse: function () {
		var det = this.getDeterminant();
		if (det === 0) throw new NoninvertibleTransformationException("Transformation is non-invertible");
		var im00 = this.m11 / det;
		var im10 = -this.m10 / det;
		var im01 = -this.m01 / det;
		var im11 = this.m00 / det;
		var im02 = (this.m01 * this.m12 - this.m02 * this.m11) / det;
		var im12 = (-this.m00 * this.m12 + this.m10 * this.m02) / det;
		return new AffineTransformation(im00, im01, im02, im10, im11, im12);
	},
	compose: function (trans) {
		var mp00 = trans.m00 * this.m00 + trans.m01 * this.m10;
		var mp01 = trans.m00 * this.m01 + trans.m01 * this.m11;
		var mp02 = trans.m00 * this.m02 + trans.m01 * this.m12 + trans.m02;
		var mp10 = trans.m10 * this.m00 + trans.m11 * this.m10;
		var mp11 = trans.m10 * this.m01 + trans.m11 * this.m11;
		var mp12 = trans.m10 * this.m02 + trans.m11 * this.m12 + trans.m12;
		this.m00 = mp00;
		this.m01 = mp01;
		this.m02 = mp02;
		this.m10 = mp10;
		this.m11 = mp11;
		this.m12 = mp12;
		return this;
	},
	equals: function (obj) {
		if (obj === null) return false;
		if (!(obj instanceof AffineTransformation)) return false;
		var trans = obj;
		return this.m00 === trans.m00 && this.m01 === trans.m01 && this.m02 === trans.m02 && this.m10 === trans.m10 && this.m11 === trans.m11 && this.m12 === trans.m12;
	},
	setToScale: function (xScale, yScale) {
		this.m00 = xScale;
		this.m01 = 0.0;
		this.m02 = 0.0;
		this.m10 = 0.0;
		this.m11 = yScale;
		this.m12 = 0.0;
		return this;
	},
	isIdentity: function () {
		return this.m00 === 1 && this.m01 === 0 && this.m02 === 0 && this.m10 === 0 && this.m11 === 1 && this.m12 === 0;
	},
	scale: function (xScale, yScale) {
		this.compose(AffineTransformation.scaleInstance(xScale, yScale));
		return this;
	},
	setToIdentity: function () {
		this.m00 = 1.0;
		this.m01 = 0.0;
		this.m02 = 0.0;
		this.m10 = 0.0;
		this.m11 = 1.0;
		this.m12 = 0.0;
		return this;
	},
	isGeometryChanged: function () {
		return true;
	},
	setTransformation: function () {
		if (arguments.length === 1) {
			let trans = arguments[0];
			this.m00 = trans.m00;
			this.m01 = trans.m01;
			this.m02 = trans.m02;
			this.m10 = trans.m10;
			this.m11 = trans.m11;
			this.m12 = trans.m12;
			return this;
		} else if (arguments.length === 6) {
			let m00 = arguments[0], m01 = arguments[1], m02 = arguments[2], m10 = arguments[3], m11 = arguments[4], m12 = arguments[5];
			this.m00 = m00;
			this.m01 = m01;
			this.m02 = m02;
			this.m10 = m10;
			this.m11 = m11;
			this.m12 = m12;
			return this;
		}
	},
	setToRotation: function () {
		if (arguments.length === 1) {
			let theta = arguments[0];
			this.setToRotation(Math.sin(theta), Math.cos(theta));
			return this;
		} else if (arguments.length === 2) {
			let sinTheta = arguments[0], cosTheta = arguments[1];
			this.m00 = cosTheta;
			this.m01 = -sinTheta;
			this.m02 = 0.0;
			this.m10 = sinTheta;
			this.m11 = cosTheta;
			this.m12 = 0.0;
			return this;
		} else if (arguments.length === 3) {
			let theta = arguments[0], x = arguments[1], y = arguments[2];
			this.setToRotation(Math.sin(theta), Math.cos(theta), x, y);
			return this;
		} else if (arguments.length === 4) {
			let sinTheta = arguments[0], cosTheta = arguments[1], x = arguments[2], y = arguments[3];
			this.m00 = cosTheta;
			this.m01 = -sinTheta;
			this.m02 = x - x * cosTheta + y * sinTheta;
			this.m10 = sinTheta;
			this.m11 = cosTheta;
			this.m12 = y - x * sinTheta - y * cosTheta;
			return this;
		}
	},
	getMatrixEntries: function () {
		return [this.m00, this.m01, this.m02, this.m10, this.m11, this.m12];
	},
	filter: function (seq, i) {
		this.transform(seq, i);
	},
	rotate: function () {
		if (arguments.length === 1) {
			let theta = arguments[0];
			this.compose(AffineTransformation.rotationInstance(theta));
			return this;
		} else if (arguments.length === 2) {
			let sinTheta = arguments[0], cosTheta = arguments[1];
			this.compose(AffineTransformation.rotationInstance(sinTheta, cosTheta));
			return this;
		} else if (arguments.length === 3) {
			let theta = arguments[0], x = arguments[1], y = arguments[2];
			this.compose(AffineTransformation.rotationInstance(theta, x, y));
			return this;
		} else if (arguments.length === 4) {
			let sinTheta = arguments[0], cosTheta = arguments[1], x = arguments[2], y = arguments[3];
			this.compose(AffineTransformation.rotationInstance(sinTheta, cosTheta));
			return this;
		}
	},
	getDeterminant: function () {
		return this.m00 * this.m11 - this.m01 * this.m10;
	},
	composeBefore: function (trans) {
		var mp00 = this.m00 * trans.m00 + this.m01 * trans.m10;
		var mp01 = this.m00 * trans.m01 + this.m01 * trans.m11;
		var mp02 = this.m00 * trans.m02 + this.m01 * trans.m12 + this.m02;
		var mp10 = this.m10 * trans.m00 + this.m11 * trans.m10;
		var mp11 = this.m10 * trans.m01 + this.m11 * trans.m11;
		var mp12 = this.m10 * trans.m02 + this.m11 * trans.m12 + this.m12;
		this.m00 = mp00;
		this.m01 = mp01;
		this.m02 = mp02;
		this.m10 = mp10;
		this.m11 = mp11;
		this.m12 = mp12;
		return this;
	},
	setToShear: function (xShear, yShear) {
		this.m00 = 1.0;
		this.m01 = xShear;
		this.m02 = 0.0;
		this.m10 = yShear;
		this.m11 = 1.0;
		this.m12 = 0.0;
		return this;
	},
	isDone: function () {
		return false;
	},
	clone: function () {
		try {
			return null;
		} catch (ex) {
			if (ex instanceof Exception) {
				Assert.shouldNeverReachHere();
			} else throw ex;
		} finally {}
		return null;
	},
	translate: function (x, y) {
		this.compose(AffineTransformation.translationInstance(x, y));
		return this;
	},
	setToReflection: function () {
		if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			if (x === 0.0 && y === 0.0) {
				throw new IllegalArgumentException("Reflection vector must be non-zero");
			}
			if (x === y) {
				this.m00 = 0.0;
				this.m01 = 1.0;
				this.m02 = 0.0;
				this.m10 = 1.0;
				this.m11 = 0.0;
				this.m12 = 0.0;
				return this;
			}
			var d = Math.sqrt(x * x + y * y);
			var sin = y / d;
			var cos = x / d;
			this.rotate(-sin, cos);
			this.scale(1, -1);
			this.rotate(sin, cos);
			return this;
		} else if (arguments.length === 4) {
			let x0 = arguments[0], y0 = arguments[1], x1 = arguments[2], y1 = arguments[3];
			if (x0 === x1 && y0 === y1) {
				throw new IllegalArgumentException("Reflection line points must be distinct");
			}
			this.setToTranslation(-x0, -y0);
			var dx = x1 - x0;
			var dy = y1 - y0;
			var d = Math.sqrt(dx * dx + dy * dy);
			var sin = dy / d;
			var cos = dx / d;
			this.rotate(-sin, cos);
			this.scale(1, -1);
			this.rotate(sin, cos);
			this.translate(x0, y0);
			return this;
		}
	},
	toString: function () {
		return "AffineTransformation[[" + this.m00 + ", " + this.m01 + ", " + this.m02 + "], [" + this.m10 + ", " + this.m11 + ", " + this.m12 + "]]";
	},
	setToTranslation: function (dx, dy) {
		this.m00 = 1.0;
		this.m01 = 0.0;
		this.m02 = dx;
		this.m10 = 0.0;
		this.m11 = 1.0;
		this.m12 = dy;
		return this;
	},
	shear: function (xShear, yShear) {
		this.compose(AffineTransformation.shearInstance(xShear, yShear));
		return this;
	},
	transform: function () {
		if (arguments.length === 1) {
			let g = arguments[0];
			var g2 = g.copy();
			g2.apply(this);
			return g2;
		} else if (arguments.length === 2) {
			if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
				let src = arguments[0], dest = arguments[1];
				var xp = this.m00 * src.x + this.m01 * src.y + this.m02;
				var yp = this.m10 * src.x + this.m11 * src.y + this.m12;
				dest.x = xp;
				dest.y = yp;
				return dest;
			} else if (hasInterface(arguments[0], CoordinateSequence) && Number.isInteger(arguments[1])) {
				let seq = arguments[0], i = arguments[1];
				var xp = this.m00 * seq.getOrdinate(i, 0) + this.m01 * seq.getOrdinate(i, 1) + this.m02;
				var yp = this.m10 * seq.getOrdinate(i, 0) + this.m11 * seq.getOrdinate(i, 1) + this.m12;
				seq.setOrdinate(i, 0, xp);
				seq.setOrdinate(i, 1, yp);
			}
		}
	},
	reflect: function () {
		if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			this.compose(AffineTransformation.reflectionInstance(x, y));
			return this;
		} else if (arguments.length === 4) {
			let x0 = arguments[0], y0 = arguments[1], x1 = arguments[2], y1 = arguments[3];
			this.compose(AffineTransformation.reflectionInstance(x0, y0, x1, y1));
			return this;
		}
	},
	interfaces_: function () {
		return [Cloneable, CoordinateSequenceFilter];
	},
	getClass: function () {
		return AffineTransformation;
	}
});
AffineTransformation.translationInstance = function (x, y) {
	var trans = new AffineTransformation();
	trans.setToTranslation(x, y);
	return trans;
};
AffineTransformation.shearInstance = function (xShear, yShear) {
	var trans = new AffineTransformation();
	trans.setToShear(xShear, yShear);
	return trans;
};
AffineTransformation.reflectionInstance = function () {
	if (arguments.length === 2) {
		let x = arguments[0], y = arguments[1];
		var trans = new AffineTransformation();
		trans.setToReflection(x, y);
		return trans;
	} else if (arguments.length === 4) {
		let x0 = arguments[0], y0 = arguments[1], x1 = arguments[2], y1 = arguments[3];
		var trans = new AffineTransformation();
		trans.setToReflection(x0, y0, x1, y1);
		return trans;
	}
};
AffineTransformation.rotationInstance = function () {
	if (arguments.length === 1) {
		let theta = arguments[0];
		return AffineTransformation.rotationInstance(Math.sin(theta), Math.cos(theta));
	} else if (arguments.length === 2) {
		let sinTheta = arguments[0], cosTheta = arguments[1];
		var trans = new AffineTransformation();
		trans.setToRotation(sinTheta, cosTheta);
		return trans;
	} else if (arguments.length === 3) {
		let theta = arguments[0], x = arguments[1], y = arguments[2];
		return AffineTransformation.rotationInstance(Math.sin(theta), Math.cos(theta), x, y);
	} else if (arguments.length === 4) {
		let sinTheta = arguments[0], cosTheta = arguments[1], x = arguments[2], y = arguments[3];
		var trans = new AffineTransformation();
		trans.setToRotation(sinTheta, cosTheta, x, y);
		return trans;
	}
};
AffineTransformation.scaleInstance = function () {
	if (arguments.length === 2) {
		let xScale = arguments[0], yScale = arguments[1];
		var trans = new AffineTransformation();
		trans.setToScale(xScale, yScale);
		return trans;
	} else if (arguments.length === 4) {
		let xScale = arguments[0], yScale = arguments[1], x = arguments[2], y = arguments[3];
		var trans = new AffineTransformation();
		trans.translate(-x, -y);
		trans.scale(xScale, yScale);
		trans.translate(x, y);
		return trans;
	}
};
