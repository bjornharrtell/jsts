import EdgeEndStar from '../../geomgraph/EdgeEndStar';
import EdgeEndBundle from './EdgeEndBundle';
export default class EdgeEndBundleStar extends EdgeEndStar {
	constructor(...args) {
		super();
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	updateIM(im) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var esb = it.next();
			esb.updateIM(im);
		}
	}
	insert(e) {
		var eb = this.edgeMap.get(e);
		if (eb === null) {
			eb = new EdgeEndBundle(e);
			this.insertEdgeEnd(e, eb);
		} else {
			eb.insert(e);
		}
	}
	getClass() {
		return EdgeEndBundleStar;
	}
}

