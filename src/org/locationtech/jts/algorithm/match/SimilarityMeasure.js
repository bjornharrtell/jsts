import extend from '../../../../../extend';
export default function SimilarityMeasure() {}
extend(SimilarityMeasure.prototype, {
	measure: function (g1, g2) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SimilarityMeasure;
	}
});
