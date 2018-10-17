import NoninvertibleTransformationException from './NoninvertibleTransformationException';
import hasInterface from '../../../../../hasInterface';
import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Exception from '../../../../../java/lang/Exception';
import CoordinateSequence from '../CoordinateSequence';
import Cloneable from '../../../../../java/lang/Cloneable';
import CoordinateSequenceFilter from '../CoordinateSequenceFilter';
import Assert from '../../util/Assert';
export default class AffineTransformation {
	constructor() {
		AffineTransformation.constructor_.apply(this, arguments);
	}
	static translationInstance(x, y) {
		var trans = new AffineTransformation();
		trans.setToTranslation(x, y);
		return trans;
	}
	static shearInstance(xShear, yShear) {
		var trans = new AffineTransformation();
		trans.setToShear(xShear, yShear);
		return trans;
	}
	static reflectionInstance() {
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
	}
	static rotationInstance() {
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
	}
	static scaleInstance() {
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
	}
	setToReflectionBasic(x0, y0, x1, y1) {
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
		this._m00 = c2s2;
		this._m01 = cs2;
		this._m02 = 0.0;
		this._m10 = cs2;
		this._m11 = -c2s2;
		this._m12 = 0.0;
		return this;
	}
	getInverse() {
		var det = this.getDeterminant();
		if (det === 0) throw new NoninvertibleTransformationException("Transformation is non-invertible");
		var im00 = this._m11 / det;
		var im10 = -this._m10 / det;
		var im01 = -this._m01 / det;
		var im11 = this._m00 / det;
		var im02 = (this._m01 * this._m12 - this._m02 * this._m11) / det;
		var im12 = (-this._m00 * this._m12 + this._m10 * this._m02) / det;
		return new AffineTransformation(im00, im01, im02, im10, im11, im12);
	}
	compose(trans) {
		var mp00 = trans._m00 * this._m00 + trans._m01 * this._m10;
		var mp01 = trans._m00 * this._m01 + trans._m01 * this._m11;
		var mp02 = trans._m00 * this._m02 + trans._m01 * this._m12 + trans._m02;
		var mp10 = trans._m10 * this._m00 + trans._m11 * this._m10;
		var mp11 = trans._m10 * this._m01 + trans._m11 * this._m11;
		var mp12 = trans._m10 * this._m02 + trans._m11 * this._m12 + trans._m12;
		this._m00 = mp00;
		this._m01 = mp01;
		this._m02 = mp02;
		this._m10 = mp10;
		this._m11 = mp11;
		this._m12 = mp12;
		return this;
	}
	equals(obj) {
		if (obj === null) return false;
		if (!(obj instanceof AffineTransformation)) return false;
		var trans = obj;
		return this._m00 === trans._m00 && this._m01 === trans._m01 && this._m02 === trans._m02 && this._m10 === trans._m10 && this._m11 === trans._m11 && this._m12 === trans._m12;
	}
	setToScale(xScale, yScale) {
		this._m00 = xScale;
		this._m01 = 0.0;
		this._m02 = 0.0;
		this._m10 = 0.0;
		this._m11 = yScale;
		this._m12 = 0.0;
		return this;
	}
	isIdentity() {
		return this._m00 === 1 && this._m01 === 0 && this._m02 === 0 && this._m10 === 0 && this._m11 === 1 && this._m12 === 0;
	}
	scale(xScale, yScale) {
		this.compose(AffineTransformation.scaleInstance(xScale, yScale));
		return this;
	}
	setToIdentity() {
		this._m00 = 1.0;
		this._m01 = 0.0;
		this._m02 = 0.0;
		this._m10 = 0.0;
		this._m11 = 1.0;
		this._m12 = 0.0;
		return this;
	}
	isGeometryChanged() {
		return true;
	}
	setTransformation() {
		if (arguments.length === 1) {
			let trans = arguments[0];
			this._m00 = trans._m00;
			this._m01 = trans._m01;
			this._m02 = trans._m02;
			this._m10 = trans._m10;
			this._m11 = trans._m11;
			this._m12 = trans._m12;
			return this;
		} else if (arguments.length === 6) {
			let m00 = arguments[0], m01 = arguments[1], m02 = arguments[2], m10 = arguments[3], m11 = arguments[4], m12 = arguments[5];
			this._m00 = m00;
			this._m01 = m01;
			this._m02 = m02;
			this._m10 = m10;
			this._m11 = m11;
			this._m12 = m12;
			return this;
		}
	}
	setToRotation() {
		if (arguments.length === 1) {
			let theta = arguments[0];
			this.setToRotation(Math.sin(theta), Math.cos(theta));
			return this;
		} else if (arguments.length === 2) {
			let sinTheta = arguments[0], cosTheta = arguments[1];
			this._m00 = cosTheta;
			this._m01 = -sinTheta;
			this._m02 = 0.0;
			this._m10 = sinTheta;
			this._m11 = cosTheta;
			this._m12 = 0.0;
			return this;
		} else if (arguments.length === 3) {
			let theta = arguments[0], x = arguments[1], y = arguments[2];
			this.setToRotation(Math.sin(theta), Math.cos(theta), x, y);
			return this;
		} else if (arguments.length === 4) {
			let sinTheta = arguments[0], cosTheta = arguments[1], x = arguments[2], y = arguments[3];
			this._m00 = cosTheta;
			this._m01 = -sinTheta;
			this._m02 = x - x * cosTheta + y * sinTheta;
			this._m10 = sinTheta;
			this._m11 = cosTheta;
			this._m12 = y - x * sinTheta - y * cosTheta;
			return this;
		}
	}
	getMatrixEntries() {
		return [this._m00, this._m01, this._m02, this._m10, this._m11, this._m12];
	}
	filter(seq, i) {
		this.transform(seq, i);
	}
	rotate() {
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
			this.compose(AffineTransformation.rotationInstance(sinTheta, cosTheta, x, y));
			return this;
		}
	}
	getDeterminant() {
		return this._m00 * this._m11 - this._m01 * this._m10;
	}
	composeBefore(trans) {
		var mp00 = this._m00 * trans._m00 + this._m01 * trans._m10;
		var mp01 = this._m00 * trans._m01 + this._m01 * trans._m11;
		var mp02 = this._m00 * trans._m02 + this._m01 * trans._m12 + this._m02;
		var mp10 = this._m10 * trans._m00 + this._m11 * trans._m10;
		var mp11 = this._m10 * trans._m01 + this._m11 * trans._m11;
		var mp12 = this._m10 * trans._m02 + this._m11 * trans._m12 + this._m12;
		this._m00 = mp00;
		this._m01 = mp01;
		this._m02 = mp02;
		this._m10 = mp10;
		this._m11 = mp11;
		this._m12 = mp12;
		return this;
	}
	setToShear(xShear, yShear) {
		this._m00 = 1.0;
		this._m01 = xShear;
		this._m02 = 0.0;
		this._m10 = yShear;
		this._m11 = 1.0;
		this._m12 = 0.0;
		return this;
	}
	isDone() {
		return false;
	}
	clone() {
		try {
			return null;
		} catch (ex) {
			if (ex instanceof Exception) {
				Assert.shouldNeverReachHere();
			} else throw ex;
		} finally {}
		return null;
	}
	translate(x, y) {
		this.compose(AffineTransformation.translationInstance(x, y));
		return this;
	}
	setToReflection() {
		if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			if (x === 0.0 && y === 0.0) {
				throw new IllegalArgumentException("Reflection vector must be non-zero");
			}
			if (x === y) {
				this._m00 = 0.0;
				this._m01 = 1.0;
				this._m02 = 0.0;
				this._m10 = 1.0;
				this._m11 = 0.0;
				this._m12 = 0.0;
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
	}
	toString() {
		return "AffineTransformation[[" + this._m00 + ", " + this._m01 + ", " + this._m02 + "], [" + this._m10 + ", " + this._m11 + ", " + this._m12 + "]]";
	}
	setToTranslation(dx, dy) {
		this._m00 = 1.0;
		this._m01 = 0.0;
		this._m02 = dx;
		this._m10 = 0.0;
		this._m11 = 1.0;
		this._m12 = dy;
		return this;
	}
	shear(xShear, yShear) {
		this.compose(AffineTransformation.shearInstance(xShear, yShear));
		return this;
	}
	transform() {
		if (arguments.length === 1) {
			let g = arguments[0];
			var g2 = g.copy();
			g2.apply(this);
			return g2;
		} else if (arguments.length === 2) {
			if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
				let src = arguments[0], dest = arguments[1];
				var xp = this._m00 * src.x + this._m01 * src.y + this._m02;
				var yp = this._m10 * src.x + this._m11 * src.y + this._m12;
				dest.x = xp;
				dest.y = yp;
				return dest;
			} else if (hasInterface(arguments[0], CoordinateSequence) && Number.isInteger(arguments[1])) {
				let seq = arguments[0], i = arguments[1];
				var xp = this._m00 * seq.getOrdinate(i, 0) + this._m01 * seq.getOrdinate(i, 1) + this._m02;
				var yp = this._m10 * seq.getOrdinate(i, 0) + this._m11 * seq.getOrdinate(i, 1) + this._m12;
				seq.setOrdinate(i, 0, xp);
				seq.setOrdinate(i, 1, yp);
			}
		}
	}
	reflect() {
		if (arguments.length === 2) {
			let x = arguments[0], y = arguments[1];
			this.compose(AffineTransformation.reflectionInstance(x, y));
			return this;
		} else if (arguments.length === 4) {
			let x0 = arguments[0], y0 = arguments[1], x1 = arguments[2], y1 = arguments[3];
			this.compose(AffineTransformation.reflectionInstance(x0, y0, x1, y1));
			return this;
		}
	}
	getClass() {
		return AffineTransformation;
	}
	get interfaces_() {
		return [Cloneable, CoordinateSequenceFilter];
	}
}
AffineTransformation.constructor_ = function () {
	this._m00 = null;
	this._m01 = null;
	this._m02 = null;
	this._m10 = null;
	this._m11 = null;
	this._m12 = null;
	if (arguments.length === 0) {
		this.setToIdentity();
	} else if (arguments.length === 1) {
		if (arguments[0] instanceof Array) {
			let matrix = arguments[0];
			this._m00 = matrix[0];
			this._m01 = matrix[1];
			this._m02 = matrix[2];
			this._m10 = matrix[3];
			this._m11 = matrix[4];
			this._m12 = matrix[5];
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
};
