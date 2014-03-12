var SoundManagerTest	= Class.extend({
	cLoader : null,

	cManager : null,

	init : function() {
		this.cLoader	= new SoundLoader(
			new Loader(),
			new (Utils.getAudioContextClass())()
		);

		this.cManager	= new SoundManager(this.cLoader);

		// this.startSfxTest();
		// this.startBgMenuTest();
		// this.startBgGameTest();
		this.startControlTest();
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

	// tests loop, volume, mute and stop controls
	startControlTest : function() {
		this.cLoader.loadSounds(
			["sounds/" + SoundNames.MACH_GUN],
			Utils.bindFunc(this, this.onControlTestLoad, SoundNames.MACH_GUN)
		);
	},

	onControlTestLoad : function(sName) {
		this.cManager.createSoundList(this.cLoader.cSoundMap);

		var iStartDelay	= 1000;

		console.log("start triggered!");

		this.cManager.loopSound(sName, iStartDelay / 1000);
		this.cManager.loopSound(sName, iStartDelay * 1.3 / 1000);

		setTimeout(
			Utils.bindFunc(this, function() {
				this.cManager.setGlobalVolume(
					this.cManager.getGlobalVolume() - 0.7
				);
			}),
			iStartDelay + 1000
		);

		setTimeout(
			Utils.bindFunc(this, function() {
				this.cManager.getSound(sName).setVolume(
					this.cManager.getSound(sName).getVolume() - 0.7
				);
			}),
			iStartDelay + 2000
		);

		setTimeout(
			Utils.bindFunc(this, function() {
				this.cManager.setGlobalMuted(true);
			}),
			iStartDelay + 3000
		);

		setTimeout(
			Utils.bindFunc(this, function() {
				this.cManager.setGlobalMuted(false);
			}),
			iStartDelay + 4000
		);

		setTimeout(
			Utils.bindFunc(this, function() {
				console.log("stop triggered!");
				this.cManager.stopSound(sName, 1.0);
			}),
			iStartDelay + 5000
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