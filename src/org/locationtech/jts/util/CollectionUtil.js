import ArrayList from '../../../../java/util/ArrayList'
export default class CollectionUtil {
  static transform(coll, func) {
    const result = new ArrayList()
    for (let i = coll.iterator(); i.hasNext(); ) 
      result.add(func.execute(i.next()))
    
    return result
  }
  static select(collection, func) {
    const result = new ArrayList()
    for (let i = collection.iterator(); i.hasNext(); ) {
      const item = i.next()
      if (Boolean.TRUE.equals(func.execute(item))) 
        result.add(item)
      
    }
    return result
  }
  static apply(coll, func) {
    for (let i = coll.iterator(); i.hasNext(); ) 
      func.execute(i.next())
    
  }
}
function Function() {}
CollectionUtil.Function = Function
