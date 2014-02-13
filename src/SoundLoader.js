var SoundLoader	= Class.extend({
	cLoader : null,
	cSoundMap : null,

	init : function(cLoaderRef) {
		this.cSoundMap	= {};
		this.cLoader	= cLoaderRef;
	},

	loadSounds : function(aFileList, zCallback) {
		this.cLoader.queueList(aFileList);

		this.cLoader.startQueue(
			Utils.bindFunc(this, this._decodeSounds, zCallback)
		);
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
				console.log("Failed to decode audio data for " + sName);
				zOnSoundDecoded(sName, null);
			};
		};

		var context	= Utils.getAudioContext();

		for (var sName in cDataList)
		{
			++iDataCount;

			context.decodeAudioData(
				cDataList[sName],
				zMakeSuccCallback(sName),
				zMakeErrCallback(sName)
			);
		}
	}
});