var SoundInstance	= Class.extend({
	cContext : null,
	cBuffer : null,
	cGain : null,

	// the sound source currently playing
	cSource : null,

	init : function(cBuffer) {
		this.cBuffer		= cBuffer;

		this.cContext		= Utils.getAudioContext();
		this.cGain			= this.cContext.createGain(0);
		
		this.setVolume(1.0);
	},

	connect : function(cTarget) {
		this.cGain.connect(cTarget);
	},

	// AudioBufferSourceNode.start(when, offset, duration);
	start : function(fDelay) {
		this._initSource();

		this.cSource.connect(this.cGain);
		this.cSource.start(
			this._getTimeFromDelay(fDelay)
		);
	},

	// AudioBufferSourceNode.stop(when);
	stop : function(fDelay) {
		this.cSource.stop(
			this._getTimeFromDelay(fDelay)
		);
	},

	loop : function(fDelay) {
		this.start(fDelay);
		this.cSource.loop	= true;
	},

	setVolume : function(fVolume) {
		this.cGain.gain.value	= Utils.clamp(fVolume, 0.0, 1.0);
	},

	getVolume : function() {
		return this.cGain.gain.value;
	},

	_initSource : function() {
		this.cSource		= this.cContext.createBufferSource();
		this.cSource.buffer	= this.cBuffer;
	},

	// returns the the AudioContext time fDelay seconds from now
	_getTimeFromDelay : function(fDelay) {
		if (fDelay == null || fDelay <= 0.0)
			fDelay	= 0.0;
		else
			fDelay	= this.cContext.currentTime + fDelay;

		return fDelay;
	}
});