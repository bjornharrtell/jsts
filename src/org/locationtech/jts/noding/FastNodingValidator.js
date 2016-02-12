import WKTWriter from '../io/WKTWriter';
import MCIndexNoder from './MCIndexNoder';
import TopologyException from '../geom/TopologyException';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
import InteriorIntersectionFinder from './InteriorIntersectionFinder';
export default class FastNodingValidator {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.segStrings = null;
		this.findAllIntersections = false;
		this.segInt = null;
		this._isValid = true;
		if (args.length === 1) {
			let [segStrings] = args;
			this.segStrings = segStrings;
		}
	}
	get interfaces_() {
		return [];
	}
	static computeIntersections(segStrings) {
		var nv = new FastNodingValidator(segStrings);
		nv.setFindAllIntersections(true);
		nv.isValid();
		return nv.getIntersections();
	}
	execute() {
		if (this.segInt !== null) return null;
		this.checkInteriorIntersections();
	}
	getIntersections() {
		return this.segInt.getIntersections();
	}
	isValid() {
		this.execute();
		return this._isValid;
	}
	setFindAllIntersections(findAllIntersections) {
		this.findAllIntersections = findAllIntersections;
	}
	checkInteriorIntersections() {
		this._isValid = true;
		this.segInt = new InteriorIntersectionFinder(this.li);
		this.segInt.setFindAllIntersections(this.findAllIntersections);
		var noder = new MCIndexNoder();
		noder.setSegmentIntersector(this.segInt);
		noder.computeNodes(this.segStrings);
		if (this.segInt.hasIntersection()) {
			this._isValid = false;
			return null;
		}
	}
	checkValid() {
		this.execute();
		if (!this._isValid) throw new TopologyException(this.getErrorMessage(), this.segInt.getInteriorIntersection());
	}
	getErrorMessage() {
		if (this._isValid) return "no intersections found";
		var intSegs = this.segInt.getIntersectionSegments();
		return "found non-noded intersection between " + WKTWriter.toLineString(intSegs[0], intSegs[1]) + " and " + WKTWriter.toLineString(intSegs[2], intSegs[3]);
	}
	getClass() {
		return FastNodingValidator;
	}
}

