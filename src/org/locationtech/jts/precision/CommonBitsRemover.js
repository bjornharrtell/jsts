import CommonBits from './CommonBits';
import CoordinateFilter from '../geom/CoordinateFilter';
import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default function CommonBitsRemover() {
	this.commonCoord = null;
	this.ccFilter = new CommonCoordinateFilter();
}
extend(CommonBitsRemover.prototype, {
	addCommonBits: function (geom) {
		var trans = new Translater(this.commonCoord);
		geom.apply(trans);
		geom.geometryChanged();
	},
	removeCommonBits: function (geom) {
		if (this.commonCoord.x === 0.0 && this.commonCoord.y === 0.0) return geom;
		var invCoord = new Coordinate(this.commonCoord);
		invCoord.x = -invCoord.x;
		invCoord.y = -invCoord.y;
		var trans = new Translater(invCoord);
		geom.apply(trans);
		geom.geometryChanged();
		return geom;
	},
	getCommonCoordinate: function () {
		return this.commonCoord;
	},
	add: function (geom) {
		geom.apply(this.ccFilter);
		this.commonCoord = this.ccFilter.getCommonCoordinate();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CommonBitsRemover;
	}
});
function CommonCoordinateFilter() {
	this.commonBitsX = new CommonBits();
	this.commonBitsY = new CommonBits();
}
extend(CommonCoordinateFilter.prototype, {
	filter: function (coord) {
		this.commonBitsX.add(coord.x);
		this.commonBitsY.add(coord.y);
	},
	getCommonCoordinate: function () {
		return new Coordinate(this.commonBitsX.getCommon(), this.commonBitsY.getCommon());
	},
	interfaces_: function () {
		return [CoordinateFilter];
	},
	getClass: function () {
		return CommonCoordinateFilter;
	}
});
function Translater() {
	this.trans = null;
	let trans = arguments[0];
	this.trans = trans;
}
extend(Translater.prototype, {
	filter: function (seq, i) {
		var xp = seq.getOrdinate(i, 0) + this.trans.x;
		var yp = seq.getOrdinate(i, 1) + this.trans.y;
		seq.setOrdinate(i, 0, xp);
		seq.setOrdinate(i, 1, yp);
	},
	isDone: function () {
		return false;
	},
	isGeometryChanged: function () {
		return true;
	},
	interfaces_: function () {
		return [CoordinateSequenceFilter];
	},
	getClass: function () {
		return Translater;
	}
});
CommonBitsRemover.CommonCoordinateFilter = CommonCoordinateFilter;
CommonBitsRemover.Translater = Translater;
