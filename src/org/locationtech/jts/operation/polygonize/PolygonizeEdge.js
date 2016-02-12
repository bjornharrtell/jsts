import Edge from '../../planargraph/Edge';
export default class PolygonizeEdge extends Edge {
	constructor(...args) {
		super();
		this.line = null;
		switch (args.length) {
			case 1:
				{
					let [line] = args;
					this.line = line;
					break;
				}
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

