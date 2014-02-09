var LoaderTest	= Class.extend({
	init : function() {
		var loader		= new Loader();

		[
			"data/grits_effects.json",
			"data/map1.json",
			"data/map2.json",
			"images/grits_effects.png",
			"images/grits_master.png",
			"sounds/bounce0.ogg",
			"sounds/energy_pickup.ogg",
			"sounds/explode0.ogg"
		].forEach(
			function(sItem) {
				loader.queue(sItem)
			}
		);

		loader.startQueue(
			function(aAssets) {
				for (var i in aAssets)
				{
					console.log("aAssets." + i + " = " , aAssets[i]);
				}
			},
			this
		);
	}
});