import Geometry from '../geom/Geometry'
import Exception from '../../../../java/lang/Exception'
export default class TestBuilderProxy {
  static showIndicator(geom) {
    TestBuilderProxy.init()
    if (TestBuilderProxy.methodShowIndicator === null) return null
    try {
      TestBuilderProxy.methodShowIndicator.invoke(null, geom)
    } catch (e) {
      if (e instanceof Exception) {} else {
        throw e
      }
    } finally {}
  }
  static init() {
    if (TestBuilderProxy.tbClass !== null) return null
    try {
      TestBuilderProxy.tbClass = TestBuilderProxy.getClassLoader().loadClass(TestBuilderProxy.CLASS_FUNCTIONS_UTIL)
      TestBuilderProxy.methodShowIndicator = TestBuilderProxy.tbClass.getMethod('showIndicator', Geometry)
    } catch (ex) {
      if (ex instanceof Exception) {} else {
        throw ex
      }
    } finally {}
  }
  static isActive() {
    TestBuilderProxy.init()
    return TestBuilderProxy.tbClass !== null
  }
}
TestBuilderProxy.CLASS_FUNCTIONS_UTIL = 'org.locationtech.jtstest.function.FunctionsUtil'
TestBuilderProxy.tbClass = null
TestBuilderProxy.methodShowIndicator = null
