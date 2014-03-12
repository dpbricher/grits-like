var SoundLoader	= Class.extend({
	cLoader : null,
	cSoundMap : null,

	cAudioContext : null,

	init : function(cLoaderRef, cAudioContext) {
		this.cLoader		= cLoaderRef;
		this.cAudioContext	= cAudioContext;

		this.cSoundMap		= {};
	},

	loadSounds : function(aFileList, zCallback) {
		this.cLoader.queueList(aFileList);

		this.cLoader.startQueue(
			Utils.bindFunc(this, this._decodeSounds, zCallback)
		);
	},

	getAudioContext : function() {
		return this.cAudioContext;
	},

	getSoundData : function(sName) {
		return this.cSoundMap[sName];
	},

	_decodeSounds : function(zCallback, cDataList) {
		var iDataCount		= 0;
		var iDecodedCount	= 0;

		var cThis			= this;

		var zOnSoundDecoded	= function(sName, cSound) {
			cThis.cSoundMap[sName]	= cSound;

			++iDecodedCount;

			if (iDecodedCount >= iDataCount)
			{
				zCallback();
			}
		};

		var zMakeSuccCallback	= function(sName) {
			return function(cSound) {
				zOnSoundDecoded(sName, cSound)
			};
		};

		var zMakeErrCallback	= function(sName) {
			return function() {
				console.warn("Failed to decode audio data for " + sName);
				zOnSoundDecoded(sName, null);
			};
		};

		for (var sName in cDataList)
		{
			++iDataCount;

			this.cAudioContext.decodeAudioData(
				cDataList[sName],
				zMakeSuccCallback(sName),
				zMakeErrCallback(sName)
			);
		}
	}
});