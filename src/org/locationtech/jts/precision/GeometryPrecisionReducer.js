import hasInterface from '../../../../hasInterface';
import GeometryFactory from '../geom/GeometryFactory';
import GeometryEditor from '../geom/util/GeometryEditor';
import extend from '../../../../extend';
import Polygonal from '../geom/Polygonal';
import PrecisionReducerCoordinateOperation from './PrecisionReducerCoordinateOperation';
export default function GeometryPrecisionReducer() {
	this._targetPM = null;
	this._removeCollapsed = true;
	this._changePrecisionModel = false;
	this._isPointwise = false;
	let pm = arguments[0];
	this._targetPM = pm;
}
extend(GeometryPrecisionReducer.prototype, {
	fixPolygonalTopology: function (geom) {
		var geomToBuffer = geom;
		if (!this._changePrecisionModel) {
			geomToBuffer = this.changePM(geom, this._targetPM);
		}
		var bufGeom = geomToBuffer.buffer(0);
		var finalGeom = bufGeom;
		if (!this._changePrecisionModel) {
			finalGeom = this.changePM(bufGeom, geom.getPrecisionModel());
		}
		return finalGeom;
	},
	reducePointwise: function (geom) {
		var geomEdit = null;
		if (this._changePrecisionModel) {
			var newFactory = this.createFactory(geom.getFactory(), this._targetPM);
			geomEdit = new GeometryEditor(newFactory);
		} else geomEdit = new GeometryEditor();
		var finalRemoveCollapsed = this._removeCollapsed;
		if (geom.getDimension() >= 2) finalRemoveCollapsed = true;
		var reduceGeom = geomEdit.edit(geom, new PrecisionReducerCoordinateOperation(this._targetPM, finalRemoveCollapsed));
		return reduceGeom;
	},
	changePM: function (geom, newPM) {
		var geomEditor = this.createEditor(geom.getFactory(), newPM);
		return geomEditor.edit(geom, new GeometryEditor.NoOpGeometryOperation());
	},
	setRemoveCollapsedComponents: function (removeCollapsed) {
		this._removeCollapsed = removeCollapsed;
	},
	createFactory: function (inputFactory, pm) {
		var newFactory = new GeometryFactory(pm, inputFactory.getSRID(), inputFactory.getCoordinateSequenceFactory());
		return newFactory;
	},
	setChangePrecisionModel: function (changePrecisionModel) {
		this._changePrecisionModel = changePrecisionModel;
	},
	reduce: function (geom) {
		var reducePW = this.reducePointwise(geom);
		if (this._isPointwise) return reducePW;
		if (!hasInterface(reducePW, Polygonal)) return reducePW;
		if (reducePW.isValid()) return reducePW;
		return this.fixPolygonalTopology(reducePW);
	},
	setPointwise: function (isPointwise) {
		this._isPointwise = isPointwise;
	},
	createEditor: function (geomFactory, newPM) {
		if (geomFactory.getPrecisionModel() === newPM) return new GeometryEditor();
		var newFactory = this.createFactory(geomFactory, newPM);
		var geomEdit = new GeometryEditor(newFactory);
		return geomEdit;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryPrecisionReducer;
	}
});
GeometryPrecisionReducer.reduce = function (g, precModel) {
	var reducer = new GeometryPrecisionReducer(precModel);
	return reducer.reduce(g);
};
GeometryPrecisionReducer.reducePointwise = function (g, precModel) {
	var reducer = new GeometryPrecisionReducer(precModel);
	reducer.setPointwise(true);
	return reducer.reduce(g);
};
