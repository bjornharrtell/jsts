export default class BoundaryNodeRule {
	constructor() {
		BoundaryNodeRule.constructor_.apply(this, arguments);
	}
	isInBoundary(boundaryCount) {}
	getClass() {
		return BoundaryNodeRule;
	}
	get interfaces_() {
		return [];
	}
}
class Mod2BoundaryNodeRule {
	constructor() {
		Mod2BoundaryNodeRule.constructor_.apply(this, arguments);
	}
	isInBoundary(boundaryCount) {
		return boundaryCount % 2 === 1;
	}
	getClass() {
		return Mod2BoundaryNodeRule;
	}
	get interfaces_() {
		return [BoundaryNodeRule];
	}
}
Mod2BoundaryNodeRule.constructor_ = function () {};
class EndPointBoundaryNodeRule {
	constructor() {
		EndPointBoundaryNodeRule.constructor_.apply(this, arguments);
	}
	isInBoundary(boundaryCount) {
		return boundaryCount > 0;
	}
	getClass() {
		return EndPointBoundaryNodeRule;
	}
	get interfaces_() {
		return [BoundaryNodeRule];
	}
}
EndPointBoundaryNodeRule.constructor_ = function () {};
class MultiValentEndPointBoundaryNodeRule {
	constructor() {
		MultiValentEndPointBoundaryNodeRule.constructor_.apply(this, arguments);
	}
	isInBoundary(boundaryCount) {
		return boundaryCount > 1;
	}
	getClass() {
		return MultiValentEndPointBoundaryNodeRule;
	}
	get interfaces_() {
		return [BoundaryNodeRule];
	}
}
MultiValentEndPointBoundaryNodeRule.constructor_ = function () {};
class MonoValentEndPointBoundaryNodeRule {
	constructor() {
		MonoValentEndPointBoundaryNodeRule.constructor_.apply(this, arguments);
	}
	isInBoundary(boundaryCount) {
		return boundaryCount === 1;
	}
	getClass() {
		return MonoValentEndPointBoundaryNodeRule;
	}
	get interfaces_() {
		return [BoundaryNodeRule];
	}
}
MonoValentEndPointBoundaryNodeRule.constructor_ = function () {};
BoundaryNodeRule.Mod2BoundaryNodeRule = Mod2BoundaryNodeRule;
BoundaryNodeRule.EndPointBoundaryNodeRule = EndPointBoundaryNodeRule;
BoundaryNodeRule.MultiValentEndPointBoundaryNodeRule = MultiValentEndPointBoundaryNodeRule;
BoundaryNodeRule.MonoValentEndPointBoundaryNodeRule = MonoValentEndPointBoundaryNodeRule;
BoundaryNodeRule.constructor_ = function () {};
BoundaryNodeRule.MOD2_BOUNDARY_RULE = new Mod2BoundaryNodeRule();
BoundaryNodeRule.ENDPOINT_BOUNDARY_RULE = new EndPointBoundaryNodeRule();
BoundaryNodeRule.MULTIVALENT_ENDPOINT_BOUNDARY_RULE = new MultiValentEndPointBoundaryNodeRule();
BoundaryNodeRule.MONOVALENT_ENDPOINT_BOUNDARY_RULE = new MonoValentEndPointBoundaryNodeRule();
BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE = BoundaryNodeRule.MOD2_BOUNDARY_RULE;
