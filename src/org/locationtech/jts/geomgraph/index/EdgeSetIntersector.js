export default class EdgeSetIntersector {
	constructor(...args) {
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
	getClass() {
		return EdgeSetIntersector;
	}
}

