import extend from '../../../../../extend';
export default function GeometryLocation() {
	this._component = null;
	this._segIndex = null;
	this._pt = null;
	if (arguments.length === 2) {
		let component = arguments[0], pt = arguments[1];
		GeometryLocation.call(this, component, GeometryLocation.INSIDE_AREA, pt);
	} else if (arguments.length === 3) {
		let component = arguments[0], segIndex = arguments[1], pt = arguments[2];
		this._component = component;
		this._segIndex = segIndex;
		this._pt = pt;
	}
}
extend(GeometryLocation.prototype, {
	isInsideArea: function () {
		return this._segIndex === GeometryLocation.INSIDE_AREA;
	},
	getCoordinate: function () {
		return this._pt;
	},
	getGeometryComponent: function () {
		return this._component;
	},
	getSegmentIndex: function () {
		return this._segIndex;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryLocation;
	}
});
GeometryLocation.INSIDE_AREA = -1;
