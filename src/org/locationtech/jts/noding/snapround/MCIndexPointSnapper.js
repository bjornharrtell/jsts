export default class MCIndexPointSnapper {
	constructor(...args) {
		(() => {
			this.index = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [index] = args;
						this.index = index;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	snap(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [hotPixel] = args;
						return this.snap(hotPixel, null, -1);
					})(...args);
				case 3:
					return ((...args) => {
						let [hotPixel, parentEdge, hotPixelVertexIndex] = args;
						var pixelEnv = hotPixel.getSafeEnvelope();
						var hotPixelSnapAction = new HotPixelSnapAction(hotPixel, parentEdge, hotPixelVertexIndex);
						this.index.query(pixelEnv, new (class {
							visitItem(item) {
								var testChain = item;
								testChain.select(pixelEnv, hotPixelSnapAction);
							}
						})());
						return hotPixelSnapAction.isNodeAdded();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return MCIndexPointSnapper;
	}
}

