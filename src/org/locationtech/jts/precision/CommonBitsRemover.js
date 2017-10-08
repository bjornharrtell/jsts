import CommonBits from './CommonBits';
import CoordinateFilter from '../geom/CoordinateFilter';
import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default function CommonBitsRemover() {
	this._commonCoord = null;
	this._ccFilter = new CommonCoordinateFilter();
}
extend(CommonBitsRemover.prototype, {
	addCommonBits: function (geom) {
		var trans = new Translater(this._commonCoord);
		geom.apply(trans);
		geom.geometryChanged();
	},
	removeCommonBits: function (geom) {
		if (this._commonCoord.x === 0.0 && this._commonCoord.y === 0.0) return geom;
		var invCoord = new Coordinate(this._commonCoord);
		invCoord.x = -invCoord.x;
		invCoord.y = -invCoord.y;
		var trans = new Translater(invCoord);
		geom.apply(trans);
		geom.geometryChanged();
		return geom;
	},
	getCommonCoordinate: function () {
		return this._commonCoord;
	},
	add: function (geom) {
		geom.apply(this._ccFilter);
		this._commonCoord = this._ccFilter.getCommonCoordinate();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CommonBitsRemover;
	}
});
function CommonCoordinateFilter() {
	this._commonBitsX = new CommonBits();
	this._commonBitsY = new CommonBits();
}
extend(CommonCoordinateFilter.prototype, {
	filter: function (coord) {
		this._commonBitsX.add(coord.x);
		this._commonBitsY.add(coord.y);
	},
	getCommonCoordinate: function () {
		return new Coordinate(this._commonBitsX.getCommon(), this._commonBitsY.getCommon());
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
