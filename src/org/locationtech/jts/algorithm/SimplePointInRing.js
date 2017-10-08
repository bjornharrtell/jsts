import CGAlgorithms from './CGAlgorithms';
import extend from '../../../../extend';
import PointInRing from './PointInRing';
export default function SimplePointInRing() {
	this._pts = null;
	let ring = arguments[0];
	this._pts = ring.getCoordinates();
}
extend(SimplePointInRing.prototype, {
	isInside: function (pt) {
		return CGAlgorithms.isPointInRing(pt, this._pts);
	},
	interfaces_: function () {
		return [PointInRing];
	},
	getClass: function () {
		return SimplePointInRing;
	}
});
