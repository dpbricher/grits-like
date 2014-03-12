var SoundLoaderTest	= Class.extend({
	cAudioContext : null,

	cLoader : null,

	init : function() {
		this.cAudioContext	= new (Utils.getAudioContextClass())();

		this.cLoader		= new SoundLoader(new Loader(), this.cAudioContext);
		this.cLoader.loadSounds(
			[
				"sounds/bounce0.ogg",
				"sounds/energy_pickup.ogg",
				"sounds/explode0.ogg"
			],
			Utils.bindFunc(this, this.testSounds)
		);
	},

	testSounds : function() {
		var context		= this.cAudioContext;

		var fOffset		= 0.0;

		for (var i in this.cLoader.cSoundMap)
		{
			var sound		= context.createBufferSource();
			sound.buffer	= this.cLoader.getSoundData(i);
			sound.connect(context.destination);
			sound.start(fOffset);
			fOffset			+= 0.5;
		}
	}
});