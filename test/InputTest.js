var InputTest	= Class.extend({
	cKeyManager : null,

	init : function() {
		this.cKeyManager	= new KeyboardManager(document.body);

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
	}
});