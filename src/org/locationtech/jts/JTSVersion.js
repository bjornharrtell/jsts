import extend from '../../../extend';
import System from '../../../java/lang/System';
export default function JTSVersion() {}
extend(JTSVersion.prototype, {
	getMajor: function () {
		return JTSVersion.MAJOR;
	},
	getPatch: function () {
		return JTSVersion.PATCH;
	},
	getMinor: function () {
		return JTSVersion.MINOR;
	},
	toString: function () {
		var ver = JTSVersion.MAJOR + "." + JTSVersion.MINOR + "." + JTSVersion.PATCH;
		if (JTSVersion.releaseInfo !== null && JTSVersion.releaseInfo.length > 0) return ver + " " + JTSVersion.releaseInfo;
		return ver;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return JTSVersion;
	}
});
JTSVersion.main = function (args) {
	System.out.println(JTSVersion.CURRENT_VERSION);
};
JTSVersion.CURRENT_VERSION = new JTSVersion();
JTSVersion.MAJOR = 1;
JTSVersion.MINOR = 14;
JTSVersion.PATCH = 0;
JTSVersion.releaseInfo = "";

