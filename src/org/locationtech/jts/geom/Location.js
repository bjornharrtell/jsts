import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
export default function Location() {}
extend(Location.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Location;
	}
});
Location.toLocationSymbol = function (locationValue) {
	switch (locationValue) {
		case Location.EXTERIOR:
			return 'e';
		case Location.BOUNDARY:
			return 'b';
		case Location.INTERIOR:
			return 'i';
		case Location.NONE:
			return '-';
	}
	throw new IllegalArgumentException("Unknown location value: " + locationValue);
};
Location.INTERIOR = 0;
Location.BOUNDARY = 1;
Location.EXTERIOR = 2;
Location.NONE = -1;
