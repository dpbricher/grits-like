var Utils	= {
	getAudioContext : function() {

		var audioContext	= window.AudioContext || window.webkitAudioContext;

		return new audioContext();
	}
};