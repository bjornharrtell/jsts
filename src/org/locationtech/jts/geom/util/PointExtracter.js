import Point from '../Point';
import Collections from '../../../../../java/util/Collections';
import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default class PointExtracter {
	constructor(...args) {
		this.pts = null;
		switch (args.length) {
			case 1:
				{
					let [pts] = args;
					this.pts = pts;
					break;
				}
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getPoints(...args) {
		switch (args.length) {
			case 1:
				{
					let [geom] = args;
					if (geom instanceof Point) {
						return Collections.singletonList(geom);
					}
					return PointExtracter.getPoints(geom, new ArrayList());
					break;
				}
			case 2:
				{
					let [geom, list] = args;
					if (geom instanceof Point) {
						list.add(geom);
					} else if (geom instanceof GeometryCollection) {
						geom.apply(new PointExtracter(list));
					}
					return list;
					break;
				}
		}
	}
	filter(geom) {
		if (geom instanceof Point) this.pts.add(geom);
	}
	getClass() {
		return PointExtracter;
	}
}

