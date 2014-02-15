var SoundInstance	= Class.extend({
	cContext : null,

	cSource : null,
	cGain : null,

	init : function(cBuffer) {
		this.cContext		= Utils.getAudioContext();
		this.cSource		= this.cContext.createBufferSource();
		this.cSource.buffer	= cBuffer;

		this.cGain			= this.cContext.createGain(0);
		this.cSource.connect(this.cGain);
		
		this.setVolume(1.0);
	},

	connect : function(cTarget) {
		this.cGain.connect(cTarget);
	},

	start : function(fDelay) {
		this.cSource.start(fDelay);
	},

	setVolume : function(fVolume) {
		this.cGain.gain.value	= Utils.clamp(fVolume, 0.0, 1.0);
	},

	getVolume : function() {
		return this.cGain.gain.value;
	}
});