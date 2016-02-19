import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import ConstraintSplitPointFinder from './ConstraintSplitPointFinder';
export default function MidpointSplitPointFinder() {}
extend(MidpointSplitPointFinder.prototype, {
	findSplitPoint: function (seg, encroachPt) {
		var p0 = seg.getStart();
		var p1 = seg.getEnd();
		return new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
	},
	interfaces_: function () {
		return [ConstraintSplitPointFinder];
	},
	getClass: function () {
		return MidpointSplitPointFinder;
	}
});

