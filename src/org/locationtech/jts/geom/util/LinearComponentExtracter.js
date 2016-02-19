import LineString from '../LineString';
import Geometry from '../Geometry';
import hasInterface from '../../../../../hasInterface';
import Collection from '../../../../../java/util/Collection';
import LinearRing from '../LinearRing';
import extend from '../../../../../extend';
import GeometryComponentFilter from '../GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
export default function LinearComponentExtracter() {
	this.lines = null;
	this.isForcedToLineString = false;
	if (arguments.length === 1) {
		let lines = arguments[0];
		this.lines = lines;
	} else if (arguments.length === 2) {
		let lines = arguments[0], isForcedToLineString = arguments[1];
		this.lines = lines;
		this.isForcedToLineString = isForcedToLineString;
	}
}
extend(LinearComponentExtracter.prototype, {
	filter: function (geom) {
		if (this.isForcedToLineString && geom instanceof LinearRing) {
			var line = geom.getFactory().createLineString(geom.getCoordinateSequence());
			this.lines.add(line);
			return null;
		}
		if (geom instanceof LineString) this.lines.add(geom);
	},
	setForceToLineString: function (isForcedToLineString) {
		this.isForcedToLineString = isForcedToLineString;
	},
	interfaces_: function () {
		return [GeometryComponentFilter];
	},
	getClass: function () {
		return LinearComponentExtracter;
	}
});
LinearComponentExtracter.getGeometry = function () {
	if (arguments.length === 1) {
		let geom = arguments[0];
		return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom));
	} else if (arguments.length === 2) {
		let geom = arguments[0], forceToLineString = arguments[1];
		return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom, forceToLineString));
	}
};
LinearComponentExtracter.getLines = function () {
	if (arguments.length === 1) {
		let geom = arguments[0];
		return LinearComponentExtracter.getLines(geom, false);
	} else if (arguments.length === 2) {
		if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection)) {
			let geoms = arguments[0], lines = arguments[1];
			for (var i = geoms.iterator(); i.hasNext(); ) {
				var g = i.next();
				LinearComponentExtracter.getLines(g, lines);
			}
			return lines;
		} else if (arguments[0] instanceof Geometry && typeof arguments[1] === "boolean") {
			let geom = arguments[0], forceToLineString = arguments[1];
			var lines = new ArrayList();
			geom.apply(new LinearComponentExtracter(lines, forceToLineString));
			return lines;
		} else if (arguments[0] instanceof Geometry && hasInterface(arguments[1], Collection)) {
			let geom = arguments[0], lines = arguments[1];
			if (geom instanceof LineString) {
				lines.add(geom);
			} else {
				geom.apply(new LinearComponentExtracter(lines));
			}
			return lines;
		}
	} else if (arguments.length === 3) {
		if (typeof arguments[2] === "boolean" && (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection))) {
			let geoms = arguments[0], lines = arguments[1], forceToLineString = arguments[2];
			for (var i = geoms.iterator(); i.hasNext(); ) {
				var g = i.next();
				LinearComponentExtracter.getLines(g, lines, forceToLineString);
			}
			return lines;
		} else if (typeof arguments[2] === "boolean" && (arguments[0] instanceof Geometry && hasInterface(arguments[1], Collection))) {
			let geom = arguments[0], lines = arguments[1], forceToLineString = arguments[2];
			geom.apply(new LinearComponentExtracter(lines, forceToLineString));
			return lines;
		}
	}
};

