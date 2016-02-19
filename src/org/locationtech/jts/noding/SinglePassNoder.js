import Noder from './Noder';
import extend from '../../../../extend';
export default function SinglePassNoder() {
	this.segInt = null;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let segInt = arguments[0];
		this.setSegmentIntersector(segInt);
	}
}
extend(SinglePassNoder.prototype, {
	setSegmentIntersector: function (segInt) {
		this.segInt = segInt;
	},
	interfaces_: function () {
		return [Noder];
	},
	getClass: function () {
		return SinglePassNoder;
	}
});

