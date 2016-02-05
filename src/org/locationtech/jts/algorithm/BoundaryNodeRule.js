export default class BoundaryNodeRule {
	get interfaces_() {
		return [];
	}
	static get Mod2BoundaryNodeRule() {
		return Mod2BoundaryNodeRule;
	}
	static get EndPointBoundaryNodeRule() {
		return EndPointBoundaryNodeRule;
	}
	static get MultiValentEndPointBoundaryNodeRule() {
		return MultiValentEndPointBoundaryNodeRule;
	}
	static get MonoValentEndPointBoundaryNodeRule() {
		return MonoValentEndPointBoundaryNodeRule;
	}
	isInBoundary(boundaryCount) {}
	getClass() {
		return BoundaryNodeRule;
	}
}
class Mod2BoundaryNodeRule {
	get interfaces_() {
		return [BoundaryNodeRule];
	}
	isInBoundary(boundaryCount) {
		return boundaryCount % 2 === 1;
	}
	getClass() {
		return Mod2BoundaryNodeRule;
	}
}
class EndPointBoundaryNodeRule {
	get interfaces_() {
		return [BoundaryNodeRule];
	}
	isInBoundary(boundaryCount) {
		return boundaryCount > 0;
	}
	getClass() {
		return EndPointBoundaryNodeRule;
	}
}
class MultiValentEndPointBoundaryNodeRule {
	get interfaces_() {
		return [BoundaryNodeRule];
	}
	isInBoundary(boundaryCount) {
		return boundaryCount > 1;
	}
	getClass() {
		return MultiValentEndPointBoundaryNodeRule;
	}
}
class MonoValentEndPointBoundaryNodeRule {
	get interfaces_() {
		return [BoundaryNodeRule];
	}
	isInBoundary(boundaryCount) {
		return boundaryCount === 1;
	}
	getClass() {
		return MonoValentEndPointBoundaryNodeRule;
	}
}
BoundaryNodeRule.MOD2_BOUNDARY_RULE = new Mod2BoundaryNodeRule();
BoundaryNodeRule.ENDPOINT_BOUNDARY_RULE = new EndPointBoundaryNodeRule();
BoundaryNodeRule.MULTIVALENT_ENDPOINT_BOUNDARY_RULE = new MultiValentEndPointBoundaryNodeRule();
BoundaryNodeRule.MONOVALENT_ENDPOINT_BOUNDARY_RULE = new MonoValentEndPointBoundaryNodeRule();
BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE = BoundaryNodeRule.MOD2_BOUNDARY_RULE;

