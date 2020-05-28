import GeometryFactory from '../../geom/GeometryFactory'
import SpatialIndex from '../SpatialIndex'
import Double from '../../../../../java/lang/Double'
import Integer from '../../../../../java/lang/Integer'
import HilbertEncoder from './HilbertEncoder'
import Collections from '../../../../../java/util/Collections'
import System from '../../../../../java/lang/System'
import ArrayList from '../../../../../java/util/ArrayList'
import Comparator from '../../../../../java/util/Comparator'
import Item from './Item'
import ArrayListVisitor from '../ArrayListVisitor'
import Envelope from '../../geom/Envelope'
export default class HPRtree {
  constructor() {
    HPRtree.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._items = new ArrayList()
    this._nodeCapacity = HPRtree.DEFAULT_NODE_CAPACITY
    this._totalExtent = new Envelope()
    this._layerStartIndex = null
    this._nodeBounds = null
    this._isBuilt = false
    if (arguments.length === 0) {
      HPRtree.constructor_.call(this, HPRtree.DEFAULT_NODE_CAPACITY)
    } else if (arguments.length === 1) {
      const nodeCapacity = arguments[0]
      this._nodeCapacity = nodeCapacity
    }
  }
  static computeLayerIndices(itemSize, nodeCapacity) {
    const layerIndexList = new ArrayList()
    let layerSize = itemSize
    let index = 0
    do {
      layerIndexList.add(index)
      layerSize = HPRtree.numNodesToCover(layerSize, nodeCapacity)
      index += HPRtree.ENV_SIZE * layerSize
    } while (layerSize > 1)
    return HPRtree.toIntArray(layerIndexList)
  }
  static createBoundsArray(size) {
    const a = new Array(4 * size).fill(null)
    for (let i = 0; i < size; i++) {
      const index = 4 * i
      a[index] = Double.MAX_VALUE
      a[index + 1] = Double.MAX_VALUE
      a[index + 2] = -Double.MAX_VALUE
      a[index + 3] = -Double.MAX_VALUE
    }
    return a
  }
  static intersects(env1, env2) {
    return !(env2.getMinX() > env1.getMaxX() || env2.getMaxX() < env1.getMinX() || env2.getMinY() > env1.getMaxY() || env2.getMaxY() < env1.getMinY())
  }
  static dumpItems(items) {
    const fact = new GeometryFactory()
    for (const item of items) {
      const env = item.getEnvelope()
      System.out.println(fact.toGeometry(env))
    }
  }
  static numNodesToCover(nChild, nodeCapacity) {
    const mult = Math.trunc(nChild / nodeCapacity)
    const total = mult * nodeCapacity
    if (total === nChild) return mult
    return mult + 1
  }
  static toIntArray(list) {
    const array = new Array(list.size()).fill(null)
    for (let i = 0; i < array.length; i++) 
      array[i] = list.get(i)
    
    return array
  }
  computeLeafNodes(layerSize) {
    for (let i = 0; i < layerSize; i += HPRtree.ENV_SIZE) 
      this.computeLeafNodeBounds(i, Math.trunc(this._nodeCapacity * i / 4))
    
  }
  size() {
    return this._items.size()
  }
  insert(itemEnv, item) {
    if (this._isBuilt) 
      throw new IllegalStateException('Cannot insert items after tree is built.')
    
    this._items.add(new Item(itemEnv, item))
    this._totalExtent.expandToInclude(itemEnv)
  }
  intersects(nodeIndex, env) {
    const isBeyond = env.getMaxX() < this._nodeBounds[nodeIndex] || env.getMaxY() < this._nodeBounds[nodeIndex + 1] || env.getMinX() > this._nodeBounds[nodeIndex + 2] || env.getMinY() > this._nodeBounds[nodeIndex + 3]
    return !isBeyond
  }
  query() {
    if (arguments.length === 1) {
      const searchEnv = arguments[0]
      this.build()
      if (!this._totalExtent.intersects(searchEnv)) return new ArrayList()
      const visitor = new ArrayListVisitor()
      this.query(searchEnv, visitor)
      return visitor.getItems()
    } else if (arguments.length === 2) {
      const searchEnv = arguments[0], visitor = arguments[1]
      this.build()
      if (!this._totalExtent.intersects(searchEnv)) return null
      if (this._layerStartIndex === null) 
        this.queryItems(0, searchEnv, visitor)
      else 
        this.queryTopLayer(searchEnv, visitor)
      
    }
  }
  build() {
    if (this._isBuilt) return null
    this._isBuilt = true
    if (this._items.size() <= this._nodeCapacity) return null
    this.sortItems()
    this._layerStartIndex = HPRtree.computeLayerIndices(this._items.size(), this._nodeCapacity)
    const nodeCount = Math.trunc(this._layerStartIndex[this._layerStartIndex.length - 1] / 4)
    this._nodeBounds = HPRtree.createBoundsArray(nodeCount)
    this.computeLeafNodes(this._layerStartIndex[1])
    for (let i = 1; i < this._layerStartIndex.length - 1; i++) 
      this.computeLayerNodes(i)
    
  }
  getNodeEnvelope(i) {
    return new Envelope(this._nodeBounds[i], this._nodeBounds[i + 1], this._nodeBounds[i + 2], this._nodeBounds[i + 3])
  }
  sortItems() {
    const comp = new ItemComparator(new HilbertEncoder(HPRtree.HILBERT_LEVEL, this._totalExtent))
    Collections.sort(this._items, comp)
  }
  queryNode(layerIndex, nodeOffset, searchEnv, visitor) {
    const layerStart = this._layerStartIndex[layerIndex]
    const nodeIndex = layerStart + nodeOffset
    if (!this.intersects(nodeIndex, searchEnv)) return null
    if (layerIndex === 0) {
      const childNodesOffset = Math.trunc(nodeOffset / HPRtree.ENV_SIZE) * this._nodeCapacity
      this.queryItems(childNodesOffset, searchEnv, visitor)
    } else {
      const childNodesOffset = nodeOffset * this._nodeCapacity
      this.queryNodeChildren(layerIndex - 1, childNodesOffset, searchEnv, visitor)
    }
  }
  updateNodeBounds(nodeIndex, minX, minY, maxX, maxY) {
    if (minX < this._nodeBounds[nodeIndex]) this._nodeBounds[nodeIndex] = minX
    if (minY < this._nodeBounds[nodeIndex + 1]) this._nodeBounds[nodeIndex + 1] = minY
    if (maxX > this._nodeBounds[nodeIndex + 2]) this._nodeBounds[nodeIndex + 2] = maxX
    if (maxY > this._nodeBounds[nodeIndex + 3]) this._nodeBounds[nodeIndex + 3] = maxY
  }
  remove(itemEnv, item) {
    return false
  }
  computeNodeBounds(nodeIndex, blockStart, nodeMaxIndex) {
    for (let i = 0; i <= this._nodeCapacity; i++) {
      const index = blockStart + 4 * i
      if (index >= nodeMaxIndex) break
      this.updateNodeBounds(nodeIndex, this._nodeBounds[index], this._nodeBounds[index + 1], this._nodeBounds[index + 2], this._nodeBounds[index + 3])
    }
  }
  queryTopLayer(searchEnv, visitor) {
    const layerIndex = this._layerStartIndex.length - 2
    const layerSize = this.layerSize(layerIndex)
    for (let i = 0; i < layerSize; i += HPRtree.ENV_SIZE) 
      this.queryNode(layerIndex, i, searchEnv, visitor)
    
  }
  queryItems(blockStart, searchEnv, visitor) {
    for (let i = 0; i < this._nodeCapacity; i++) {
      const itemIndex = blockStart + i
      if (itemIndex >= this._items.size()) break
      const item = this._items.get(itemIndex)
      if (HPRtree.intersects(item.getEnvelope(), searchEnv)) 
        visitor.visitItem(item.getItem())
      
    }
  }
  queryNodeChildren(layerIndex, blockOffset, searchEnv, visitor) {
    const layerStart = this._layerStartIndex[layerIndex]
    const layerEnd = this._layerStartIndex[layerIndex + 1]
    for (let i = 0; i < this._nodeCapacity; i++) {
      const nodeOffset = blockOffset + HPRtree.ENV_SIZE * i
      if (layerStart + nodeOffset >= layerEnd) break
      this.queryNode(layerIndex, nodeOffset, searchEnv, visitor)
    }
  }
  computeLayerNodes(layerIndex) {
    const layerStart = this._layerStartIndex[layerIndex]
    const childLayerStart = this._layerStartIndex[layerIndex - 1]
    const layerSize = this.layerSize(layerIndex)
    const childLayerEnd = layerStart
    for (let i = 0; i < layerSize; i += HPRtree.ENV_SIZE) {
      const childStart = childLayerStart + this._nodeCapacity * i
      this.computeNodeBounds(layerStart + i, childStart, childLayerEnd)
    }
  }
  layerSize(layerIndex) {
    const layerStart = this._layerStartIndex[layerIndex]
    const layerEnd = this._layerStartIndex[layerIndex + 1]
    return layerEnd - layerStart
  }
  computeLeafNodeBounds(nodeIndex, blockStart) {
    for (let i = 0; i <= this._nodeCapacity; i++) {
      const itemIndex = blockStart + i
      if (itemIndex >= this._items.size()) break
      const env = this._items.get(itemIndex).getEnvelope()
      this.updateNodeBounds(nodeIndex, env.getMinX(), env.getMinY(), env.getMaxX(), env.getMaxY())
    }
  }
  getBounds() {
    const numNodes = Math.trunc(this._nodeBounds.length / 4)
    const bounds = new Array(numNodes).fill(null)
    for (let i = numNodes - 1; i >= 0; i--) {
      const boundIndex = 4 * i
      bounds[i] = new Envelope(this._nodeBounds[boundIndex], this._nodeBounds[boundIndex + 2], this._nodeBounds[boundIndex + 1], this._nodeBounds[boundIndex + 3])
    }
    return bounds
  }
  get interfaces_() {
    return [SpatialIndex]
  }
}
class ItemComparator {
  constructor() {
    ItemComparator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._encoder = null
    const encoder = arguments[0]
    this._encoder = encoder
  }
  compare(item1, item2) {
    const hcode1 = this._encoder.encode(item1.getEnvelope())
    const hcode2 = this._encoder.encode(item2.getEnvelope())
    return Integer.compare(hcode1, hcode2)
  }
  get interfaces_() {
    return [Comparator]
  }
}
HPRtree.ItemComparator = ItemComparator
HPRtree.ENV_SIZE = 4
HPRtree.HILBERT_LEVEL = 12
HPRtree.DEFAULT_NODE_CAPACITY = 16
