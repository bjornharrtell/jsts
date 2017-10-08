import extend from '../../../../../extend';
import BasicPreparedGeometry from './BasicPreparedGeometry';
import inherits from '../../../../../inherits';
export default function PreparedPoint() {
	let point = arguments[0];
	BasicPreparedGeometry.call(this, point);
}
inherits(PreparedPoint, BasicPreparedGeometry);
extend(PreparedPoint.prototype, {
	intersects: function (g) {
		if (!this.envelopesIntersect(g)) return false;
		return this.isAnyTargetComponentInTest(g);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PreparedPoint;
	}
});
