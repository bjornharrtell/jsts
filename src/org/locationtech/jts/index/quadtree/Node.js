import NodeBase from './NodeBase'
import Envelope from '../../geom/Envelope'
import Assert from '../../util/Assert'
import Key from './Key'
export default class Node extends NodeBase {
  constructor() {
    super()
    Node.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._env = null
    this._centrex = null
    this._centrey = null
    this._level = null
    const env = arguments[0], level = arguments[1]
    this._env = env
    this._level = level
    this._centrex = (env.getMinX() + env.getMaxX()) / 2
    this._centrey = (env.getMinY() + env.getMaxY()) / 2
  }
  static createNode(env) {
    const key = new Key(env)
    const node = new Node(key.getEnvelope(), key.getLevel())
    return node
  }
  static createExpanded(node, addEnv) {
    const expandEnv = new Envelope(addEnv)
    if (node !== null) expandEnv.expandToInclude(node._env)
    const largerNode = Node.createNode(expandEnv)
    if (node !== null) largerNode.insertNode(node)
    return largerNode
  }
  find(searchEnv) {
    const subnodeIndex = NodeBase.getSubnodeIndex(searchEnv, this._centrex, this._centrey)
    if (subnodeIndex === -1) return this
    if (this._subnode[subnodeIndex] !== null) {
      const node = this._subnode[subnodeIndex]
      return node.find(searchEnv)
    }
    return this
  }
  isSearchMatch(searchEnv) {
    if (searchEnv === null) return false
    return this._env.intersects(searchEnv)
  }
  getSubnode(index) {
    if (this._subnode[index] === null) 
      this._subnode[index] = this.createSubnode(index)
    
    return this._subnode[index]
  }
  getEnvelope() {
    return this._env
  }
  getNode(searchEnv) {
    const subnodeIndex = NodeBase.getSubnodeIndex(searchEnv, this._centrex, this._centrey)
    if (subnodeIndex !== -1) {
      const node = this.getSubnode(subnodeIndex)
      return node.getNode(searchEnv)
    } else {
      return this
    }
  }
  createSubnode(index) {
    let minx = 0.0
    let maxx = 0.0
    let miny = 0.0
    let maxy = 0.0
    switch (index) {
    case 0:
      minx = this._env.getMinX()
      maxx = this._centrex
      miny = this._env.getMinY()
      maxy = this._centrey
      break
    case 1:
      minx = this._centrex
      maxx = this._env.getMaxX()
      miny = this._env.getMinY()
      maxy = this._centrey
      break
    case 2:
      minx = this._env.getMinX()
      maxx = this._centrex
      miny = this._centrey
      maxy = this._env.getMaxY()
      break
    case 3:
      minx = this._centrex
      maxx = this._env.getMaxX()
      miny = this._centrey
      maxy = this._env.getMaxY()
      break
    }
    const sqEnv = new Envelope(minx, maxx, miny, maxy)
    const node = new Node(sqEnv, this._level - 1)
    return node
  }
  insertNode(node) {
    Assert.isTrue(this._env === null || this._env.contains(node._env))
    const index = NodeBase.getSubnodeIndex(node._env, this._centrex, this._centrey)
    if (node._level === this._level - 1) {
      this._subnode[index] = node
    } else {
      const childNode = this.createSubnode(index)
      childNode.insertNode(node)
      this._subnode[index] = childNode
    }
  }
}
