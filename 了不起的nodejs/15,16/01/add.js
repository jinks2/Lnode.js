(function (module) {
	module.exports = function (a, b) {
		return a + b;
	}
	if ('undefined' != typeof window) {
		window.add = module.exports;
	}
})('undefined' == typeof module ? { module: { exports: {}}} : module);
