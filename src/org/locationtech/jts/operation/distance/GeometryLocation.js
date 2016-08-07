import extend from '../../../../../extend';
export default function GeometryLocation() {
	this.component = null;
	this.segIndex = null;
	this.pt = null;
	if (arguments.length === 2) {
		let component = arguments[0], pt = arguments[1];
		GeometryLocation.call(this, component, GeometryLocation.INSIDE_AREA, pt);
	} else if (arguments.length === 3) {
		let component = arguments[0], segIndex = arguments[1], pt = arguments[2];
		this.component = component;
		this.segIndex = segIndex;
		this.pt = pt;
	}
}
extend(GeometryLocation.prototype, {
	isInsideArea: function () {
		return this.segIndex === GeometryLocation.INSIDE_AREA;
	},
	getCoordinate: function () {
		return this.pt;
	},
	getGeometryComponent: function () {
		return this.component;
	},
	getSegmentIndex: function () {
		return this.segIndex;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryLocation;
	}
});
GeometryLocation.INSIDE_AREA = -1;
