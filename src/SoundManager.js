var SoundManager	= Class.extend({
	cContext : null,

	cGlobalGain : null,

	cInstanceMap : {},

	init : function(cSoundLoader) {
		this.cContext		= Utils.getAudioContext();

		this.cGlobalGain	= this.cContext.createGain(0);
		this.cGlobalGain.connect(this.cContext.destination);
	},

	createSound : function(sName, cSoundData) {
		var cSound					= new SoundInstance(cSoundData);

		this.cInstanceMap[sName]	= cSound;
		this._connectSound(cSound);
	},

	createSoundList : function(cSoundList) {
		for (var sKey in cSoundList)
		{
			this.createSound(sKey, cSoundList[sKey]);
		}
	},

	startSound : function(sName, fDelay) {
		var cSound	= this.getSound(sName);

		if (cSound != null)
			cSound.start(fDelay);
	},

	stopSound : function(sName, fDelay) {
		var cSound	= this.getSound(sName);

		if (cSound != null)
			cSound.stop(fDelay);
	},

	loopSound : function(sName, fDelay) {
		var cSound	= this.getSound(sName);

		if (cSound != null)
			cSound.loop(fDelay);
	},

	getSound : function(sName) {
		return this.cInstanceMap[sName];
	},

	setGlobalVolume : function(fVolume) {
		this.cGlobalGain.gain.value	= Utils.clamp(fVolume, 0.0, 1.0);
	},

	getGlobalVolume : function() {
		return this.cGlobalGain.gain.value;
	},

	_connectSound : function(cSound) {
		cSound.connect(this.cGlobalGain);
	}
});