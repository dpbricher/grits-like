var SoundManagerTest	= Class.extend({
	cLoader : null,

	cManager : null,

	init : function() {
		this.cLoader	= new SoundLoader(
			new Loader()
		);

		this.cManager	= new SoundManager(this.cLoader);

		this.startSfxTest();
		// this.startBgMenuTest();
		this.startBgGameTest();
	},

	startSfxTest : function() {
		var aSoundList	= [];

		for (var i in SoundNames)
		{
			// skip bg loops for this test
			if (i.match(/bg/i) != null)
				continue;

			aSoundList.push("sounds/" + SoundNames[i]);
		}

		this.cLoader.loadSounds(
			aSoundList,
			Utils.bindFunc(
				this,
				this.onSoundsLoaded,
				aSoundList.map(function(sItem) {
					return sItem.substr(sItem.indexOf("/") + 1);
				})
			)
		);
	},

	startBgMenuTest : function() {
		this.cLoader.loadSounds(
			["sounds/" + SoundNames.BG_MENU],
			Utils.bindFunc(this, this.onSoundsLoaded, [SoundNames.BG_MENU])
		);
	},

	startBgGameTest : function() {
		this.cLoader.loadSounds(
			["sounds/" + SoundNames.BG_GAME],
			Utils.bindFunc(this, this.onSoundsLoaded, [SoundNames.BG_GAME])
		);
	},

	onSoundsLoaded : function(aSoundList) {
		this.cManager.createSoundList(this.cLoader.cSoundMap);

		var fDelay	= 0;

		for (var i in aSoundList)
		{
			this.cManager.startSound(aSoundList[i], fDelay);
			fDelay	+= 0.2;
		}
	}
});