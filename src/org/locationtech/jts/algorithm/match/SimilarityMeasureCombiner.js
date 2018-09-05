export default class SimilarityMeasureCombiner {
	constructor() {
		SimilarityMeasureCombiner.constructor_.apply(this, arguments);
	}
	static combine(measure1, measure2) {
		return Math.min(measure1, measure2);
	}
	getClass() {
		return SimilarityMeasureCombiner;
	}
	get interfaces_() {
		return [];
	}
}
SimilarityMeasureCombiner.constructor_ = function () {};
