export default class SpatialIndex {
	get interfaces_() {
		return [];
	}
	insert(itemEnv, item) {}
	remove(itemEnv, item) {}
	query(...args) {
		switch (args.length) {
			case 1:
				{
					let [searchEnv] = args;
					break;
				}
			case 2:
				{
					let [searchEnv, visitor] = args;
					break;
				}
		}
	}
	getClass() {
		return SpatialIndex;
	}
}

