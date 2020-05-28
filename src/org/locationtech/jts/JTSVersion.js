import System from '../../../java/lang/System'
export default class JTSVersion {
  static main(args) {
    System.out.println(JTSVersion.CURRENT_VERSION)
  }
  getMajor() {
    return JTSVersion.MAJOR
  }
  getPatch() {
    return JTSVersion.PATCH
  }
  getMinor() {
    return JTSVersion.MINOR
  }
  toString() {
    const ver = JTSVersion.MAJOR + '.' + JTSVersion.MINOR + '.' + JTSVersion.PATCH
    if (JTSVersion.RELEASE_INFO !== null && JTSVersion.RELEASE_INFO.length > 0) return ver + ' ' + JTSVersion.RELEASE_INFO
    return ver
  }
}
JTSVersion.CURRENT_VERSION = new JTSVersion()
JTSVersion.MAJOR = 1
JTSVersion.MINOR = 17
JTSVersion.PATCH = 0
JTSVersion.RELEASE_INFO = 'SNAPSHOT'
