import hasInterface from '../../../../hasInterface';
import GeometryFactory from '../geom/GeometryFactory';
import GeometryEditor from '../geom/util/GeometryEditor';
import extend from '../../../../extend';
import Polygonal from '../geom/Polygonal';
import PrecisionReducerCoordinateOperation from './PrecisionReducerCoordinateOperation';
export default function GeometryPrecisionReducer() {
	this.targetPM = null;
	this.removeCollapsed = true;
	this.changePrecisionModel = false;
	this.isPointwise = false;
	let pm = arguments[0];
	this.targetPM = pm;
}
extend(GeometryPrecisionReducer.prototype, {
	fixPolygonalTopology: function (geom) {
		var geomToBuffer = geom;
		if (!this.changePrecisionModel) {
			geomToBuffer = this.changePM(geom, this.targetPM);
		}
		var bufGeom = geomToBuffer.buffer(0);
		var finalGeom = bufGeom;
		if (!this.changePrecisionModel) {
			finalGeom = this.changePM(bufGeom, geom.getPrecisionModel());
		}
		return finalGeom;
	},
	reducePointwise: function (geom) {
		var geomEdit = null;
		if (this.changePrecisionModel) {
			var newFactory = this.createFactory(geom.getFactory(), this.targetPM);
			geomEdit = new GeometryEditor(newFactory);
		} else geomEdit = new GeometryEditor();
		var finalRemoveCollapsed = this.removeCollapsed;
		if (geom.getDimension() >= 2) finalRemoveCollapsed = true;
		var reduceGeom = geomEdit.edit(geom, new PrecisionReducerCoordinateOperation(this.targetPM, finalRemoveCollapsed));
		return reduceGeom;
	},
	changePM: function (geom, newPM) {
		var geomEditor = this.createEditor(geom.getFactory(), newPM);
		return geomEditor.edit(geom, new GeometryEditor.NoOpGeometryOperation());
	},
	setRemoveCollapsedComponents: function (removeCollapsed) {
		this.removeCollapsed = removeCollapsed;
	},
	createFactory: function (inputFactory, pm) {
		var newFactory = new GeometryFactory(pm, inputFactory.getSRID(), inputFactory.getCoordinateSequenceFactory());
		return newFactory;
	},
	setChangePrecisionModel: function (changePrecisionModel) {
		this.changePrecisionModel = changePrecisionModel;
	},
	reduce: function (geom) {
		var reducePW = this.reducePointwise(geom);
		if (this.isPointwise) return reducePW;
		if (!hasInterface(reducePW, Polygonal)) return reducePW;
		if (reducePW.isValid()) return reducePW;
		return this.fixPolygonalTopology(reducePW);
	},
	setPointwise: function (isPointwise) {
		this.isPointwise = isPointwise;
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
