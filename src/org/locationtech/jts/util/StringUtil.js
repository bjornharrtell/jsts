import PrintStream from '../../../../java/io/PrintStream';
import StringReader from '../../../../java/io/StringReader';
import DecimalFormat from '../../../../java/text/DecimalFormat';
import extend from '../../../../extend';
import System from '../../../../java/lang/System';
import ArrayList from '../../../../java/util/ArrayList';
import ByteArrayOutputStream from '../../../../java/io/ByteArrayOutputStream';
import Assert from './Assert';
import IOException from '../../../../java/io/IOException';
import LineNumberReader from '../../../../java/io/LineNumberReader';
export default function StringUtil() {}
extend(StringUtil.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return StringUtil;
	}
});
StringUtil.chars = function (c, n) {
	var ch = new Array(n).fill(null);
	for (var i = 0; i < n; i++) {
		ch[i] = c;
	}
	return new String(ch);
};
StringUtil.getStackTrace = function () {
	if (arguments.length === 1) {
		let t = arguments[0];
		var os = new ByteArrayOutputStream();
		var ps = new PrintStream(os);
		t.printStackTrace(ps);
		return os.toString();
	} else if (arguments.length === 2) {
		let t = arguments[0], depth = arguments[1];
		var stackTrace = "";
		var stringReader = new StringReader(StringUtil.getStackTrace(t));
		var lineNumberReader = new LineNumberReader(stringReader);
		for (var i = 0; i < depth; i++) {
			try {
				stackTrace += lineNumberReader.readLine() + StringUtil.NEWLINE;
			} catch (e) {
				if (e instanceof IOException) {
					Assert.shouldNeverReachHere();
				} else throw e;
			} finally {}
		}
		return stackTrace;
	}
};
StringUtil.split = function (s, separator) {
	var separatorlen = separator.length;
	var tokenList = new ArrayList();
	var tmpString = "" + s;
	var pos = tmpString.indexOf(separator);
	while (pos >= 0) {
		var token = tmpString.substring(0, pos);
		tokenList.add(token);
		tmpString = tmpString.substring(pos + separatorlen);
		pos = tmpString.indexOf(separator);
	}
	if (tmpString.length > 0) tokenList.add(tmpString);
	var res = new Array(tokenList.size()).fill(null);
	for (var i = 0; i < res.length; i++) {
		res[i] = tokenList.get(i);
	}
	return res;
};
StringUtil.toString = function () {
	if (arguments.length === 1) {
		let d = arguments[0];
		return StringUtil.SIMPLE_ORDINATE_FORMAT.format(d);
	}
};
StringUtil.spaces = function (n) {
	return StringUtil.chars(' ', n);
};
StringUtil.NEWLINE = System.getProperty("line.separator");
StringUtil.SIMPLE_ORDINATE_FORMAT = new DecimalFormat("0.#");
