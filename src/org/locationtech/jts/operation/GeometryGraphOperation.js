import BoundaryNodeRule from '../algorithm/BoundaryNodeRule';
import GeometryGraph from '../geomgraph/GeometryGraph';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
export default class GeometryGraphOperation {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.resultPrecisionModel = null;
		this.arg = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				return ((...args) => {
					let [g0] = args;
					this.setComputationPrecision(g0.getPrecisionModel());
					this.arg = new Array(1);
					this.arg[0] = new GeometryGraph(0, g0);
					;
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [g0, g1] = args;
					overloaded.call(this, g0, g1, BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE);
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [g0, g1, boundaryNodeRule] = args;
					if (g0.getPrecisionModel().compareTo(g1.getPrecisionModel()) >= 0) this.setComputationPrecision(g0.getPrecisionModel()); else this.setComputationPrecision(g1.getPrecisionModel());
					this.arg = new Array(2);
					this.arg[0] = new GeometryGraph(0, g0, boundaryNodeRule);
					this.arg[1] = new GeometryGraph(1, g1, boundaryNodeRule);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getArgGeometry(i) {
		return this.arg[i].getGeometry();
	}
	setComputationPrecision(pm) {
		this.resultPrecisionModel = pm;
		this.li.setPrecisionModel(this.resultPrecisionModel);
	}
	getClass() {
		return GeometryGraphOperation;
	}
}

