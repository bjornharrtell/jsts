import AssertionFailedException from './AssertionFailedException'
export default class Assert {
  static shouldNeverReachHere() {
    if (arguments.length === 0) {
      Assert.shouldNeverReachHere(null)
    } else if (arguments.length === 1) {
      const message = arguments[0]
      throw new AssertionFailedException('Should never reach here' + (message !== null ? ': ' + message : ''))
    }
  }
  static isTrue() {
    if (arguments.length === 1) {
      const assertion = arguments[0]
      Assert.isTrue(assertion, null)
    } else if (arguments.length === 2) {
      const assertion = arguments[0], message = arguments[1]
      if (!assertion) 
        if (message === null) 
          throw new AssertionFailedException()
        else 
          throw new AssertionFailedException(message)
        
      
    }
  }
  static equals() {
    if (arguments.length === 2) {
      const expectedValue = arguments[0], actualValue = arguments[1]
      Assert.equals(expectedValue, actualValue, null)
    } else if (arguments.length === 3) {
      const expectedValue = arguments[0], actualValue = arguments[1], message = arguments[2]
      if (!actualValue.equals(expectedValue)) 
        throw new AssertionFailedException('Expected ' + expectedValue + ' but encountered ' + actualValue + (message !== null ? ': ' + message : ''))
      
    }
  }
}
