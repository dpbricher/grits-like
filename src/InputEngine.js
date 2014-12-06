var InputEngine	= Class.extend({
	cInputManager : null,

	init : function(cInputManager) {
		this.cInputManager	= cInputManager;

		this.cInputManager.bindAction(KeyCodes.W, Actions.MOVE_UP);
		this.cInputManager.bindAction(KeyCodes.A, Actions.MOVE_LEFT);
		this.cInputManager.bindAction(KeyCodes.S, Actions.MOVE_DOWN);
		this.cInputManager.bindAction(KeyCodes.D, Actions.MOVE_RIGHT);
		
		this.cInputManager.bindAction(KeyCodes.ARROW_UP, Actions.FIRE_UP);
		this.cInputManager.bindAction(KeyCodes.ARROW_LEFT, Actions.FIRE_LEFT);
		this.cInputManager.bindAction(KeyCodes.ARROW_DOWN, Actions.FIRE_DOWN);
		this.cInputManager.bindAction(KeyCodes.ARROW_RIGHT, Actions.FIRE_RIGHT);
	},

	update : function(t) {
	}
});