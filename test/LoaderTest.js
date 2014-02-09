var LoaderTest	= Class.extend({
	init : function() {
		var loader		= new Loader();

		loader.loadImage("images/grits_effects.png", function(cImage) {
			document.body.appendChild(cImage);
		});

		loader.loadText("data/map2.json", function(sText) {
			console.log(sText.length);
		});

		loader.loadBuffer("sounds/energy_pickup.ogg", function(aData) {
			console.log("aData = " , aData);
		});
	}
});