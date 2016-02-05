export default class SpatialIndex {
	get interfaces_() {
		return [];
	}
	insert(itemEnv, item) {}
	remove(itemEnv, item) {}
	query(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [searchEnv] = args;
					})(...args);
				case 2:
					return ((...args) => {
						let [searchEnv, visitor] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return SpatialIndex;
	}
}

