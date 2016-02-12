import NoninvertibleTransformationException from './NoninvertibleTransformationException';
import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Exception from '../../../../../java/lang/Exception';
import CoordinateSequence from '../CoordinateSequence';
import Cloneable from '../../../../../java/lang/Cloneable';
import CoordinateSequenceFilter from '../CoordinateSequenceFilter';
import Assert from '../../util/Assert';
export default class AffineTransformation {
	constructor(...args) {
		this.m00 = null;
		this.m01 = null;
		this.m02 = null;
		this.m10 = null;
		this.m11 = null;
		this.m12 = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.setToIdentity();
			} else if (args.length === 1) {
				if (args[0] instanceof Array) {
					let [matrix] = args;
					this.m00 = matrix[0];
					this.m01 = matrix[1];
					this.m02 = matrix[2];
					this.m10 = matrix[3];
					this.m11 = matrix[4];
					this.m12 = matrix[5];
				} else if (args[0] instanceof AffineTransformation) {
					let [trans] = args;
					this.setTransformation(trans);
				}
			} else if (args.length === 6) {
				if (typeof args[0] === "number") {
					let [m00, m01, m02, m10, m11, m12] = args;
					this.setTransformation(m00, m01, m02, m10, m11, m12);
				} else if (args[0] instanceof Coordinate) {
					let [src0, src1, src2, dest0, dest1, dest2] = args;
				}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Cloneable, CoordinateSequenceFilter];
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
	static reflectionInstance(...args) {
		if (args.length === 2) {
			let [x, y] = args;
			var trans = new AffineTransformation();
			trans.setToReflection(x, y);
			return trans;
		} else if (args.length === 4) {
			let [x0, y0, x1, y1] = args;
			var trans = new AffineTransformation();
			trans.setToReflection(x0, y0, x1, y1);
			return trans;
		}
	}
	static rotationInstance(...args) {
		if (args.length === 1) {
			let [theta] = args;
			return AffineTransformation.rotationInstance(Math.sin(theta), Math.cos(theta));
		} else if (args.length === 2) {
			let [sinTheta, cosTheta] = args;
			var trans = new AffineTransformation();
			trans.setToRotation(sinTheta, cosTheta);
			return trans;
		} else if (args.length === 3) {
			let [theta, x, y] = args;
			return AffineTransformation.rotationInstance(Math.sin(theta), Math.cos(theta), x, y);
		} else if (args.length === 4) {
			let [sinTheta, cosTheta, x, y] = args;
			var trans = new AffineTransformation();
			trans.setToRotation(sinTheta, cosTheta, x, y);
			return trans;
		}
	}
	static scaleInstance(...args) {
		if (args.length === 2) {
			let [xScale, yScale] = args;
			var trans = new AffineTransformation();
			trans.setToScale(xScale, yScale);
			return trans;
		} else if (args.length === 4) {
			let [xScale, yScale, x, y] = args;
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
		this.m00 = c2s2;
		this.m01 = cs2;
		this.m02 = 0.0;
		this.m10 = cs2;
		this.m11 = -c2s2;
		this.m12 = 0.0;
		return this;
	}
	getInverse() {
		var det = this.getDeterminant();
		if (det === 0) throw new NoninvertibleTransformationException("Transformation is non-invertible");
		var im00 = this.m11 / det;
		var im10 = -this.m10 / det;
		var im01 = -this.m01 / det;
		var im11 = this.m00 / det;
		var im02 = (this.m01 * this.m12 - this.m02 * this.m11) / det;
		var im12 = (-this.m00 * this.m12 + this.m10 * this.m02) / det;
		return new AffineTransformation(im00, im01, im02, im10, im11, im12);
	}
	compose(trans) {
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
	}
	equals(obj) {
		if (obj === null) return false;
		if (!(obj instanceof AffineTransformation)) return false;
		var trans = obj;
		return this.m00 === trans.m00 && this.m01 === trans.m01 && this.m02 === trans.m02 && this.m10 === trans.m10 && this.m11 === trans.m11 && this.m12 === trans.m12;
	}
	setToScale(xScale, yScale) {
		this.m00 = xScale;
		this.m01 = 0.0;
		this.m02 = 0.0;
		this.m10 = 0.0;
		this.m11 = yScale;
		this.m12 = 0.0;
		return this;
	}
	isIdentity() {
		return this.m00 === 1 && this.m01 === 0 && this.m02 === 0 && this.m10 === 0 && this.m11 === 1 && this.m12 === 0;
	}
	scale(xScale, yScale) {
		this.compose(AffineTransformation.scaleInstance(xScale, yScale));
		return this;
	}
	setToIdentity() {
		this.m00 = 1.0;
		this.m01 = 0.0;
		this.m02 = 0.0;
		this.m10 = 0.0;
		this.m11 = 1.0;
		this.m12 = 0.0;
		return this;
	}
	isGeometryChanged() {
		return true;
	}
	setTransformation(...args) {
		if (args.length === 1) {
			let [trans] = args;
			this.m00 = trans.m00;
			this.m01 = trans.m01;
			this.m02 = trans.m02;
			this.m10 = trans.m10;
			this.m11 = trans.m11;
			this.m12 = trans.m12;
			return this;
		} else if (args.length === 6) {
			let [m00, m01, m02, m10, m11, m12] = args;
			this.m00 = m00;
			this.m01 = m01;
			this.m02 = m02;
			this.m10 = m10;
			this.m11 = m11;
			this.m12 = m12;
			return this;
		}
	}
	setToRotation(...args) {
		if (args.length === 1) {
			let [theta] = args;
			this.setToRotation(Math.sin(theta), Math.cos(theta));
			return this;
		} else if (args.length === 2) {
			let [sinTheta, cosTheta] = args;
			this.m00 = cosTheta;
			this.m01 = -sinTheta;
			this.m02 = 0.0;
			this.m10 = sinTheta;
			this.m11 = cosTheta;
			this.m12 = 0.0;
			return this;
		} else if (args.length === 3) {
			let [theta, x, y] = args;
			this.setToRotation(Math.sin(theta), Math.cos(theta), x, y);
			return this;
		} else if (args.length === 4) {
			let [sinTheta, cosTheta, x, y] = args;
			this.m00 = cosTheta;
			this.m01 = -sinTheta;
			this.m02 = x - x * cosTheta + y * sinTheta;
			this.m10 = sinTheta;
			this.m11 = cosTheta;
			this.m12 = y - x * sinTheta - y * cosTheta;
			return this;
		}
	}
	getMatrixEntries() {
		return [this.m00, this.m01, this.m02, this.m10, this.m11, this.m12];
	}
	filter(seq, i) {
		this.transform(seq, i);
	}
	rotate(...args) {
		if (args.length === 1) {
			let [theta] = args;
			this.compose(AffineTransformation.rotationInstance(theta));
			return this;
		} else if (args.length === 2) {
			let [sinTheta, cosTheta] = args;
			this.compose(AffineTransformation.rotationInstance(sinTheta, cosTheta));
			return this;
		} else if (args.length === 3) {
			let [theta, x, y] = args;
			this.compose(AffineTransformation.rotationInstance(theta, x, y));
			return this;
		} else if (args.length === 4) {
			let [sinTheta, cosTheta, x, y] = args;
			this.compose(AffineTransformation.rotationInstance(sinTheta, cosTheta));
			return this;
		}
	}
	getDeterminant() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	composeBefore(trans) {
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
	}
	setToShear(xShear, yShear) {
		this.m00 = 1.0;
		this.m01 = xShear;
		this.m02 = 0.0;
		this.m10 = yShear;
		this.m11 = 1.0;
		this.m12 = 0.0;
		return this;
	}
	isDone() {
		return false;
	}
	clone() {
		try {
			return super.clone();
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
	setToReflection(...args) {
		if (args.length === 2) {
			let [x, y] = args;
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
		} else if (args.length === 4) {
			let [x0, y0, x1, y1] = args;
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
		return "AffineTransformation[[" + this.m00 + ", " + this.m01 + ", " + this.m02 + "], [" + this.m10 + ", " + this.m11 + ", " + this.m12 + "]]";
	}
	setToTranslation(dx, dy) {
		this.m00 = 1.0;
		this.m01 = 0.0;
		this.m02 = dx;
		this.m10 = 0.0;
		this.m11 = 1.0;
		this.m12 = dy;
		return this;
	}
	shear(xShear, yShear) {
		this.compose(AffineTransformation.shearInstance(xShear, yShear));
		return this;
	}
	transform(...args) {
		if (args.length === 1) {
			let [g] = args;
			var g2 = g.copy();
			g2.apply(this);
			return g2;
		} else if (args.length === 2) {
			if (args[0] instanceof Coordinate && args[1] instanceof Coordinate) {
				let [src, dest] = args;
				var xp = this.m00 * src.x + this.m01 * src.y + this.m02;
				var yp = this.m10 * src.x + this.m11 * src.y + this.m12;
				dest.x = xp;
				dest.y = yp;
				return dest;
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1 && Number.isInteger(args[1])) {
				let [seq, i] = args;
				var xp = this.m00 * seq.getOrdinate(i, 0) + this.m01 * seq.getOrdinate(i, 1) + this.m02;
				var yp = this.m10 * seq.getOrdinate(i, 0) + this.m11 * seq.getOrdinate(i, 1) + this.m12;
				seq.setOrdinate(i, 0, xp);
				seq.setOrdinate(i, 1, yp);
			}
		}
	}
	reflect(...args) {
		if (args.length === 2) {
			let [x, y] = args;
			this.compose(AffineTransformation.reflectionInstance(x, y));
			return this;
		} else if (args.length === 4) {
			let [x0, y0, x1, y1] = args;
			this.compose(AffineTransformation.reflectionInstance(x0, y0, x1, y1));
			return this;
		}
	}
	getClass() {
		return AffineTransformation;
	}
}

