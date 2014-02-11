var SoundLoaderTest	= Class.extend({
	init : function() {
		var cLoader	= new SoundLoader(new Loader());
		cLoader.loadSounds(
			[
				"sounds/bounce0.ogg",
				"sounds/energy_pickup.ogg",
				"sounds/explode0.ogg"
			]
		);
	}
});