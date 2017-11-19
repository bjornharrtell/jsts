import extend from '../../../../../extend';
import Comparator from '../../../../../java/util/Comparator';
import Serializable from '../../../../../java/io/Serializable';
export default function BoundablePairDistanceComparator() {
	this.normalOrder = null;
	let normalOrder = arguments[0];
	this.normalOrder = normalOrder;
}
extend(BoundablePairDistanceComparator.prototype, {
	compare: function (p1, p2) {
		var distance1 = p1.getDistance();
		var distance2 = p2.getDistance();
		if (this.normalOrder) {
			if (distance1 > distance2) {
				return 1;
			} else if (distance1 === distance2) {
				return 0;
			}
			return -1;
		} else {
			if (distance1 > distance2) {
				return -1;
			} else if (distance1 === distance2) {
				return 0;
			}
			return 1;
		}
	},
	interfaces_: function () {
		return [Comparator, Serializable];
	},
	getClass: function () {
		return BoundablePairDistanceComparator;
	}
});
