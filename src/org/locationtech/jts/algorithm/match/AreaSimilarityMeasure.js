import SimilarityMeasure from './SimilarityMeasure';
export default class AreaSimilarityMeasure {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [SimilarityMeasure];
	}
	measure(g1, g2) {
		var areaInt = g1.intersection(g2).getArea();
		var areaUnion = g1.union(g2).getArea();
		return areaInt / areaUnion;
	}
	getClass() {
		return AreaSimilarityMeasure;
	}
}

