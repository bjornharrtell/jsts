import System from '../../../java/lang/System';
export default class JTSVersion {
	constructor() {
		JTSVersion.constructor_.apply(this, arguments);
	}
	static main(args) {
		System.out.println(JTSVersion.CURRENT_VERSION);
	}
	getMajor() {
		return JTSVersion.MAJOR;
	}
	getPatch() {
		return JTSVersion.PATCH;
	}
	getMinor() {
		return JTSVersion.MINOR;
	}
	toString() {
		var ver = JTSVersion.MAJOR + "." + JTSVersion.MINOR + "." + JTSVersion.PATCH;
		if (JTSVersion.releaseInfo !== null && JTSVersion.releaseInfo.length > 0) return ver + " " + JTSVersion.releaseInfo;
		return ver;
	}
	getClass() {
		return JTSVersion;
	}
	get interfaces_() {
		return [];
	}
}
JTSVersion.constructor_ = function () {};
JTSVersion.CURRENT_VERSION = new JTSVersion();
JTSVersion.MAJOR = 1;
JTSVersion.MINOR = 15;
JTSVersion.PATCH = 0;
JTSVersion.releaseInfo = "";
