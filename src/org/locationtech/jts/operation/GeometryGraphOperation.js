import BoundaryNodeRule from '../algorithm/BoundaryNodeRule';
import extend from '../../../../extend';
import GeometryGraph from '../geomgraph/GeometryGraph';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
export default function GeometryGraphOperation() {
	this._li = new RobustLineIntersector();
	this._resultPrecisionModel = null;
	this._arg = null;
	if (arguments.length === 1) {
		let g0 = arguments[0];
		this.setComputationPrecision(g0.getPrecisionModel());
		this._arg = new Array(1).fill(null);
		this._arg[0] = new GeometryGraph(0, g0);
		;
	} else if (arguments.length === 2) {
		let g0 = arguments[0], g1 = arguments[1];
		GeometryGraphOperation.call(this, g0, g1, BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE);
	} else if (arguments.length === 3) {
		let g0 = arguments[0], g1 = arguments[1], boundaryNodeRule = arguments[2];
		if (g0.getPrecisionModel().compareTo(g1.getPrecisionModel()) >= 0) this.setComputationPrecision(g0.getPrecisionModel()); else this.setComputationPrecision(g1.getPrecisionModel());
		this._arg = new Array(2).fill(null);
		this._arg[0] = new GeometryGraph(0, g0, boundaryNodeRule);
		this._arg[1] = new GeometryGraph(1, g1, boundaryNodeRule);
	}
}
extend(GeometryGraphOperation.prototype, {
	getArgGeometry: function (i) {
		return this._arg[i].getGeometry();
	},
	setComputationPrecision: function (pm) {
		this._resultPrecisionModel = pm;
		this._li.setPrecisionModel(this._resultPrecisionModel);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryGraphOperation;
	}
});
