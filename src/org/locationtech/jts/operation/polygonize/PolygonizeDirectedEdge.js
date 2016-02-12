import DirectedEdge from '../../planargraph/DirectedEdge';
export default class PolygonizeDirectedEdge extends DirectedEdge {
	constructor(...args) {
		super();
		this.edgeRing = null;
		this.next = null;
		this.label = -1;
		if (args.length === 4) {
			let [from, to, directionPt, edgeDirection] = args;
			super(from, to, directionPt, edgeDirection);
		}
	}
	get interfaces_() {
		return [];
	}
	getNext() {
		return this.next;
	}
	isInRing() {
		return this.edgeRing !== null;
	}
	setRing(edgeRing) {
		this.edgeRing = edgeRing;
	}
	setLabel(label) {
		this.label = label;
	}
	getLabel() {
		return this.label;
	}
	setNext(next) {
		this.next = next;
	}
	getRing() {
		return this.edgeRing;
	}
	getClass() {
		return PolygonizeDirectedEdge;
	}
}

