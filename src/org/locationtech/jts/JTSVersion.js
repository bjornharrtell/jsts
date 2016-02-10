import System from '../../../java/lang/System';
export default class JTSVersion {
	constructor(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
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
}
JTSVersion.CURRENT_VERSION = new JTSVersion();
JTSVersion.MAJOR = 1;
JTSVersion.MINOR = 14;
JTSVersion.PATCH = 0;
JTSVersion.releaseInfo = "";

