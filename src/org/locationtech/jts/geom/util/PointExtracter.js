import Point from '../Point';
import Collections from '../../../../../java/util/Collections';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default class PointExtracter {
	constructor(...args) {
		(() => {
			this.pts = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [pts] = args;
						this.pts = pts;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getPoints(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geom] = args;
						if (geom instanceof Point) {
							return Collections.singletonList(geom);
						}
						return PointExtracter.getPoints(geom, new ArrayList());
					})(...args);
				case 2:
					return ((...args) => {
						let [geom, list] = args;
						if (geom instanceof Point) {
							list.add(geom);
						} else if (geom instanceof GeometryCollection) {
							geom.apply(new PointExtracter(list));
						}
						return list;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	filter(geom) {
		if (geom instanceof Point) this.pts.add(geom);
	}
	getClass() {
		return PointExtracter;
	}
}

