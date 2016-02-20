import AffineTransformation from './AffineTransformation';
import extend from '../../../../../extend';
import Matrix from '../../math/Matrix';
export default function AffineTransformationBuilder() {
	this.src0 = null;
	this.src1 = null;
	this.src2 = null;
	this.dest0 = null;
	this.dest1 = null;
	this.dest2 = null;
	this.m00 = null;
	this.m01 = null;
	this.m02 = null;
	this.m10 = null;
	this.m11 = null;
	this.m12 = null;
	let src0 = arguments[0], src1 = arguments[1], src2 = arguments[2], dest0 = arguments[3], dest1 = arguments[4], dest2 = arguments[5];
	this.src0 = src0;
	this.src1 = src1;
	this.src2 = src2;
	this.dest0 = dest0;
	this.dest1 = dest1;
	this.dest2 = dest2;
}
extend(AffineTransformationBuilder.prototype, {
	solve: function (b) {
		var a = [[this.src0.x, this.src0.y, 1], [this.src1.x, this.src1.y, 1], [this.src2.x, this.src2.y, 1]];
		return Matrix.solve(a, b);
	},
	compute: function () {
		var bx = [this.dest0.x, this.dest1.x, this.dest2.x];
		var row0 = this.solve(bx);
		if (row0 === null) return false;
		this.m00 = row0[0];
		this.m01 = row0[1];
		this.m02 = row0[2];
		var by = [this.dest0.y, this.dest1.y, this.dest2.y];
		var row1 = this.solve(by);
		if (row1 === null) return false;
		this.m10 = row1[0];
		this.m11 = row1[1];
		this.m12 = row1[2];
		return true;
	},
	getTransformation: function () {
		var isSolvable = this.compute();
		if (isSolvable) return new AffineTransformation(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12);
		return null;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return AffineTransformationBuilder;
	}
});

