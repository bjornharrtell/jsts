export default class SpatialIndex {
	get interfaces_() {
		return [];
	}
	insert(itemEnv, item) {}
	remove(itemEnv, item) {}
	query(...args) {
		if (args.length === 1) {
			let [searchEnv] = args;
		} else if (args.length === 2) {
			let [searchEnv, visitor] = args;
		}
	}
	getClass() {
		return SpatialIndex;
	}
}

