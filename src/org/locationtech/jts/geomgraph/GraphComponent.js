import Assert from '../util/Assert';
export default class GraphComponent {
	constructor(...args) {
		(() => {
			this.label = null;
			this._isInResult = false;
			this._isCovered = false;
			this._isCoveredSet = false;
			this._isVisited = false;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
				case 1:
					return ((...args) => {
						let [label] = args;
						this.label = label;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	setVisited(isVisited) {
		this._isVisited = isVisited;
	}
	setInResult(isInResult) {
		this._isInResult = isInResult;
	}
	isCovered() {
		return this._isCovered;
	}
	isCoveredSet() {
		return this._isCoveredSet;
	}
	setLabel(label) {
		this.label = label;
	}
	getLabel() {
		return this.label;
	}
	setCovered(isCovered) {
		this._isCovered = isCovered;
		this._isCoveredSet = true;
	}
	updateIM(im) {
		Assert.isTrue(this.label.getGeometryCount() >= 2, "found partial label");
		this.computeIM(im);
	}
	isInResult() {
		return this._isInResult;
	}
	isVisited() {
		return this._isVisited;
	}
	getClass() {
		return GraphComponent;
	}
}

