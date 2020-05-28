import PrintStream from '../../../../java/io/PrintStream'
import StringReader from '../../../../java/io/StringReader'
import System from '../../../../java/lang/System'
import ArrayList from '../../../../java/util/ArrayList'
import ByteArrayOutputStream from '../../../../java/io/ByteArrayOutputStream'
import Assert from './Assert'
import IOException from '../../../../java/io/IOException'
import LineNumberReader from '../../../../java/io/LineNumberReader'
export default class StringUtil {
  static chars(c, n) {
    const ch = new Array(n).fill(null)
    for (let i = 0; i < n; i++) 
      ch[i] = c
    
    return new String(ch)
  }
  static getStackTrace() {
    if (arguments.length === 1) {
      const t = arguments[0]
      const os = new ByteArrayOutputStream()
      const ps = new PrintStream(os)
      t.printStackTrace(ps)
      return os.toString()
    } else if (arguments.length === 2) {
      const t = arguments[0], depth = arguments[1]
      let stackTrace = ''
      const stringReader = new StringReader(StringUtil.getStackTrace(t))
      const lineNumberReader = new LineNumberReader(stringReader)
      for (let i = 0; i < depth; i++) 
        try {
          stackTrace += lineNumberReader.readLine() + StringUtil.NEWLINE
        } catch (e) {
          if (e instanceof IOException) 
            Assert.shouldNeverReachHere()
          else throw e
        } finally {}
      
      return stackTrace
    }
  }
  static spaces(n) {
    return StringUtil.chars(' ', n)
  }
  static split(s, separator) {
    const separatorlen = separator.length
    const tokenList = new ArrayList()
    let tmpString = '' + s
    let pos = tmpString.indexOf(separator)
    while (pos >= 0) {
      const token = tmpString.substring(0, pos)
      tokenList.add(token)
      tmpString = tmpString.substring(pos + separatorlen)
      pos = tmpString.indexOf(separator)
    }
    if (tmpString.length > 0) tokenList.add(tmpString)
    const res = new Array(tokenList.size()).fill(null)
    for (let i = 0; i < res.length; i++) 
      res[i] = tokenList.get(i)
    
    return res
  }
}
StringUtil.NEWLINE = System.getProperty('line.separator')
