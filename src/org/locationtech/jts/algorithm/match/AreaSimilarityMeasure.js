import SimilarityMeasure from './SimilarityMeasure';
import extend from '../../../../../extend';
export default function AreaSimilarityMeasure() {}
extend(AreaSimilarityMeasure.prototype, {
	measure: function (g1, g2) {
		var areaInt = g1.intersection(g2).getArea();
		var areaUnion = g1.union(g2).getArea();
		return areaInt / areaUnion;
	},
	interfaces_: function () {
		return [SimilarityMeasure];
	},
	getClass: function () {
		return AreaSimilarityMeasure;
	}
});
