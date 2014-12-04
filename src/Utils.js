var Utils	= {
	getAudioContextClass : function() {
		var audioContext	= window.webkitAudioContext || window.AudioContext;

		if (audioContext == null)
			console.warn("This browser does not implement the AudioContext API");

		return audioContext;
	},

	getRafFunc : function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(zCallback) {
				return setTimeout(zCallback, 1.0 / 60.0);
			};
	},

	getCancelFunc : function() {
		return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			window.clearTimeout;
	},

	clone : function(cClonee) {
		var cCopy	= {};

		for (var p in cClonee)
		{
			cCopy[p]	= cClonee[p];
		}

		return cCopy;
	},

	bindFunc : function(cScope, zFunction) {
		var aBoundArgs	= Array.prototype.slice.call(arguments, 2);

		return function(args) {
			aBoundArgs	= aBoundArgs.concat(Array.prototype.slice.call(arguments));

			zFunction.apply(cScope, aBoundArgs);
		};
	},

	clamp : function(fValue, fMin, fMax) {
		return Math.min(Math.max(0.0, fValue), fMax);
	}
};