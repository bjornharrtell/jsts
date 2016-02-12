import Coordinate from '../Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import AffineTransformation from './AffineTransformation';
import AffineTransformationBuilder from './AffineTransformationBuilder';
import Angle from '../../algorithm/Angle';
export default class AffineTransformationFactory {
	get interfaces_() {
		return [];
	}
	static createFromBaseLines(src0, src1, dest0, dest1) {
		var rotPt = new Coordinate(src0.x + dest1.x - dest0.x, src0.y + dest1.y - dest0.y);
		var ang = Angle.angleBetweenOriented(src1, src0, rotPt);
		var srcDist = src1.distance(src0);
		var destDist = dest1.distance(dest0);
		if (srcDist === 0.0) return new AffineTransformation();
		var scale = destDist / srcDist;
		var trans = AffineTransformation.translationInstance(-src0.x, -src0.y);
		trans.rotate(ang);
		trans.scale(scale, scale);
		trans.translate(dest0.x, dest0.y);
		return trans;
	}
	static createFromControlVectors(...args) {
		switch (args.length) {
			case 2:
				if (args[0] instanceof Coordinate && args[1] instanceof Coordinate) {
					return ((...args) => {
						let [src0, dest0] = args;
						var dx = dest0.x - src0.x;
						var dy = dest0.y - src0.y;
						return AffineTransformation.translationInstance(dx, dy);
					})(...args);
				} else if (args[0] instanceof Array && args[1] instanceof Array) {
					return ((...args) => {
						let [src, dest] = args;
						if (src.length !== dest.length) throw new IllegalArgumentException("Src and Dest arrays are not the same length");
						if (src.length <= 0) throw new IllegalArgumentException("Too few control points");
						if (src.length > 3) throw new IllegalArgumentException("Too many control points");
						if (src.length === 1) return AffineTransformationFactory.createFromControlVectors(src[0], dest[0]);
						if (src.length === 2) return AffineTransformationFactory.createFromControlVectors(src[0], src[1], dest[0], dest[1]);
						return AffineTransformationFactory.createFromControlVectors(src[0], src[1], src[2], dest[0], dest[1], dest[2]);
					})(...args);
				}
			case 4:
				return ((...args) => {
					let [src0, src1, dest0, dest1] = args;
					var rotPt = new Coordinate(dest1.x - dest0.x, dest1.y - dest0.y);
					var ang = Angle.angleBetweenOriented(src1, src0, rotPt);
					var srcDist = src1.distance(src0);
					var destDist = dest1.distance(dest0);
					if (srcDist === 0.0) return null;
					var scale = destDist / srcDist;
					var trans = AffineTransformation.translationInstance(-src0.x, -src0.y);
					trans.rotate(ang);
					trans.scale(scale, scale);
					trans.translate(dest0.x, dest0.y);
					return trans;
				})(...args);
			case 6:
				return ((...args) => {
					let [src0, src1, src2, dest0, dest1, dest2] = args;
					var builder = new AffineTransformationBuilder(src0, src1, src2, dest0, dest1, dest2);
					return builder.getTransformation();
				})(...args);
		}
	}
	getClass() {
		return AffineTransformationFactory;
	}
}

