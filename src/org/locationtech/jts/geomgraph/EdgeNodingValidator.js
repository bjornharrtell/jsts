import BasicSegmentString from '../noding/BasicSegmentString';
import FastNodingValidator from '../noding/FastNodingValidator';
import ArrayList from '../../../../java/util/ArrayList';
export default class EdgeNodingValidator {
	constructor() {
		EdgeNodingValidator.constructor_.apply(this, arguments);
	}
	static toSegmentStrings(edges) {
		var segStrings = new ArrayList();
		for (var i = edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			segStrings.add(new BasicSegmentString(e.getCoordinates(), e));
		}
		return segStrings;
	}
	static checkValid(edges) {
		var validator = new EdgeNodingValidator(edges);
		validator.checkValid();
	}
	checkValid() {
		this._nv.checkValid();
	}
	getClass() {
		return EdgeNodingValidator;
	}
	get interfaces_() {
		return [];
	}
}
EdgeNodingValidator.constructor_ = function () {
	this._nv = null;
	let edges = arguments[0];
	this._nv = new FastNodingValidator(EdgeNodingValidator.toSegmentStrings(edges));
};
