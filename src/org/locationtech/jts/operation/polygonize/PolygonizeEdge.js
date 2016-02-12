import Edge from '../../planargraph/Edge';
export default class PolygonizeEdge extends Edge {
	constructor(...args) {
		super();
		this.line = null;
		if (args.length === 1) {
			let [line] = args;
			this.line = line;
		}
	}
	get interfaces_() {
		return [];
	}
	getLine() {
		return this.line;
	}
	getClass() {
		return PolygonizeEdge;
	}
}

