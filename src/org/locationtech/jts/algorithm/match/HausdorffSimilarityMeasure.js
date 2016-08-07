import SimilarityMeasure from './SimilarityMeasure';
import extend from '../../../../../extend';
import Envelope from '../../geom/Envelope';
import DiscreteHausdorffDistance from '../distance/DiscreteHausdorffDistance';
export default function HausdorffSimilarityMeasure() {}
extend(HausdorffSimilarityMeasure.prototype, {
	measure: function (g1, g2) {
		var distance = DiscreteHausdorffDistance.distance(g1, g2, HausdorffSimilarityMeasure.DENSIFY_FRACTION);
		var env = new Envelope(g1.getEnvelopeInternal());
		env.expandToInclude(g2.getEnvelopeInternal());
		var envSize = HausdorffSimilarityMeasure.diagonalSize(env);
		var measure = 1 - distance / envSize;
		return measure;
	},
	interfaces_: function () {
		return [SimilarityMeasure];
	},
	getClass: function () {
		return HausdorffSimilarityMeasure;
	}
});
HausdorffSimilarityMeasure.diagonalSize = function (env) {
	if (env.isNull()) return 0.0;
	var width = env.getWidth();
	var hgt = env.getHeight();
	return Math.sqrt(width * width + hgt * hgt);
};
HausdorffSimilarityMeasure.DENSIFY_FRACTION = 0.25;
