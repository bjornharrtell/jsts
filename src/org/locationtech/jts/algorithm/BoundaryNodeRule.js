import extend from '../../../../extend';
export default function BoundaryNodeRule() {}
extend(BoundaryNodeRule.prototype, {
	isInBoundary: function (boundaryCount) {},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BoundaryNodeRule;
	}
});
function Mod2BoundaryNodeRule() {}
extend(Mod2BoundaryNodeRule.prototype, {
	isInBoundary: function (boundaryCount) {
		return boundaryCount % 2 === 1;
	},
	interfaces_: function () {
		return [BoundaryNodeRule];
	},
	getClass: function () {
		return Mod2BoundaryNodeRule;
	}
});
function EndPointBoundaryNodeRule() {}
extend(EndPointBoundaryNodeRule.prototype, {
	isInBoundary: function (boundaryCount) {
		return boundaryCount > 0;
	},
	interfaces_: function () {
		return [BoundaryNodeRule];
	},
	getClass: function () {
		return EndPointBoundaryNodeRule;
	}
});
function MultiValentEndPointBoundaryNodeRule() {}
extend(MultiValentEndPointBoundaryNodeRule.prototype, {
	isInBoundary: function (boundaryCount) {
		return boundaryCount > 1;
	},
	interfaces_: function () {
		return [BoundaryNodeRule];
	},
	getClass: function () {
		return MultiValentEndPointBoundaryNodeRule;
	}
});
function MonoValentEndPointBoundaryNodeRule() {}
extend(MonoValentEndPointBoundaryNodeRule.prototype, {
	isInBoundary: function (boundaryCount) {
		return boundaryCount === 1;
	},
	interfaces_: function () {
		return [BoundaryNodeRule];
	},
	getClass: function () {
		return MonoValentEndPointBoundaryNodeRule;
	}
});
BoundaryNodeRule.Mod2BoundaryNodeRule = Mod2BoundaryNodeRule;
BoundaryNodeRule.EndPointBoundaryNodeRule = EndPointBoundaryNodeRule;
BoundaryNodeRule.MultiValentEndPointBoundaryNodeRule = MultiValentEndPointBoundaryNodeRule;
BoundaryNodeRule.MonoValentEndPointBoundaryNodeRule = MonoValentEndPointBoundaryNodeRule;
BoundaryNodeRule.MOD2_BOUNDARY_RULE = new Mod2BoundaryNodeRule();
BoundaryNodeRule.ENDPOINT_BOUNDARY_RULE = new EndPointBoundaryNodeRule();
BoundaryNodeRule.MULTIVALENT_ENDPOINT_BOUNDARY_RULE = new MultiValentEndPointBoundaryNodeRule();
BoundaryNodeRule.MONOVALENT_ENDPOINT_BOUNDARY_RULE = new MonoValentEndPointBoundaryNodeRule();
BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE = BoundaryNodeRule.MOD2_BOUNDARY_RULE;

