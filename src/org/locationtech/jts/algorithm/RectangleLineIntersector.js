import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import RobustLineIntersector from './RobustLineIntersector';
import Envelope from '../geom/Envelope';
export default function RectangleLineIntersector() {
	this._li = new RobustLineIntersector();
	this._rectEnv = null;
	this._diagUp0 = null;
	this._diagUp1 = null;
	this._diagDown0 = null;
	this._diagDown1 = null;
	let rectEnv = arguments[0];
	this._rectEnv = rectEnv;
	this._diagUp0 = new Coordinate(rectEnv.getMinX(), rectEnv.getMinY());
	this._diagUp1 = new Coordinate(rectEnv.getMaxX(), rectEnv.getMaxY());
	this._diagDown0 = new Coordinate(rectEnv.getMinX(), rectEnv.getMaxY());
	this._diagDown1 = new Coordinate(rectEnv.getMaxX(), rectEnv.getMinY());
}
extend(RectangleLineIntersector.prototype, {
	intersects: function (p0, p1) {
		var segEnv = new Envelope(p0, p1);
		if (!this._rectEnv.intersects(segEnv)) return false;
		if (this._rectEnv.intersects(p0)) return true;
		if (this._rectEnv.intersects(p1)) return true;
		if (p0.compareTo(p1) > 0) {
			var tmp = p0;
			p0 = p1;
			p1 = tmp;
		}
		var isSegUpwards = false;
		if (p1.y > p0.y) isSegUpwards = true;
		if (isSegUpwards) {
			this._li.computeIntersection(p0, p1, this._diagDown0, this._diagDown1);
		} else {
			this._li.computeIntersection(p0, p1, this._diagUp0, this._diagUp1);
		}
		if (this._li.hasIntersection()) return true;
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RectangleLineIntersector;
	}
});
