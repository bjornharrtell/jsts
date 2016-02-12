import LineString from '../LineString';
import Geometry from '../Geometry';
import Collection from '../../../../../java/util/Collection';
import LinearRing from '../LinearRing';
import GeometryComponentFilter from '../GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default class LinearComponentExtracter {
	constructor(...args) {
		this.lines = null;
		this.isForcedToLineString = false;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [lines] = args;
				this.lines = lines;
			} else if (args.length === 2) {
				let [lines, isForcedToLineString] = args;
				this.lines = lines;
				this.isForcedToLineString = isForcedToLineString;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [GeometryComponentFilter];
	}
	static getGeometry(...args) {
		if (args.length === 1) {
			let [geom] = args;
			return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom));
		} else if (args.length === 2) {
			let [geom, forceToLineString] = args;
			return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom, forceToLineString));
		}
	}
	static getLines(...args) {
		if (args.length === 1) {
			let [geom] = args;
			return LinearComponentExtracter.getLines(geom, false);
		} else if (args.length === 2) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1)) {
				let [geoms, lines] = args;
				for (var i = geoms.iterator(); i.hasNext(); ) {
					var g = i.next();
					LinearComponentExtracter.getLines(g, lines);
				}
				return lines;
			} else if (args[0] instanceof Geometry && typeof args[1] === "boolean") {
				let [geom, forceToLineString] = args;
				var lines = new ArrayList();
				geom.apply(new LinearComponentExtracter(lines, forceToLineString));
				return lines;
			} else if (args[0] instanceof Geometry && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1)) {
				let [geom, lines] = args;
				if (geom instanceof LineString) {
					lines.add(geom);
				} else {
					geom.apply(new LinearComponentExtracter(lines));
				}
				return lines;
			}
		} else if (args.length === 3) {
			if (typeof args[2] === "boolean" && (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1))) {
				let [geoms, lines, forceToLineString] = args;
				for (var i = geoms.iterator(); i.hasNext(); ) {
					var g = i.next();
					LinearComponentExtracter.getLines(g, lines, forceToLineString);
				}
				return lines;
			} else if (typeof args[2] === "boolean" && (args[0] instanceof Geometry && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1))) {
				let [geom, lines, forceToLineString] = args;
				geom.apply(new LinearComponentExtracter(lines, forceToLineString));
				return lines;
			}
		}
	}
	filter(geom) {
		if (this.isForcedToLineString && geom instanceof LinearRing) {
			var line = geom.getFactory().createLineString(geom.getCoordinateSequence());
			this.lines.add(line);
			return null;
		}
		if (geom instanceof LineString) this.lines.add(geom);
	}
	setForceToLineString(isForcedToLineString) {
		this.isForcedToLineString = isForcedToLineString;
	}
	getClass() {
		return LinearComponentExtracter;
	}
}

