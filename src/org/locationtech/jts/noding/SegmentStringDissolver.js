import Collection from '../../../../java/util/Collection';
import OrientedCoordinateArray from './OrientedCoordinateArray';
import SegmentString from './SegmentString';
import CoordinateArrays from '../geom/CoordinateArrays';
import TreeMap from '../../../../java/util/TreeMap';
export default class SegmentStringDissolver {
	constructor(...args) {
		this.merger = null;
		this.ocaMap = new TreeMap();
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloaded.call(this, null);
					})(...args);
				case 1:
					return ((...args) => {
						let [merger] = args;
						this.merger = merger;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	findMatching(oca, segString) {
		var matchSS = this.ocaMap.get(oca);
		return matchSS;
	}
	getDissolved() {
		return this.ocaMap.values();
	}
	dissolve(...args) {
		switch (args.length) {
			case 1:
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
					return ((...args) => {
						let [segStrings] = args;
						for (var i = segStrings.iterator(); i.hasNext(); ) {
							this.dissolve(i.next());
						}
					})(...args);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(SegmentString) > -1) {
					return ((...args) => {
						let [segString] = args;
						var oca = new OrientedCoordinateArray(segString.getCoordinates());
						var existing = this.findMatching(oca, segString);
						if (existing === null) {
							this.add(oca, segString);
						} else {
							if (this.merger !== null) {
								var isSameOrientation = CoordinateArrays.equals(existing.getCoordinates(), segString.getCoordinates());
								this.merger.merge(existing, segString, isSameOrientation);
							}
						}
					})(...args);
				}
		}
	}
	add(oca, segString) {
		this.ocaMap.put(oca, segString);
	}
	getClass() {
		return SegmentStringDissolver;
	}
}

