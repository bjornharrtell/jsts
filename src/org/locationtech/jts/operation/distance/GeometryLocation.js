export default class GeometryLocation {
	constructor(...args) {
		(() => {
			this.component = null;
			this.segIndex = null;
			this.pt = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [component, pt] = args;
						overloads.call(this, component, GeometryLocation.INSIDE_AREA, pt);
					})(...args);
				case 3:
					return ((...args) => {
						let [component, segIndex, pt] = args;
						this.component = component;
						this.segIndex = segIndex;
						this.pt = pt;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	isInsideArea() {
		return this.segIndex === GeometryLocation.INSIDE_AREA;
	}
	getCoordinate() {
		return this.pt;
	}
	getGeometryComponent() {
		return this.component;
	}
	getSegmentIndex() {
		return this.segIndex;
	}
	getClass() {
		return GeometryLocation;
	}
}
GeometryLocation.INSIDE_AREA = -1;

