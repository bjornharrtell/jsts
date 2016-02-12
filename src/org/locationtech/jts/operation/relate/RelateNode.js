import Node from '../../geomgraph/Node';
export default class RelateNode extends Node {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [coord, edges] = args;
			super(coord, edges);
		}
	}
	get interfaces_() {
		return [];
	}
	updateIMFromEdges(im) {
		this.edges.updateIM(im);
	}
	computeIM(im) {
		im.setAtLeastIfValid(this.label.getLocation(0), this.label.getLocation(1), 0);
	}
	getClass() {
		return RelateNode;
	}
}

