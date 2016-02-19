import extend from '../../../../extend';
export default function Memory() {}
extend(Memory.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Memory;
	}
});
Memory.used = function () {
	var runtime = Runtime.getRuntime();
	return runtime.totalMemory() - runtime.freeMemory();
};
Memory.format = function (mem) {
	if (mem < 2 * Memory.KB) return mem + " bytes";
	if (mem < 2 * Memory.MB) return Memory.round(mem / Memory.KB) + " KB";
	if (mem < 2 * Memory.GB) return Memory.round(mem / Memory.MB) + " MB";
	return Memory.round(mem / Memory.GB) + " GB";
};
Memory.freeString = function () {
	return Memory.format(Memory.free());
};
Memory.total = function () {
	var runtime = Runtime.getRuntime();
	return runtime.totalMemory();
};
Memory.usedTotalString = function () {
	return "Used: " + Memory.usedString() + "   Total: " + Memory.totalString();
};
Memory.usedString = function () {
	return Memory.format(Memory.used());
};
Memory.allString = function () {
	return "Used: " + Memory.usedString() + "   Free: " + Memory.freeString() + "   Total: " + Memory.totalString();
};
Memory.round = function (d) {
	return Math.ceil(d * 100) / 100;
};
Memory.totalString = function () {
	return Memory.format(Memory.total());
};
Memory.free = function () {
	var runtime = Runtime.getRuntime();
	return runtime.freeMemory();
};
Memory.KB = 1024;
Memory.MB = 1048576;
Memory.GB = 1073741824;

