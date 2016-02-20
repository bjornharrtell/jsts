import CGAlgorithms from './CGAlgorithms';
import extend from '../../../../extend';
import PointInRing from './PointInRing';
export default function SimplePointInRing() {
	this.pts = null;
	let ring = arguments[0];
	this.pts = ring.getCoordinates();
}
extend(SimplePointInRing.prototype, {
	isInside: function (pt) {
		return CGAlgorithms.isPointInRing(pt, this.pts);
	},
	interfaces_: function () {
		return [PointInRing];
	},
	getClass: function () {
		return SimplePointInRing;
	}
});

