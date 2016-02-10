import DirectedEdge from '../../planargraph/DirectedEdge';
export default class PolygonizeDirectedEdge extends DirectedEdge {
	constructor(...args) {
		super();
		this.edgeRing = null;
		this.next = null;
		this.label = -1;
		const overloads = (...args) => {
			switch (args.length) {
				case 4:
					return ((...args) => {
						let [from, to, directionPt, edgeDirection] = args;
						super(from, to, directionPt, edgeDirection);
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

