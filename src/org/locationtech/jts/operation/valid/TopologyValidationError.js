import extend from '../../../../../extend';
export default function TopologyValidationError() {
	this.errorType = null;
	this.pt = null;
	if (arguments.length === 1) {
		let errorType = arguments[0];
		TopologyValidationError.call(this, errorType, null);
	} else if (arguments.length === 2) {
		let errorType = arguments[0], pt = arguments[1];
		this.errorType = errorType;
		if (pt !== null) this.pt = pt.copy();
	}
}
extend(TopologyValidationError.prototype, {
	getErrorType: function () {
		return this.errorType;
	},
	getMessage: function () {
		return TopologyValidationError.errMsg[this.errorType];
	},
	getCoordinate: function () {
		return this.pt;
	},
	toString: function () {
		var locStr = "";
		if (this.pt !== null) locStr = " at or near point " + this.pt;
		return this.getMessage() + locStr;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return TopologyValidationError;
	}
});
TopologyValidationError.ERROR = 0;
TopologyValidationError.REPEATED_POINT = 1;
TopologyValidationError.HOLE_OUTSIDE_SHELL = 2;
TopologyValidationError.NESTED_HOLES = 3;
TopologyValidationError.DISCONNECTED_INTERIOR = 4;
TopologyValidationError.SELF_INTERSECTION = 5;
TopologyValidationError.RING_SELF_INTERSECTION = 6;
TopologyValidationError.NESTED_SHELLS = 7;
TopologyValidationError.DUPLICATE_RINGS = 8;
TopologyValidationError.TOO_FEW_POINTS = 9;
TopologyValidationError.INVALID_COORDINATE = 10;
TopologyValidationError.RING_NOT_CLOSED = 11;
TopologyValidationError.errMsg = ["Topology Validation Error", "Repeated Point", "Hole lies outside shell", "Holes are nested", "Interior is disconnected", "Self-intersection", "Ring Self-intersection", "Nested shells", "Duplicate Rings", "Too few distinct points in geometry component", "Invalid Coordinate", "Ring is not closed"];

