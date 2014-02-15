var Utils	= {
	cAudioContext : null,

	getAudioContext : function() {
		return this.cAudioContext;
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

(function() {
	var audioContext	= window.AudioContext || window.webkitAudioContext;
	
	Utils.cAudioContext	= new audioContext();
})();