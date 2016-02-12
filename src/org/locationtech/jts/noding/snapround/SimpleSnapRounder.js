import NodingValidator from '../NodingValidator';
import Collection from '../../../../../java/util/Collection';
import Noder from '../Noder';
import MCIndexNoder from '../MCIndexNoder';
import NodedSegmentString from '../NodedSegmentString';
import HotPixel from './HotPixel';
import Exception from '../../../../../java/lang/Exception';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
import InteriorIntersectionFinderAdder from '../InteriorIntersectionFinderAdder';
export default class SimpleSnapRounder {
	constructor(...args) {
		this.pm = null;
		this.li = null;
		this.scaleFactor = null;
		this.nodedSegStrings = null;
		if (args.length === 1) {
			let [pm] = args;
			this.pm = pm;
			this.li = new RobustLineIntersector();
			this.li.setPrecisionModel(pm);
			this.scaleFactor = pm.getScale();
		}
	}
	get interfaces_() {
		return [Noder];
	}
	checkCorrectness(inputSegmentStrings) {
		var resultSegStrings = NodedSegmentString.getNodedSubstrings(inputSegmentStrings);
		var nv = new NodingValidator(resultSegStrings);
		try {
			nv.checkValid();
		} catch (ex) {
			if (ex instanceof Exception) {
				ex.printStackTrace();
			} else throw ex;
		} finally {}
	}
	getNodedSubstrings() {
		return NodedSegmentString.getNodedSubstrings(this.nodedSegStrings);
	}
	snapRound(segStrings, li) {
		var intersections = this.findInteriorIntersections(segStrings, li);
		this.computeSnaps(segStrings, intersections);
		this.computeVertexSnaps(segStrings);
	}
	findInteriorIntersections(segStrings, li) {
		var intFinderAdder = new InteriorIntersectionFinderAdder(li);
		var noder = new MCIndexNoder();
		noder.setSegmentIntersector(intFinderAdder);
		noder.computeNodes(segStrings);
		return intFinderAdder.getInteriorIntersections();
	}
	computeVertexSnaps(...args) {
		if (args.length === 1) {
			let [edges] = args;
			for (var i0 = edges.iterator(); i0.hasNext(); ) {
				var edge0 = i0.next();
				for (var i1 = edges.iterator(); i1.hasNext(); ) {
					var edge1 = i1.next();
					this.computeVertexSnaps(edge0, edge1);
				}
			}
		} else if (args.length === 2) {
			let [e0, e1] = args;
			var pts0 = e0.getCoordinates();
			var pts1 = e1.getCoordinates();
			for (var i0 = 0; i0 < pts0.length - 1; i0++) {
				var hotPixel = new HotPixel(pts0[i0], this.scaleFactor, this.li);
				for (var i1 = 0; i1 < pts1.length - 1; i1++) {
					if (e0 === e1) {
						if (i0 === i1) continue;
					}
					var isNodeAdded = hotPixel.addSnappedNode(e1, i1);
					if (isNodeAdded) {
						e0.addIntersection(pts0[i0], i0);
					}
				}
			}
		}
	}
	computeNodes(inputSegmentStrings) {
		this.nodedSegStrings = inputSegmentStrings;
		this.snapRound(inputSegmentStrings, this.li);
	}
	computeSnaps(...args) {
		if (args.length === 2) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1)) {
				let [segStrings, snapPts] = args;
				for (var i0 = segStrings.iterator(); i0.hasNext(); ) {
					var ss = i0.next();
					this.computeSnaps(ss, snapPts);
				}
			} else if (args[0] instanceof NodedSegmentString && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1)) {
				let [ss, snapPts] = args;
				for (var it = snapPts.iterator(); it.hasNext(); ) {
					var snapPt = it.next();
					var hotPixel = new HotPixel(snapPt, this.scaleFactor, this.li);
					for (var i = 0; i < ss.size() - 1; i++) {
						hotPixel.addSnappedNode(ss, i);
					}
				}
			}
		}
	}
	getClass() {
		return SimpleSnapRounder;
	}
}

