import Exception from '../../../../java/lang/Exception';
export default class NotRepresentableException extends Exception {
	constructor(...args) {
		super();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						super("Projective point not representable on the Cartesian plane.");
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return NotRepresentableException;
	}
}

