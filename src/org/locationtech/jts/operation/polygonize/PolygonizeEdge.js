import Edge from '../../planargraph/Edge';
export default class PolygonizeEdge extends Edge {
	constructor(...args) {
		super();
		this.line = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [line] = args;
					this.line = line;
				})(...args);
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

