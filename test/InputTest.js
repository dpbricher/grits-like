var InputTest	= Class.extend({
	cKeyManager : null,
	cMouseManager : null,

	init : function() {
		var cStage		= document.getElementById("stage");

		cStage.width	=
		cStage.height	= 1024;

		this.cKeyManager	= new KeyboardManager(document.body);
		this.cMouseManager	= new MouseManager(cStage);

		setInterval(
			Utils.bindFunc(this, this.logHeldKeys),
			1000
		);
	},

	logHeldKeys : function() {
		var aHeld	= this.cKeyManager.getHeldKeys();

		for (var i in aHeld)
		{
			console.log("key " + i + " is held!");
		}

		aHeld	= this.cMouseManager.getHeldButtons();

		for (var i in aHeld)
		{
			console.log("mouse button " + i + " is held!");
		}
	}
});