import ArrayList from '../../../../../java/util/ArrayList'
import Serializable from '../../../../../java/io/Serializable'
export default class NodeBase {
  constructor() {
    NodeBase.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._items = new ArrayList()
    this._subnode = new Array(4).fill(null)
  }
  static getSubnodeIndex(env, centrex, centrey) {
    let subnodeIndex = -1
    if (env.getMinX() >= centrex) {
      if (env.getMinY() >= centrey) subnodeIndex = 3
      if (env.getMaxY() <= centrey) subnodeIndex = 1
    }
    if (env.getMaxX() <= centrex) {
      if (env.getMinY() >= centrey) subnodeIndex = 2
      if (env.getMaxY() <= centrey) subnodeIndex = 0
    }
    return subnodeIndex
  }
  hasChildren() {
    for (let i = 0; i < 4; i++) 
      if (this._subnode[i] !== null) return true
    
    return false
  }
  isPrunable() {
    return !(this.hasChildren() || this.hasItems())
  }
  addAllItems(resultItems) {
    resultItems.addAll(this._items)
    for (let i = 0; i < 4; i++) 
      if (this._subnode[i] !== null) 
        this._subnode[i].addAllItems(resultItems)
      
    
    return resultItems
  }
  getNodeCount() {
    let subSize = 0
    for (let i = 0; i < 4; i++) 
      if (this._subnode[i] !== null) 
        subSize += this._subnode[i].size()
      
    
    return subSize + 1
  }
  size() {
    let subSize = 0
    for (let i = 0; i < 4; i++) 
      if (this._subnode[i] !== null) 
        subSize += this._subnode[i].size()
      
    
    return subSize + this._items.size()
  }
  addAllItemsFromOverlapping(searchEnv, resultItems) {
    if (!this.isSearchMatch(searchEnv)) return null
    resultItems.addAll(this._items)
    for (let i = 0; i < 4; i++) 
      if (this._subnode[i] !== null) 
        this._subnode[i].addAllItemsFromOverlapping(searchEnv, resultItems)
      
    
  }
  visitItems(searchEnv, visitor) {
    for (let i = this._items.iterator(); i.hasNext(); ) 
      visitor.visitItem(i.next())
    
  }
  hasItems() {
    return !this._items.isEmpty()
  }
  remove(itemEnv, item) {
    if (!this.isSearchMatch(itemEnv)) return false
    let found = false
    for (let i = 0; i < 4; i++) 
      if (this._subnode[i] !== null) {
        found = this._subnode[i].remove(itemEnv, item)
        if (found) {
          if (this._subnode[i].isPrunable()) this._subnode[i] = null
          break
        }
      }
    
    if (found) return found
    found = this._items.remove(item)
    return found
  }
  visit(searchEnv, visitor) {
    if (!this.isSearchMatch(searchEnv)) return null
    this.visitItems(searchEnv, visitor)
    for (let i = 0; i < 4; i++) 
      if (this._subnode[i] !== null) 
        this._subnode[i].visit(searchEnv, visitor)
      
    
  }
  getItems() {
    return this._items
  }
  depth() {
    let maxSubDepth = 0
    for (let i = 0; i < 4; i++) 
      if (this._subnode[i] !== null) {
        const sqd = this._subnode[i].depth()
        if (sqd > maxSubDepth) maxSubDepth = sqd
      }
    
    return maxSubDepth + 1
  }
  isEmpty() {
    let isEmpty = true
    if (!this._items.isEmpty()) isEmpty = false; else 
      for (let i = 0; i < 4; i++) 
        if (this._subnode[i] !== null) 
          if (!this._subnode[i].isEmpty()) {
            isEmpty = false
            break
          }
        
      
    
    return isEmpty
  }
  add(item) {
    this._items.add(item)
  }
  get interfaces_() {
    return [Serializable]
  }
}
