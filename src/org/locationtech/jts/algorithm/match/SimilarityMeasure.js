export default class SimilarityMeasure {
	constructor() {
		SimilarityMeasure.constructor_.apply(this, arguments);
	}
	measure(g1, g2) {}
	getClass() {
		return SimilarityMeasure;
	}
	get interfaces_() {
		return [];
	}
}
SimilarityMeasure.constructor_ = function () {};
