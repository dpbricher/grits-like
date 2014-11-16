var Main	= Class.extend({
	init : function() {
		var game	= new Game1(
			document.getElementById("stage")
		);
		game.start();
	}
});