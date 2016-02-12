import GeometryCollection from '../GeometryCollection';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryFilter from '../GeometryFilter';
export default class GeometryExtracter {
	constructor(...args) {
		this.clz = null;
		this.comps = null;
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [clz, comps] = args;
					this.clz = clz;
					this.comps = comps;
				})(...args);
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
				return ((...args) => {
					let [geom, clz] = args;
					return GeometryExtracter.extract(geom, clz, new ArrayList());
				})(...args);
			case 3:
				return ((...args) => {
					let [geom, clz, list] = args;
					if (GeometryExtracter.isOfClass(geom, clz)) {
						list.add(geom);
					} else if (geom instanceof GeometryCollection) {
						geom.apply(new GeometryExtracter(clz, list));
					}
					return list;
				})(...args);
		}
	}
	filter(geom) {
		if (this.clz === null || GeometryExtracter.isOfClass(geom, this.clz)) this.comps.add(geom);
	}
	getClass() {
		return GeometryExtracter;
	}
}

