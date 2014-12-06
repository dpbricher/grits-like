var InputEngine	= Class.extend({
	cPlayer1 : null,

	cInputManager : null,

	init : function(cPlayer1, cInputManager) {
		this.cPlayer1		= cPlayer1;

		this.cInputManager	= cInputManager;

		this.cInputManager.bindAction(KeyCodes.W, Actions.MOVE_UP_P1);
		this.cInputManager.bindAction(KeyCodes.A, Actions.MOVE_LEFT_P1);
		this.cInputManager.bindAction(KeyCodes.S, Actions.MOVE_DOWN_P1);
		this.cInputManager.bindAction(KeyCodes.D, Actions.MOVE_RIGHT_P1);
		
		this.cInputManager.bindAction(KeyCodes.ARROW_UP, Actions.FIRE_UP_P1);
		this.cInputManager.bindAction(KeyCodes.ARROW_LEFT,
			Actions.FIRE_LEFT_P1);
		this.cInputManager.bindAction(KeyCodes.ARROW_DOWN,
			Actions.FIRE_DOWN_P1);
		this.cInputManager.bindAction(KeyCodes.ARROW_RIGHT,
			Actions.FIRE_RIGHT_P1);
	},

	update : function(t) {
		var cActionMap	= this.cInputManager.getLiveActions();

		// movement
		var cMoveVec	= new b2.Vec2(0, 0);

		if (cActionMap[Actions.MOVE_UP_P1])		cMoveVec.y	-= 1.0;
		if (cActionMap[Actions.MOVE_DOWN_P1]) 	cMoveVec.y	+= 1.0;
		if (cActionMap[Actions.MOVE_LEFT_P1]) 	cMoveVec.x	-= 1.0;
		if (cActionMap[Actions.MOVE_RIGHT_P1])	cMoveVec.x	+= 1.0;

		cMoveVec.Normalize();
		cMoveVec.Multiply(this.cPlayer1.getMoveSpeed());

		this.cPlayer1.setVelocity(cMoveVec.x, cMoveVec.y);

		// firing
		var cFireVec	= new b2.Vec2(0, 0);

		if (cActionMap[Actions.FIRE_UP_P1])		cFireVec.y	-= 1.0;
		if (cActionMap[Actions.FIRE_DOWN_P1]) 	cFireVec.y	+= 1.0;
		if (cActionMap[Actions.FIRE_LEFT_P1]) 	cFireVec.x	-= 1.0;
		if (cActionMap[Actions.FIRE_RIGHT_P1])	cFireVec.x	+= 1.0;

		cFireVec.Normalize();

		this.cPlayer1.setFireVec(cFireVec.x, cFireVec.y);
	}
});