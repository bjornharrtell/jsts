import Exception from '../../../../java/lang/Exception';
export default class NotRepresentableException extends Exception {
	constructor() {
		super();
		NotRepresentableException.constructor_.apply(this, arguments);
	}
	getClass() {
		return NotRepresentableException;
	}
	get interfaces_() {
		return [];
	}
}
NotRepresentableException.constructor_ = function () {
	Exception.constructor_.call(this, "Projective point not representable on the Cartesian plane.");
};
