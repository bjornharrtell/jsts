import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default class GeometryExtracter {
	constructor(...args) {
		this.clz = null;
		this.comps = null;
		switch (args.length) {
			case 2:
				{
					let [clz, comps] = args;
					this.clz = clz;
					this.comps = comps;
					break;
				}
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static isOfClass(o, clz) {
		return clz.isAssignableFrom(o.getClass());
	}
	static extract(...args) {
		switch (args.length) {
			case 2:
				{
					let [geom, clz] = args;
					return GeometryExtracter.extract(geom, clz, new ArrayList());
					break;
				}
			case 3:
				{
					let [geom, clz, list] = args;
					if (GeometryExtracter.isOfClass(geom, clz)) {
						list.add(geom);
					} else if (geom instanceof GeometryCollection) {
						geom.apply(new GeometryExtracter(clz, list));
					}
					return list;
					break;
				}
		}
	}
	filter(geom) {
		if (this.clz === null || GeometryExtracter.isOfClass(geom, this.clz)) this.comps.add(geom);
	}
	getClass() {
		return GeometryExtracter;
	}
}

