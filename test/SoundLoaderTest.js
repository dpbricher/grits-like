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
		console.log("Test complete!");

		var context		= Utils.getAudioContext();
		var sound		= context.createBufferSource();
		sound.buffer	= this.cLoader.cSounds["explode0.ogg"];
		sound.connect(context.destination);
		sound.start(0);
	}
});