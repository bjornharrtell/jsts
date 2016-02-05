export default class SimilarityMeasureCombiner {
	get interfaces_() {
		return [];
	}
	static combine(measure1, measure2) {
		return Math.min(measure1, measure2);
	}
	getClass() {
		return SimilarityMeasureCombiner;
	}
}

