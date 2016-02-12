import NodingValidator from '../NodingValidator';
import Collection from '../../../../../java/util/Collection';
import Noder from '../Noder';
import MCIndexNoder from '../MCIndexNoder';
import NodedSegmentString from '../NodedSegmentString';
import HotPixel from './HotPixel';
import Exception from '../../../../../java/lang/Exception';
import MCIndexPointSnapper from './MCIndexPointSnapper';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
import InteriorIntersectionFinderAdder from '../InteriorIntersectionFinderAdder';
export default class MCIndexSnapRounder {
	constructor(...args) {
		this.pm = null;
		this.li = null;
		this.scaleFactor = null;
		this.noder = null;
		this.pointSnapper = null;
		this.nodedSegStrings = null;
		switch (args.length) {
			case 1:
				{
					let [pm] = args;
					this.pm = pm;
					this.li = new RobustLineIntersector();
					this.li.setPrecisionModel(pm);
					this.scaleFactor = pm.getScale();
					break;
				}
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
		this.computeIntersectionSnaps(intersections);
		this.computeVertexSnaps(segStrings);
	}
	findInteriorIntersections(segStrings, li) {
		var intFinderAdder = new InteriorIntersectionFinderAdder(li);
		this.noder.setSegmentIntersector(intFinderAdder);
		this.noder.computeNodes(segStrings);
		return intFinderAdder.getInteriorIntersections();
	}
	computeVertexSnaps(...args) {
		switch (args.length) {
			case 1:
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
					let [edges] = args;
					for (var i0 = edges.iterator(); i0.hasNext(); ) {
						var edge0 = i0.next();
						this.computeVertexSnaps(edge0);
					}
				} else if (args[0] instanceof NodedSegmentString) {
					let [e] = args;
					var pts0 = e.getCoordinates();
					for (var i = 0; i < pts0.length; i++) {
						var hotPixel = new HotPixel(pts0[i], this.scaleFactor, this.li);
						var isNodeAdded = this.pointSnapper.snap(hotPixel, e, i);
						if (isNodeAdded) {
							e.addIntersection(pts0[i], i);
						}
					}
				}
				break;
		}
	}
	computeNodes(inputSegmentStrings) {
		this.nodedSegStrings = inputSegmentStrings;
		this.noder = new MCIndexNoder();
		this.pointSnapper = new MCIndexPointSnapper(this.noder.getIndex());
		this.snapRound(inputSegmentStrings, this.li);
	}
	computeIntersectionSnaps(snapPts) {
		for (var it = snapPts.iterator(); it.hasNext(); ) {
			var snapPt = it.next();
			var hotPixel = new HotPixel(snapPt, this.scaleFactor, this.li);
			this.pointSnapper.snap(hotPixel);
		}
	}
	getClass() {
		return MCIndexSnapRounder;
	}
}

