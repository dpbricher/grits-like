var SoundLoader	= Class.extend({
	cSounds : null,
	cLoader : null,

	zCallback : null,

	init : function(cLoaderRef) {
		this.cSounds	= {};
		this.cLoader	= cLoaderRef;
	},

	loadSounds : function(aFileList, zCallback) {
		this.zCallback	= zCallback;

		this.cLoader.queueList(aFileList);

		this.cLoader.startQueue(this._decodeSounds, this);
	},

	_decodeSounds : function(cDataList) {
		console.log("cDataList = " , cDataList);

		var iDataCount		= 0;
		var iDecodedCount	= 0;

		var cThis			= this;

		var zOnSoundDecoded;

		zOnSoundDecoded	= function(sName, cSound) {
			cThis.cSounds[sName]	= cSound;

			++iDecodedCount;

			if (iDecodedCount >= iDataCount)
			{
				cThis.zCallback();
			}
		};

		var context	= Utils.getAudioContext();

		for (var sName in cDataList)
		{
			++iDataCount;

			context.decodeAudioData(
				cDataList[sName],
				function(cSound) {
					zOnSoundDecoded(sName, cSound)
				},
				function() {}
			);
		}
	}
});