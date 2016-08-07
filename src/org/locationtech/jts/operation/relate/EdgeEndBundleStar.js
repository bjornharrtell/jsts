import extend from '../../../../../extend';
import EdgeEndStar from '../../geomgraph/EdgeEndStar';
import inherits from '../../../../../inherits';
import EdgeEndBundle from './EdgeEndBundle';
export default function EdgeEndBundleStar() {
	EdgeEndStar.apply(this);
}
inherits(EdgeEndBundleStar, EdgeEndStar);
extend(EdgeEndBundleStar.prototype, {
	updateIM: function (im) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var esb = it.next();
			esb.updateIM(im);
		}
	},
	insert: function (e) {
		var eb = this.edgeMap.get(e);
		if (eb === null) {
			eb = new EdgeEndBundle(e);
			this.insertEdgeEnd(e, eb);
		} else {
			eb.insert(e);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeEndBundleStar;
	}
});
