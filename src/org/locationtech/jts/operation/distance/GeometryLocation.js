export default class GeometryLocation {
	constructor(...args) {
		this.component = null;
		this.segIndex = null;
		this.pt = null;
		const overloaded = (...args) => {
			if (args.length === 2) {
				return ((...args) => {
					let [component, pt] = args;
					overloaded.call(this, component, GeometryLocation.INSIDE_AREA, pt);
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [component, segIndex, pt] = args;
					this.component = component;
					this.segIndex = segIndex;
					this.pt = pt;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
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

