import WKTWriter from '../io/WKTWriter';
import MCIndexNoder from './MCIndexNoder';
import TopologyException from '../geom/TopologyException';
import extend from '../../../../extend';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
import InteriorIntersectionFinder from './InteriorIntersectionFinder';
export default function FastNodingValidator() {
	this._li = new RobustLineIntersector();
	this._segStrings = null;
	this._findAllIntersections = false;
	this._segInt = null;
	this._isValid = true;
	let segStrings = arguments[0];
	this._segStrings = segStrings;
}
extend(FastNodingValidator.prototype, {
	execute: function () {
		if (this._segInt !== null) return null;
		this.checkInteriorIntersections();
	},
	getIntersections: function () {
		return this._segInt.getIntersections();
	},
	isValid: function () {
		this.execute();
		return this._isValid;
	},
	setFindAllIntersections: function (findAllIntersections) {
		this._findAllIntersections = findAllIntersections;
	},
	checkInteriorIntersections: function () {
		this._isValid = true;
		this._segInt = new InteriorIntersectionFinder(this._li);
		this._segInt.setFindAllIntersections(this._findAllIntersections);
		var noder = new MCIndexNoder();
		noder.setSegmentIntersector(this._segInt);
		noder.computeNodes(this._segStrings);
		if (this._segInt.hasIntersection()) {
			this._isValid = false;
			return null;
		}
	},
	checkValid: function () {
		this.execute();
		if (!this._isValid) throw new TopologyException(this.getErrorMessage(), this._segInt.getInteriorIntersection());
	},
	getErrorMessage: function () {
		if (this._isValid) return "no intersections found";
		var intSegs = this._segInt.getIntersectionSegments();
		return "found non-noded intersection between " + WKTWriter.toLineString(intSegs[0], intSegs[1]) + " and " + WKTWriter.toLineString(intSegs[2], intSegs[3]);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return FastNodingValidator;
	}
});
FastNodingValidator.computeIntersections = function (segStrings) {
	var nv = new FastNodingValidator(segStrings);
	nv.setFindAllIntersections(true);
	nv.isValid();
	return nv.getIntersections();
};
