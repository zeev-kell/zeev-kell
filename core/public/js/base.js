!function () {
	for (var n = 0, e = ["webkit", "moz"], i = 0; i < e.length && !window.requestAnimationFrame; ++i)window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
	window.requestAnimationFrame || (window.requestAnimationFrame = function (e, i) {
		var o = (new Date).getTime(), t = Math.max(0, 16.7 - (o - n)), a = window.setTimeout(function () {
			e(o + t)
		}, t);
		return n = o + t, a
	}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (n) {
		clearTimeout(n)
	})
}(), function () {
	for (var n, e = function () {
	}, i = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"], o = i.length, t = window.console = window.console || {}; o--;)n = i[o], t[n] || (t[n] = e)
}();