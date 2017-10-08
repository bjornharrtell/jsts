import NodingValidator from '../NodingValidator';
import hasInterface from '../../../../../hasInterface';
import Collection from '../../../../../java/util/Collection';
import Noder from '../Noder';
import MCIndexNoder from '../MCIndexNoder';
import NodedSegmentString from '../NodedSegmentString';
import HotPixel from './HotPixel';
import extend from '../../../../../extend';
import Exception from '../../../../../java/lang/Exception';
import MCIndexPointSnapper from './MCIndexPointSnapper';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
import InteriorIntersectionFinderAdder from '../InteriorIntersectionFinderAdder';
export default function MCIndexSnapRounder() {
	this._pm = null;
	this._li = null;
	this._scaleFactor = null;
	this._noder = null;
	this._pointSnapper = null;
	this._nodedSegStrings = null;
	let pm = arguments[0];
	this._pm = pm;
	this._li = new RobustLineIntersector();
	this._li.setPrecisionModel(pm);
	this._scaleFactor = pm.getScale();
}
extend(MCIndexSnapRounder.prototype, {
	checkCorrectness: function (inputSegmentStrings) {
		var resultSegStrings = NodedSegmentString.getNodedSubstrings(inputSegmentStrings);
		var nv = new NodingValidator(resultSegStrings);
		try {
			nv.checkValid();
		} catch (ex) {
			if (ex instanceof Exception) {
				ex.printStackTrace();
			} else throw ex;
		} finally {}
	},
	getNodedSubstrings: function () {
		return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings);
	},
	snapRound: function (segStrings, li) {
		var intersections = this.findInteriorIntersections(segStrings, li);
		this.computeIntersectionSnaps(intersections);
		this.computeVertexSnaps(segStrings);
	},
	findInteriorIntersections: function (segStrings, li) {
		var intFinderAdder = new InteriorIntersectionFinderAdder(li);
		this._noder.setSegmentIntersector(intFinderAdder);
		this._noder.computeNodes(segStrings);
		return intFinderAdder.getInteriorIntersections();
	},
	computeVertexSnaps: function () {
		if (hasInterface(arguments[0], Collection)) {
			let edges = arguments[0];
			for (var i0 = edges.iterator(); i0.hasNext(); ) {
				var edge0 = i0.next();
				this.computeVertexSnaps(edge0);
			}
		} else if (arguments[0] instanceof NodedSegmentString) {
			let e = arguments[0];
			var pts0 = e.getCoordinates();
			for (var i = 0; i < pts0.length; i++) {
				var hotPixel = new HotPixel(pts0[i], this._scaleFactor, this._li);
				var isNodeAdded = this._pointSnapper.snap(hotPixel, e, i);
				if (isNodeAdded) {
					e.addIntersection(pts0[i], i);
				}
			}
		}
	},
	computeNodes: function (inputSegmentStrings) {
		this._nodedSegStrings = inputSegmentStrings;
		this._noder = new MCIndexNoder();
		this._pointSnapper = new MCIndexPointSnapper(this._noder.getIndex());
		this.snapRound(inputSegmentStrings, this._li);
	},
	computeIntersectionSnaps: function (snapPts) {
		for (var it = snapPts.iterator(); it.hasNext(); ) {
			var snapPt = it.next();
			var hotPixel = new HotPixel(snapPt, this._scaleFactor, this._li);
			this._pointSnapper.snap(hotPixel);
		}
	},
	interfaces_: function () {
		return [Noder];
	},
	getClass: function () {
		return MCIndexSnapRounder;
	}
});
