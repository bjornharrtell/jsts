import GeometryFactory from '../geom/GeometryFactory';
import GeometryEditor from '../geom/util/GeometryEditor';
import Polygonal from '../geom/Polygonal';
import PrecisionReducerCoordinateOperation from './PrecisionReducerCoordinateOperation';
export default class GeometryPrecisionReducer {
	constructor(...args) {
		this.targetPM = null;
		this.removeCollapsed = true;
		this.changePrecisionModel = false;
		this.isPointwise = false;
		if (args.length === 1) {
			let [pm] = args;
			this.targetPM = pm;
		}
	}
	get interfaces_() {
		return [];
	}
	static reduce(g, precModel) {
		var reducer = new GeometryPrecisionReducer(precModel);
		return reducer.reduce(g);
	}
	static reducePointwise(g, precModel) {
		var reducer = new GeometryPrecisionReducer(precModel);
		reducer.setPointwise(true);
		return reducer.reduce(g);
	}
	fixPolygonalTopology(geom) {
		var geomToBuffer = geom;
		if (!this.changePrecisionModel) {
			geomToBuffer = this.changePM(geom, this.targetPM);
		}
		var bufGeom = geomToBuffer.buffer(0);
		var finalGeom = bufGeom;
		if (!this.changePrecisionModel) {
			finalGeom = geom.getFactory().createGeometry(bufGeom);
		}
		return finalGeom;
	}
	reducePointwise(geom) {
		var geomEdit = null;
		if (this.changePrecisionModel) {
			var newFactory = this.createFactory(geom.getFactory(), this.targetPM);
			geomEdit = new GeometryEditor(newFactory);
		} else geomEdit = new GeometryEditor();
		var finalRemoveCollapsed = this.removeCollapsed;
		if (geom.getDimension() >= 2) finalRemoveCollapsed = true;
		var reduceGeom = geomEdit.edit(geom, new PrecisionReducerCoordinateOperation(this.targetPM, finalRemoveCollapsed));
		return reduceGeom;
	}
	changePM(geom, newPM) {
		var geomEditor = this.createEditor(geom.getFactory(), newPM);
		return geomEditor.edit(geom, new GeometryEditor.NoOpGeometryOperation());
	}
	setRemoveCollapsedComponents(removeCollapsed) {
		this.removeCollapsed = removeCollapsed;
	}
	createFactory(inputFactory, pm) {
		var newFactory = new GeometryFactory(pm, inputFactory.getSRID(), inputFactory.getCoordinateSequenceFactory());
		return newFactory;
	}
	setChangePrecisionModel(changePrecisionModel) {
		this.changePrecisionModel = changePrecisionModel;
	}
	reduce(geom) {
		var reducePW = this.reducePointwise(geom);
		if (this.isPointwise) return reducePW;
		if (!(reducePW.interfaces_ && reducePW.interfaces_.indexOf(Polygonal) > -1)) return reducePW;
		if (reducePW.isValid()) return reducePW;
		return this.fixPolygonalTopology(reducePW);
	}
	setPointwise(isPointwise) {
		this.isPointwise = isPointwise;
	}
	createEditor(geomFactory, newPM) {
		if (geomFactory.getPrecisionModel() === newPM) return new GeometryEditor();
		var newFactory = this.createFactory(geomFactory, newPM);
		var geomEdit = new GeometryEditor(newFactory);
		return geomEdit;
	}
	getClass() {
		return GeometryPrecisionReducer;
	}
}

