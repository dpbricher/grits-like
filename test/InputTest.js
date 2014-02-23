var InputTest	= Class.extend({
	cKeyManager : null,
	cMouseManager : null,

	cInputManager : null,

	init : function() {
		var cStage		= document.getElementById("stage");

		cStage.width	=
		cStage.height	= 1024;

		this.cKeyManager	= new KeyboardManager(document.body);
		this.cMouseManager	= new MouseManager(cStage);

		this.cInputManager	= new InputManager(this.cKeyManager, this.cMouseManager);

		// this.cInputManager.bindAction(KeyCodes.W, Actions.MOVE_UP);
		// this.cInputManager.bindAction(KeyCodes.A, Actions.MOVE_LEFT);
		// this.cInputManager.bindAction(KeyCodes.S, Actions.MOVE_DOWN);
		// this.cInputManager.bindAction(KeyCodes.D, Actions.MOVE_RIGHT);

		// this.cInputManager.bindAction(KeyCodes.MOUSE_MAIN, Actions.FIRE);

		this.cInputManager.bindAction(KeyCodes.ARROW_UP, Actions.MOVE_UP);
		this.cInputManager.bindAction(KeyCodes.ARROW_LEFT, Actions.MOVE_LEFT);
		this.cInputManager.bindAction(KeyCodes.ARROW_DOWN, Actions.MOVE_DOWN);
		this.cInputManager.bindAction(KeyCodes.ARROW_RIGHT, Actions.MOVE_RIGHT);

		this.cInputManager.bindAction(KeyCodes.SPACE, Actions.FIRE);

		setInterval(
			Utils.bindFunc(this, this.logMouseActionPos),
			1000
		);
	},

	logMouseActionPos : function() {
		var cPos	= this.cInputManager.getMouseHeldPos();

		if (cPos != null)
			console.log("cPos = " , cPos);
	},

	logLiveActions : function() {
		var aLiveActions	= this.cInputManager.getLiveActions();

		for (var sName in aLiveActions)
		{
			console.log("Action " + sName + " is active");
		}
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