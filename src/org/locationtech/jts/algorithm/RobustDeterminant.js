export default class RobustDeterminant {
  static orientationIndex(p1, p2, q) {
    const dx1 = p2.x - p1.x
    const dy1 = p2.y - p1.y
    const dx2 = q.x - p2.x
    const dy2 = q.y - p2.y
    return RobustDeterminant.signOfDet2x2(dx1, dy1, dx2, dy2)
  }
  static signOfDet2x2(x1, y1, x2, y2) {
    let sign = null
    let swap = null
    let k = null
    let count = 0
    sign = 1
    if (x1 === 0.0 || y2 === 0.0) 
      if (y1 === 0.0 || x2 === 0.0) 
        return 0
      else if (y1 > 0) 
        if (x2 > 0) 
          return -sign
        else 
          return sign
        
      else 
      if (x2 > 0) 
        return sign
      else 
        return -sign
        
      
    
    if (y1 === 0.0 || x2 === 0.0) 
      if (y2 > 0) 
        if (x1 > 0) 
          return sign
        else 
          return -sign
        
      else 
      if (x1 > 0) 
        return -sign
      else 
        return sign
        
      
    
    if (0.0 < y1) {
      if (0.0 < y2) {
        if (y1 <= y2) {
          
        } else {
          sign = -sign
          swap = x1
          x1 = x2
          x2 = swap
          swap = y1
          y1 = y2
          y2 = swap
        }
      } else 
      if (y1 <= -y2) {
        sign = -sign
        x2 = -x2
        y2 = -y2
      } else {
        swap = x1
        x1 = -x2
        x2 = swap
        swap = y1
        y1 = -y2
        y2 = swap
      }
    } else 
    if (0.0 < y2) {
      if (-y1 <= y2) {
        sign = -sign
        x1 = -x1
        y1 = -y1
      } else {
        swap = -x1
        x1 = x2
        x2 = swap
        swap = -y1
        y1 = y2
        y2 = swap
      }
    } else 
    if (y1 >= y2) {
      x1 = -x1
      y1 = -y1
      x2 = -x2
      y2 = -y2
          
    } else {
      sign = -sign
      swap = -x1
      x1 = -x2
      x2 = swap
      swap = -y1
      y1 = -y2
      y2 = swap
    }
      
    
    if (0.0 < x1) {
      if (0.0 < x2) 
        if (x1 <= x2) 
          ;
        else 
          return sign
        
      else 
        return sign
    } else 
    if (0.0 < x2) {
      return -sign
    } else 
    if (x1 >= x2) {
      sign = -sign
      x1 = -x1
      x2 = -x2
          
    } else {
      return -sign
    }
      
    
    while (true) {
      count = count + 1
      k = Math.floor(x2 / x1)
      x2 = x2 - k * x1
      y2 = y2 - k * y1
      if (y2 < 0.0) 
        return -sign
      
      if (y2 > y1) 
        return sign
      
      if (x1 > x2 + x2) {
        if (y1 < y2 + y2) 
          return sign
        
      } else {
        if (y1 > y2 + y2) {
          return -sign
        } else {
          x2 = x1 - x2
          y2 = y1 - y2
          sign = -sign
        }
      }
      if (y2 === 0.0) 
        if (x2 === 0.0) 
          return 0
        else 
          return -sign
        
      
      if (x2 === 0.0) 
        return sign
      
      k = Math.floor(x1 / x2)
      x1 = x1 - k * x2
      y1 = y1 - k * y2
      if (y1 < 0.0) 
        return sign
      
      if (y1 > y2) 
        return -sign
      
      if (x2 > x1 + x1) {
        if (y2 < y1 + y1) 
          return -sign
        
      } else {
        if (y2 > y1 + y1) {
          return sign
        } else {
          x1 = x2 - x1
          y1 = y2 - y1
          sign = -sign
        }
      }
      if (y1 === 0.0) 
        if (x1 === 0.0) 
          return 0
        else 
          return sign
        
      
      if (x1 === 0.0) 
        return -sign
      
    }
  }
}
