import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import DoubleBits from './DoubleBits';
import Envelope from '../../geom/Envelope';
export default function Key() {
	this.pt = new Coordinate();
	this.level = 0;
	this.env = null;
	let itemEnv = arguments[0];
	this.computeKey(itemEnv);
}
extend(Key.prototype, {
	getLevel: function () {
		return this.level;
	},
	computeKey: function () {
		if (arguments.length === 1) {
			let itemEnv = arguments[0];
			this.level = Key.computeQuadLevel(itemEnv);
			this.env = new Envelope();
			this.computeKey(this.level, itemEnv);
			while (!this.env.contains(itemEnv)) {
				this.level += 1;
				this.computeKey(this.level, itemEnv);
			}
		} else if (arguments.length === 2) {
			let level = arguments[0], itemEnv = arguments[1];
			var quadSize = DoubleBits.powerOf2(level);
			this.pt.x = Math.floor(itemEnv.getMinX() / quadSize) * quadSize;
			this.pt.y = Math.floor(itemEnv.getMinY() / quadSize) * quadSize;
			this.env.init(this.pt.x, this.pt.x + quadSize, this.pt.y, this.pt.y + quadSize);
		}
	},
	getEnvelope: function () {
		return this.env;
	},
	getCentre: function () {
		return new Coordinate((this.env.getMinX() + this.env.getMaxX()) / 2, (this.env.getMinY() + this.env.getMaxY()) / 2);
	},
	getPoint: function () {
		return this.pt;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Key;
	}
});
Key.computeQuadLevel = function (env) {
	var dx = env.getWidth();
	var dy = env.getHeight();
	var dMax = dx > dy ? dx : dy;
	var level = DoubleBits.exponent(dMax) + 1;
	return level;
};

