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

		var AudioContext	= window.AudioContext || AudioContext;

		var context			= new AudioContext();
	}
});