import Edge from '../../planargraph/Edge';
export default class LineMergeEdge extends Edge {
	constructor(...args) {
		super();
		(() => {
			this.line = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [line] = args;
						this.line = line;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getLine() {
		return this.line;
	}
	getClass() {
		return LineMergeEdge;
	}
}

