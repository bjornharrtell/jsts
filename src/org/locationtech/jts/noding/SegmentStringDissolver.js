import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import OrientedCoordinateArray from './OrientedCoordinateArray';
import extend from '../../../../extend';
import SegmentString from './SegmentString';
import CoordinateArrays from '../geom/CoordinateArrays';
import TreeMap from '../../../../java/util/TreeMap';
export default function SegmentStringDissolver() {
	this.merger = null;
	this.ocaMap = new TreeMap();
	if (arguments.length === 0) {
		SegmentStringDissolver.call(this, null);
	} else if (arguments.length === 1) {
		let merger = arguments[0];
		this.merger = merger;
	}
}
extend(SegmentStringDissolver.prototype, {
	findMatching: function (oca, segString) {
		var matchSS = this.ocaMap.get(oca);
		return matchSS;
	},
	getDissolved: function () {
		return this.ocaMap.values();
	},
	dissolve: function () {
		if (hasInterface(arguments[0], Collection)) {
			let segStrings = arguments[0];
			for (var i = segStrings.iterator(); i.hasNext(); ) {
				this.dissolve(i.next());
			}
		} else if (hasInterface(arguments[0], SegmentString)) {
			let segString = arguments[0];
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
		}
	},
	add: function (oca, segString) {
		this.ocaMap.put(oca, segString);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SegmentStringDissolver;
	}
});
function SegmentStringMerger() {}
SegmentStringDissolver.SegmentStringMerger = SegmentStringMerger;

