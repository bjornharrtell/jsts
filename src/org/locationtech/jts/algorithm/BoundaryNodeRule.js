export default class BoundaryNodeRule {
  isInBoundary(boundaryCount) {}
}
class Mod2BoundaryNodeRule {
  isInBoundary(boundaryCount) {
    return boundaryCount % 2 === 1
  }
  get interfaces_() {
    return [BoundaryNodeRule]
  }
}
class EndPointBoundaryNodeRule {
  isInBoundary(boundaryCount) {
    return boundaryCount > 0
  }
  get interfaces_() {
    return [BoundaryNodeRule]
  }
}
class MultiValentEndPointBoundaryNodeRule {
  isInBoundary(boundaryCount) {
    return boundaryCount > 1
  }
  get interfaces_() {
    return [BoundaryNodeRule]
  }
}
class MonoValentEndPointBoundaryNodeRule {
  isInBoundary(boundaryCount) {
    return boundaryCount === 1
  }
  get interfaces_() {
    return [BoundaryNodeRule]
  }
}
BoundaryNodeRule.Mod2BoundaryNodeRule = Mod2BoundaryNodeRule
BoundaryNodeRule.EndPointBoundaryNodeRule = EndPointBoundaryNodeRule
BoundaryNodeRule.MultiValentEndPointBoundaryNodeRule = MultiValentEndPointBoundaryNodeRule
BoundaryNodeRule.MonoValentEndPointBoundaryNodeRule = MonoValentEndPointBoundaryNodeRule
BoundaryNodeRule.MOD2_BOUNDARY_RULE = new Mod2BoundaryNodeRule()
BoundaryNodeRule.ENDPOINT_BOUNDARY_RULE = new EndPointBoundaryNodeRule()
BoundaryNodeRule.MULTIVALENT_ENDPOINT_BOUNDARY_RULE = new MultiValentEndPointBoundaryNodeRule()
BoundaryNodeRule.MONOVALENT_ENDPOINT_BOUNDARY_RULE = new MonoValentEndPointBoundaryNodeRule()
BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE = BoundaryNodeRule.MOD2_BOUNDARY_RULE
