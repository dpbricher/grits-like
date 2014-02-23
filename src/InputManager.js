var InputManager	= Class.extend({
	cKeyManager : null,
	cMouseManager : null,

	cBindingsMap : {},

	cActionsList : {},

	init : function(cKeyManager, cMouseManager) {
		this.cKeyManager	= cKeyManager;
		this.cMouseManager	= cMouseManager;
	},

	bindAction : function(iKeyCode, sAction) {
		this.cBindingsMap[iKeyCode]	= sAction;
	},

	unbindAction : function(iKeyCode) {
		delete this.cBindingsMap[iKeyCode];
	},

	clearBindings : function() {
		this.cBindingsMap	= {};
	},

	getLiveActions : function() {
		this._updateActions();
		return this.cActionsList;
	},

	/**
	 * returns the position of the main mouse button event if the button is held, or null otherwise
	 */
	getMouseHeldPos : function() {
		var cMousePos	= null;
		var cEvent		= this.cMouseManager.getHeldButtons()[0];

		if (cEvent != null)
		{
			cMousePos	= new Vec2(cEvent.clientX, cEvent.clientY);
		}

		return cMousePos;
	},

	_updateActions : function() {
		var sAction;
		var cHeldKeys	= this.cKeyManager.getHeldKeys();
		var cHeldMbs	= this.cMouseManager.getHeldButtons();

		for (var sCode in this.cBindingsMap)
		{
			sAction	= this.cBindingsMap[sCode];

			if (cHeldKeys[sCode] != null || cHeldMbs[sCode] != null)
			{
				this.cActionsList[sAction]	= true;
			}
			else
			{
				delete this.cActionsList[sAction];
			}
		}
	}
});