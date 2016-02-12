import Node from '../../geomgraph/Node';
export default class RelateNode extends Node {
	constructor(...args) {
		super();
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [coord, edges] = args;
					super(coord, edges);
				})(...args);
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

