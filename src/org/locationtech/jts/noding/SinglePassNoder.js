import Noder from './Noder';
export default class SinglePassNoder {
	constructor() {
		SinglePassNoder.constructor_.apply(this, arguments);
	}
	setSegmentIntersector(segInt) {
		this._segInt = segInt;
	}
	getClass() {
		return SinglePassNoder;
	}
	get interfaces_() {
		return [Noder];
	}
}
SinglePassNoder.constructor_ = function () {
	this._segInt = null;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let segInt = arguments[0];
		this.setSegmentIntersector(segInt);
	}
};
