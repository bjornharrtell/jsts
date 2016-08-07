import BasicSegmentString from '../noding/BasicSegmentString';
import extend from '../../../../extend';
import FastNodingValidator from '../noding/FastNodingValidator';
import ArrayList from '../../../../java/util/ArrayList';
export default function EdgeNodingValidator() {
	this.nv = null;
	let edges = arguments[0];
	this.nv = new FastNodingValidator(EdgeNodingValidator.toSegmentStrings(edges));
}
extend(EdgeNodingValidator.prototype, {
	checkValid: function () {
		this.nv.checkValid();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeNodingValidator;
	}
});
EdgeNodingValidator.toSegmentStrings = function (edges) {
	var segStrings = new ArrayList();
	for (var i = edges.iterator(); i.hasNext(); ) {
		var e = i.next();
		segStrings.add(new BasicSegmentString(e.getCoordinates(), e));
	}
	return segStrings;
};
EdgeNodingValidator.checkValid = function (edges) {
	var validator = new EdgeNodingValidator(edges);
	validator.checkValid();
};
