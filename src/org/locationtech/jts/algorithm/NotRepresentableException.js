import Exception from '../../../../java/lang/Exception';
export default class NotRepresentableException extends Exception {
	constructor(...args) {
		super();
		if (args.length === 0) {
			let [] = args;
			super("Projective point not representable on the Cartesian plane.");
		}
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return NotRepresentableException;
	}
}

