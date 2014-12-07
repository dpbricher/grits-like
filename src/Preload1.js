/**
 * Class to load everything required for the game to run
 */
var Preload1	= Class.extend({
	DATA_DIR_PATH : "data",
	IMAGE_DIR_PATH : "images",
	SOUND_DIR_PATH : "sounds",

	IMAGE_JSON_NAME : "grits_effects.json",
	MAP_JSON_NAME : "map2.json",

	cLoader : null,
	cSoundLoader : null,

	cAtlasParser : null,
	cTiledParser : null,

	cAtlasImage : null,
	cTiledImage : null,

	// callback for when everything has been loaded
	zOnLoadComplete : null,

	init : function(cLoader, cSoundLoader, cAtlasParser, cTiledParser) {
		this.cLoader		= cLoader;
		this.cSoundLoader	= cSoundLoader;

		this.cAtlasParser	= cAtlasParser;
		this.cTiledParser	= cTiledParser;
	},

	getAtlasImage : function() {
		return this.cAtlasImage;
	},

	getTiledImage : function() {
		return this.cTiledImage;
	},

	startLoading : function(zOnComplete) {
		this.zOnLoadComplete	= zOnComplete;

		// first load any data files that tell us about other asset files
		this.cLoader.queueList([
			this.DATA_DIR_PATH + "/" + this.IMAGE_JSON_NAME,
			this.DATA_DIR_PATH + "/" + this.MAP_JSON_NAME
		]);

		this.cLoader.startQueue(this.onDataLoaded, this);
	},

	onDataLoaded : function(cData) {
		// assign the loaded data files
		this.cAtlasParser.parse(cData[this.IMAGE_JSON_NAME]);
		this.cTiledParser.parse(cData[this.MAP_JSON_NAME]);

		// now load all image files
		this.cLoader.queueList([
			this.IMAGE_DIR_PATH + "/" + this.cAtlasParser.getAtlasName(),
			this.IMAGE_DIR_PATH + "/" + this.cTiledParser.getImagePath()
		]);

		this.cLoader.startQueue(this.onImagesLoaded, this);
	},

	onImagesLoaded : function(cData) {
		// assign the image data
		this.cAtlasImage	= cData[this.cAtlasParser.getAtlasName()];
		this.cTiledImage	= cData[this.cTiledParser.getImagePath()];

		// now load all sound files
		var aSoundList		= [];

		for (var sName in SoundNames)
		{
			// not using bg menu at the moment
			if (sName == "BG_MENU")
				continue;

			aSoundList.push(this.SOUND_DIR_PATH + "/" + SoundNames[sName]);
		}

		/*this.cSoundLoader.loadSounds(
			aSoundList, Utils.bindFunc(this, this.onSoundsLoaded)
		);*/
		this.onSoundsLoaded();
	},

	onSoundsLoaded : function(cData) {
		this.zOnLoadComplete();
	}
});