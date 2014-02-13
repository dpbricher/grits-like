var Utils	= {
	getAudioContext : function() {
		var audioContext	= window.AudioContext || window.webkitAudioContext;

		return new audioContext();
	},

	bindFunc : function(cScope, zFunction) {
		var aBoundArgs	= Array.prototype.slice.call(arguments, 2);

		return function(args) {
			aBoundArgs	= aBoundArgs.concat(Array.prototype.slice.call(arguments));

			zFunction.apply(cScope, aBoundArgs);
		};
	}
};