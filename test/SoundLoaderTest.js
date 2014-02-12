var SoundLoaderTest	= Class.extend({
	cLoader : null,

	init : function() {
		var cThis		= this;

		this.cLoader	= new SoundLoader(new Loader());
		this.cLoader.loadSounds(
			[
				"sounds/bounce0.ogg",
				"sounds/energy_pickup.ogg",
				"sounds/explode0.ogg"
			],
			function() {
				cThis.testSounds();
			}
		);
	},

	testSounds : function() {
		var context		= Utils.getAudioContext();

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