import extend from '../../../../../extend';
export default function SimilarityMeasureCombiner() {}
extend(SimilarityMeasureCombiner.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SimilarityMeasureCombiner;
	}
});
SimilarityMeasureCombiner.combine = function (measure1, measure2) {
	return Math.min(measure1, measure2);
};

