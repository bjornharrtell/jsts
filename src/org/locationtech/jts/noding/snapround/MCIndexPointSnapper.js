import MonotoneChainSelectAction from '../../index/chain/MonotoneChainSelectAction'
import MonotoneChain from '../../index/chain/MonotoneChain'
import ItemVisitor from '../../index/ItemVisitor'
export default class MCIndexPointSnapper {
  constructor() {
    MCIndexPointSnapper.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._index = null
    const index = arguments[0]
    this._index = index
  }
  snap() {
    if (arguments.length === 1) {
      const hotPixel = arguments[0]
      return this.snap(hotPixel, null, -1)
    } else if (arguments.length === 3) {
      const hotPixel = arguments[0], parentEdge = arguments[1], hotPixelVertexIndex = arguments[2]
      const pixelEnv = hotPixel.getSafeEnvelope()
      const hotPixelSnapAction = new HotPixelSnapAction(hotPixel, parentEdge, hotPixelVertexIndex)
      this._index.query(pixelEnv, new (class {
        get interfaces_() {
          return [ItemVisitor]
        }
        visitItem(item) {
          const testChain = item
          testChain.select(pixelEnv, hotPixelSnapAction)
        }
      })())
      return hotPixelSnapAction.isNodeAdded()
    }
  }
}
class HotPixelSnapAction extends MonotoneChainSelectAction {
  constructor() {
    super()
    HotPixelSnapAction.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._hotPixel = null
    this._parentEdge = null
    this._hotPixelVertexIndex = null
    this._isNodeAdded = false
    const hotPixel = arguments[0], parentEdge = arguments[1], hotPixelVertexIndex = arguments[2]
    this._hotPixel = hotPixel
    this._parentEdge = parentEdge
    this._hotPixelVertexIndex = hotPixelVertexIndex
  }
  isNodeAdded() {
    return this._isNodeAdded
  }
  select() {
    if (arguments.length === 2 && (Number.isInteger(arguments[1]) && arguments[0] instanceof MonotoneChain)) {
      const mc = arguments[0], startIndex = arguments[1]
      const ss = mc.getContext()
      if (this._parentEdge === ss) 
        if (startIndex === this._hotPixelVertexIndex || startIndex + 1 === this._hotPixelVertexIndex) return null
      
      this._isNodeAdded |= this._hotPixel.addSnappedNode(ss, startIndex)
    } else {
      return super.select.apply(this, arguments)
    }
  }
}
MCIndexPointSnapper.HotPixelSnapAction = HotPixelSnapAction
